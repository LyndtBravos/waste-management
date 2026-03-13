import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { PickupService } from './pickup-service';
import { Pickup } from './pickups';
import { DialogService } from '../../services/dialog.service';
import { NotificationService } from '../../services/notification.service';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.html',
  styleUrls: ['./pickups.css'],
    imports: [
      MatChipsModule,
      MatDialogModule,
      CommonModule,
      MatSelectModule,
      FormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ]
})
export class PickupsComponent implements OnInit {

  displayedColumns = [
    'id',
    'wasteType',
    'pickupDate',
    'address',
    'status',
    'notes',
    'actions'
  ];

  dataSource = new MatTableDataSource<Pickup>();

  showForm = false;
  pageSize = 5;

  editingPickup: Pickup | null = null;

  newPickup: Pickup = {
    wasteType: '',
    pickupDate: '',
    address: '',
    notes: '',
    status: 'PENDING'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pickupService: PickupService,
    private notification: NotificationService,
    private dialogService: DialogService,
  @Inject(PLATFORM_ID) private platformId: Object ) {}

  ngOnInit() {
    let savedSize: string | null = null;
    if(isPlatformBrowser(this.platformId))
       savedSize = localStorage.getItem('pickupPageSize');

    if (savedSize) this.pageSize = Number(savedSize);
    this.loadPickups();
  }

  savePageSize(event: any) {
    this.pageSize = event.pageSize;
    if(isPlatformBrowser(this.platformId)) 
      localStorage.setItem('pickupPageSize', this.pageSize.toString());
  }

  get isEditing(): boolean {
    return this.editingPickup !== null;
  }

  closeModal() {
    this.showForm = false;
  }

  loadPickups() {
    this.pickupService.getAll().subscribe(data => {
      this.dataSource.data = data;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  openCreateForm() {
    this.editingPickup = null;
    this.newPickup = {
      wasteType: '',
      pickupDate: '',
      address: '',
      notes: '',
      status: 'PENDING'
    };
    this.showForm = true;
  }

  openEditForm(pickup: Pickup) {
    this.editingPickup = pickup;
    this.newPickup = { ...pickup };
    this.showForm = true;
  }

  savePickup() {
    if (this.editingPickup) {
        this.updateStatus(this.editingPickup, this.newPickup.status);
        this.closeModal();
        this.notification.success("Pickup update was a success.");
    }        
    else {
        this.pickupService.create(this.newPickup).subscribe(() => {
            this.loadPickups();
            this.closeModal();
            this.notification.success("A new pickup has been scheduled successfully.");
        });
    }
  }

  deletePickup(id: number) {
      this.dialogService.confirmDelete('this pickup').subscribe(result => {
      if (!result) return;

      this.pickupService.delete(id).subscribe(() => this.loadPickups());
      this.notification.success("Deleted successfully.");
    });
  }

  updateStatus(pickup: Pickup, status: string) {
    this.pickupService.updateStatus(pickup.id!, status)
      .subscribe(() => { 
        this.loadPickups(); 
        this.notification.success("Update was a success.");
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}