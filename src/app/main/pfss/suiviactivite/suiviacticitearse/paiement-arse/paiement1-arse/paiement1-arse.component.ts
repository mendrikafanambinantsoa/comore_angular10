import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { ConstantService } from "../../../../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-paiement1-arse",
    templateUrl: "./paiement1-arse.component.html",
    styleUrls: ["./paiement1-arse.component.scss"],
})
export class Paiement1ArseComponent implements OnInit {
    // etat de paiement
    all_ile: any = [];
    all_region: any = [];
    all_commune: any = [];
    all_village: any = [];
    form_etat_paiement: FormGroup;
    etat_paiement: any = {};
    all_etat_paiement: any[];
    search_etat_paiement = "";
    show_input_purcentage: boolean = true;
    loading_etat_paiement: boolean = false;
    @ViewChild("aucun_etat_paiement", { static: true })
    aucun_etat_paiement: TemplateRef<any>;

    //liste etat de paiement deja importer
    show_onglet_liste_paiement: boolean = false;
    form_liste_paiement_importe: FormGroup;
    liste_paiement_importe: any = {};
    all_liste_paiement_importe: any[];
    search_liste_paiement_importe = "";
    all_agep: any = [];
    all_etape: any = [];
    loading_liste_paiement: boolean = false;
    show_btn_delete_liste_paiement: boolean = false;
    @ViewChild("aucun_liste_paiement", { static: true })
    aucun_liste_paiement: TemplateRef<any>;
    @ViewChild("supprimer_liste_paiement", { static: true })
    supprimer_liste_paiement: TemplateRef<any>;
    selected_item_liste_paiement: any = [];

