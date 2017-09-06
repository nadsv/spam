import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SpamApiService {
    apiUrl: string;
    dataUrl: string;
    sqlUrl: string;
    lettersUrl: string;
    outlookUrl: string;
    subjectsUrl: string;
    shaduleUrl: string;
    
    constructor(private http: Http) {
        this.apiUrl = ' /spam/api/';
        this.dataUrl = '/spam/data/';
        this.sqlUrl = '/spam/sql/';
        this.lettersUrl = '/spam/letters/';
        this.outlookUrl = '/spam/outlook/';
        this.subjectsUrl = '/spam/subjects/';
        this.shaduleUrl = '/spam/shadule/';
    }

    fetchData(url: string, data?: any): Observable<any> {
        let params = new URLSearchParams();
        for(let key in data) {
            params.set(key, data[key]);
        }
        let options = new RequestOptions({
                search: params
            });
        return this.http.get(url, options)
                    .map(response => response.json())
                    .catch(this.handleError);
    }

    changeData(url: string, item?: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, item, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    uploadFile(url: string, item?: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'multipart/form-data; charset=utf-8' });
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, item, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
