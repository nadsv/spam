import { Component, OnInit } from '@angular/core';

import { SpamApiService } from '../shared/spam-api.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
	letters: Array<any> = [];

  constructor(private spamAPI: SpamApiService) { }

  ngOnInit() {
  	this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-letters.php?mode=data').subscribe(
                  (letters) => this.letters = letters,
                  () => alert('Невозможно получить архив рассылок!')
            )
  }

}
