import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MailingModule } from './mailing/mailing.module';
import { AuthModule } from './auth/auth.module';
import { RoutingModule } from './app.routing';
import { AddressBookComponent } from './address-book/address-book.component';
import { SpamApiService } from './shared/spam-api.service';
import { LogsComponent } from './logs/logs.component';
import { SubjectsModule } from './subjects/subjects.module';
import { ShaduleModule } from './shadule/shadule.module';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    RoutingModule,
    MailingModule,
    AuthModule,
    SubjectsModule,
    ShaduleModule
  ],
  providers: [SpamApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
