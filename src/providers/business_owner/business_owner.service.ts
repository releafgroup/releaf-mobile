import * as uuid from 'node-uuid';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BusinessOwnerService {

  status: boolean;
  message: string;
  driver: any;
  endpoint: string = 'https://staging-v2.api.ikeora.releaf.ng';

  constructor(public events: Events, public http: Http, public storage: Storage) {
  }

//   getCompanies(query: any, size: any , sort_by: any) {
//       var url = this.endpoint + '/companies/search?';
//       for (var key in query) {
//         if (query[key] !== undefined) {
//           url += key + '=' + query[key] + '&';
//         }
//       }
//       url += 'size=' + size + '&';
//       url += 'sort_by=' + sort_by + '&';
//       url += 'token=';
//       return this.http.get(this.endpoint).toPromise()
//     }

  addLogin(username: string, password: string): any {
    let model = {username: "jaja", password: 'ksksk'}
    let headers = new Headers(
    {
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
    let body = `username=${model.username}&password=${model.password}`;
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.endpoint, body, options)
    .toPromise()
    .then(data => {
      let httpResponse = data.json();
      if (httpResponse) {
        console.log(httpResponse)
      }else {
        this.status = false;
        this.message = httpResponse.message;
        return this;
      }
    }).catch(error => {
        
        this.status = true;
        this.message = 'An Error Occured, Please try Again';
        return this;
    });
  }

}
