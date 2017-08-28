
import { Component } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { BasePage } from '../base-page';
import { LoginModel } from '../../providers/login/login.model';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexService } from '../../services/index.service';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import {SQLite} from "ionic-native";

@Component({
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {
  form: FormGroup;

  username: string = null;
  password: string = null;

  public database: SQLite;
  public users: Array<Object>;
  constructor(private platform: Platform,
              private nav: NavController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              private fb: FormBuilder,
              private indexService: IndexService,
              private storage: Storage
              ) {
    
    super(alertCtrl);
    this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "releaf_data.db", location: "default"}).then(() => {
                this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  goToRegister(): void {
    this.nav.setRoot(RegisterPage);
  }


  public refresh() {
        this.database.executeSql("SELECT * FROM users", []).then((data) => {
            this.users = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.users.push({id: data.rows.item(i).id, user_id: data.rows.item(i).user_id, dt: data.rows.item(i).dt});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

    public addUserToDb(user_id) {
      var query = "INSERT INTO users (user_id) VALUES ('"+user_id+"')"
        this.database.executeSql(query, []).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    }
  onConfirm(model: LoginModel, isValid: boolean): void {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Verifying, Please Wait...'
    });
    loading.present();

    
    this.indexService.login(model.username, model.password).subscribe(
      httpResponse => {
        this.storage.set('token', httpResponse.data.token);
        this.storage.set('id', httpResponse.data.id);
        this.storage.set('name', httpResponse.data.name);
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
        console.log("error", error.json());
      }
    )
  }
}
