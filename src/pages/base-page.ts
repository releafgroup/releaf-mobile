
import { AlertController } from 'ionic-angular';

export class BasePage {

  constructor(protected alertCtrl: AlertController) {
  }

  displayErrorAlert(): void {
    const prompt = this.alertCtrl.create({
      title: 'UrgentCare',
      message: 'Unknown error, please try again later',
      buttons: ['OK']
    });
    prompt.present();
  }
}
