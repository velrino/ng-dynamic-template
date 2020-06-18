import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitePages, SiteRoutingModule } from './site.routing.module';

@NgModule({
    declarations: SitePages,
    imports: [
        CommonModule,
        SiteRoutingModule,
    ],
})
export class SiteModule { }