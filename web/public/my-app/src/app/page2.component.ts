import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
	selector: 'page2',
	templateUrl: './page2.component.html',
	styleUrls: ['./page.component.css', './page2.component.css'],
})

export class Page2Component implements OnInit {
	constructor(private heroService: HeroService) {}

	ngOnInit(): void {
	}
}
