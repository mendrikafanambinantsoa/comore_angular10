import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportFicheEtatPresencePaiement3Component } from "./export-fiche-etat-presence-paiement3/export-fiche-etat-presence-paiement3.component";
import { ExportFicheEtatPaiementPaiement3Component } from "./export-fiche-etat-paiement-paiement3/export-fiche-etat-paiement-paiement3.component";
import { ImportEtatPresencePaiement3Component } from "./import-etat-presence-paiement3/import-etat-presence-paiement3.component";
import { ImportEtatPaiement3Component } from "./import-etat-paiement3/import-etat-paiement3.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
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
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { PremierPaiementModule } from "../premier-paiement/premier-paiement.module";

const routes: Routes = [
    {
        path: "suivi-activite/actr/troisieme-paiement/export-fiche-de-presence",
        component: ExportFicheEtatPresencePaiement3Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Actr / Troisieme paiement / Export fiche de presence'
        }
    },
    {
        path: "suivi-activite/actr/troisieme-paiement/enregistrer-etat-de-presence",
        component: ImportEtatPresencePaiement3Component,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Actr / Troisieme paiement / Enregistrer etat de presence'
        }
    },
    // {
    //     path: "suivi-activite/actr/troisieme-paiement/export-fiche-etat-de-paiement",
    //     component: ExportFicheEtatPaiementPaiement3Component,
    //     canActivate: [AuthGuard],
    //     data: { titre: "Troisième paiement", etape_id: 12 },
    // },
    // {
    //     path: "suivi-activite/actr/troisieme-paiement/enregistrer-etat-de-paiement",
    //     component: ImportEtatPaiement3Component,
    //     canActivate: [AuthGuard],
    // },
];

@NgModule({
    declarations: [
        ExportFicheEtatPresencePaiement3Component,
        ExportFicheEtatPaiementPaiement3Component,
        ImportEtatPresencePaiement3Component,
        ImportEtatPaiement3Component,
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
export class TroisiemePaiementModule {}
