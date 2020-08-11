import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { SitePages, SiteRoutingModule } from './site.routing.module';
import { SafePipe } from '../shared/pipes/safe/safe.pipe';
import { DynamicTemplateDirective } from '../shared/directives/dynamic-component/dynamic-component.directive';
import { FirebaseDatabaseService } from '../shared/services/firebase/firebase.service';

@NgModule({
    declarations: [
        ...SitePages,
        SafePipe,
        DynamicTemplateDirective
    ],
    imports: [
        CommonModule,
        SiteRoutingModule,
        NgxSpinnerModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyByg291xSzOefpyMhOdYOshzF2g17saQjw",
            authDomain: "itau-4aeae.firebaseapp.com",
            databaseURL: "https://itau-4aeae.firebaseio.com",
            projectId: "itau-4aeae",
            storageBucket: "itau-4aeae.appspot.com",
            messagingSenderId: "1060157719005",
            appId: "1:1060157719005:web:29848fc2b2572a6d07b634"
        }, 'itau'),
        AngularFireDatabaseModule,
        MonacoEditorModule.forRoot(),
        DragDropModule,
        NgbModule,
        FormsModule
    ],
    providers: [
        FirebaseDatabaseService
    ]
})
export class SiteModule { }