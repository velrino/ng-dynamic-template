import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site.component';
import { SiteHomePage } from './pages/home/home.page';

const routes: Routes = [
    {
        path: '',
        component: SiteComponent,
        children: [
            { path: 'home', component: SiteHomePage },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const SitePages = [
    SiteComponent,
    SiteHomePage,
];

export const SiteBootstrap = [
    SiteComponent,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }