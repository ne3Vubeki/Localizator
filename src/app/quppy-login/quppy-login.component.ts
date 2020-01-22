import {
    Component,
    Inject,
} from '@angular/core';
import {ApiService} from "../services/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
    selector: 'app-quppy-login',
    templateUrl: './quppy-login.component.html',
    styleUrls: ['./quppy-login.component.scss']
})
export class QuppyLoginComponent {

    private email: string;
    private password: string;
    private error: any;
    private hide: boolean = true;
    private options: FormGroup;


    constructor(
        private fb: FormBuilder,
        private _api: ApiService,
        private _dialogRef: MatDialogRef<QuppyLoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.options = this.fb.group({
            email: '',
            password: '',
        });
    }

    login(): void {
        delete this.error;
        this._api.login(this.options.value.email, this.options.value.password)
            .then(res => {
                this._dialogRef.close()
            })
            .catch(err => {
                console.log('Login:', err);
                this.error = err;
            });
    }

}
