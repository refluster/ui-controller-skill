import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService }       from './websocket.service';

@Component({
	providers: [WebsocketService],
	selector: 'device-view',
	templateUrl: 'device-view.component.html',
	styleUrls: ['./bootstrap-4.0.0-beta-dist.min.css', './device-view.component.css'],
})

export class DeviceViewComponent implements OnInit, OnDestroy {
	private connection;
	private tv: {power: string; input: string;} = {power: 'off', input: '1ch'};
	private recorder: {power: string; mode: string;} = {power: 'off', mode: 'list'};
	private ac: {power: string; temp: string;} = {power: 'off', temp: '28'};
	private light: {scene: string;} = {scene: 'off'};
	private shutter: {status: string;} = {status: 'open'};

	constructor(private websocketService: WebsocketService){}

	ngOnInit(): void {
		this.websocketService.connect('hoge=hoge');
		this.connection = this.websocketService.on('device-view').subscribe(data => {
			console.log(data);
			data = data['devctrl'];
			if (data['tv'] != undefined) {
				if (data['tv']['power'] != undefined) {
					this.tv.power = data['tv']['power'];
				}
				if (data['tv']['input'] != undefined) {
					this.tv.input = data['tv']['input'];
				}
			}
			if (data['recorder'] != undefined) {
				if (data['recorder']['power'] != undefined) {
					this.recorder.power = data['recorder']['power'];
				}
				if (data['recorder']['mode'] != undefined) {
					this.recorder.mode = data['recorder']['mode'];
				}
			}
			if (data['ac'] != undefined) {
				if (data['ac']['power'] != undefined) {
					this.ac.power = data['ac']['power'];
				}
				if (data['ac']['temp'] != undefined) {
					this.ac.temp = data['ac']['temp'];
				}
			}
			if (data['light'] != undefined) {
				if (data['light']['scene'] != undefined) {
					this.light.scene = data['light']['scene'];
				}
			}
			if (data['shutter'] != undefined) {
				if (data['shutter']['status'] != undefined) {
					this.shutter.status = data['shutter']['status'];
				}
			}
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}
}
