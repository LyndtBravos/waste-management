import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth';
import { DialogService } from '../../services/dialog.service';
import { NotificationService } from '../../services/notification.service';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BinFormDialog } from './bin-form-dialog';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-bins',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './bins.html',
  styleUrls: ['./bins.css']
})
export class Bins implements OnInit {

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'id',
    'locationName',
    'address',
    'latitude',
    'longitude',
    'wasteTypesAccepted',
    'actions'
  ];

  pageSize = 5;
  showForm = false;
  editing = false;
  viewMap = false;
  map!: L.Map;

  currentBin: any = this.emptyBin();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private notification: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {}

  ngOnInit() {
    this.loadBins();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  emptyBin() {
    return {
      id: null,
      locationName: '',
      address: '',
      latitude: 0,
      longitude: 0,
      wasteTypesAccepted: ''
    };
  }

  toggleMap() {
    this.viewMap = !this.viewMap;

    if (this.viewMap) {
      setTimeout(() => {
        this.initMap(this.dataSource.data);
      }, 0);
    }
  }

  async initMap(bins: any[]) {
    const L = (await import('leaflet')).default;

    const getMarkerIcon = (type: string) => {
      let color = 'blue';

      if (type?.toLowerCase().includes('plastic')) color = 'yellow';
      if (type?.toLowerCase().includes('glass')) color = 'green';
      if (type?.toLowerCase().includes('metal')) color = 'red';

      return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
    };

    if (this.map) {
      this.map.remove();
      this.map = undefined as any;
    }

    const first = bins[0];

    this.map = L.map('binsMap').setView([first.latitude, first.longitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    bins.forEach(bin => {
      const icon = getMarkerIcon(bin.wasteTypesAccepted);
      L.marker([bin.latitude, bin.longitude], { icon })
        .addTo(this.map)
        .bindPopup(`<b>${bin.locationName}</b><br>${bin.address}`);
    });
  }

  loadBins() {
    this.authService.get('http://localhost:8080/api/bins')
      .subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
          if (this.viewMap) this.initMap(data);
        },
        error: (err) => {
          console.error("Failed to load bins", err);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateForm() {
    const dialogRef = this.dialog.open(BinFormDialog, {
      width: '400px',
      data: {
        editing: false,
        bin: this.emptyBin()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.post('/bins', result)
          .subscribe(() => this.loadBins());
      }
    });

  }

  openEditForm(bin: any) {
    const dialogRef = this.dialog.open(BinFormDialog, {
      width: '400px',
      data: {
        editing: true,
        bin: { ...bin }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.put(`/bins/${result.id}`, result)
          .subscribe(() => this.loadBins());
      }
    });
  }

  savePageSize(event: any) {
    this.pageSize = event.pageSize;
    if(isPlatformBrowser(this.platformId))
      localStorage.setItem('pickupPageSize', this.pageSize.toString());
  }

  saveBin() {
    const binForUpdate = { ...this.currentBin };
    delete binForUpdate.id;

    if (this.editing) {
      this.authService.put(`http://localhost:8080/api/bins/${this.currentBin.id}`, binForUpdate)
        .subscribe({
          next: () => {
            this.afterSave();
            this.closeModal();
            this.notification.success("Recycling bin update was a success.");
          },
          error: (err) => console.error("Update failed", err, this.currentBin)
        });
    } else {
      this.authService.post('http://localhost:8080/api/bins', this.currentBin)
        .subscribe({
          next: () => {
            this.afterSave();     
            this.closeModal();       
            this.notification.success("A new pickup has been scheduled successfully.");
          },
          error: (err) => console.error("Create failed", err)
        });
    }
  }

  closeModal() {
    this.showForm = false;
  }

  afterSave() {
    this.currentBin = this.emptyBin();
    this.loadBins();
  }

  deleteBin(id: number) {
    this.dialogService.confirmDelete('this bin').subscribe(result => {
      if(!result) return;

      this.authService.delete(`http://localhost:8080/api/bins/${id}`)
      .subscribe({
        next: () => { 
          this.loadBins();
          this.notification.success("Deleted successfully.");
        },
        error: (err) => console.error("Delete failed", err)
      });
    });
  }
}