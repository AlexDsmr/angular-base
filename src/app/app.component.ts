import { Component } from '@angular/core';

export interface Card {
  title: string
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggle = true
  
  cards: Card[] = [
    {title: 'Card 1', text: 'This is first card'},
    {title: 'This is card 2', text: 'This is card number 2'},
    {title: 'Last card', text: 'This is last card'}
  ]

  toggleCards() {
    this.toggle = !this.toggle
  }
}
