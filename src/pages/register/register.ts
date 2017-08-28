
import { Component } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { BasePage } from '../base-page';
import { LoginModel } from '../../providers/login/login.model';
import { LoginService } from '../../providers/login/login.service';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { IndexService } from '../../services/index.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'register.html'
})
export class RegisterPage extends BasePage {
  form: FormGroup;

  user: any = {
    company_name: null,
    email: null,
    password: null,
    password2: null,
    phone_number: null,
    products: null,
    position_in_chain: null,
    found_us_via: null,
    custom_found_us_via: null
  };
  value_chains: any = ['Inputs', 'Production', 'Processing', 'Wholesale', 'Retail', 'Services'];
  found_us_options: any = ['Friend told you', 'Article', 'Facebook', 'Twitter', 'Other'];
  selection = [];
  form_has_errors: boolean = false;

  constructor(private platform: Platform,
              private nav: NavController,
              private loginService: LoginService,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              private fb: FormBuilder,
              private indexService: IndexService,
              private storage: Storage
              ) {
    super(alertCtrl);

    this.form = this.fb.group({
      company_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      products: ['', [Validators.required]],
      position_in_chain: ['', [Validators.required]],
      found_us_via: ['', [Validators.required]]
    });
  }

  goToLogin(): void {
    this.nav.setRoot(LoginPage);
  }

  toggleSelection = function toggleSelection(value) {
    var idx = this.selection.indexOf(value);

    // Is currently selected
    if (idx > -1) {
      this.selection.splice(idx, 1);
    }

    // Is newly selected
    else {
      this.selection.push(value);
    }
  };

  register(user): void {
    if (user.password !== user.password2) {
      let alert = this.alertCtrl.create({
          title: 'Password Error!',
          subTitle: 'Passwords do not match!',
          buttons: ['OK']
        });
      alert.present();
      return ;
      }
    if (user.found_us_via === 'Other') {
       user.found_us_via = user.custom_found_us_via;
    }
    var payload = {
      company_name: user.company_name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      products: user.products,
      position_in_chain: this.selection.length ? this.selection.join() : null,
      found_us_via: user.found_us_via
    };

    for(var x in payload){
      console.log(payload[x]);
      if(!payload[x]){
        let alert = this.alertCtrl.create({
          title: 'Registration Error!',
          subTitle: 'All Field are required!',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
    }

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Creating your account...'
    });
    loading.present();
    this.indexService.register(payload).subscribe(
      httpResponse => {
        this.indexService.login(payload.email, payload.password).subscribe(
          response => {
            this.storage.set('token', response.data.token);
            this.storage.set('id', response.data.id);
            this.storage.set('name', response.data.name);
            this.storage.set('isBusinessOwner', true);
            this.nav.setRoot(HomePage);
            loading.dismiss();
          },
          error => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Request Not Completed',
              message: error.json().message,
              buttons: ['OK']
            });
            alert.present();
          }
        )
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Request Not Completed',
          message: error.json().message,
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }
 
}
