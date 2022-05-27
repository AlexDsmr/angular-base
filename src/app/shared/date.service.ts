import { Injectable } from "@angular/core";
import * as moment from 'moment'
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DateService {
    public date: BehaviorSubject<any> = new BehaviorSubject(moment())
}