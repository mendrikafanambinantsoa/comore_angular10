import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-fiche-travailleur",
    templateUrl: "./fiche-travailleur.component.html",
    styleUrls: ["./fiche-travailleur.component.scss"],
})
export class FicheTravailleurComponent implements OnInit {
    filtre: FormGroup;
    all_ile: any[] = [];
    all_region: any[] = [];
    all_commune: any[] = [];
    all_village: any[] = [];
    fiche_travailleur: any = {
        id_ile: null,
        id_region: null,
        id_commune: null,
        village_id: null,
        zip: "",
        vague: "",
    };
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService
    ) {}

    ngOnInit(): void {
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.filtre = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            zip: [""],
            vague: [""],
        });
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.fiche_travailleur.id_ile
            )
            .subscribe((res) => {
                this.all_region = res.response;
            });
    }
    filtre_commune() {
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.fiche_travailleur.id_region
            )
            .subscribe((res) => {
                this.all_commune = res.response;
            });
    }
    filtre_village() {
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.fiche_travailleur.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    onVillageChange(event) {
        const villageId = event.value;
        console.log("id village selectionne", villageId);
        const village = this.all_village.find((v) => v.id === villageId);

        if (village && village.zip_code !== null) {
            this.filtre.patchValue({
                zip: village.zip_code,
                vague: village.vague,
            });
        } else {
            this.filtre.patchValue({
                zip: "",
                vague: "",
            });
        }
    }
    export_excel() {
    const repertoire = "fichetravailleur/";

    }
}
