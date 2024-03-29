import {EventEmitter, Injectable} from "@angular/core";
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApiService {

    public locales: any[];
    public isAuth: boolean;
    public langTypeTemp: string;
    public langTypeEdit: string;
    public user: any;

    private langTempJson: any;
    private langEditJson: any;
    private _path: string = '';

    constructor(private _storage: AngularFireStorage,
                private _http: HttpClient,
                private _auth: AngularFireAuth) {
        this._auth.user.subscribe(res => {
            this.isAuth = !!res
            this.authState.emit(this.isAuth);
            if (!!res) {
                this.user = res;
            } else {
                delete this.user;
            }
        });
        this.locales = 'Русский.ru,Английский.en,Немецкий.de,Французкий.fr,Испанский.es,Итальянский.it,Португальский.pt,Турецкий.tr,Эстонский.et,Японский.ja,Корейский.ko,Китайский.zh'.split(',').map(loc => {
            const locale = loc.split('.');
            return {
                title: locale[0],
                value: locale[1]
            };
        });
    }

    authState: EventEmitter<any> = new EventEmitter<any>();

    login(email, pass) {
        return this._auth.auth.signInWithEmailAndPassword(email, pass);
    }

    logout() {
        this._auth.auth.signOut();
    }

    setPath(path) {
        this._path = path;
    }

    getPath() {
        return this._path;
    }

    private async getJson(type: string = 'ru') {
        const ref = this._storage.ref(this._path + type + '.json');
        const url = await ref.getDownloadURL().toPromise();
        return this._http.get(url).toPromise();
    }

    private setJson(type: string = 'ru', json: any) {
        const ref = this._storage.ref(this._path + type + '.json');
        const jsonStr = JSON.stringify(json, null, '\t').replace('\n', '');
        ref.putString(jsonStr);
    }

    async download(type: string = 'ru') {
        const ref = this._storage.ref(this._path + type + '.json');
        const url = await ref.getDownloadURL().toPromise();
        await this._http.get(url, {responseType: 'blob' as 'json'})
            .subscribe((response: any) => {
                    let dataType = response.type;
                    let binaryData = [];
                    let downloadLink = document.createElement('a');
                    console.log(response);
                    binaryData.push(response);
                    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                    downloadLink.setAttribute('download', type + '.json');
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    downloadLink.parentNode.removeChild(downloadLink);
                }
            )
    }

    getLangTemplate(type): string {
        return this.langTypeTemp;
    }

    getLangEdit(type): string {
        return this.langTypeEdit;
    }

    async getJsonForTemplate(type): Promise<any> {
        this.langTypeTemp = type;
        this.langTempJson = await this.getJson(type);
        return this.langTempJson;
    }

    async getJsonForEdit(type): Promise<any> {
        this.langTypeEdit = type;
        this.langEditJson = await this.getJson(type);
        return this.langEditJson;
    }

    getFile() {
        this.download(this.langTypeEdit);
    }

    getFiles(langs) {
        langs.map(async (lang) => await this.download(lang));
    }

    saveJson() {
        this.setJson(this.langTypeEdit, this.langEditJson);
    }
}

