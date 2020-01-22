import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ApiService} from "../services/api/api.service";
import {IS_NOT_CHANGE_LOCALE} from "../constants";

@Component({
    selector: 'app-quppy-sidebar',
    templateUrl: './quppy-sidebar.component.html',
    styleUrls: ['./quppy-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuppySidebarComponent implements OnInit {

    @Input() isChange: boolean;
    @Input() templateLang: string;
    @Input() sidenav: MatSidenav;

    @Output() qpSave: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() qpLocale: EventEmitter<any> = new EventEmitter<any>();

    locales: any[];

    constructor(private _api: ApiService) {
        this.locales = this._api.locales;
    }

    ngOnInit() {
    }

    getFile() {
        if(!this.isChange) {
            this._api.getFile();
            this.sidenav.close();
        }
    }

    getFiles() {
        if(!this.isChange) {
            const langs = this.locales.map(loc => loc.value);
            this._api.getFiles(langs);
            this.sidenav.close();
        }
    }

    save() {
        if(this.isChange) {
            this._api.saveJson();
            this.qpSave.emit();
            this.sidenav.close();
        }
    }

}
