
import { Component } from '@angular/core';
import { Vibration } from 'ionic-native';
import { LoadingController, AlertController, ModalController, NavController, Platform, NavParams } from 'ionic-angular';
import { BasePage } from '../base-page';
import { LoginModel } from '../../providers/login/login.model';
import { LoginService } from '../../providers/login/login.service';
import { BusinessOwnerService } from '../../providers/business_owner/business_owner.service';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { VerificationPage } from '../verification/verification';

@Component({
  templateUrl: 'searchresult.html'
})
export class SearchResult extends BasePage {

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
  RESULTS_PER_PAGE: number = 10;
  SORT_PARAMETER: string = 'raw_revenue';
  endpoint: string = 'https://staging-v2.api.ikeora.releaf.ng';
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTdlNjEwYTlkYmEwOTBkMjVmY2Y5NGIiLCJlbWFpbCI6ImNvY29hQGNvY29hLmNvbSIsImV4cCI6MTUwMjM3OTg0NSwiaWF0IjoxNTAyMjA3MDQ1fQ.SeP7YivbuOu8Ja9bUhOQl6HJMnMY3mc-PjmJxLlAqFI";
  pagedata: string;
  is_business_verified: string;
  _id: string = "597e610a9dba090d25fcf94b";
  ionViewWillEnter() {
    this.tryGetCompanies();
  }

  constructor(private platform: Platform,
              private nav: NavController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public navParams: NavParams,
              public http: Http, 
              public storage: Storage,
              ) {
    super(alertCtrl);
    this.query = navParams.get("param");
    // $analytics.eventTrack('Search', { label: angular.toJson(this.query) })
  }

   formatDisplay (page, result, size): void {
            if(result.length === 1 && page === 1) {
                this.singleResult = true;
                this.startIdx = 1;
            } else if(page === 1) {
                this.startIdx = 1;
                this.endIdx = result.length;
                this.singleResult = false;
            } else {
                this.singleResult = false;
                this.startIdx = ((page * size) - size) + 1;
                this.endIdx = ((page * size) - size) + result.length;
            }
        }
    
    requestToSell(commodity): any {
      
      this.storage.get('id').then((val) => {
              this.storage.get('token').then((token) => {

                var model= {commodity: commodity._id, seller: val};
        let headers = new Headers(
        {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-access-token': token,
        });

        let body = `commodity=${model.commodity}&seller=${model.seller}`;
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.endpoint+'/sales/requests', body, options)
        .toPromise()
        .then(data => {
          commodity.disabled = true;
          let alert = this.alertCtrl.create({
          title: 'Thank You!',
          subTitle: 'Request Submitted Successfully,Thanks !',
          buttons: ['OK']
        });
        alert.present();
        }).catch(error => {
          
        });

      });
              })
        
      // if(this.is_business_verified){
      // commodity.disabled = true;
      // }else{
      //     this.nav.push(VerificationPage);
      // }
    }

    setSentContrats(id: string){
      // this.storage.set('LoggedIn', true);
      var loggedInUserId ;
      var storageObject ;

      this.storage.get('id').then((val) => {
        loggedInUserId = val;
          this.storage.get('sentContracts').then((val) => {
            storageObject = val ? val : {};
            if(typeof storageObject[loggedInUserId] === 'undefined'){
                storageObject[loggedInUserId] = [];
              }
              storageObject[loggedInUserId].push({id: id, date: new Date()});
              this.storage.set('sentContracts', storageObject);
          });
      });
      
    }


    getSentContractsById (id: string, callback: any){
      var loggedInUserId ;
      var array
      this.storage.get('id').then((val) => {
        loggedInUserId = val;
        this.storage.get('sentContracts').then((val) => {
            array = val[loggedInUserId];
            if(array) {
              for (var i = 0; i < array.length; i++) {
                if(typeof array[i] === 'object'){
                  if(array[i].id === id){
                    callback(array[i]);
                    return ;
                  }
                }
              }
            }
          });
      });
      

    }

    extractDate(dateString:any){
      var x = new Date(dateString);
      return x.getDay() + '/' + (x.getMonth() + 1) + '/' + x.getFullYear();
    }

    getSentContractsCountByDate (date:any, callback: any){
      var loggedInUserId ;
      var array ;
       this.storage.get('id').then((val) => {
        loggedInUserId = val;
        if(!date){
          date = new Date();
        }
        this.storage.get('sentContracts').then((val) => {
            array = val[loggedInUserId];
            var counter = 0;
      if(array) {
        for (var i = 0; i < array.length; i++) {
          if(typeof array[i] === 'object'){
            if(this.extractDate(array[i].date) === this.extractDate(date)){
              counter++
            }
          }
        }

      }
      callback(counter);
        })
       })
    }

    getSentContractsByDate (date: any, callback: any){
      var loggedInUserId ;
      var array ;
       this.storage.get('id').then((val) => {
        loggedInUserId = val;
        if(!date){
          date = new Date();
        }
        this.storage.get('sentContracts').then((val) => {
            array = val[loggedInUserId];
            if(array) {
            for (var i = 0; i < array.length; i++) {
              if(typeof array[i] === 'object'){
                if(array[i].date === date){
                  callback(array[i]);
                  return ;
                }
              }
            }
          }
        })
       })
    }

    tryGetCompanies(): any {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.checkBusinessStatus();
      this.storage.get('token').then((token) => {
      var url = this.endpoint + '/companies/search?commodity='+this.query;
      url += '&size=' + this.RESULTS_PER_PAGE + '&';
      url += 'sort_by=' + this.SORT_PARAMETER + '&';
      url += 'token='+token;
      this.http.get(url).toPromise().then(response => {
      this.pagedata = response.json().data.result ? response.json().data.result : [];
      loader.dismiss();
        // this.results = response.data.result;
        //   this.page = response.data.data.page;
        //   this.size = response.data.data.size;
        //   this.numberOfResults = response.data.data.total;
        //   this.totalPages = Math.ceil(this.numberOfResults / RESULTS_PER_PAGE);
        //   this.pageNumbers = [];
        //   for (var i = 0; i < this.totalPages; i++) {
        //     this.pageNumbers.push(i + 1);
        //   }
        //   this.formatDisplay(this.page, this.results, this.size);
      })
      })
    }
    
    checkBusinessStatus(): any {
      this.storage.get('id').then((var_id) => {
      var url = this.endpoint + '/businesses/verify/'+var_id;
      this.http.get(url).toPromise().then(response => {
      this.is_business_verified = response.json().data.verified ? response.json().data.verified : false;
      })
      })
    }
    
    submitSalesRequest(id): any {
      this.storage.get('id').then((var_id) => {
        var model = {commodity: id, seller: var_id};
        let headers = new Headers(
        {
          'Content-Type' : 'application/x-www-form-urlencoded',
        });
        let body = `commodity=${model.commodity}&seller=${model.seller}`;
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.endpoint + '/sales/requests', body, options)
        .toPromise()
        .then(response => {
        var data = response.json().data;
        if(data){
          this.showSuccessAlert();
        }
        })
      })
      
    }
    
    showSuccessAlert() {
      let alert = this.alertCtrl.create({
        title: 'Thank You!',
        subTitle: 'Your request has been submitted successfully!',
        buttons: ['OK']
      });
      alert.present();
    }
}
