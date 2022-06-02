import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Hero, HeroService } from 'src/app/shared/hero.service';
import { HttpClient } from "@angular/common/http";

// TODO: Replace this with your own data model type
export interface HeroTableItem {
  id: number
  name: string
  date?: string
  alias: string
  location: string
  equipment: string
  superPower: string
  mail?: string
  phone?: string
}

//const dataTest: Hero[] = []
// TODO: replace this with real data from your application
const EXAMPLE_DATA: HeroTableItem[] = [
  {id: 1, name: 'Steve Rogers', date: '31-05-2022', alias: 'Captain America', location: 'America', equipment: 'Gamburger', superPower: 'Strength', mail: '', phone: '911'},
  {id: 2, name: 'Groot', date: '31-05-2022', alias: 'Groot', location: 'Space', equipment: 'No equipment', superPower: 'regenerative healing factor', mail: '', phone: '112'},
  {id: 3, name: 'Black Widow', date: '31-05-2022', alias: 'Black Widow', location: 'Russia', equipment: 'Bottle of vodka', superPower: 'Master spy & assassin', mail: '', phone: '03305'},
  {id: 4, name: 'Peter Quill', date: '31-05-2022', alias: 'Star-Lord', location: 'America', equipment: 'Gamburger', superPower: 'Master problem-solver', mail: 'star-lord@gmail.com', phone: '911'},
  {id: 5, name: 'Logan', date: '31-05-2022', alias: 'Wolverine', location: 'Syberia', equipment: 'Gamburger', superPower: 'regeneration', mail: 'logan@mail.ru', phone: '25223'},
  {id: 6, name: 'T\'Challa', date: '31-05-2022', alias: 'Black Panther', location: 'Wakanda', equipment: 'Wood Stick', superPower: 'Agility', mail: '', phone: '2326532'}
];

/**
 * Data source for the HeroTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HeroTableDataSource extends DataSource<HeroTableItem> {
  data: HeroTableItem[] = EXAMPLE_DATA;
    

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
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
        case 'alias': return compare(a.alias, b.alias, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
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
