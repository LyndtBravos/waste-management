import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bin-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
  <h2 mat-dialog-title>{{data.editing ? 'Edit Bin' : 'Add Bin'}}</h2>

  <div mat-dialog-content>

    <mat-form-field appearance="outline">
      <mat-label>Location Name</mat-label>
      <input matInput [(ngModel)]="data.bin.locationName">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Address</mat-label>
      <input matInput [(ngModel)]="data.bin.address">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Latitude</mat-label>
      <input matInput type="number" [(ngModel)]="data.bin.latitude">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Longitude</mat-label>
      <input matInput type="number" [(ngModel)]="data.bin.longitude">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Waste Types</mat-label>
      <input matInput [(ngModel)]="data.bin.wasteTypesAccepted">
    </mat-form-field>

  </div>

  <div mat-dialog-actions align="end">
    <button mat-button (click)="close()">Cancel</button>
    <button mat-raised-button color="primary" (click)="save()">Save</button>
  </div>
  `
})
export class BinFormDialog {

  constructor(
    private dialogRef: MatDialogRef<BinFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(this.data.bin);
  }

  close() {
    this.dialogRef.close();
  }
}