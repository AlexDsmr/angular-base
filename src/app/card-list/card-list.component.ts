import { Component, OnInit } from '@angular/core';

export interface Card {
  title: string
  text: string
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  toggle = true
  
  cards: Card[] = [
    {title: 'Card 1', text: 'This is first card'},
    {title: 'This is card 2', text: 'This is card number 2'},
    {title: 'Last card', text: 'This is last card'}
  ]

  toggleCards() {
    this.toggle = !this.toggle
  }

  ngOnInit(): void {
  }

}
