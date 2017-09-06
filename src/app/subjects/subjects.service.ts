import { Injectable } from '@angular/core';
import { SpamApiService } from '../shared/spam-api.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SubjectsService {
    subjectChanged = new Subject<any>();
    subjectsChanged = new Subject<any>();
    subjectsUrl: string;
    
    constructor(private spamAPI: SpamApiService) {
        this.subjectsUrl = this.spamAPI.subjectsUrl;
    }

    getSubjects() {
        return   this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-files.php?mode=subjects');
    }

    getSubject(subjectName) {
        this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-subject.php?subject='+encodeURIComponent(subjectName))
        .subscribe(
                  (subjectText) => this.subjectChanged.next(subjectText),
                  () => alert('Невозможно получить текст темы!')
            )
    }

     saveSubject(subjects: Array<any>, subject: any, index: number) {
        this.spamAPI.changeData(this.spamAPI.apiUrl+'save-subject.php', subject)
        .subscribe(
                  (file) => {
                      if (index !==null) subjects.splice(index, 1);
                      subjects.unshift(file.name);
                      this.subjectsChanged.next(subjects.slice());
                      alert('Тема сохранена!');
                  },
                  () => alert('Ошибка при сохранении темы!')
            )
    }

    deleteSubject(subjects: Array<any>, subject: any, index: number) {
        this.spamAPI.changeData(this.spamAPI.apiUrl+'delete-subject.php', subject)
        .subscribe(
                  () => {
                        subjects.splice(index, 1);
                        this.subjectsChanged.next(subjects.slice());
                  },
                  () => alert('Ошибка при удалении темы!')
            )
    }
}
