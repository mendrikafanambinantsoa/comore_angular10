import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImportPlanResilienceComponent } from "./import-plan-resilience/import-plan-resilience.component";
import { AuthGuard } from "app/_helpers/auth.guard";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FuseSharedModule } from "@fuse/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { FuseWidgetModule } from "@fuse/components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";

const routes: Routes = [
    {
        path: "importation/plan-de-resilience",
        component: ImportPlanResilienceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Importation / Plan de resilience'
        }
    },
];

@NgModule({
    declarations: [ImportPlanResilienceComponent],
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
        MatSelectModule
    ],
})
export class PlanResilienceModule {}
