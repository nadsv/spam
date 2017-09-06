import { Component, OnInit } from '@angular/core';

import { SpamApiService } from '../shared/spam-api.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {
	fileName: string = 'outlook.csv';
	buttonName: string = 'Обновить адресную книгу в формате MS Office Outlook';
	buttonDisabled: boolean = false;

	constructor( public spamAPI: SpamApiService ) { }

	ngOnInit() {
	}

	updateOutlookBook() {
		this.buttonName = 'Идет обновление адресной книги...';
		this.buttonDisabled = true;
		this.spamAPI.fetchData(this.spamAPI.apiUrl + 'get-outlook-address-book.php')
			.subscribe(
				() => { alert('Адресная книга обновлена!'); 
						this.buttonName='Обновить адресную книгу в формате MS Office Outlook';
						this.buttonDisabled = false;
				},
				() => alert('Ошибка обновления адресной книги!')
			)
	}

}
