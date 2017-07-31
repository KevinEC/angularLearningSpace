import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
	private heroesUrl = 'api/heroes';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	/**
	* The response JSON has a single data property. [ response.json().data ]
	* Note the shape of the data that the server returns. 
	* This particular in-memory web API example returns 
	* an object with a data property. Your API might return something else. 
	* Adjust the code to match your web API.
	*/
	getHeroes(): Promise<Hero[]> {
  		return this.http.get(this.heroesUrl)
             .toPromise()
             .then(response => response.json().data as Hero[])
             .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

	getHero(id: number): Promise<Hero> {
	  const url = `${this.heroesUrl}/${id}`;

	  return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Hero)
	    .catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
	  return this.http
	    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
	    .toPromise()
	    .then(response => response.json().data as Hero)
	    .catch(this.handleError);
	}

	update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http
	    .put(url, JSON.stringify(hero), {headers: this.headers})
	    .toPromise()
	    .then(() => hero)
	    .catch(this.handleError);
	}
}