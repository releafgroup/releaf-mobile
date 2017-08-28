
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasePage } from '../base-page';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';

@Component({
  templateUrl: 'verification.tpl.html'
})
export class VerificationPage extends BasePage {
  form: FormGroup;


  constructor(private nav: NavController,
              private fb: FormBuilder,
              protected alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              ) {
    super(alertCtrl);

    this.form = this.fb.group({
    });

  }



}
