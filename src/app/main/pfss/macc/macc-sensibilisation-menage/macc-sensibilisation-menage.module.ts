import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaccSensibilisationMenageComponent } from './macc-sensibilisation-menage.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { MessageDialogComponent } from './message-dialog.component';

const routes: Routes = [
  {
    path: 'macc/actr/sensibilisation-menage',
    component: MaccSensibilisationMenageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Sensibilisation Menage',
      breadcrumb: 'Sensibilisation Menage',
      type: 'ACTR'
    }
  },
  {
    path: 'macc/tms/sensibilisation-menage',
    component: MaccSensibilisationMenageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Sensibilisation Menage',
      breadcrumb: 'Sensibilisation Menage',
      type: 'TMS'
    }
  },
  {
    path: 'macc/ariep/sensibilisation-menage',
    component: MaccSensibilisationMenageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Sensibilisation Menage',
      breadcrumb: 'Sensibilisation Menage',
      type: 'ARIEP'
    }
  }
];

@NgModule({
  declarations: [MaccSensibilisationMenageComponent, MessageDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxDatatableModule,
    FuseSharedModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  entryComponents: [MessageDialogComponent],
})
export class MaccSensibilisationMenageModule { }
