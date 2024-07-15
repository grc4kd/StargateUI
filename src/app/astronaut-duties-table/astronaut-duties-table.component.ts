import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { AstronautDutiesTableDataSource, AstronautDutiesTableItem } from './astronaut-duties-table-datasource';

@Component({
  selector: 'app-astronaut-duties-table',
  templateUrl: './astronaut-duties-table.component.html',
  styleUrl: './astronaut-duties-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class AstronautDutiesTableComponent implements AfterViewInit {  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AstronautDutiesTableItem>;

  dataSource = new AstronautDutiesTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
