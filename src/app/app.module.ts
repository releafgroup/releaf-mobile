import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ReleafMobile } from './app.component';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SearchResult } from '../pages/searchresult/searchresult';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';
import { VerificationPage } from '../pages/verification/verification';

import { IndexService } from '../services/index.service';
import { SearchResultService } from '../providers/searchresult/searchresult.service';

import { LoginService } from '../providers/login/login.service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ca21e3cf',
  },
  'push': {
    'sender_id': '514123126844',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    ReleafMobile,
    AboutPage,
    LoginPage,
    RegisterPage,
    HomePage,
    TourPage,
    VerificationPage,
    SearchResult
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(ReleafMobile),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ReleafMobile,
    AboutPage,
    LoginPage,
    RegisterPage,
    HomePage,
    TourPage,
    VerificationPage,
    SearchResult
  ],
  providers: [ LoginService, SearchResultService, IndexService, Push],
})
export class AppModule {
}
