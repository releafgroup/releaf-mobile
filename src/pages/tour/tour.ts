
import { Component } from '@angular/core';
import { Vibration } from 'ionic-native';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { BasePage } from '../base-page';
import { LoginModel } from '../../providers/login/login.model';
import { LoginService } from '../../providers/login/login.service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'tour.html'
})
export class TourPage extends BasePage {
  form: FormGroup;

  username: string = null;
  password: string = null;

  constructor(private platform: Platform,
              private nav: NavController,
              private loginService: LoginService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              private fb: FormBuilder,
              private toastCtrl: ToastController,
              ) {
    super(alertCtrl);
  }
  goToLogin(): void {
      this.nav.setRoot(LoginPage);
    }
  goToRegister(): void{
      this.nav.setRoot(RegisterPage);
  }
}
