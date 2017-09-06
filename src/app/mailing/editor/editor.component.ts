import { Component, OnInit, OnDestroy } from '@angular/core';

import { MailingService } from '../mailing.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	text: string = '';
  subjects: Array<string>;
  private nameSubjectSubsription: Subscription;
  private textSubjectSubsription: Subscription;

  constructor(private mailing: MailingService, private subj: SubjectsService) { }

  ngOnInit() {
        this.nameSubjectSubsription = this.subj.getSubjects().subscribe(
          (files) => {this.subjects = files},
          () => alert('Невозможно загрузить список тем!') 
        );
        this.textSubjectSubsription = this.subj.subjectChanged.subscribe(
          (subject) => { 
            this.text = subject.text;
            this.mailing.setMessage(this.text);  
          } ,
          (error) => console.log('Error in the text')
        )
  }

  onChangeText( subjectText ) {
  	this.text = subjectText.srcElement.value;
  	this.mailing.setMessage(this.text);
  }

  onChangeSubject( subjectName ) {
    this.subj.getSubject(subjectName.srcElement.value);
  }

  ngOnDestroy() {
      this.textSubjectSubsription.unsubscribe();
      this.nameSubjectSubsription.unsubscribe();
    }

}
