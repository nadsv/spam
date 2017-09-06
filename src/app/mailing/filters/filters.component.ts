import { Component, OnInit } from '@angular/core';

import { MailingService } from '../mailing.service';
import { SpamApiService } from '../../shared/spam-api.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
	quieries: Array<string>;
	activeQuery: number;
  directories: Array<string>;
  activeDirectory: number;

  constructor(private mailing: MailingService,
    private spamAPI: SpamApiService) { }

  ngOnInit() {
    this.activeDirectory = 0;

    this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-files.php?mode=sql').subscribe(
                    (directories) => {
                       this.directories = directories;
                       this.getQueries(this.directories[0]);
                    },
                    () => alert('Невозможно получить список директорий с фильтрами!')
              )  
  }

  getQueries(dir) {
    this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-files.php?mode=sql/' + 
                       encodeURIComponent(dir)).subscribe(
                         (queries) => this.quieries = queries,
                         () => alert('Невозможно загрузить список фильтров!') 
                       )
  }

  onDirectoryClick(i) {
    this.activeDirectory = i;
    this.getQueries(this.directories[i]);
  }

  onQueryClick(i) {
  	this.activeQuery = i;
    this.mailing.setActiveQuery(this.directories[this.activeDirectory]+'/'+this.quieries[i]);
  }

}
