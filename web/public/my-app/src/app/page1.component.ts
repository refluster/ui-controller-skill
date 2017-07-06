import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'page1',
	templateUrl: 'page1.component.html',
	styleUrls: ['page1.component.css'],
})

export class Page1Component implements OnInit {
	constructor(
		private router: Router,
		private heroService: HeroService) { }

	ngOnInit(): void {
	}
}
