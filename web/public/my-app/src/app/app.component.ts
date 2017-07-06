import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
    template: `
      <nav>
        <a routerLink="/page1" routerLinkActive="active">page1</a>
        <a routerLink="/page2" routerLinkActive="active">page2</a>
      </nav>
      <websocket></websocket>
      <router-outlet></router-outlet>
    `,
	styleUrls: [ './app.component.css' ],
})



export class AppComponent {
	title = 'Tour of Heroes';
}
