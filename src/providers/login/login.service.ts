import * as uuid from 'node-uuid';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { LoginModel } from './login.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  _logins: Array<LoginModel> = [];

  status: boolean;
  message: string;
  driver: any;
  endpoint: string = 'https://staging-v2.api.ikeora.releaf.ng';

  constructor(public events: Events, public http: Http, public storage: Storage, ) {
  }

  
  addLogin(username: string, password: string): any {
    const model = new LoginModel(username, password);
    let headers = new Headers(
    {
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
    let body = `email=${model.username}&password=${model.password}`;
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.endpoint+'/businesses/sessions', body, options)
    .subscribe(data => {
      console.log(data);
      let httpResponse = data.json();
      console.log(httpResponse);
      if (httpResponse) {
        this.storage.set('token', httpResponse.data.token);
        this.storage.set('id', httpResponse.data.id);
        this.storage.set('name', httpResponse.data.name);
        this.storage.set('isBusinessOwner', true);
        // this.storage.get('sentContracts').then((sentContracts) => {
        //   if(typeof sentContracts !== 'object'){
        //   this.storage.set('sentContracts', {});
        //   var t =  sentContracts[httpResponse.data.id] = [];
        //   this.storage.set('sentContracts', t);
        // }else{
        //   this.storage.get(sentContracts[httpResponse.data.id]).then((contrats) => {
        //     if(typeof contrats === 'undefined'){
        //       this.storage.set(sentContracts[httpResponse.data.id], []);
        //      }
        //    });
        // }

        // })
        this.status = true;
        this.message = httpResponse.message;
        return this;
      }else {
        this.status = false;
        this.message = "Invalid Login";
        return this;
      }
    }, error => {
      // var res = error.json();
      console.log(error)
        this.status = false;
        this.message = "Request Not Completed";
        return this;
    });
  }

  register(payload): any {
    let headers = new Headers(
    {
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
     let body = 
     `company_name=${payload.company_name}&email=${payload.email}&password=${payload.password}&phone_number=${payload.phone_number}&products=${payload.products}&position_in_chain=${payload.position_in_chain}&found_us_via=${payload.found_us_via}`;
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.endpoint+'/businesses', body, options)
    .subscribe(data => {
      let httpResponse = data.json();
      console.log(httpResponse);
      if (httpResponse) {
        this.addLogin(payload.email, payload.password);
        return this;
      }else {
        this.status = false;
        this.message = "Invalid Login";
        return this;
      }
    },error => {
      console.log(error)
        this.status = false;
        this.message = "Request Not Completed";
        return this;
    });
  }
  getLogins(): Array<LoginModel> {
    return this._logins;
  }
}
