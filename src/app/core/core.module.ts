import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { RoutingModule } from '../app.routing';

@NgModule ({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PageNotFoundComponent],
	imports: [
		CommonModule,
		RoutingModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		PageNotFoundComponent
	],
	providers: [
	]
	})
export class CoreModule {}