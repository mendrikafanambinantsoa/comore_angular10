import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportFicheEtatPaiementPaiement2Component } from "./export-fiche-etat-paiement-paiement2/export-fiche-etat-paiement-paiement2.component";
import { ExportFicheEtatPresencePaiement2Component } from "./export-fiche-etat-presence-paiement2/export-fiche-etat-presence-paiement2.component";
import { ImportEtatPaiement2Component } from "./import-etat-paiement2/import-etat-paiement2.component";
import { ImportEtatPresencePaiement2Component } from "./import-etat-presence-paiement2/import-etat-presence-paiement2.component";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";
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
import { RouterModule, Routes } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { PremierPaiementModule } from "../premier-paiement/premier-paiement.module";

const routes: Routes = [
    {
        path: "suivi-activite/actr/deuxieme-paiement/export-fiche-de-presence",
        component: ExportFicheEtatPresencePaiement2Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Deuxieme paiement / Export fiche de presence'
        }
    },
    {
        path: "suivi-activite/actr/deuxieme-paiement/enregistrer-etat-de-presence",
        component: ImportEtatPresencePaiement2Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Deuxieme paiement / Enregistrer etat de presence'
        }
    },
    // {
    //     path: "suivi-activite/actr/deuxieme-paiement/export-fiche-etat-de-paiement",
    //     component: ExportFicheEtatPaiementPaiement2Component,
    //     canActivate: [AuthGuard],
    //     data: { titre: "Deuxième paiement", etape_id: 5 },
    // },
    // {
    //     path: "suivi-activite/actr/deuxieme-paiement/enregistrer-etat-de-paiement",
    //     component: ImportEtatPaiement2Component,
    //     canActivate: [AuthGuard],
    // },
];

@NgModule({
    declarations: [
        ExportFicheEtatPaiementPaiement2Component,
        ExportFicheEtatPresencePaiement2Component,
        ImportEtatPaiement2Component,
        ImportEtatPresencePaiement2Component,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FuseSharedModule,
        FuseWidgetModule,
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
        RouterModule.forChild(routes),
        MatProgressBarModule,
        PremierPaiementModule
    ]
})
export class DeuxiemePaiementModule {}
