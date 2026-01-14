import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  template: `
    <h1 mat-dialog-title>Message</h1>
    <div mat-dialog-content>Aucune donnée disponible</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()" cdkFocusInitial>Confirmer</button>
    </div>
  `,
})
export class MessageDialogComponent {
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>) {}
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  } 
}


