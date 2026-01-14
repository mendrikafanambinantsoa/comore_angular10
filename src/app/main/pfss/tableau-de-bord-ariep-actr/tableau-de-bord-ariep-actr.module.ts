import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauDeBordAriepActrComponent } from './tableau-de-bord-ariep-actr.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../_helpers/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';


const routes: Routes = [
  {
    path: 'ariep/objectif',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'ARIEP',
      type_tdb: 'ARIEP',
      breadcrumb: 'Objectif ARIEP',
      is_tableau_de_bord: false
    },
  },
  {
    path: 'ariep/tableau-de-bord',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'ARIEP',
      type_tdb: 'ARIEP',
      breadcrumb: 'Tableau de bord ARIEP',
      is_tableau_de_bord: true
    },
  },
  {
    path: 'actr/objectif',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'ACTR',
      breadcrumb: 'Objectfif ACTR',
      type_tdb: 'ACTR',
      is_tableau_de_bord: false
    },
  },
  {
    path: 'actr/tableau-de-bord',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'ACTR',
      breadcrumb: 'Tableau de bord ACTR',
      type_tdb: 'ACTR',
      is_tableau_de_bord: true
    },
  },
  {
    path: 'macc/objectif',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'MACC',
      breadcrumb: 'Objectif MACC',
      type_tdb: 'MACC',
      is_tableau_de_bord: false
    },
  },
  {
    path: 'macc/tableau-de-bord',
    component: TableauDeBordAriepActrComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'MACC',
      breadcrumb: 'Tableau de bord MACC',
      type_tdb: 'MACC',
      is_tableau_de_bord: true
    },
  }
]

@NgModule({
  declarations: [TableauDeBordAriepActrComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FuseSharedModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule
  ]
})
export class TableauDeBordAriepActrModule { }
