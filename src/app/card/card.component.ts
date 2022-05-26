import {Component} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    interpolation:['{{', '}}'] // interpolation like default
})


export class CardComponent {

    title = 'My Card Title'
    text = 'My sample text'

    number = 42

    array = [1, 1, 2, 3, 5, 8, 13]

    obj = {'name': 'Alex', 'info':{'age': 28, 'job': 'frontend'}}
}