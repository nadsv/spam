import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { ShaduleService } from './shadule.service';

@Component({
  selector: 'app-shadule',
  templateUrl: './shadule.component.html',
  styleUrls: ['./shadule.component.css']
})
export class ShaduleComponent implements OnInit {
  shaduleGetSubsription: Subscription;
  shaduleChangedSubsription: Subscription;
  subjectGetSubsription: Subscription;
  filterGetSubsription: Subscription;
  shadule: Array<any>;
  subjects: Array<string>;
  filters: Array<string>;
  activeItem: number = null;
  activeSubject: number = null;
  activeFilter: number = null;
  days: string = '';
  subject: string = '';
  filter: string = '';

  constructor(private shaduleService: ShaduleService) { }

  ngOnInit() {
  	this.shaduleGetSubsription = this.shaduleService.getShadule().subscribe(
  			(shadule) => this.shadule = shadule,
  			() => alert('Невозможно загрузить расписание!') 
  			);
  	this.subjectGetSubsription = this.shaduleService.getItems('subjects').subscribe(
  			(files) => this.subjects = files,
  			() => alert('Невозможно загрузить список тем!') 
  			);
  	this.filterGetSubsription = this.shaduleService.getItems('sql').subscribe(
  			(files) => this.filters = files,
  			() => alert('Невозможно загрузить список фильтров!') 
  			);
  	this.shaduleChangedSubsription = this.shaduleService.shaduleChanged.subscribe(
  			(shadule) => this.shadule = shadule,
  			() => alert('Невозможно обновить расписание!') 
  			);
  }

  ngOnDestroy() {
  	this.shaduleGetSubsription.unsubscribe();
  	this.subjectGetSubsription.unsubscribe();
  	this.filterGetSubsription.unsubscribe();
  	this.shaduleChangedSubsription.unsubscribe();
  }

  SelectRow(i) {
  	this.activeItem = i;
  	this.days = this.shadule[i].days;
    this.subject = this.shadule[i].text;
    this.filter = this.shadule[i].sql;
    this.activeSubject = null;
    this.activeFilter = null;
  }

  Clear() {
      this.subject = '';
      this.filter = '';
      this.days  = '';
      this.activeSubject = null;
      this.activeFilter = null;
      this.activeItem = null;
  }

  onFilterClick(i) {
  	this.activeFilter = i;
  }

  onSubjectClick(i) {
  	this.activeSubject = i;
  }

  Update(action: string) {
  	if((this.activeSubject === null || this.activeFilter === null || this.days  == '') && action !== 'delete') {
  		alert('Не определены фильтр, тема или даты рассылки!')
  	} else {
	  	const item = JSON.stringify({
	  		'sql': encodeURIComponent(this.filters[this.activeFilter]), 
	  		'text': encodeURIComponent(this.subjects[this.activeSubject]), 
	  		'days': encodeURIComponent(this.days), 
	  		'action': action, 
	  		'index': this.activeItem});
	  	this.shaduleService.updateShadule(this.shadule, item);
	  	this.Clear();
	  }
	}
}
