import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailingComponent } from './mailing/mailing.component';
import { PageNotFoundComponent } from './core/pagenotfound/pagenotfound.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { LogsComponent } from './logs/logs.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { LoginComponent } from './auth/login/login.component';
import { ShaduleComponent } from './shadule/shadule.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
	{path: '', component: LoginComponent},
    {path: 'mailing', component: MailingComponent, canActivate: [AuthGuard]},
    {path: 'addressbook', component: AddressBookComponent, canActivate: [AuthGuard]},
    {path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard]},
    {path: 'logs', component: LogsComponent, canActivate: [AuthGuard]},
    {path: 'shadule', component: ShaduleComponent, canActivate: [AuthGuard]},
    {path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes);