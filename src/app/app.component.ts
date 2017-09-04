
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { TourPage } from '../pages/tour/tour';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
})
export class ReleafMobile {

  appPages: PageInterface[] = [
    {title: 'Home', component: HomePage, index: 1, icon: 'home'},
    {title: 'About', component: AboutPage, index: 2, icon: 'more'},
    {title: 'Logout', component: LoginPage, index: 3, icon: 'log-out'},
  ];

  rootPage: any = TourPage;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private platform: Platform, public push: Push, public alertCtrl: AlertController) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let db = new SQLite();
      db.openDatabase({
          name: "releaf_data.db",
          location: "default"
      }).then(() => {
          db.executeSql("create table IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, dt datetime default current_timestamp)", {}).then((data) => {
              console.log("TABLE users CREATED: ", data);
              db.executeSql("create table IF NOT EXISTS requests(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, dt datetime default current_timestamp)", {}).then((data) => {
                  console.log("TABLE requests CREATED: ", data);
              }, (error) => {
                    console.error("Unable to execute sql", error);
              })
          }, (error) => {
              console.error("Unable to execute sql", error);
          })
      }, (error) => {
          console.error("Unable to open database", error);
      });
        
      // https://github.com/apache/cordova-plugin-inappbrowser
      // The cordova.InAppBrowser.open() function is defined to be a drop-in replacement for the window.open()
      // function. Existing window.open() calls can use the InAppBrowser window, by replacing window.open:
      if ((<any>window).cordova && (<any>window).cordova.InAppBrowser) {
        window.open = (<any>window).cordova.InAppBrowser.open;
         window.addEventListener('native.keyboardshow', function(){
          document.body.classList.add('keyboard-open');
        });
      }
    });

    this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

// to initialize push notifications

const options: PushOptions = {
   android: {
       senderID: '514123126844',
       forceShow : true,
       vibrate: true,
       sound: true

   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
};

const pushObject: PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification: any) => {
   let alert = this.alertCtrl.create({
    title: 'Notification Recieved!',
    subTitle: notification.title,
    message: notification.text,
    buttons: ['Dismiss']
  });
  alert.present();
});

pushObject.on('registration').subscribe((registration: any) => {
  let alert = this.alertCtrl.create({
    title: 'Notification Registered!',
    message: registration.registrationId,
    buttons: ['Dismiss']
  });
  alert.present();
});

pushObject.on('error').subscribe(error => {
   let alert = this.alertCtrl.create({
    title: 'Notification Error!',
    message: "Push Error",
    buttons: ['Dismiss']
  });
  alert.present();
});

  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }
  }

  
}
