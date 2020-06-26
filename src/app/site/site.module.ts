import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SitePages, SiteRoutingModule } from './site.routing.module';
import { SafePipe } from 'src/app/shared/pipes/safe/safe.pipe';
import { HtmlOutletDirective } from '../shared/directives/dynamic-component/dynamic-component.directive';

@NgModule({
    declarations: [
        ...SitePages,
        SafePipe,
        HtmlOutletDirective
    ],
    imports: [
        CommonModule,
        SiteRoutingModule,
        NgxSpinnerModule,
    ],
})
export class SiteModule { }