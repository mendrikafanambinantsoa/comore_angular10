import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheReceptriceArseModule } from './fiche-receptrice-arse/fiche-receptrice-arse.module';
import { FormationTechniqueArseModule } from './formation-technique-arse/formation-technique-arse.module';
import { PaiementArseModule } from './paiement-arse/paiement-arse.module';
import { PlanRelevementArseModule } from './plan-relevement-arse/plan-relevement-arse.module';
import { ProfilageOrientationArseModule } from './profilage-orientation-arse/profilage-orientation-arse.module';
import { SuiviEvaluationArseModule } from './suivi-evaluation-arse/suivi-evaluation-arse.module';
import { SuiviTechniqueArseModule } from './suivi-technique-arse/suivi-technique-arse.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FicheReceptriceArseModule,
    FormationTechniqueArseModule,
    PaiementArseModule,
    PlanRelevementArseModule,
    ProfilageOrientationArseModule,
    SuiviEvaluationArseModule,
    SuiviTechniqueArseModule,
  ]
})
export class SuiviacticitearseModule { }
