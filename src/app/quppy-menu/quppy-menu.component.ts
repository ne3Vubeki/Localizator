import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ApiService} from "../services/api/api.service";

@Component({
    selector: 'app-quppy-menu',
    templateUrl: './quppy-menu.component.html',
    styleUrls: ['./quppy-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuppyMenuComponent implements OnInit {

    @Input() isChange: boolean;
    @Input() sidenav: MatSidenav;
    @Input() templateLang: string;
    @Input() loader: boolean;
    @Input() value: string;

    locales: Array<any>;

    @Output() qpLocale:EventEmitter<any> = new EventEmitter<any>();
    @Output() qpSave:EventEmitter<any> = new EventEmitter<any>();

    constructor(private _api: ApiService) {
        this.locales = this._api.locales;
    }

    ngOnInit() {
    }

    getLocale(key: string) {
        return this.locales.find(loc => loc.value === key);
    }

    save() {
        this._api.saveJson();
        this.qpSave.emit();
        this.sidenav.close();
    }


}
