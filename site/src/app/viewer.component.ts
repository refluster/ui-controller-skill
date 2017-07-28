import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { WebsocketService }       from './websocket.service';

@Component({
	providers: [WebsocketService],
	selector: 'viewer',
	templateUrl: 'viewer.component.html',
	styleUrls: ['./viewer.component.css'],
})

export class ViewerComponent implements OnInit {
	private _el: HTMLElement;
	private dispVideoBorder: boolean = false;
	private connection;

	constructor(private websocketService: WebsocketService, el: ElementRef) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('message').subscribe(data => {
			console.log(data);
			if (data['movieset'] != undefined) {
				let req = data['movieset']
				console.log('movieset called', req);
				this.movieSet(+req['movie']);
			}
		});
		this.movieSet(1);
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	adjustPosition() {
		let bb = this._el.getElementsByTagName('video')[0].getBoundingClientRect();
		let cx = (bb.left + bb.right)/2;
		scroll(cx - innerWidth/2, bb.top);
	}

	toggleDisplayVideoBorder() {
		let video = this._el.getElementsByTagName('video')[0];
		if (this.dispVideoBorder) {
			video.style.border = '';
		} else {
			video.style.border = '1px solid red';
		}
		this.dispVideoBorder = !this.dispVideoBorder
	}

	movieSet(number: number) {
		console.log(number);
		let m = this._el.getElementsByClassName('movie');
		for (let i = 0; i < m.length; i++) {
			(<HTMLElement>m[i]).style.display = 'none';
		}
		(<HTMLElement>m[number - 1]).style.display = 'block';
	}
}
