import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site.component';
import { SiteDynamicPage } from './pages/dynamic/dynamic.page';
import { SiteSidebarComponent } from '../site/shared/components/sidebar/sidebar.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SiteComponent },
            { path: ':campaign', component: SiteDynamicPage },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const SitePages = [
    SiteComponent,
    SiteSidebarComponent,
    SiteDynamicPage
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }