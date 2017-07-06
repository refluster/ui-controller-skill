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

	onClick(){
	}

	ngOnInit() {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('pageset').subscribe(data => {
			console.log('pageset called', data);
			this.router.navigateByUrl(data['page']);
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

}
