import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';

import { AppComponent } from './app.component';
import { CardComponent } from './cards-block/card/card.component';
import { FormComponent } from './form/form.component';
import { CardListComponent } from './cards-block/card-list/card-list.component';
import { CalendarComponent } from './diary/calendar/calendar.component';
import { SelectorComponent } from './diary/selector/selector.component';
import { OrganizerComponent } from './diary/organizer/organizer.component';
import { DiaryMainComponent } from './diary/diary-main/diary-main.component';
import { MomentPipe } from './shared/moment.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroTableComponent } from './hero-table/hero-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeroTableAdmComponent } from './hero-table-adm/hero-table-adm.component';

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
    MomentPipe,
    NavBarComponent,
    HeroTableComponent,
    HeroTableAdmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule.forRoot([
      {path: 'cards', component: CardListComponent},
      {path: 'form', component: FormComponent},
      {path: 'diary', component: DiaryMainComponent},
      {path: 'heroTable', component: HeroTableComponent},
      {path: 'heroTable/Adm', component: HeroTableAdmComponent}
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
