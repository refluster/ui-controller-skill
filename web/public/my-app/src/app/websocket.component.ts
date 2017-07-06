import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService }       from './websocket.service';

@Component({
	providers: [WebsocketService],
	selector: 'websocket',
	template: '<div>websocket.component</div><button (click)="onClick()">hoge</button>',
	styleUrls: [],
})
export class WebsocketComponent implements OnInit, OnDestroy {
	connection;
	data;

	constructor( private websocketService: WebsocketService ){}

	onClick(){
		this.websocketService.emit('on_name', this.data);
		this.data = '';
	}

	ngOnInit() {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('emit_name').subscribe(data => {
			this.data = data;
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

}
