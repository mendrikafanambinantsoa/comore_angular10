import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichePlanRelevementArseComponent } from './fiche-plan-relevement-arse/fiche-plan-relevement-arse.component';
import { SuiviFichePlanRelevementArseComponent } from './suivi-fiche-plan-relevement-arse/suivi-fiche-plan-relevement-arse.component';



@NgModule({
  declarations: [FichePlanRelevementArseComponent, SuiviFichePlanRelevementArseComponent],
  imports: [
    CommonModule
  ]
})
export class PlanRelevementArseModule { }
