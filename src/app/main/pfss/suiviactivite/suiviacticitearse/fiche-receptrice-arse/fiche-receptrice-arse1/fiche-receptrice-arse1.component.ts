import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "../../../../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-fiche-receptrice-arse1",
    templateUrl: "./fiche-receptrice-arse1.component.html",
    styleUrls: ["./fiche-receptrice-arse1.component.scss"],
})
export class FicheReceptriceArse1Component implements OnInit {
    form_export_fiche_receptrice: FormGroup;
    fiche_receptrice: any = {};
    all_fiche_receptrice: any[];
    search_fiche_receptrice = "";
    all_ile: any = [];
    all_region: any = [];
    all_commune: any = [];
    all_village: any = [];
    all_agep: any = [];
    config: any;
    show_input_purcentage: boolean = true;
    loading = false;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {}
    @ViewChild("aucun_fiche_receptrice", { static: true })
    aucun_fiche_receptrice: TemplateRef<any>;
    ngOnInit(): void {
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || "");
        this.setParamsByUrl(currentPath);

        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("agence_p").subscribe((res) => {
            this.all_agep = res.response;
        });
        this.form_export_fiche_receptrice = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            zip: ["", Validators.required],
            agep_id: ["", Validators.required],
            pourcentage: [""],
            montant_a_payer: ["", Validators.required],
        });
    }
    setParamsByUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/suivi-activite/ariep/fiche-receptrice/premier-fiche-receptrice": {
                titre: " Premier tranche",
                numero_tranche: 1,
                sous_projet: " ARIEP ",
                etape_id: 1,
                id_sous_projet: 2,
                show_input_purcentage: true,
            },
            "/suivi-activite/ariep/fiche-receptrice/deuxieme-fiche-receptrice":
                {
                    titre: " Deuxième Tranche",
                    numero_tranche: 2,
                    sous_projet: " ARIEP ",
                    etape_id: 2,
                    id_sous_projet: 2,
                    show_input_purcentage: true,
                },
            "/suivi-activite/ariep/fiche-receptrice/troisieme-fiche-receptrice":
                {
                    titre: " Troisième Tranche",
                    numero_tranche: 3,
                    sous_projet: " ARIEP ",
                    etape_id: 3,
                    id_sous_projet: 2,
                    show_input_purcentage: true,
                },
            "/suivi-activite/ariep/fiche-receptrice/quatrieme-fiche-receptrice":
                {
                    titre: " Fond de soutien",
                    numero_tranche: 4,
                    sous_projet: " ARIEP ",
                    etape_id: 11,
                    id_sous_projet: 2,
                    show_input_purcentage: false,
                },
            "/suivi-activite/tms/fiche-receptrice/premier-fiche-receptrice": {
                titre: " Premier Tranche",
                numero_tranche: 1,
                sous_projet: " TMS",
                etape_id: 6,
                id_sous_projet: 4,
                show_input_purcentage: false,
            },
            "/suivi-activite/tms/fiche-receptrice/deuxieme-fiche-receptrice": {
                titre: " Deuxième Tranche",
                numero_tranche: 2,
                sous_projet: " TMS",
                etape_id: 7,
                id_sous_projet: 4,
                show_input_purcentage: false,
            },
            "/suivi-activite/tms/fiche-receptrice/troisieme-fiche-receptrice": {
                titre: " Troisième Tranche",
                numero_tranche: 3,
                sous_projet: " TMS",
                etape_id: 8,
                id_sous_projet: 4,
                show_input_purcentage: false,
            },
        };
        if (url in urlMapping) {
            Object.assign(this.fiche_receptrice, urlMapping[url]);
            this.index_api
                .getAPIgeneraliserREST(
                    "phaseexecution",
                    "id",
                    this.fiche_receptrice.etape_id
                )
                .subscribe((res) => {
                    this.fiche_receptrice.montant_a_payer = parseInt(
                        res.response[0].indemnite
                    );
                    this.fiche_receptrice.pourcentage = parseInt(
                        res.response[0].pourcentage
                    );
                    this.fiche_receptrice.tranche = parseInt(
                        res.response[0].Phase
                    );
                });
        }
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.fiche_receptrice.id_ile
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
                this.fiche_receptrice.id_region
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
                this.fiche_receptrice.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtre_zip() {
        this.fiche_receptrice.zip = null;

        const zip = this.all_village.find(
            (vil) =>
                parseInt(vil.id) === parseInt(this.fiche_receptrice.village_id)
        );

        if (zip) {
            // this.fiche_receptrice.village = village.Village;
            this.fiche_receptrice.zip = zip.id_zip;
        }
    }
    filtrerFicheReceptrice() {
        this.loading = true;
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "fiche_recepteur",
                1,
                "village_id",
                this.fiche_receptrice.village_id,
                "id_sous_projet",
                this.fiche_receptrice.id_sous_projet
            )
            .subscribe((res) => {
                this.all_fiche_receptrice = res.response;
                this.loading = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_fiche_receptrice, {
                        disableClose: true,
                    });
                }
            });
    }

    closeDialog() {
        this.dialog.closeAll();
    }
}
