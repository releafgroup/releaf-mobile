import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IndexService {
  endpoint: string = 'https://staging-v2.api.ikeora.releaf.ng';

  constructor (
    private http: Http
  ) {}

  login(username, password) {
    let headers = new Headers(
    {
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
    let body = `email=${username}&password=${password}`;
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endpoint+'/businesses/sessions', body, options)
    .map((res:Response) => res.json());
  }


  register(payload) {
    let headers = new Headers(
    {
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
     let body = 
     `company_name=${payload.company_name}&email=${payload.email}&password=${payload.password}&phone_number=${payload.phone_number}&products=${payload.products}&position_in_chain=${payload.position_in_chain}&found_us_via=${payload.found_us_via}`;
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endpoint+'/businesses', body, options)
    .map((res:Response) => res.json());
  }

}