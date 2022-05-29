import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './cards-block/card/card.component';
import { FormComponent } from './form/form.component';
import { CardListComponent } from './cards-block/card-list/card-list.component';
import { CalendarComponent } from './diary/calendar/calendar.component';
import { SelectorComponent } from './diary/selector/selector.component';
import { OrganizerComponent } from './diary/organizer/organizer.component';
import { DiaryMainComponent } from './diary/diary-main/diary-main.component';
import { MomentPipe } from './shared/moment.pipe';

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent,
    CardListComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    DiaryMainComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'cards', component: CardListComponent},
      {path: 'form', component: FormComponent},
      {path: 'diary', component: DiaryMainComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
