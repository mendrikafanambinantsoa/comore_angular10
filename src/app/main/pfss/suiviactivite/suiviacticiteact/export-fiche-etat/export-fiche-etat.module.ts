import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportFicheEtatPaiementComponent } from "./export-fiche-etat-paiement/export-fiche-etat-paiement.component";
import { ExportFicheEtatPresenceComponent } from "./export-fiche-etat-presence/export-fiche-etat-presence.component";
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

const routes: Routes = [
    {
        path: "suivi-activite/ariep/etat-paiement/premier-paiement",
        component: ExportFicheEtatPaiementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/etat-paiement/deuxieme-paiement",
        component: ExportFicheEtatPresenceComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        ExportFicheEtatPaiementComponent,
        ExportFicheEtatPresenceComponent,
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
        MatProgressBarModule
    ],
    exports: [ExportFicheEtatPaiementComponent],
})
export class ExportFicheEtatModule {}
