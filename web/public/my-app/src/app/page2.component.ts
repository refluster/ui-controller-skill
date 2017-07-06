import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'page2',
	templateUrl: './page2.component.html',
	styleUrls: [ './page2.component.css' ],
})

export class Page2Component implements OnInit {
	heroes: Hero[] = [];

	constructor(private heroService: HeroService) {}

	ngOnInit(): void {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes.slice(1, 5));
	}
}
