import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [IonButton, ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})
export class InfoDialogComponent {
  constructor (
    public dialogRef : MatDialogRef<InfoDialogComponent>
  ) {}

  
}
