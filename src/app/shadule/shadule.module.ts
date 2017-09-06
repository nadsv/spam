import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShaduleComponent } from './shadule.component';
import { ShaduleService } from './shadule.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ShaduleComponent],
  providers: [
		ShaduleService
	]
})
export class ShaduleModule { }
