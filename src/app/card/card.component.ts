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

    imgUrl: string = 'https://cdn.iconscout.com/icon/free/png-128/angular-2752246-2285063.png'

    getInfo() {
        return 'This is my info'
    }
}