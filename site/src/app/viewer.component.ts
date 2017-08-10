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
	private countdownTimer;
	private clock_str = '';
	private currentMovieNumber: number;
	private month: string;
	private day: string;
	private week: string;

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
		this.currentMovieNumber = 2;
		this.movieSet(1);

		let weekName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
		let date = new Date();
		this.month = toStr(date.getMonth() + 1, 2);
		this.day = toStr(date.getDate(), 2);
		this.week = weekName[date.getDay()];
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	adjustPosition() {
		let bb = (<HTMLElement>this._el.querySelector('#content')).getBoundingClientRect();
		let cx = (bb.left + bb.right)/2;
		scroll(cx - innerWidth/2, bb.top);
	}

	toggleDisplayVideoBorder() {
		let content = <HTMLElement>this._el.querySelector('#content');
		content.classList.toggle('border');
	}

	toggleFlip() {
		let content = <HTMLElement>this._el.querySelector('#content');
		content.classList.toggle('flip');
	}

	movieChange(number: number) {
		console.log(number);
		let m = this._el.getElementsByClassName('movie');

		// hide current movie and reset the sequence
		let _m = <HTMLElement>m[this.currentMovieNumber - 1];
		let v = _m.getElementsByTagName('video')[0];
		v.pause();
		v.currentTime = 0;
		setTimeout(() => {
			_m.style.visibility = 'hidden';
		}, 50); // zantei duration for avoiding blackout on movie change

		// show selected movie and play
		(<HTMLElement>m[number - 1]).style.visibility = 'visible';
		(<HTMLElement>m[number - 1]).getElementsByTagName('video')[0].play();

		if (number == 3) {
			let c = <HTMLElement>this._el.querySelector('#progress');
			c.style.display = 'block';
			let clock = new Date(1970, 0, 0, 0, 2, 0);
			this.countdownTimer = setInterval(function() {
				clock.setSeconds(clock.getSeconds() - 1);
				this.clock_str = toStr(clock.getMinutes(), 2) + ' ' + toStr(clock.getSeconds(), 2);
			}.bind(this), 1000);
		}
		if (this.currentMovieNumber == 3) {
			let c = <HTMLElement>this._el.querySelector('#progress');
			c.style.display = 'none';
			clearInterval(this.countdownTimer);
		}
	}

	movieSet(number: number) {
		if (this.currentMovieNumber == number) {
			console.log('the same  number');
			return;
		}
		this.movieChange(number);
		this.currentMovieNumber = number;
	}
}

function toStr(n, len) {
	return (Array(len+1).join('0')+n).slice(-len);
}
