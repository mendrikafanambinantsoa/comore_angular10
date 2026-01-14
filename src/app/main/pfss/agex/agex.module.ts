import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, CanActivate, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { AuthGuard } from "../../../_helpers/auth.guard";
import { AgexComponent } from "../agex/agex.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const routes: Routes = [
    {
        path: "agex",
        component: AgexComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [AgexComponent],
    imports: [
        CommonModule,
        MatIconModule,
        BrowserModule,
        FuseSharedModule,
        FuseWidgetModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTabsModule,
        MatInputModule,
        NgxDatatableModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
    ],
    exports: [MatIconModule],
})
export class AgexModule {}