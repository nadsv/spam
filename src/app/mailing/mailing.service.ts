import { Injectable } from '@angular/core';
import { SpamApiService } from '../shared/spam-api.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MailingService {
    lettersChanged = new Subject<any>();
    activeQueryChanged = new Subject<any>();
    messageChanged = new Subject<any>();
    lettersUrl: string;
    
    constructor(private spamAPI: SpamApiService) {
        this.lettersUrl = this.spamAPI.lettersUrl;
    }

    getLetters() {
        this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-letters.php').subscribe(
                  (letters) => this.lettersChanged.next(letters),
                  () => alert('Невозможно получить список рассылок!')
            )
    }

    getQueries() {
        return this.spamAPI.fetchData(this.spamAPI.apiUrl + 'get-files.php?mode=sql');
    }

    setActiveQuery( query ) {
        this.activeQueryChanged.next( query );
    }

    setMessage( text: string ) {
        this.messageChanged.next( text );
    }

    addLetter(letters:  Array<any>, sql: string, text: string) {
        const nextIndex = this.getNextIndex(letters);
        if (sql && text ) {  
            this.getSavedLetter(nextIndex, sql, text, letters) 
        }
        else {
            alert('Выберете фильтр адресов и введите сообщение!');
            this.lettersChanged.next(letters);
        }
    }

    private getNextIndex(letters:  Array<any>) {
        const currentDate = new Date();
        const formatDate = currentDate.toISOString().substring(0, 10)
        +'_'+ currentDate.getHours()+currentDate.getMinutes()+''+currentDate.getSeconds();
        return formatDate;
    }

    private getSavedLetter( index: string, sql: string, text: string, letters: Array<any> ) {
        const params = JSON.stringify({ 'index': index, 'sql':  sql, 'text': encodeURIComponent(text) });
        this.spamAPI.changeData(this.spamAPI.apiUrl+'save-letter.php', params).subscribe(
                  (letters) => {
                      alert('Рассылка сформирована!');
                      this.lettersChanged.next(letters);
                  },
                  () => { 
                      alert('Рассылка не сформирована!');
                      this.lettersChanged.next(letters);
                  }
            )
    }


    deleteLetter(letters:  Array<any>, index: number) {
        const item = JSON.stringify({ 'index': letters[index].index });
        this.spamAPI.changeData(this.spamAPI.apiUrl+'del-letter.php', item)
            .subscribe(
                ()=>{
                    letters.splice(index, 1);
                    this.lettersChanged.next(letters.slice());}
                );

    }

}
