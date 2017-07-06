import { Injectable } from '@angular/core';

@Injectable()

export class HeroService {
	getHeroes(): Promise<number[]> {
		return Promise.resolve({});
	}

	getHero(id: number): Promise<number> {
		return this.getHeroes()
			.then(heroes => 0);
	}
}
