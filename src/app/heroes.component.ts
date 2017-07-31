import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit  { 
	heroes: Hero[];
	selectedHero: Hero;

	constructor(private heroService: HeroService, private router: Router) { };

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetails(): void {
		this.router.navigate(['/details', this.selectedHero.id]);
	}

	getHeroes(): void {
  		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	ngOnInit(): void {
  		this.getHeroes();
	}

	add(name: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.heroService.create(name)
	    .then(hero => {
	      this.heroes.push(hero);
	      this.selectedHero = null;
	    });
	}

	delete(hero: Hero): void {
	  this.heroService
	      .delete(hero.id)
	      .then(() => {
	        this.heroes = this.heroes.filter(h => h !== hero); //skriv över listan med alla heroes this.heroes genom att filtrera bort allt förutom the hero man tryckte på, dvs den man vill ta  bort
	        if (this.selectedHero === hero) { this.selectedHero = null; } // sedan om the hero man ville ta bort var den heroen som senast var tryckt gör selected hero till null
	      });
	}
}

