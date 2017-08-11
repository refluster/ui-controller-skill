import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { WebsocketService }       from './websocket.service';

@Component({
	providers: [WebsocketService],
	selector: 'device-view',
	templateUrl: 'device-view.component.html',
	styleUrls: ['./device-view.component.css'],
})

export class DeviceViewComponent implements OnInit, OnDestroy {
	private devctrlUrl = 'http://52.198.86.179:8100/devctrl';
	private headers = new Headers({'Content-Type': 'application/json'});
	private connection;
	private tv: {power: string; channel: string;} = {power: 'off', channel: '1'};
	private recorder: {power: string; mode: string;} = {power: 'off', mode: 'list'};

	constructor(private websocketService: WebsocketService,
				private http: Http){}

	ngOnInit(): void {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('device-view').subscribe(data => {
			console.log(data);
			data = data['devctrl'];
			if (data['tv'] != undefined) {
				if (data['tv']['power'] != undefined) {
					this.tv.power = data['tv']['power'];
				}
				if (data['tv']['channel'] != undefined) {
					this.tv.channel = data['tv']['channel'];
				}
			}
			if (data['recorder'] != undefined) {
				if (data['recorder']['power'] != undefined) {
					this.recorder.power = data['recorder']['power'];
				}
				if (data['recorder']['mode'] != undefined) {
					this.recorder.mode = data['recorder']['mode'];
				}
			}
		});
	}

	private handleError(error: any): Promise<any> {
		console.error('an error occured', error);
		return Promise.reject(error.message || error);
	}

	devctrl(data) {
		return this.http.post(this.devctrlUrl, JSON.stringify(data), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}
}
