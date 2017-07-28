import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'viewer',
	templateUrl: 'viewer.component.html',
	styleUrls: ['./viewer.component.css'],
})

export class ViewerComponent implements OnInit {
	private _el: HTMLElement;
	private dispVideoBorder: boolean = false;

	constructor(el: ElementRef) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {	}

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
}
