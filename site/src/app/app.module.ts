import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
import { Page3Component } from './page3.component';
import { Page4Component } from './page4.component';
import { WebsocketComponent } from './websocket.component';
import { ControllerComponent } from './controller.component';
import { DeviceViewComponent } from './device-view.component';
import { WebsocketService } from './websocket.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		Page1Component,
		Page2Component,
		Page3Component,
		Page4Component,
		WebsocketComponent,
		ControllerComponent,
		DeviceViewComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
	],
	providers: [
		WebsocketService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
