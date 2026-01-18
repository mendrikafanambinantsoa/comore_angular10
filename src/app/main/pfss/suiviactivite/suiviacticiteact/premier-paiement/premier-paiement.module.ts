import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportFicheEtatPaiementComponent } from "./export-fiche-etat-paiement/export-fiche-etat-paiement.component";
import { ExportFicheEtatPresenceComponent } from "./export-fiche-etat-presence/export-fiche-etat-presence.component";
import { ImportEtatPaiementComponent } from "./import-etat-paiement/import-etat-paiement.component";
import { ImportEtatPresenceComponent } from "./import-etat-presence/import-etat-presence.component";
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

const routes: Routes = [
    {
        path: "suivi-activite/actr/premier-paiement/export-fiche-de-presence",
        component: ExportFicheEtatPresenceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite /Actr / Premier paiement / Export fiche de presence'
        }
    },
    {
        path: "suivi-activite/actr/premier-paiement/enregistrer-etat-de-presence",
        component: ImportEtatPresenceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite /Actr / Premier paiement / Enregistre etat de presence'
        }
    },
    {
        path: "suivi-activite/actr/premier-paiement/export-fiche-etat-de-paiement",
        component: ExportFicheEtatPaiementComponent,
        canActivate: [AuthGuard],
        data: { titre: "Premier Paiement", etape_id: 4, enable_tabs: true,breadcrumb: 'Suivi activite / Actr / Premier paiement / Export fiche etat de paiement' },
    },
    {
        path: "suivi-activite/actr/deuxieme-paiement/export-fiche-etat-de-paiement",
        component: ExportFicheEtatPaiementComponent,
        canActivate: [AuthGuard],
        data: {
            titre: "Deuxième paiement",
            etape_id: 5,breadcrumb: 'Suivi activite / Actr / Deuxieme paiement / Export fiche etat de paiement'
        },
    },
    {
        path: "suivi-activite/actr/troisieme-paiement/export-fiche-etat-de-paiement",
        component: ExportFicheEtatPaiementComponent,
        canActivate: [AuthGuard],
        data: { titre: "Troisième paiement", etape_id: 12 ,breadcrumb: 'Suivi activite / Actr / Troisieme paiement / Export fiche etat de paiement'},
    },
    //enregistrer etat paiement
    {
        path: "suivi-activite/actr/premier-paiement/enregistrer-etat-de-paiement",
        component: ImportEtatPaiementComponent,
        canActivate: [AuthGuard],
         data: {
            titre: "Premier paiement",
            etape_id: 4,
            breadcrumb: 'Suivi activite / Actr / Premier paiement / Enregistrer etat de paiement'
        },
    },
    {
        path: "suivi-activite/actr/deuxieme-paiement/enregistrer-etat-de-paiement",
        component: ImportEtatPaiementComponent,
        canActivate: [AuthGuard],
         data: {
            titre: "Deuxième paiement",
            etape_id: 5,
            breadcrumb: 'Suivi activite / Actr / Deuxieme paiement / Enregistrer etat de paiement'
        },
    },
    {
        path: "suivi-activite/actr/troisieme-paiement/enregistrer-etat-de-paiement",
        component: ImportEtatPaiementComponent,
        canActivate: [AuthGuard],
         data: {
            titre: "Troisième paiement",
            etape_id: 12,
            breadcrumb: 'Suivi activite / Actr / Troisieme paiement / Enregistrer etat de paiement'
        },
    }
];

@NgModule({
    declarations: [
        ExportFicheEtatPaiementComponent,
        ExportFicheEtatPresenceComponent,
        ImportEtatPaiementComponent,
        ImportEtatPresenceComponent,
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
    ],
    exports: [
        ExportFicheEtatPresenceComponent,
        ImportEtatPresenceComponent,
        ExportFicheEtatPaiementComponent,
        ImportEtatPaiementComponent,
    ],
})
export class PremierPaiementModule {}
