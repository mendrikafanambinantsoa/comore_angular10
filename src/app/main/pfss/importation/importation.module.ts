import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanResilienceModule } from './plan-resilience/plan-resilience.module';
import { FicheProfilageOrientationModule } from './fiche-profilage-orientation/fiche-profilage-orientation.module';
import { PaiementModule } from './paiement/paiement.module';
import { EtatPresenceModule } from './etat-presence/etat-presence.module';
import { MenageModule } from './menage/menage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaiementModule,
    PlanResilienceModule,
    FicheProfilageOrientationModule,
    EtatPresenceModule,
    MenageModule
  ]
})
export class ImportationModule { }
