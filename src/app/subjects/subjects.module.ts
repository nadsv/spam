import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubjectsService } from './subjects.service';
import { SubjectsComponent } from './subjects.component';


@NgModule ({
	declarations: [
		SubjectsComponent
	],
	imports: [
		CommonModule, 
		FormsModule
	],
	exports: [
		SubjectsComponent
	],
	providers: [
		SubjectsService
	]
	})
export class SubjectsModule {}