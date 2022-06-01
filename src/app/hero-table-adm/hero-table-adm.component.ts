import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from 'src/app/shared/hero.service';

@Component({
  selector: 'app-hero-table-adm',
  templateUrl: './hero-table-adm.component.html',
  styleUrls: ['./hero-table-adm.component.scss']
})
export class HeroTableAdmComponent implements OnInit {

  //heroes: any = [{id: '1', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'America', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  //{id: '2', name: 'Groot', date: '31-05-2022', alias: 'Groot', location: 'Space', equipment: 'No equipment', superPower: 'regenerative healing factor', mail: '', phone: '112'},
  //{id: '3', name: 'Black Widow', date: '31-05-2022', alias: 'Black Widow', location: 'Russia', equipment: 'Bottle of vodka', superPower: 'Master spy & assassin', mail: '', phone: '03305'},
  //{id: '4', name: 'Peter Quill', date: '31-05-2022', alias: 'Star-Lord', location: 'America', equipment: 'Gamburger', superPower: 'Master problem-solver', mail: 'star-lord@gmail.com', phone: '911'},
  //{id: '5', name: 'Logan', date: '31-05-2022', alias: 'Wolverine', location: 'Syberia', equipment: 'Gamburger', superPower: 'regeneration', mail: 'logan@mail.ru', phone: '25223'},
  //{id: '6', name: 'T\'Challa', date: '31-05-2022', alias: 'Black Panther', location: 'Wakanda', equipment: 'Wood Stick', superPower: 'Agility', mail: '', phone: '2326532'}]

  heroes: Hero[] = []

  constructor(private heroService: HeroService) { }

  ngOnInit(): void { 

  this.heroService.load()
  .subscribe(heroes => {
    this.heroes = heroes
  })

  }

  remove(hero: Hero) {
    this.heroService.remove(hero).subscribe(() => {
      this.heroes = this.heroes.filter(h => h.id !== hero.id)
    }, err => console.error(err))
  }


}
