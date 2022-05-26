import {Component, Input, OnInit} from '@angular/core';
import { Card } from '../app.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    interpolation:['{{', '}}'] // interpolation like default
})


export class CardComponent implements OnInit {

    @Input() card!: Card
    @Input() index!: number

    title = 'My Card Title'
    text = 'My sample text'
    inputValue = ''
    textColor: string | undefined

    ngOnInit() {

    }

    changeTitle() {
        this.card.title = 'Title has been changed'
    }

    inputHandler(value: any) {
        this.card.title = value
    }

    changeHandler() {
        //console.log(this.title);
    }
}