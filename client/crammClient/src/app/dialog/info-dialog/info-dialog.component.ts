import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrl: './info-dialog.component.css',
    standalone: false
})
export class InfoDialogComponent {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { heading: string; message: string },
    private matDialogRef: MatDialogRef<InfoDialogComponent>,
  ) {
  }

  close() {
    this.matDialogRef.close();
  }

}
