import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    interpolation:['{{', '}}'] // interpolation like default
})


export class CardComponent implements OnInit {

    title = 'My Card Title'
    text = 'My sample text'

    imgUrl: string = 'https://cdn.iconscout.com/icon/free/png-128/angular-2752246-2285063.png'

    ngOnInit() {
        setTimeout(() => {
            this.imgUrl = 'https://img1.freepng.ru/20180407/gse/kisspng-vue-js-javascript-framework-front-and-back-ends-gi-technical-5ac9109e6cb7f5.5357905715231264304453.jpg'
        }, 3000)
    }

    getInfo() {
        return 'This is my info'
    }
}