import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
import { AdminFooterComponent } from './components/footer/footer.component';
import { AdminNavbarComponent } from './components/navbar/navbar.component';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';

// Pages
import { AdminHomePage } from './pages/home/home.page';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: AdminHomePage },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const AdminComponents = [
    AdminComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
]

export const AdminPages = [
    ...AdminComponents,
    AdminHomePage,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }