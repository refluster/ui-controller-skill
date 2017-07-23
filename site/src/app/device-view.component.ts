import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService }       from './websocket.service';

@Component({
	providers: [WebsocketService],
	selector: 'device-view',
	templateUrl: 'device-view.component.html',
	styleUrls: ['./device-view.component.css'],
})

export class DeviceViewComponent implements OnInit, OnDestroy {
	connection;

	constructor(private websocketService: WebsocketService){}

	ngOnInit(): void {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('device-view').subscribe(data => {
			console.log(data);
			if (data['devctrl'] != undefined) {
				let req = data['devctrl']
				console.log('devctrl called', req);
			}
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}
}
