import * as uuid from 'node-uuid';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchResultService {

  status: boolean;
  message: string;
  driver: any;

  query: any;
  singleResult: any = null;
  results: any;
  page: any;
  size: any;
  numberOfResults: any;
  totalPages: any;
  pageNumbers : any;
  startIdx: any;
  endIdx: any;
  RESULTS_PER_PAGE: number = 2
  SORT_PARAMETER: string = 'raw_revenue';
  endpoint: string = 'https://staging-v2.api.ikeora.releaf.ng';
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTdlNjEwYTlkYmEwOTBkMjVmY2Y5NGIiLCJlbWFpbCI6ImNvY29hQGNvY29hLmNvbSIsImV4cCI6MTUwMjE0MzAyNCwiaWF0IjoxNTAxOTcwMjI0fQ.q9OnlI1cH-Pf6-0-hgctPF4kNm_n6xIG-bmYsJ_Gn4s";
  pagedata: any;
  constructor(public events: Events, public http: Http, public storage: Storage) {
  }

  getCompanies(url: any): any {
    console.log(url);
    console.log("I am called")
    // var url = this.endpoint + '/companies/search?commodity='+query;
    // url += '&size=' + this.RESULTS_PER_PAGE + '&';
    // url += 'sort_by=' + this.SORT_PARAMETER + '&';
    // url += 'token='+this.token;
  }

}
