import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SitePages, SiteRoutingModule } from './site.routing.module';
import { SafePipe } from 'src/app/shared/pipes/safe/safe.pipe';
import { DynamicTemplateDirective } from '../shared/directives/dynamic-component/dynamic-component.directive';

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
    ],
})
export class SiteModule { }