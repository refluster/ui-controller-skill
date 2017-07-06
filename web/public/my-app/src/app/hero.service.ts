import { Injectable } from '@angular/core';

@Injectable()

export class HeroService {
	getHeroes(): Promise<Hero[]> {
		return Promise.resolve({});
	}

	getHero(id: number): Promise<Hero> {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}
}
