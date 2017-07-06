import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
	{
		path: 'page1',
		component: Page1Component
	}, {
		path: 'page2',
		component: Page2Component
	}, {
		path: 'detail/:id',
		component: HeroDetailComponent
	}, {
		path: '',
		redirectTo: '/page1',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
