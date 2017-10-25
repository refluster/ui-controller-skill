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

	push(data) {
		return this.http.post('https://api.push7.jp/api/v1/208062aac0394d13a3d454c445deb84d/send',
							  JSON.stringify(data),
							  {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	doorOpenTest() {
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				b = true;
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.devctrl({light2: {power: 'on'}});
			}
		}

		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}

	leavingHomeTest() {
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				b = true;
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.devctrl({light2: {power: 'off'}});
			}
		}

		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}

	windowNotify() {
		let data = {"title": "スマートHEMS",
					"body": "窓を閉め忘れていませんか？",
					"icon": "http://news.panasonic.com/jp/topics/items/NRR2015139937_1.png",
					"url": "http://push7.jp/",
					"apikey": "408b1365c3b94d98bc6dfe7cb54055e5"};
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				b = true;
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.push(data);
			}
		}
		
		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}

	pollenNotify() {
		let data = {"title": "スマートHEMS",
					"body": "今日は花粉が多いので早く閉めましょう。",
					"icon": "http://news.panasonic.com/jp/topics/items/NRR2015139937_1.png",
					"url": "http://push7.jp/",
					"apikey": "408b1365c3b94d98bc6dfe7cb54055e5"};
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				b = true;
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.push(data);
			}
		}
		
		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}

	airconOffNotify() {
		let data = {"title": "スマートHEMS",
					"body": "エアコン消し忘れていませんか？",
					"icon": "http://news.panasonic.com/jp/topics/items/NRR2015139937_1.png",
					"url": "http://push7.jp/",
					"apikey": "408b1365c3b94d98bc6dfe7cb54055e5"};
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				b = true;
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.push(data);
			}
		}
		
		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}

	deskNotify() {
		let data = {"title": "スマートHEMS",
					"body": "お子さんの机が開けられました。",
					"icon": "http://news.panasonic.com/jp/topics/items/NRR2015139937_1.png",
					"url": "http://push7.jp/",
					"apikey": "408b1365c3b94d98bc6dfe7cb54055e5"};
		var b = false;

		function handleMotion(e) {
			if (b === true) { return; }
			if (Math.abs(e.acceleration.x) > .5 ||
				Math.abs(e.acceleration.y) > .5 ||
				Math.abs(e.acceleration.z) > .5) {
				b = true;
				let el = (<HTMLElement>this._el.querySelector('#test-div'));
				window.removeEventListener("devicemotion", handleMotion.bind(this), true);
				this.push(data);
			}
		}
		
		window.addEventListener("devicemotion", handleMotion.bind(this), true);
	}
}
