import { Component, OnInit, OnDestroy } from '@angular/core';

import { MailingService } from '../mailing.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit, OnDestroy {
    letters: Array<string> = [];
    private letterSubscription: Subscription;

    constructor(public mailing: MailingService) { 

    }

    ngOnInit() {
      	this.mailing.getLetters();
        this.letterSubscription = this.mailing.lettersChanged.subscribe(
                (letters) => { this.letters = letters },
                () => alert('Невозможно получить измененный список рассылок!')
            );
    }

    onDelete(index: number) {
        this.mailing.deleteLetter(this.letters, index);
    }

    ngOnDestroy() {
        this.letterSubscription.unsubscribe();
    }

}