    //autres
    config: any;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        // etat de paiement
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.form_etat_paiement = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
            zip: ["", Validators.required],
            tranche: ["", Validators.required],
            pourcentage: [""],
            montant_a_payer: ["", Validators.required],
        });
        //liste etat de paiement deja importer
        this.index_api.getAll("agence_p").subscribe((res) => {
            this.all_agep = res.response;
        });
        // this.getAgepBySousProjet();
        this.form_liste_paiement_importe = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agep_id: [""],
            etape_id: [""],
        });
        //autres
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || "");
        this.setParamsByUrl(currentPath);
    }

    // etat de paiement
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.etat_paiement.id_ile
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
                this.etat_paiement.id_region
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
                this.etat_paiement.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtre_zip() {
        this.etat_paiement.zip = null;

        const zip = this.all_village.find(
            (vil) =>
                parseInt(vil.id) === parseInt(this.etat_paiement.village_id)
        );

        if (zip) {
            // this.etat_paiement.village = village.Village;
            this.etat_paiement.zip = zip.id_zip;
        }
    }
    filtrerEtatPaiement() {
        this.loading_etat_paiement = true;
    }

    //liste etat de paiement deja importer
    filtre_region_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.liste_paiement_importe.id_ile
            )
            .subscribe((res) => {
                this.all_region = res.response;
            });
    }
    filtre_commune_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                this.liste_paiement_importe.id_region
            )
            .subscribe((res) => {
                this.all_commune = res.response;
            });
    }
    filtre_village_liste() {
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                this.liste_paiement_importe.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }

    filtrerListePaiementImporter() {
        this.loading_liste_paiement = true;
        this.index_api
            .getAPIgeneraliserREST(
                "fiche_paiement",
                "ile_id",
                this.liste_paiement_importe.id_ile,
                "id_region",
                this.liste_paiement_importe.id_region,
                "id_commune",
                this.liste_paiement_importe.id_commune,
                "village_id",
                this.liste_paiement_importe.village_id,
                "id_sous_projet",
                this.etat_paiement.id_sous_projet,
                "etape_id",
                this.etat_paiement.etape_id
            )
            .subscribe((res) => {
                this.all_liste_paiement_importe = res.response;
                this.loading_liste_paiement = false;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_liste_paiement, {
                        disableClose: true,
                    });
                }
            });
    }
    onSelectListePaiement(event: any) {
        this.selected_item_liste_paiement = event.selected[0];
        this.show_btn_delete_liste_paiement = true;
    }
    supprimerlistePaiement() {
        this.dialog.open(this.supprimer_liste_paiement, {
            disableClose: true,
        });
    }
    supprimerListePaiementOnBase() {}
    //autres
    setParamsByUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/suivi-activite/ariep/etat-paiement/premier-paiement": {
                titre: " Premier tranche de ",
                numero_tranche: 1,
                sous_projet: " ARIEP ",
                etape_id: 1,
                id_sous_projet: 2,
                show_input_purcentage: true,
                show_onglet_liste_paiement: false,
            },
            "/suivi-activite/ariep/etat-paiement/deuxieme-paiement": {
                titre: " Deuxième Tranche de ",
                numero_tranche: 2,
                sous_projet: " ARIEP ",
                etape_id: 2,
                id_sous_projet: 2,
                show_input_purcentage: true,
                show_onglet_liste_paiement: false,
            },
            "/suivi-activite/ariep/etat-paiement/troisieme-paiement": {
                titre: " Troisième Tranche de ",
                numero_tranche: 3,
                sous_projet: " ARIEP ",
                etape_id: 3,
                id_sous_projet: 2,
                show_input_purcentage: true,
                show_onglet_liste_paiement: false,
            },
            "/suivi-activite/ariep/etat-paiement/quatrieme-paiement": {
                titre: " Fond de soutien",
                numero_tranche: 4,
                sous_projet: " ARIEP ",
                etape_id: 11,
                id_sous_projet: 2,
                show_input_purcentage: false,
                show_onglet_liste_paiement: false,
            },
            "/suivi-activite/tms/etat-paiement/premier-paiement": {
                titre: " Premier Tranche",
                numero_tranche: 1,
                sous_projet: " TMS",
                etape_id: 6,
                id_sous_projet: 4,
                show_input_purcentage: false,
                show_onglet_liste_paiement: true,
            },
            "/suivi-activite/tms/etat-paiement/deuxieme-paiement": {
                titre: " Deuxième Tranche",
                numero_tranche: 2,
                sous_projet: " TMS",
                etape_id: 7,
                id_sous_projet: 4,
                show_input_purcentage: false,
                show_onglet_liste_paiement: true,
            },
            "/suivi-activite/tms/etat-paiement/troisieme-paiement": {
                titre: " Troisième Tranche",
                numero_tranche: 3,
                sous_projet: " TMS",
                etape_id: 8,
                id_sous_projet: 4,
                show_input_purcentage: false,
                show_onglet_liste_paiement: true,
            },
        };
        if (url in urlMapping) {
            Object.assign(this.etat_paiement, urlMapping[url]);
            this.index_api
                .getAPIgeneraliserREST(
                    "phaseexecution",
                    "id",
                    this.etat_paiement.etape_id
                )
                .subscribe((res) => {
                    this.etat_paiement.montant_a_payer = parseInt(
                        res.response[0].indemnite
                    );
                    this.etat_paiement.pourcentage = parseInt(
                        res.response[0].pourcentage
                    );
                    this.etat_paiement.tranche = res.response[0].Phase;
                    if (
                        this.etat_paiement.sous_projet == " TMS" ||
                        this.etat_paiement.titre === " Fond de soutien"
                    ) {
                        this.etat_paiement.affiche_titre = `${this.etat_paiement.titre}`;
                    } else {
                        this.etat_paiement.affiche_titre = `${this.etat_paiement.titre} ${res.response[0].pourcentage}%`;
                    }
                });
            this.index_api
                .getAPIgeneraliserREST(
                    "phaseexecution",
                    "cle_etrangere",
                    this.etat_paiement.id_sous_projet
                )
                .subscribe((res) => {
                    this.all_etape = res.response;
                });
        }
    }
    closeDialog() {
        this.dialog.closeAll();
    }
}
