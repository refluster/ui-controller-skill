import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { Page3Component } from './page3.component';
import { Page4Component } from './page4.component';
import { ControllerComponent } from './controller.component';
import { DeviceViewComponent } from './device-view.component';

const routes: Routes = [
	{
		path: 'page1',
		component: Page1Component
	}, {
		path: 'page2',
		component: Page2Component
	}, {
		path: 'page3',
		component: Page3Component
	}, {
		path: 'page4',
		component: Page4Component
	}, {
		path: 'controller',
		component: ControllerComponent
	}, {
		path: 'device-view',
		component: DeviceViewComponent
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
