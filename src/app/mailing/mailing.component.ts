import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MailingService } from './mailing.service';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.css']
})
export class MailingComponent implements OnInit, OnDestroy {
	letters: Array<any> = [];
	query: string;
	message: string;
	buttonDisabled: boolean = false;
	private letterSubsription: Subscription;
	private querySubsription: Subscription;
	private messageSubsription: Subscription;

	constructor(private mailing: MailingService) { }

 	ngOnInit() {
  		this.letterSubsription = this.mailing.lettersChanged
  		.subscribe( 
  			(letters) => {this.letters = letters; this.buttonDisabled=false },
  			() => this.buttonDisabled=false
  		);
  		this.querySubsription = this.mailing.activeQueryChanged
  		.subscribe( 
  			(query) => {this.query = query;}
  		);
  		this.messageSubsription = this.mailing.messageChanged
  		.subscribe( 
  			(message) => {this.message = message}
  		);
  	}

	addLetter() {
		this.buttonDisabled = true;
	  	this.mailing.addLetter(this.letters, this.query, this.message);
	}

	ngOnDestroy() {
		this.letterSubsription.unsubscribe();
		this.querySubsription.unsubscribe();
		this.messageSubsription.unsubscribe();
	}

}
