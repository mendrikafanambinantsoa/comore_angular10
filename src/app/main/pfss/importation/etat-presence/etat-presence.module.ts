import { Breadcrumb } from './../../../../_services/breadcrumb.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportEtatPresencePresence3Component } from './import-etat-presence-presence3/import-etat-presence-presence3.component';
import { ImportEtatPresenceCycle1Module } from './import-etat-presence-cycle1/import-etat-presence-cycle1.module';
import { ImportEtatPresenceCycle2Module } from './import-etat-presence-cycle2/import-etat-presence-cycle2.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/_helpers/auth.guard';

const routes: Routes = [
    {
        path: "importation/etat-presence/etat-présence-3",
        component: ImportEtatPresencePresence3Component,
        canActivate: [AuthGuard],
        data:{
          breadcrumb:'Importation / Etat de presence / Etat de présence 3 '
        }
    }
]

@NgModule({
  declarations: [ImportEtatPresencePresence3Component],
  imports: [
    CommonModule,
    ImportEtatPresenceCycle1Module,
    ImportEtatPresenceCycle2Module,
    RouterModule.forChild(routes),
  ]
})
export class EtatPresenceModule { }
