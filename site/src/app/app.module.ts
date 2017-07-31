import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer.component';
import { WebsocketComponent } from './websocket.component';
import { ControllerComponent } from './controller.component';
import { DeviceViewComponent } from './device-view.component';
import { WebsocketService } from './websocket.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		ViewerComponent,
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
