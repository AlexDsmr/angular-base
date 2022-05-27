import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { CardListComponent } from './card-list/card-list.component';

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'cards', component: CardListComponent},
      {path: 'form', component: FormComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
