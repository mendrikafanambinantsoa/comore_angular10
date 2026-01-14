import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { GererAgepService } from "./gerer-agep.service";

@Component({
    selector: "app-gerer-agep",
    templateUrl: "./gerer-agep.component.html",
    styleUrls: ["./gerer-agep.component.scss"],
})
export class GererAgepComponent implements OnInit {
    config: any;
    // contrat agep
    allIle: any[] = [];
    allContrat_agep: any[] = [];
    allAgep: any[] = [];
    //avenant contrat agep

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        private gerer_agep_service: GererAgepService
    ) {}

    ngOnInit(): void {
        const url = this.route.snapshot.routeConfig.path;
        this.config = this.gerer_agep_service.getConfiguration(`/${url}`);
        this.index_api.getAll("ile").subscribe((resp_ile) => {
            this.allIle = resp_ile.response;
            this.index_api.getAll("Agence_p").subscribe((resp_agence) => {
                this.allAgep = resp_agence.response;
                this.index_api
                    .getAPIgeneraliserREST(
                        "contrat_agep",
                        "menu",
                        "getcontrat_agepBysousprojet",
                        "id_sous_projet",
                        this.config.id_sous_projet_state
                    )
                    .subscribe((resp_contrat_agep) => {
                        this.allContrat_agep = resp_contrat_agep.response;
                        console.log("all contrat agep", this.allContrat_agep);
                    });
            });
        });
    }
}
