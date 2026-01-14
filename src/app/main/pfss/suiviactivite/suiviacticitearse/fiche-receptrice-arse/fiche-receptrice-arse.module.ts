import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FicheReceptriceArse1Component } from "./fiche-receptrice-arse1/fiche-receptrice-arse1.component";
import { FicheReceptriceArse2Component } from "./fiche-receptrice-arse2/fiche-receptrice-arse2.component";
import { FicheReceptriceArse3Component } from "./fiche-receptrice-arse3/fiche-receptrice-arse3.component";
import { FicheReceptriceArse4Component } from "./fiche-receptrice-arse4/fiche-receptrice-arse4.component";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseWidgetModule } from "../../../../../../@fuse/components/widget/widget.module";
import { FuseSharedModule } from "../../../../../../@fuse/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
    {
        path: "suivi-activite/ariep/fiche-receptrice/premier-fiche-receptrice",
        component: FicheReceptriceArse1Component,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/fiche-receptrice/deuxieme-fiche-receptrice",
        component: FicheReceptriceArse2Component,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/fiche-receptrice/troisieme-fiche-receptrice",
        component: FicheReceptriceArse3Component,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/ariep/fiche-receptrice/quatrieme-fiche-receptrice",
        component: FicheReceptriceArse4Component,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations:  [FicheReceptriceArse1Component, FicheReceptriceArse2Component, FicheReceptriceArse3Component, FicheReceptriceArse4Component],
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
    exports : [FicheReceptriceArse1Component],
})
export class FicheReceptriceArseModule {}
