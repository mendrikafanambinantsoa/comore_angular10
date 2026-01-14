import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicateurComponent } from './indicateur.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../_helpers/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirmation-dialog.component';


const routes: Routes = [
  {
    path: "tableau-de-bord/indicateur",
    component: IndicateurComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    IndicateurComponent,
    ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FuseSharedModule,
    MatButtonModule,
    NgxDatatableModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatInputModule,
    FlexLayoutModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class IndicateurModule { }
