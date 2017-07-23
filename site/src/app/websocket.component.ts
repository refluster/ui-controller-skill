import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService }       from './websocket.service';
import { Router } from '@angular/router';

@Component({
	providers: [WebsocketService],
	selector: 'websocket',
	template: '',
	styleUrls: [],
})

export class WebsocketComponent implements OnInit, OnDestroy {
	connection;

	constructor(private websocketService: WebsocketService,
				private router: Router ){}

	ngOnInit() {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('message').subscribe(data => {
			console.log(data);
			if (data['pageset'] != undefined) {
				let req = data['pageset']
				console.log('pageset called', req);
				this.router.navigateByUrl(req['page']);
			}
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

}
