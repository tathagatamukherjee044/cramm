import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question-acceptance-dialog',
  imports: [],
  templateUrl: './question-acceptance-dialog.component.html',
  styleUrl: './question-acceptance-dialog.component.css'
})
export class QuestionAcceptanceDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<QuestionAcceptanceDialogComponent>
  ) { }

  thumbsUp() {
    console.log("thumbs up");
    this.dialogRef.close(true);
  }

  thumbsDown() {
    console.log("thumbs down");
    this.dialogRef.close(false);
  }

  // close(): void {
  //   this.dialogRef.close();
  // }
}
