import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremierPaiementModule } from './premier-paiement/premier-paiement.module';
import { DeuxiemePaiementModule } from './deuxieme-paiement/deuxieme-paiement.module';
import { TroisiemePaiementModule } from './troisieme-paiement/troisieme-paiement.module';
import { ExportFicheEtatModule } from './export-fiche-etat/export-fiche-etat.module';
import { ImportEtatModule } from './import-etat/import-etat.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PremierPaiementModule,
    DeuxiemePaiementModule,
    TroisiemePaiementModule,
    ExportFicheEtatModule,
    ImportEtatModule
  ]
})
export class SuiviacticiteactModule { }
