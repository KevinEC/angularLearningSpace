// https://angular.io/tutorial/toh-pt6

import { Component } from '@angular/core';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
	selector: "my-app",
	template: `
		<h1>{{title}}</h1>
		<nav>
			<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
			<a routerLink="/heroes" routerLinkActive="active">Heroes</a>
		</nav>
		<router-outlet></router-outlet>
	`
})

export class AppComponent {
	title = 'Tour of Heroes';
}