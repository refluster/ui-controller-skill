import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()

export class WebsocketService {
	private url = 'http://52.198.86.179:8100';
	//private url = 'http://localhost:8100';
	private socket;

	constructor(){}

	connect(queryString: string) {
		this.socket = io(this.url, {query: queryString});
	}

	emit(emitName: string, data?) {
		this.socket.emit(emitName, data);
	}

	on(onName: string){
		let observable = new Observable(observer => {
			this.socket.on(onName, (data) => {
				observer.next(data);
			});
			return () => {this.socket.disconnect();};
		});
		return observable;
	}
}
