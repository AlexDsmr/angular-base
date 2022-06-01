import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Hero, HeroService } from 'src/app/shared/hero.service';
import { HttpClient } from "@angular/common/http";

// TODO: Replace this with your own data model type
export interface HeroTableItem {
  id: string
  name: string
  date?: string
  alias?: string
  location: string
  equipment: string
  superPower: string
  mail?: string
  phone?: string
}

//const dataTest: Hero[] = []
// TODO: replace this with real data from your application
const EXAMPLE_DATA: HeroTableItem[] = [
  {id: '32', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'America', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: '123', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Russia', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: '12', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Europe', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: '1q', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Africa', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: 'wfw', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Syberia', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: 'wvw', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Kongo', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: 'ehjk', name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'Space', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'}
];

/**
 * Data source for the HeroTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HeroTableDataSource extends DataSource<HeroTableItem> {
  data: HeroTableItem[] = EXAMPLE_DATA;
  //data2: Hero[] = dataTest;
  
  static url = 'https://angular-practice-diary-default-rtdb.europe-west1.firebasedatabase.app/heroes'

  load(): Observable<HeroTableItem[]> {
    return this.http
        .get<HeroTableItem[]> ( `${HeroTableDataSource.url}.json`)
        .pipe(map(heroes => {
            if (!heroes) {
                return []
            }
            return Object.keys(heroes).map((key: any) => ({...heroes[key], id: key}))
        }))
  }

  

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private http: HttpClient) {
    super();
     
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HeroTableItem[]> {
    

    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
    
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: HeroTableItem[]): HeroTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: HeroTableItem[]): HeroTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'equipment': return compare(a.equipment, b.equipment, isAsc);
        case 'superPower': return compare(a.superPower, b.superPower, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
