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
	//private countdownTimer;
	private initialClock = new Date(1970, 0, 0, 0, 20, 35);
	private clock_str = '';
	private currentMovieNumber: number;
	private month: string;
	private day: string;
	private week: string;
	private setSecondCountStopFlag = false;

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

		let weekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let date = new Date();
		this.month = toStr(date.getMonth() + 1, 2);
		this.day = toStr(date.getDate(), 2);
		this.week = weekName[date.getDay()];
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	setSecondCount() {
		let fps = 10;
		let ball = <HTMLElement>this._el.querySelector('#ball');
		let cx = 600;
		let cy = 650;
		let radius = 310;
		this.setSecondCountStopFlag = true;

		var count = 0;
		var prevRad = 0;
		function step() {
			if (this.setSecondCountStopFlag == false) {
				return;
			}

			let d = new Date();
			let n = d.getTime();
			let rad = 2*Math.PI*(n%1000)/1000;

			let x = Math.floor(cx + Math.sin(rad)*radius);
			let y = Math.floor(cy - Math.cos(rad)*radius);

			ball.style.top = (y - 10).toString() + 'px';
			ball.style.left = (x - 10).toString() + 'px';

			// count update alternative for setInterval
			if (prevRad > rad) {
				this.initialClock.setSeconds(this.initialClock.getSeconds() - 1);
				this.clock_str = toStr(this.initialClock.getHours(), 2) + ' ' +
					toStr(this.initialClock.getMinutes(), 2) + ' ' +
					toStr(this.initialClock.getSeconds(), 2);
			}
			prevRad = rad;

			window.requestAnimationFrame(step.bind(this));
		}
		window.requestAnimationFrame(step.bind(this));
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
			/*
			this.countdownTimer = setInterval(() => {
				this.initialClock.setSeconds(this.initialClock.getSeconds() - 1);
				this.clock_str = toStr(this.initialClock.getHours(), 2) + ' ' +
					toStr(this.initialClock.getMinutes(), 2) + ' ' +
					toStr(this.initialClock.getSeconds(), 2);
			}, 1000);
			*/
			this.setSecondCount();
			let clock = this._el.querySelector('#clock');
			let ball = this._el.querySelector('#ball');
			clock.classList.add('fadeIn');
			ball.classList.add('fadeIn');
		}
		if (this.currentMovieNumber == 3) {
			//clearInterval(this.countdownTimer);
			this.setSecondCountStopFlag = false;
			let clock = this._el.querySelector('#clock');
			let ball = this._el.querySelector('#ball');
			clock.classList.remove('fadeIn');
			ball.classList.remove('fadeIn');
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
