import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'controller',
	templateUrl: './controller.component.html',
	styleUrls: ['./controller.component.css'],
})
export class ControllerComponent {
	url = 'http://localhost:8100/test1';
	pages = ['page1', 'page2']

	constructor(private http: Http) { }

	private headers = new Headers({'Content-Type': 'application/json'});

	onClick(): Promise<void> {
		return this.http.post(this.url, JSON.stringify({page: 'page1'}), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('an error occured', error);
		return Promise.reject(error.message || error);
	}
}
