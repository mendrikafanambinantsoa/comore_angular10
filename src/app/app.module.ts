import { ActModule } from "./main/pfss/act/act.module";
import { ArseModule } from "./main/pfss/arse/arse.module";
import { UtilisateurModule } from "./main/pfss/utilisateur/utilisateur.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { AuthModule } from "app/main/auth/auth.module";
import { AlertComponent } from "./_components/alert/alert.component";
import { AccueilModule } from "app/main/accueil/accueil.module";

/* AUTH */
import { JwtInterceptor } from "../app/_helpers/jwt.interceptor";
import { ErrorInterceptor } from "../app/_helpers/error.interceptor";
//import { AccueilComponent } from './main/accueil/accueil.component';
/* FIN AUTH */
import {
    MatDialogModule,
} from "@angular/material/dialog";

//import { TimeSheetModule } from './main/delta/time-sheet/time-sheet.module';
import { DdbModule } from "app/main/pfss/ddb/ddb.module";
import { TmsModule } from "./main/pfss/tms/tms.module";
import { GererAgepModule } from "./main/pfss/gerer-agep/gerer-agep.module";
import { ImportationModule } from "./main/pfss/importation/importation.module";
import { PlainteModule } from "./main/pfss/plainte/plainte.module";
import { AgexModule } from "./main/pfss/agex/agex.module";
import { SuiviactiviteModule } from "./main/pfss/suiviactivite/suiviactivite.module";
import { IndicateurModule } from "./main/pfss/indicateur/indicateur.module";
import { TableauDeBordAriepActrModule } from "./main/pfss/tableau-de-bord-ariep-actr/tableau-de-bord-ariep-actr.module";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MaccSensibilisationMenageModule } from './main/pfss/macc-sensibilisation-menage/macc-sensibilisation-menage.module';
import { MaccAriepLivrableOngEncadrementModule } from "./main/pfss/macc/macc-ariep-livrable-ong-encadrement/macc-ariep-livrable-ong-encadrement.module";
import { AppCardComponent } from './shared/ui/app-card/app-card.component';

const appRoutes: Routes = [
    {
        path: "**",
        redirectTo: "accueil",
    },
];
//export const appRoutingModule = RouterModule.forRoot(appRoutes);
@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        AppCardComponent,
        // AccueilComponent,
        //ProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AuthModule,
        MatDialogModule,
        AccueilModule,
        DdbModule,
        UtilisateurModule,
        ArseModule,
        ActModule,
        TmsModule,
        GererAgepModule,
        ImportationModule,
        PlainteModule,
        AgexModule,
        SuiviactiviteModule,
        IndicateurModule,
        TableauDeBordAriepActrModule,
        MatProgressBarModule,
        MaccSensibilisationMenageModule,
        MaccAriepLivrableOngEncadrementModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}