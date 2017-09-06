import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule
  ],
  providers: [
  	AuthService, AuthGuard
  ]
})
export class AuthModule {}
