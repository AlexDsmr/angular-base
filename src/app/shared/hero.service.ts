import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import * as moment from "moment";

export interface Hero {
    id?: string
    name: string
    date?: string
    alias?: string
    location: string
    equipment: string
    superPower: string
    mail?: string
    phone?: string
}

interface CreateResponse {
    name: string
}

@Injectable({providedIn: 'root'})
export class HeroService {
    static url = 'https://angular-practice-diary-default-rtdb.europe-west1.firebasedatabase.app/heroes'

    constructor(private http: HttpClient) {
    }

    load(): Observable<Hero[]> {
        return this.http
            .get<Hero[]> ( `${HeroService.url}.json`)
            .pipe(map(heroes => {
                if (!heroes) {
                    return []
                }
                return Object.keys(heroes).map((key: any) => ({...heroes[key], id: key}))
            }))
    }

    create(hero: Hero): Observable<Hero> {
        return this.http
            .post<CreateResponse>(`${HeroService.url}.json`, hero)
            .pipe(map(res => {
                return {...hero, id: res.name}
            }))
    }

    remove(hero: Hero): Observable<void> {
        return this.http
          .delete<void>(`${HeroService.url}/${hero.id}.json`)
      }
}