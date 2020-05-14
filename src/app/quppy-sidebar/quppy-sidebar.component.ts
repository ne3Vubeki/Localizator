import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ApiService} from "../services/api/api.service";
import {STORAGE_REFS} from "../constants";

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
    @Output() qpFolder: EventEmitter<any> = new EventEmitter<any>();

    locales: any[];
    folders: any[];
    folder: any;

    constructor(private _api: ApiService) {
        this.locales = this._api.locales;
        this.folders = STORAGE_REFS;
        this.folder = this.folders[0];
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

    changeFolder(folder) {
        this.folder = folder;
        this._api.setPath(folder.ref);
        this.qpFolder.emit(folder);
    }

}
