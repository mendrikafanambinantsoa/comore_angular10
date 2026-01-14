import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>Êtes-vous sûr de vouloir supprimer cet élément ?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button (click)="onConfirm()" cdkFocusInitial>Confirmer</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}