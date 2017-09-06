import { Injectable } from '@angular/core';
import { SpamApiService } from '../shared/spam-api.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ShaduleService {
    itemChanged = new Subject<any>();
    itemsChanged = new Subject<any>();
    shaduleChanged = new Subject<any>();
    subjectsUrl: string;
    shaduleUrl: string;
    
    constructor(private spamAPI: SpamApiService) {
        this.subjectsUrl = this.spamAPI.subjectsUrl;
        this.shaduleUrl = this.spamAPI.shaduleUrl;
    }

    getItems(mode: string) {
      return this.spamAPI.fetchData(this.spamAPI.apiUrl + 'get-all-files.php?mode=' + mode);
    }

    getShadule() {
      return this.spamAPI.fetchData(this.spamAPI.apiUrl+'get-shadule.php');
    }

    updateShadule(shadule: Array<any>, item: any) {
        this.spamAPI.changeData(this.spamAPI.apiUrl+'update-shadule.php', item)
            .subscribe(
                      (response) => {
                          const newMailing = JSON.parse(item);
                          if (newMailing.action !== 'insert' ) shadule.splice(+newMailing.index, 1);
                          const Mailing = {sql: decodeURIComponent(newMailing.sql), 
                                           text: decodeURIComponent(newMailing.text),
                                           days: decodeURIComponent(newMailing.days).split(',')};
                          if (newMailing.action !== 'delete') shadule.unshift(Mailing);
                          this.shaduleChanged.next(shadule.slice());
                          alert(response.response);
                      }
                )
    }

}
