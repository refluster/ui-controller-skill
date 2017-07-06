import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'page1',
	templateUrl: 'page1.component.html',
	styleUrls: ['page1.component.css'],
})

export class Page1Component implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;

	constructor(
		private router: Router,
		private heroService: HeroService) { }

	ngOnInit(): void {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectedHero.id]);
	}
}
