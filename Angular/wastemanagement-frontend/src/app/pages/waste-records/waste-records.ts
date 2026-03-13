import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth';
import { AnalyticsService } from '../../services/analytics';
import { DialogService } from '../../services/dialog.service';
import { NotificationService } from '../../services/notification.service';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { WasteRecordDialog } from './waste-record-dialog';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { error } from 'console';

@Component({
  selector: 'app-waste-records',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './waste-records.html',
  styleUrls: ['./waste-records.css']
})
export class WasteRecords implements OnInit {

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'id',
    'wasteType',
    'quantity',
    'disposalDate',
    'actions'
  ];

  showForm = false;
  editing = false;
  pageSize = 5;

  currentRecord: any = this.emptyRecord();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, 
    private dialog: MatDialog, 
    private notification: NotificationService,
    private dialogService: DialogService,
    private analyticsService: AnalyticsService,
  @Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit() {
    this.loadRecords();

    this.dataSource.filterPredicate = (data, filter) => {
      const text = Object.values(data).join(' ').toLowerCase();
      return text.includes(filter);
    };
  }

  savePageSize(event: any) {
    this.pageSize = event.pageSize;
    if(isPlatformBrowser(this.platformId))
      localStorage.setItem('wastePageSize', this.pageSize.toString());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  emptyRecord() {
    return {
      id: null,
      wasteType: '',
      quantity: 0,
      disposalDate: ''
    };
  }

  loadRecords() {
    this.authService.get('/waste')
      .subscribe({
        next: data => {
          console.log('Waste records:', data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.error('Failed to load waste records', err);
        }
      });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openCreateForm() {
  const dialogRef = this.dialog.open(WasteRecordDialog, {
    width: '400px',
    data: {
      wasteType: '',
      quantity: 0,
      disposalDate: ''
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;
    
    this.authService.post('/waste', result)
      .subscribe({
        next: () => {
          this.loadRecords();
          this.analyticsService.triggerRefresh();
          this.notification.success("Record added successfully.");
        },
        error: error => console.log(error)
      });
    });
  }

  openEditForm(record: any) {

  const dialogRef = this.dialog.open(WasteRecordDialog, {
    width: '400px',
    data: { ...record }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    this.authService.put(`/waste/${result.id}`, result)
      .subscribe({
        next: () => {
          this.loadRecords();
          this.analyticsService.triggerRefresh();
        },
        error: error => console.log(error)
      });
  });
}

  saveRecord() {
    if (this.editing) {
      this.authService.put(`/waste/${this.currentRecord.id}`, this.currentRecord)
        .subscribe({
          next: () =>{
            this.afterSave();
            this.notification.success("Update passed.");
          },
          error: err => console.error('Update failed', err)
        });
    } else {
      this.authService.post('/waste', this.currentRecord)
        .subscribe({
          next: () => {
            this.afterSave(); 
            this.notification.success("Saved successfully.");
          },
          error: err => console.error('Create failed', err)
        });
    }
  }

  afterSave() {
    this.showForm = false;
    this.currentRecord = this.emptyRecord();

    this.loadRecords();
    this.analyticsService.triggerRefresh();
  }

  deleteRecord(id: number) {
    this.dialogService.confirmDelete('this record').subscribe(result => {
      if(!result) return;

      this.authService.delete(`/waste/${id}`)
      .subscribe({
        next: () => {
          this.loadRecords();
          this.analyticsService.triggerRefresh();
          this.notification.success("Delete passed.");
        },
        error: err => console.error('Delete failed', err)
      });
    });
  }
}