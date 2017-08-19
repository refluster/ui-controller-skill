import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'device-controller',
	templateUrl: 'device-controller.component.html',
	styleUrls: ['./device-controller.component.css'],
})

export class DeviceControllerComponent {
	private devctrlUrl = 'http://52.198.86.179:8100/devctrl';
	private headers = new Headers({'Content-Type': 'application/json'});
	private tvChannels = ['1ch','2ch','3ch','4ch','5ch','6ch','7ch','8ch','9ch','10ch','11ch','12ch','rec'];

	constructor(private http: Http){}

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
}
