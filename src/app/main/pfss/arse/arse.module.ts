import { MenageInscritArseComponent } from "./menage-inscrit-arse/menage-inscrit-arse.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/_helpers/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components";
import { MenagePreselectionneArseComponent } from "./menage-preselectionne-arse/menage-preselectionne-arse.component";
import { MenageBeneficiaireArseComponent } from "./menage-beneficiaire-arse/menage-beneficiaire-arse.component";
import { CarteBeneficiaireComponent } from "./carte-beneficiaire/carte-beneficiaire.component";
import { ArseGererMpdComponent } from "./arse-gerer-mpd/arse-gerer-mpd.component";
import { ContratAgepComponent } from "./contrat-agep/contrat-agep.component";
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
import { ActModule } from "../act/act.module";
import { GererMpdModule } from '../gerer-mpd/gerer-mpd.module';
import { GererAgepModule } from "../gerer-agep/gerer-agep.module";

const routes: Routes = [
    {
        path: "arse/menage-inscrit-arse",
        component: MenageInscritArseComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Arse / Menage inscrit arse'
        }
    },
    {
        path: "ariep/menage-preselectionne-ariep",
        component: MenagePreselectionneArseComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Ariep / Menage preselection ariep'
        }
    },
    {
        path: "ariep/menage-beneficiaire-ariep",
        component: MenageBeneficiaireArseComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Ariep / Menage beneficiaire ariep'
        }
    },
    {
        path: "ariep/carte-beneficiaire",
        component: CarteBeneficiaireComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Ariep / Carte beneficiaire'
        }
    },
    {
        path: "ariep/gerer-mpd",
        component: ArseGererMpdComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Ariep / Gerer mpd'
        }
    },
    {
        path: "ariep/contrat_agep",
        component: ContratAgepComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Ariep / Contrat Agep'
        }
    },
];

@NgModule({
    declarations: [
        MenagePreselectionneArseComponent,
        MenageBeneficiaireArseComponent,
        CarteBeneficiaireComponent,
        ArseGererMpdComponent,
        ContratAgepComponent,
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
        ActModule,
        GererMpdModule,
        GererAgepModule
    ],
})
export class ArseModule {}
