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
    inputValue = ''
    textColor: string | undefined

    ngOnInit() {

    }

    changeTitle() {
        this.title = 'Title has been changed'
    }

    inputHandler(value: any) {
        this.title = value
    }

    changeHandler() {
        //console.log(this.title);
    }
}