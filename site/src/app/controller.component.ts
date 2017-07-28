import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'controller',
	templateUrl: './controller.component.html',
	styleUrls: ['./controller.component.css'],
})
export class ControllerComponent {
	url = 'http://52.198.86.179:8100/pageset';
	movieCtrlUrl = 'http://52.198.86.179:8100/movieset';
	devctrlUrl = 'http://52.198.86.179:8100/devctrl';
	linePushUrl = 'http://52.198.86.179:8100/linepush';

	constructor(private http: Http) { }

	private headers = new Headers({'Content-Type': 'application/json'});

	onClick(page): Promise<void> {
		return this.http.post(this.url, JSON.stringify({page: page}), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	movieCtrl(movie): Promise<void> {
		return this.http.post(this.movieCtrlUrl, JSON.stringify({movie: movie}), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	ctrlLight(ctrl): Promise<void> {
		return this.http.post(this.devctrlUrl, JSON.stringify({light: {cmd: ctrl, delay: 0}}),
							  {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	sendToLine(msg): Promise<void> {
		console.log(JSON.stringify({value1: msg}));
		console.log(this.linePushUrl);
		return this.http.post(this.linePushUrl, JSON.stringify({value1: msg}), {headers: this.headers})
			.toPromise()
			.then(() => {})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('an error occured', error);
		return Promise.reject(error.message || error);
	}
}
