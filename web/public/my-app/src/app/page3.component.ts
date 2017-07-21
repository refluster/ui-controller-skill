import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'page3',
	templateUrl: 'page3.component.html',
	styleUrls: ['./page.component.css', './page3.component.css'],
})

export class Page3Component implements OnInit {
	clock = new Date(1970, 0, 0, 0, 20, 35);
	clock_str = '';

	ngOnInit(): void {
		setInterval(() => {
			this.clock.setSeconds(this.clock.getSeconds() - 1);
			//this.clock = this.clock + 1;
			this.clock_str = toStr(this.clock.getHours(), 2) + ':' +
				toStr(this.clock.getMinutes(), 2) + ':' +
				toStr(this.clock.getSeconds(), 2);
		}, 1000);
	}
}

function toStr(n, len) {
	return (Array(len+1).join('0')+n).slice(-len);
}
