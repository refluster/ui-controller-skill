import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from './viewer.component';
import { ControllerComponent } from './controller.component';
import { DeviceViewComponent } from './device-view.component';
import { DeviceControllerComponent } from './device-controller.component';
import { HemsTestComponent } from './hems-test.component';

const routes: Routes = [
	{
		path: 'viewer',
		component: ViewerComponent
	}, {
		path: 'controller',
		component: ControllerComponent
	}, {
		path: 'device-view',
		component: DeviceViewComponent
	}, {
		path: 'device-controller',
		component: DeviceControllerComponent
	}, {
		path: 'hems-test',
		component: HemsTestComponent
	}, {
		path: '',
		redirectTo: '/viewer',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
