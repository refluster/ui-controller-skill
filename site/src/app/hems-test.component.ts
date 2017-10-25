import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'hems-test',
	templateUrl: 'hems-test.component.html',
	styleUrls: ['./hems-test.component.css'],
})

export class HemsTestComponent {
	private _el: HTMLElement;
	private devctrlUrl = 'http://52.198.86.179:8100/devctrl';
	private headers = new Headers({'Content-Type': 'application/json'});
	private tvChannels = ['1ch','2ch','3ch','4ch','5ch','6ch','7ch','8ch','9ch','10ch','11ch','12ch','rec'];

	constructor(private http: Http, el: ElementRef) {
		this._el = el.nativeElement;
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

	test() {
		function handleMotion(e) {
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.devctrl({light2: {power: 'on'}});
			}
		}

		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}
}
