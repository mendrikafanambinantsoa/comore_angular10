import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheReceptriceTmsModule } from './fiche-receptrice-tms/fiche-receptrice-tms.module';
import { PaiementTmsModule } from './paiement-tms/paiement-tms.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaiementTmsModule,
    FicheReceptriceTmsModule
  ]
})
export class SuiviacticitetmsModule { }
