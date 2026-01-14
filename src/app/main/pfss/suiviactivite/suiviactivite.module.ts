import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheReceptriceArseModule } from './suiviacticitearse/fiche-receptrice-arse/fiche-receptrice-arse.module';
import { SuiviacticiteactModule } from './suiviacticiteact/suiviacticiteact.module';
import { SuiviacticitetmsModule } from './suiviacticitetms/suiviacticitetms.module';
import { PaiementArseModule } from './suiviacticitearse/paiement-arse/paiement-arse.module';
import { PaiementTmsModule } from './suiviacticitetms/paiement-tms/paiement-tms.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FicheReceptriceArseModule,
    SuiviacticiteactModule,
    SuiviacticitetmsModule,
    PaiementArseModule,
    PaiementTmsModule
  ]
})
export class SuiviactiviteModule { }
