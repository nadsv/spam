import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from '../mailing/filters/filters.component';
import { EditorComponent } from '../mailing/editor/editor.component';
import { LettersComponent } from '../mailing/letters/letters.component';
import { MailingComponent } from './mailing.component';
import { MailingService } from './mailing.service';


@NgModule ({
	declarations: [
		FiltersComponent,
		EditorComponent,
		LettersComponent,
		MailingComponent
	],
	imports: [
		CommonModule
	],
	exports: [
	    MailingComponent
	],
	providers: [
		MailingService
	]
	})
export class MailingModule {}