import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components";
import { MenageInscritActComponent } from "./menage-inscrit-act/menage-inscrit-act.component";
import { AuthGuard } from "app/_helpers/auth.guard";
import { MenagePreselectionneActComponent } from "./menage-preselectionne-act/menage-preselectionne-act.component";
import { MenageBeneficiaireActComponent } from "./menage-beneficiaire-act/menage-beneficiaire-act.component";
import { CarteBeneficiaireComponent } from "./carte-beneficiaire/carte-beneficiaire.component";
import { FicheTravailleurComponent } from "./fiche-travailleur/fiche-travailleur.component";
import { ActGererMpdComponent } from "./act-gerer-mpd/act-gerer-mpd.component";
import { ContratAgepComponent } from "./contrat-agep/contrat-agep.component";
import { GererPgesComponent } from "./gerer-pges/gerer-pges.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { GererMpdModule } from "../gerer-mpd/gerer-mpd.module";
import { GererAgepModule } from '../gerer-agep/gerer-agep.module';

const routes: Routes = [
    {
        path: "act/menage-inscrit-act",
        component: MenageInscritActComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/menage-preselectionne-actr",
        component: MenagePreselectionneActComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/menage-beneficiaire-actr",
        component: MenageBeneficiaireActComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/carte-beneficiaire",
        component: CarteBeneficiaireComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/fiche-travailleur",
        component: FicheTravailleurComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/gerer-mpd",
        component: ActGererMpdComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "actr/contrat_agep",
        component: ContratAgepComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "act/gerer_pges",
        component: GererPgesComponent,
        canActivate: [AuthGuard],
    },
];
@NgModule({
    declarations: [
        MenageInscritActComponent,
        MenagePreselectionneActComponent,
        MenageBeneficiaireActComponent,
        CarteBeneficiaireComponent,
        FicheTravailleurComponent,
        ActGererMpdComponent,
        ContratAgepComponent,
        GererPgesComponent,
    ],
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
        GererMpdModule,
        GererAgepModule
    ],
    exports: [
        MenageBeneficiaireActComponent,
        MenagePreselectionneActComponent
    ]
})
export class ActModule {}
