import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaccAriepLivrableOngEncadrementComponent } from "./macc-ariep-livrable-ong-encadrement.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
const routes: Routes = [
    {
        path: "macc/ariep/livrable-ong-encadrement",
        component: MaccAriepLivrableOngEncadrementComponent,
        canActivate: [AuthGuard],
        data: {
            title: "Livrable Ong Encadrement",
            breadcrumb: "Livrable Ong Encadrement",
            type: "ARIEP",
        },
    },
];

@NgModule({
    declarations: [MaccAriepLivrableOngEncadrementComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        FlexLayoutModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxDatatableModule,
        MatProgressBarModule,
        MatDividerModule,
        MatTabsModule,
    ],
})
export class MaccAriepLivrableOngEncadrementModule {}
