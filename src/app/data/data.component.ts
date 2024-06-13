import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  dataArray: any;

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'phoneNo',
    'linkedin',
    'username',
    'dob',
    'income',
    'gender',
    'color',
    'address',
    'skills'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private formDataArray: FormDataService) {}

  ngOnInit(): void {
    this.dataArray = this.formDataArray.getData();
    this.dataSource = new MatTableDataSource(this.dataArray);

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
