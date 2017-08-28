import { Component } from '@angular/core';
import { Vibration } from 'ionic-native';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { SearchResult } from '../searchresult/searchresult';
import { BasePage } from '../base-page';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component({
  templateUrl: 'home.tpl.html'
})
export class HomePage extends BasePage {

 

  localized: boolean = false;
  departure: string = null;
  destination: string = null;
  latitude: any;
  longitude: any;
  categories: any;
  sample: string;
  constructor(private platform: Platform,
              private nav: NavController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              ) {
    super(alertCtrl);
     this.categories = [
      {title: 'Meat, Poultry and Fish', image: 'poultry.jpg', tag: 'General Meat,Fish,Pork,Poultry,'},
      {title: 'Oils',image: 'oils.jpg', tag: 'Oil Seed,Palm Oil,Vegatable Oils,'},
      {title: 'Vegetables', image: 'vegetable.jpg', tag: 'General Vegetables,Ginger,Spices,'},
      {title: 'Legumes', image: 'legumes.jpg', tag: 'General Legaumes, Soybean,'},
      {title: 'Fruits', image: 'fruits.jpg', tag: 'General Fruits,Palm Fruit,Pawpaw,Plaintain,'},
      {title: 'Agri-Business', image: 'agribusiness.jpg', tag: 'Agribusiness Machinery,Agribusiness Development Services,Agribusiness Pesticides,'},
      {title: 'Cereals and Grains', image: 'cereals.jpg', tag: 'General Cereals Crops,Barley,Cotton,Maize,Rice,Sesame Seed,Sorghum,'},
      {title: 'Beverages', image: 'beverage.jpg', tag: 'General Beverages,Alcoholic Beverages,Coffee,Milk,Juices,Malt,Soft Drinks,Water,Wine,'},
      {title: 'Roots and Tubers', image: 'tubers.jpg', tag: 'Cassava,Ginger,'}
    ];
  }



  startSearch(param) {
    this.nav.push(SearchResult, {
      param: param,
    })
  }

  /***
   * This event is fired when map has fully loaded
   */

  /***
   * This event is fired when the map becomes idle after panning or zooming.
   */

  /***
   * This event is fired when the user starts dragging the map.
   */




}
