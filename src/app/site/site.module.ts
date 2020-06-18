import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SitePages, SiteRoutingModule } from './site.routing.module';
import { SafePipe } from 'src/app/shared/pipes/safe/safe.pipe';

@NgModule({
    declarations: [
        ...SitePages,
        SafePipe
    ],
    imports: [
        CommonModule,
        SiteRoutingModule,
        NgxSpinnerModule
    ],
})
export class SiteModule { }