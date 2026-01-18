import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
        path: "suivi-activite/ariep/etat-paiement/premier-paiement",
        component: ImportEtatPaiementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Ariep / Etat paiement / Premier paiement'
        }
    },
    {
        path: "suivi-activite/ariep/etat-paiement/deuxieme-paiement",
        component: ImportEtatPresenceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Suivi activite / Ariep / Etat paiement / Deuxieme paiement'
        }
    },
];

@NgModule({
    declarations: [ImportEtatPaiementComponent, ImportEtatPresenceComponent],
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
    exports: [ImportEtatPaiementComponent]
})
export class ImportEtatModule {}
