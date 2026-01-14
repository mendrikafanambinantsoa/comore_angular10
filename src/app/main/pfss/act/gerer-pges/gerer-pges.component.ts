import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../actr-service.service";

@Component({
    selector: "app-gerer-pges",
    templateUrl: "./gerer-pges.component.html",
    styleUrls: ["./gerer-pges.component.scss"],
})
export class GererPgesComponent implements OnInit {
    filtre: FormGroup;
    all_ile: any[] = [];
    all_region: any[] = [];
    all_commune: any[] = [];
    all_village: any[] = [];
    config: any;
    allType_infrastructure: any[] = [];
    all_bureau_etude: any[] = [];
    search_pges = "";
    selected: any = [];
    filtre_gerer_pges: any = {
        id_ile: null,
        id_region: null,
        id_commune: null,
        village_id: null,
        zip: "",
        vague: "",
    };
    allPges: any[] = [];

    @ViewChild("aucun_pges_pour_village", { static: true })
    aucun_pges_pour_village: TemplateRef<any>;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private actr_service: ActrServiceService
    ) {}

    ngOnInit(): void {
        const url = this.route.snapshot.routeConfig.path;
        this.config = this.actr_service.getConfiguration(`/${url}`);
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("type_infrastructure").subscribe((res) => {
            this.allType_infrastructure = res.response;
        });
        this.index_api.getAll("bureau_etude").subscribe((res) => {
            this.all_bureau_etude = res.response;
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
                this.filtre_gerer_pges.id_ile
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
                this.filtre_gerer_pges.id_region
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
                this.filtre_gerer_pges.id_commune
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
            this.filtre_gerer_pges.patchValue({
                zip: village.zip_code,
                vague: village.vague,
            });
        } else {
            this.filtre_gerer_pges.patchValue({
                zip: "",
                vague: "",
            });
        }
    }

    get_pges() {
        this.index_api
            .getAPIgeneraliserREST(
                "pges",
                "menu",
                "getpgesBysousprojetvillage",
                "id_village",
                this.filtre_gerer_pges.id_village,
                "id_sous_projet",
                this.config.id_sous_projet
            )
            .subscribe((res) => {
                this.allPges = res.response;
                console.log(this.allPges);
                if (res.response == 0) {
                    this.dialog.open(this.aucun_pges_pour_village, {
                        disableClose: true,
                    });
                }
            });
    }
    on_select_pges(event) {

    }
    closeDialog() {
        this.dialog.closeAll();
    }
    export_excel() {}
}
