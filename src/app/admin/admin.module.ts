import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPages, AdminRoutingModule } from './admin.routing.module';

@NgModule({
    declarations: AdminPages,
    imports: [
        CommonModule,
        AdminRoutingModule,
    ],
})
export class AdminModule { }