import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuppyTreeComponent} from './quppy-tree/quppy-tree.component';
import {HttpClientModule} from '@angular/common/http';
import { QuppyMenuComponent } from './quppy-menu/quppy-menu.component';
import {MaterialModule} from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {ApiService} from "./services/api/api.service";
import {QuppySidebarComponent} from "./quppy-sidebar/quppy-sidebar.component";
import {QuppyLoginComponent} from "./quppy-login/quppy-login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FIREBASE_CONFIG} from "./constants";

@NgModule({
    declarations: [
        AppComponent,
        QuppyTreeComponent,
        QuppyMenuComponent,
        QuppySidebarComponent,
        QuppyLoginComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireStorageModule,
        AngularFireAuthModule,
        ReactiveFormsModule
    ],
    entryComponents: [
      QuppyLoginComponent
    ],
    providers: [
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
