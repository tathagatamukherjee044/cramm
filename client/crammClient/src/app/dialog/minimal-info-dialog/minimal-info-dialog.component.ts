import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-minimal-info-dialog',
    templateUrl: './minimal-info-dialog.component.html',
    styleUrls: ['./minimal-info-dialog.component.css'],
    standalone: false
})
export class MinimalInfoDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<MinimalInfoDialogComponent>
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.dialogRef.close(), 1000); // Auto-close after 3 seconds
  }

  close(): void {
    this.dialogRef.close();
  }
}
