import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteCampaignPage } from './pages/campaign/campaign.page';
import { SiteSidebarComponent } from '../site/shared/components/sidebar/sidebar.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'c/:campaign', component: SiteCampaignPage },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const SitePages = [
    SiteSidebarComponent,
    SiteCampaignPage
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }