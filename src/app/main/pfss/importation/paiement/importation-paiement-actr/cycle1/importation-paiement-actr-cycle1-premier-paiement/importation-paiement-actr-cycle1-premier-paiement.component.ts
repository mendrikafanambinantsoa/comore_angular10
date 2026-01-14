import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IndexApiService } from "../../../../../../../_services/index-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantService } from "../../../../../../../_services/constant.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-importation-paiement-actr-cycle1-premier-paiement",
    templateUrl:
        "./importation-paiement-actr-cycle1-premier-paiement.component.html",
    styleUrls: [
        "./importation-paiement-actr-cycle1-premier-paiement.component.scss",
    ],
})
export class ImportationPaiementActrCycle1PremierPaiementComponent
    implements OnInit
{
    //importation etat de paiement actr
    form_import_paiement: FormGroup;
    import_paiement: any = {
        titre: "",
        etape_id: 0,
        cycle: 0,
        affiche_titre: "",
        numero_tranche: 0,
        numero_paiement: 0,
        indemnite: 0,
        pourcentage: 0,
        tranche: "",
    };
    search_etat_paiement = "";
    all_beneficiaires: any = [];

    //liste de paiement actr deja enregistre
    all_ile: any = [];
    all_region: any = [];
    all_sous_projet: any = [];
    all_agex: any = [];
    all_agep: any = [];
    all_etape: any = [];
    all_annee: any = [];
    all_commune: any = [];
    all_village: any = [];
    liste_etat_paiment_form: FormGroup;
    liste_etat_paiement: any = [];
    all_liste_etat_paiement: any = [];
    @ViewChild("aucun_etat_paiement", { static: true })
    aucun_etat_paiement_template: TemplateRef<any>;
    search_liste_paiement_importe = "";
    selected_item_paiement_importe: any = {};
    show_btn_supprimer_paiement_deja_importe = false;
    @ViewChild("supprimer_paiement", { static: true })
    supprimer_paiement: TemplateRef<any>;
     @ViewChild("suppression_reussie", { static: true })
    suppression_reussie: TemplateRef<any>;
     @ViewChild("suppression_echouee", { static: true })
    suppression_echouee: TemplateRef<any>;

    //autres
    id_sous_projet: number = 1;
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        //importation etat de paiement actr
        this.form_import_paiement = this.form_builder.group({
            indemnite: ["", Validators.required],
        });

        //liste de paiement actr deja enregistre
        this.index_api.getAll("ile").subscribe((res_ile) => {
            this.all_ile = res_ile.response;
        });
        this.index_api.getAll("region").subscribe((res_region) => {
            this.all_region = res_region.response;
        });
        this.index_api.getAll("sous_projet").subscribe((res_sp) => {
            this.all_sous_projet = res_sp.response;
        });
        this.index_api.getAll("annee").subscribe((res_annee) => {
            this.all_annee = res_annee.response;
        });
        this.index_api.getAll("agex").subscribe((res_agex) => {
            this.all_agex = res_agex.response;
        });
        this.index_api.getAll("agence_p").subscribe((res_agep) => {
            this.all_agep = res_agep.response;
        });
        this.index_api
            .getAPIgeneraliserREST(
                "phaseexecution",
                "cle_etrangere",
                this.id_sous_projet
            )
            .subscribe((res_etape) => {
                this.all_etape = res_etape.response;
            });
        this.liste_etat_paiment_form = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agep_id: [""],
            id_annee: [""],
            etape_id: [""],
        });
        this.liste_etat_paiement = {};
        //autres
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || ""); // Récupérer le chemin actuel
        this.setFiltreValuesBasedOnUrl(currentPath);
    }

    //importation etat de paiement actr

    //liste de paiement actr deja enregistre
    filtrer_liste_etat_paiement(): void {
        this.index_api
            .getAPIgeneraliserREST(
                "requete_export",
                "liste_etat_paiement",
                1,
                "ile_id",
                this.liste_etat_paiement.id_ile,
                "id_region",
                this.liste_etat_paiement.id_region,
                "id_commune",
                this.liste_etat_paiement.id_commune,
                "village_id",
                this.liste_etat_paiement.village_id,
                "id_sous_projet",
                this.id_sous_projet,
                "agep_id",
                this.liste_etat_paiement.agep_id,
                "id_annee",
                this.liste_etat_paiement.id_annee,
                "etape_id",
                this.liste_etat_paiement.etape_id
            )
            .subscribe((res) => {
                this.all_liste_etat_paiement = res.response;
                if (res.response == 0) {
                    this.dialog.open(this.aucun_etat_paiement_template, {
                        disableClose: true,
                    });
                }
            });
    }
    on_selection_liste_paiement_importe(event: any) {
        this.selected_item_paiement_importe = event.selected[0];
        this.show_btn_supprimer_paiement_deja_importe = true;
    }
    supprimerPaiement(): void {
        this.dialog.open(this.supprimer_paiement, {
            disableClose: true,
        });
    }
    deletePaiementImporteOnBase() {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            const datas = {
                supprimer: 1,
                id: this.selected_item_paiement_importe.id,
                id_sous_projet: this.id_sous_projet,
                fichepresence_id:
                    this.selected_item_paiement_importe.fichepresence_id,
                village_id: this.selected_item_paiement_importe.village_id,
                agep_id: this.selected_item_paiement_importe.agep_id,
                id_annee: this.selected_item_paiement_importe.id_annee,
                etape_id: this.selected_item_paiement_importe.etape_id,
            };
            this.index_api
                .add("Fiche_paiement", this.serializeData(datas), config)
                .subscribe(
                    (res: any) => {
                        if (res.success) {
                            this.dialog.open(
                                this.suppression_reussie,
                                {
                                    disableClose: true,
                                }
                            );
                            this.liste_etat_paiement =
                                this.liste_etat_paiement.filter(
                                    (item) =>
                                        item.id !==
                                        this.selected_item_paiement_importe.id
                                );
                            this.selected_item_paiement_importe = {};
                            this.dialog.closeAll();
                        } else {
                            this.dialog.open(
                                this.suppression_echouee,
                                {
                                    disableClose: true,
                                }
                            );
                        }
                    },
                    (error) => {
                        console.error("Erreur API :", error);
                        alert(
                            "Une erreur s'est produite lors de la suppression !"
                        );
                    }
                );
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.liste_etat_paiement.id_ile
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
                this.liste_etat_paiement.id_region
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
                this.liste_etat_paiement.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }

    //autres
    setFiltreValuesBasedOnUrl(url: string): void {
        const urlMapping: { [key: string]: any } = {
            "/importation/paiement/actr/cycle1/premier-paiement": {
                titre: "Cycle 1/Premier paiement",
                etape_id: 4,
                cycle: 1,
                affiche_titre: "Paiement N° 1/ Cycle 1",
                numero_tranche: 1,
                numero_paiement: 1,
            },
            "/importation/paiement/actr/cycle1/deuxieme-paiement": {
                titre: "Cycle 1/Deuxième paiement",
                etape_id: 5,
                cycle: 1,
                affiche_titre: "Paiement N° 2/ Cycle 1",
                numero_tranche: 2,
                numero_paiement: 2,
            },
            "/importation/paiement/actr/cycle2/premier-paiement": {
                titre: "Cycle 2/Premier paiement",
                etape_id: 4,
                cycle: 2,
                affiche_titre: "Paiement N° 1/ Cycle 2",
                numero_tranche: 1,
                numero_paiement: 1,
            },
            "/importation/paiement/actr/cycle2/deuxieme-paiement": {
                titre: "Cycle 2/Deuxième paiement",
                etape_id: 5,
                cycle: 2,
                affiche_titre: "Paiement N° 2/ Cycle 2",
                numero_tranche: 2,
                numero_paiement: 2,
            },
            "/importation/paiement/actr/troisieme-paiement": {
                titre: "Troisième paiement",
                etape_id: 12,
                affiche_titre: "Paiement N° 3",
                numero_tranche: 3,
                numero_paiement: 3,
            },
        };

        if (url in urlMapping) {
            Object.assign(this.import_paiement, urlMapping[url]);
            this.getAPIData(this.import_paiement.etape_id);
        }
    }
    getAPIData(etapeId: number): void {
        this.index_api
            .getAPIgeneraliserREST("Phaseexecution", "id", etapeId)
            .subscribe((res) => {
                this.import_paiement.indemnite = parseInt(
                    res.response[0].indemnite
                );
                this.import_paiement.pourcentage = parseInt(
                    res.response[0].pourcentage
                );
                this.import_paiement.tranche = res.response[0].Phase;
            });
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    serializeData(data: any): string {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    }
    // private serializeData(data: any) {
    //     var buffer = [];
    //     // Serialize each key in the object.
    //     for (var name in data) {
    //         if (!data.hasOwnProperty(name)) {
    //             continue;
    //         }
    //         var value = data[name];
    //         buffer.push(
    //             encodeURIComponent(name) +
    //                 "=" +
    //                 encodeURIComponent(value == null ? "" : value)
    //         );
    //     }
    //     // Serialize the buffer and clean it up for transportation.
    //     var source = buffer.join("&").replace(/%20/g, "+");
    //     return source;
    // }
}
