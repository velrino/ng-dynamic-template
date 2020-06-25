import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteCampaignPage } from './pages/campaign/campaign.page';

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
    SiteCampaignPage,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }