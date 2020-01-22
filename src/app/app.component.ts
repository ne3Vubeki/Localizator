import {Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ApiService} from "./services/api/api.service";
import {IS_NOT_CHANGE_LOCALE} from "./constants";
import {each, isObject} from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {QuppyLoginComponent} from "./quppy-login/quppy-login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  title = 'QuppyLocale';
  templateLang: string;
  isChange: boolean;
  itemsSrc: any;
  itemTemp: any;
  originJson: any;
  isAuth: boolean;
  isLoad: boolean = false;
  locale: string;

  constructor(private _api: ApiService,
              private _dialog: MatDialog) {
    this.templateLang = 'ru';
  }

  ngOnInit() {
    this._api.authState
        .subscribe(status => {
          this.isAuth = status;
          if(!this.isAuth) {
            this.openDialog()
          } else {
            this.init();
          }
        });
  }

  init() {
    this.isLoad = true;
    this._api.getJsonForTemplate(this.templateLang)
        .then(res => {
          this.itemTemp = res;
          this.itemsSrc = this.parseSrcToArray(res);
          this.isLoad = false;
        });
  }

  changeTemplate(lang) {
    this.templateLang = lang;
    this.isLoad = true;
    this._api.getJsonForTemplate(this.templateLang)
        .then(res => {
          this.itemTemp = res;
          this.itemsSrc = this.parseSrcToArray(res);
          this.isLoad = false;
        });
  }

  loadLocale(locale) {
    this.isLoad = true;
    this.locale = locale;
    this._api.getJsonForEdit(locale)
        .then(res => {
          this.originJson = res;
          this.itemsSrc = this.parseDistToSrc(this.itemsSrc, res);
          this.isChange = IS_NOT_CHANGE_LOCALE;
          this.isLoad = false;
        });
  }

  saveLocale() {
    if(this._api.langTypeTemp === this._api.langTypeEdit) {
      this.itemTemp = this.originJson;
      this.itemsSrc = this.parseSrcToArray(this.originJson);
    }
    this.itemsSrc = this.parseDistToSrc(this.itemsSrc, this.originJson);
    this.isChange = IS_NOT_CHANGE_LOCALE;
  }

  parseSrcToArray(json) {
    const items: Array<any> = [];
    each(json, (item, key) => {
      if (!isObject(item)) {
        items.push({
          key: key,
          value: item
        });
      } else {
        items.push({
          key: key,
          children: this.parseSrcToArray(item)
        });
      }
    });
    return items;
  }

  parseDistToSrc(arr, json) {
    if (arr.length) {
      arr.map(item => {
        if (item.children) {
          this.parseDistToSrc(item.children, json[item.key]);
        } else {
          item.dist = json[item.key];
          delete item.origin;
        }
      });
    }
    return arr;
  }


  openDialog(): void {
    const dialogRef = this._dialog.open(QuppyLoginComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

}
