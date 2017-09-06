import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
	subjects: Array<string> = [];
	private subjectSubsription: Subscription;
  private subjectGetSubsription: Subscription;
  private subjectsSubsription: Subscription;
	activeItem: number = null;
	subjectText: string = '';
  subjectName: string = '';
  targetSubject: string = '';

	constructor(private subj: SubjectsService) { }

	ngOnInit() {
		this.subjectGetSubsription = this.subj.getSubjects().subscribe(
  			(files) => this.subjects = files,
  			() => alert('Невозможно загрузить список тем!') 
  			);

		this.subjectSubsription = this.subj.subjectChanged
  		.subscribe( 
  			(subject) => this.subjectText = subject.text
  		);

    this.subjectsSubsription = this.subj.subjectsChanged
      .subscribe( 
        (subjects) => this.subjects = subjects
      );
  	}

  	onClick(i) {
	  	this.activeItem = i;
      this.subjectName = this.subjects[i].replace('.txt', '');
	  	this.subj.getSubject(this.subjects[i]);
      this.targetSubject = this.subjects[i];
  	}

    Clear() {
      this.subjectName = '';
      this.subjectText = '';
      this.targetSubject  = '';
      this.activeItem = null;
    }

    onSubmit(value) {
      if (value.name !== '' && value.text !== '') {
        value.text = encodeURIComponent(value.text) 
        this.subj.saveSubject(this.subjects, value, this.activeItem);
        this.activeItem = 0;
        this.targetSubject = this.subjects[0];
      } else {
        alert('Заполните название и текст!')
      }
    }

    Delete() {
      if (confirm("Удалить тему?")) { 
        const item = JSON.stringify({ 'file': this.targetSubject}); 
        this.subj.deleteSubject(this.subjects, item, this.activeItem);
        this.Clear();
      }
    }

    ngOnDestroy() {
      this.subjectSubsription.unsubscribe();
      this.subjectGetSubsription.unsubscribe();
      this.subjectsSubsription.unsubscribe();
    }

}
