import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, from } from 'rxjs';
import { StargateService } from '../../stargate.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface AstronautDutiesTableItem {
  id: number;
  personId: number;
  rank: string;
  dutyTitle: string;
  dutyStartDate: Date;
  dutyEndDate: Date | undefined;
}

/**
 * Data source for the AstronautDutiesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AstronautDutiesTableDataSource extends DataSource<AstronautDutiesTableItem> {
  data: AstronautDutiesTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  stargateService = inject(StargateService);
  route = inject(ActivatedRoute);

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AstronautDutiesTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      const name = this.route.snapshot.params['name'];
      const items: AstronautDutiesTableItem[] = [];
      const itemsObservable = from(this.stargateService.getPersonDutiesByName(name))
        .pipe(
          map(duties => {
            duties?.map((w) => items.push({ 
              id: w.id, 
              personId: w.personId,
              dutyEndDate: w.dutyEndDate,
              dutyStartDate: w.dutyStartDate,
              dutyTitle: w.dutyTitle,
              rank: w.rank,
            }));
          }),
        );

      return merge(itemsObservable, this.paginator.page, this.sort.sortChange)
        .pipe(
          map(() => {
            return this.getPagedData(this.getSortedData([...items]))
          }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AstronautDutiesTableItem[]): AstronautDutiesTableItem[] {
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
  private getSortedData(data: AstronautDutiesTableItem[]): AstronautDutiesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.personId, b.personId, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
