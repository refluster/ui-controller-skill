import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { HeroService } from './hero.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		Page1Component,
		Page2Component
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
	],
	providers: [
		HeroService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
