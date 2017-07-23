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
	private tv: {poweron: boolean; channel: number;} = {poweron: false, channel: 1};
	private recorder: {poweron: boolean;};

	constructor(private websocketService: WebsocketService,
				private http: Http){}

	ngOnInit(): void {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('device-view').subscribe(data => {
			console.log(data);
			data = data['devctrl'];
			if (data['tv'] != undefined) {
				if (data['tv']['poweron'] != undefined) {
					this.tv.poweron = data['tv']['poweron'];
				}
				if (data['tv']['poweron'] != undefined) {
					this.tv.channel = data['tv']['channel'];
				}
			}
		});
	}

	private handleError(error: any): Promise<any> {
		console.error('an error occured', error);
		return Promise.reject(error.message || error);
	}

	devctrl(data) {
		console.log('devctrl called --')
		console.log(data);
		return this.http.post(this.devctrlUrl, JSON.stringify(data), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}
}
