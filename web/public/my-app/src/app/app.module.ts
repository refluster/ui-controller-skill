import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';
//import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		DashboardComponent
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
