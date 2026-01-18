
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportEtatPresencePresence3Component } from './import-etat-presence-presence3.component';
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '../../../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../../../@fuse/components/widget/widget.module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from '../../../../../_helpers/auth.guard';
import { Cycle1Module } from '../../paiement/importation-paiement-actr/cycle1/cycle1.module';

const routes: Routes = [
    {
        path: "importation/etat-presence/etat-présence-3",
        component: ImportEtatPresencePresence3Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Etat presence / Etat presence 3'
        }
    }
];

@NgModule({
  declarations: [ImportEtatPresencePresence3Component],
  imports: [
    CommonModule,
    BrowserModule,
    FuseSharedModule,
    FuseWidgetModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    NgxDatatableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    Cycle1Module
  ],
  exports: [ImportEtatPresencePresence3Component]
})
export class ImportEtatPresencePresence3Module { }
