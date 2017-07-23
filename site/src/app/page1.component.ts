import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'page1',
	templateUrl: 'page1.component.html',
	styleUrls: ['./page.component.css', './page1.component.css'],
})

export class Page1Component implements OnInit {
	private _el: HTMLElement;

	constructor(el: ElementRef) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {	}

	adjustPosition() {
		console.log(this._el.getElementsByTagName('video')[0].getBoundingClientRect());
	}
}
