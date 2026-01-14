import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Fichereceptrice1TmsComponent } from "./fichereceptrice1-tms/fichereceptrice1-tms.component";
import { Fichereceptrice2TmsComponent } from "./fichereceptrice2-tms/fichereceptrice2-tms.component";
import { Fichereceptrice3TmsComponent } from "./fichereceptrice3-tms/fichereceptrice3-tms.component";
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
import { AuthGuard } from "../../../../../_helpers/auth.guard";
import { FicheReceptriceArseModule } from "../../suiviacticitearse/fiche-receptrice-arse/fiche-receptrice-arse.module";

const routes: Routes = [
    {
        path: "suivi-activite/tms/fiche-receptrice/premier-fiche-receptrice",
        component: Fichereceptrice1TmsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/tms/fiche-receptrice/deuxieme-fiche-receptrice",
        component: Fichereceptrice2TmsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "suivi-activite/tms/fiche-receptrice/troisieme-fiche-receptrice",
        component: Fichereceptrice3TmsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        Fichereceptrice1TmsComponent,
        Fichereceptrice2TmsComponent,
        Fichereceptrice3TmsComponent,
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
        FicheReceptriceArseModule
    ],
})
export class FicheReceptriceTmsModule {}
