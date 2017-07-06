import { Component } from '@angular/core';

@Component({
	selector: 'controller',
	template: '<div>controller</div><button (click)="onClick()">hoge</button>',
	styleUrls: [],
})
export class ControllerComponent {
	onClick(){
		// todo: http.post to express server
	}
}
