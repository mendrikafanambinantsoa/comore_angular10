import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationMenageArseComponent } from './formation-menage-arse/formation-menage-arse.component';
import { FormationThematiqueAgexActivitteArseComponent } from './formation-thematique-agex-activitte-arse/formation-thematique-agex-activitte-arse.component';
import { FormationThematiqueSuiviAgexActiviteArseComponent } from './formation-thematique-suivi-agex-activite-arse/formation-thematique-suivi-agex-activite-arse.component';



@NgModule({
  declarations: [FormationMenageArseComponent, FormationThematiqueAgexActivitteArseComponent, FormationThematiqueSuiviAgexActiviteArseComponent],
  imports: [
    CommonModule
  ]
})
export class FormationTechniqueArseModule { }
