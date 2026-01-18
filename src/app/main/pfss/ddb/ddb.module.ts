import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposanteComponent } from './composante/composante.component';
import { AuthGuard } from 'app/_helpers/auth.guard';
import { RouterModule, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormationMlOutilComComponent } from './formation-ml-outil-com/formation-ml-outil-com.component';
import { Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDividerModule } from '@angular/material/divider';
import { DecoupageAdministratifComponent } from './decoupage-administratif/decoupage-administratif.component';
import { TypeActiviteArseActComponent } from './type-activite-arse-act/type-activite-arse-act.component';
import { AgexAgepCpsComponent } from './agex-agep-cps/agex-agep-cps.component';
import { TypeResultatPlainteComponent } from './type-resultat-plainte/type-resultat-plainte.component';
import { QuestionnaireMenageComponent } from './questionnaire-menage/questionnaire-menage.component';
import { QuestionnaireIndividuComponent } from './questionnaire-individu/questionnaire-individu.component';
import { GererPacComponent } from './gerer-pac/gerer-pac.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { MilieuVagueZipComponent } from './milieu-vague-zip/milieu-vague-zip.component';
import { PlanActionReinstallationComponent } from './plan-action-reinstallation/plan-action-reinstallation.component';
import { PhaseExecutionEtAnneeComponent } from './phase-execution-et-annee/phase-execution-et-annee.component';
import { LienParenteComponent } from './lien-parente/lien-parente.component';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    {
        path: 'donnees-de-base/composante',
        component: ComposanteComponent, canActivate:[AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Composante'
        }
    },
    {
        path: 'donnees-de-base/decoupage-administratif',
        component: DecoupageAdministratifComponent, canActivate:[AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Decoupage administratif'
        }
    },
    {
        path: 'donnees-de-base/type-activite-arse-act',
        component: TypeActiviteArseActComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Type activite Arse act'
        }
    },
    {
        path: 'donnees-de-base/agex-agep-cps',
        component: AgexAgepCpsComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Agex Agep Cps'
        }
    },
    {
        path: 'donnees-de-base/type-resultat-plainte',
        component: TypeResultatPlainteComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Type resultat plainte'
        }
    },
    {
        path: 'donnees-de-base/questionnaire-menage',
        component: QuestionnaireMenageComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Questionnaire menage'
        }
    },
    {
        path: 'donnees-de-base/questionnaire-individu',
        component: QuestionnaireIndividuComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Questionnaire individu'
        }
    },
    {
        path: 'donnees-de-base/gerer-pac',
        component: GererPacComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Gerer parc'
        }
    },
    {
        path: 'donnees-de-base/consultant',
        component: ConsultantComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Consultant'
        }
    },
    {
        path: 'donnees-de-base/milieu-vague-zip',
        component: MilieuVagueZipComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Milieu vague zip'
        }
    },
    {
        path: 'donnees-de-base/plan-action-reinstallation',
        component: PlanActionReinstallationComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Plan action reinstallation'
        }
    },
    {
        path: 'donnees-de-base/phase-execution-et-annee',
        component: PhaseExecutionEtAnneeComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Phase execution et annee '
        }
    },
    {
        path: 'donnees-de-base/lien-parente',
        component: LienParenteComponent, canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Lien parente'
        }
    },
    {
      path: 'donnees-de-base/formation',
      component: FormationMlOutilComComponent, canActivate:[AuthGuard],
        data: {
            breadcrumb: 'Donnees de base / Formation'
        }
    }
    
]

@NgModule({
  declarations: [ComposanteComponent, FormationMlOutilComComponent, DecoupageAdministratifComponent, TypeActiviteArseActComponent, AgexAgepCpsComponent, TypeResultatPlainteComponent, QuestionnaireMenageComponent, QuestionnaireIndividuComponent, GererPacComponent, ConsultantComponent, MilieuVagueZipComponent, PlanActionReinstallationComponent, PhaseExecutionEtAnneeComponent, LienParenteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FuseSharedModule,
    FuseWidgetModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,  
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    NgxDatatableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
})
export class DdbModule { }
