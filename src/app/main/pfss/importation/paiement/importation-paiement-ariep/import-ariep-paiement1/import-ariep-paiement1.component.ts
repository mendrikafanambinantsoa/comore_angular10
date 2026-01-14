import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IndexApiService } from "../../../../../../_services/index-api.service";
import { ConstantService } from "../../../../../../_services/constant.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-import-ariep-paiement1",
    templateUrl: "./import-ariep-paiement1.component.html",
    styleUrls: ["./import-ariep-paiement1.component.scss"],
})
export class ImportAriepPaiement1Component implements OnInit {
    form_import_paiement: FormGroup;
    filtre_form: FormGroup;
    afficher_champ_pourcentage: boolean = true;
    paiement: any;
    all_agep: any[];
    all_annee: any;
    all_etape: any;
    all_menage_beneficiaire: any;
    all_ile: any;
    all_region: any;
    all_commune: any;
    all_village: any;
    all_etat_paiement: any;
    selected_item_paiement_importe: any;
    show_btn_supprimer_paiement_deja_importe: boolean;
    search_etat_paiement = "";
    search_liste_paiement_importe = "";
    import_paiement: any = {
        titre: "",
        numero_tranche: 0,
        id_sous_projet: 0,
        sous_projet: "",
        etape_id: 0,
        montant_a_payer: 0,
        pourcentage: 0,
        tranche: "",
        affiche_titre: "",
        agep_id: null,
        id_ile: null,
        id_region: null,
        id_commune: null,
        village_id: null,
    };
    filtredetail: any = {
        etape_id: 0,
    };
    config: any;
    myFile: FileList | null = null; // Contiendra les fichiers sélectionnés
    monfichier: string | null = null; // Nom du fichier sélectionné
    selectedFile: File | null = null; // Fichier sélectionné
    public fileName = "";

    // Configuration centralisée
    private configurations: { [key: string]: any } = {
        "/importation/paiement/ariep/premier-paiement": {
            titre: "Premier Tranche",
            numero_tranche: 1,
            id_sous_projet: 2,
            sous_projet: "ARIEP",
            etape_id: 1,
            numero_paiement: 1,
            controller: "phaseexecution",
            key: "id",
            value: 1,
            affiche_titre_prefix: "Premier Tranche de",
        },
        "/importation/paiement/ariep/deuxieme-paiement": {
            titre: "Deuxième tranche",
            numero_tranche: 2,
            id_sous_projet: 2,
            sous_projet: "ARIEP",
            etape_id: 2,
            numero_paiement: 2,
            controller: "phaseexecution",
            key: "id",
            value: 2,
            affiche_titre_prefix: "Deuxième Tranche de",
        },
        "/importation/paiement/ariep/troisieme-paiement": {
            titre: "Troisième tranche",
            numero_tranche: 3,
            id_sous_projet: 2,
            sous_projet: "ARIEP",
            etape_id: 3,
            numero_paiement: 3,
            controller: "phaseexecution",
            key: "id",
            value: 3,
            affiche_titre_prefix: "Troisième Tranche de",
        },
        "/importation/paiement/ariep/quatrieme-paiement": {
            titre: "Fond de soutien",
            numero_tranche: 4,
            id_sous_projet: 2,
            sous_projet: "ARIEP",
            etape_id: 11,
            numero_paiement: 4,
            controller: "phaseexecution",
            key: "id",
            value: 11,
            affiche_titre_prefix: "Fond de soutien",
        },
        "/importation/paiement/tms/premier-paiement": {
            titre: "Première tranche",
            numero_tranche: 1,
            id_sous_projet: 4,
            sous_projet: "TMS",
            etape_id: 6,
            numero_paiement: 1,
            controller: "phaseexecution",
            key: "id",
            value: 6,
            affiche_titre_prefix: "Premier Tranche",
        },
        "/importation/paiement/tms/deuxieme-paiement": {
            titre: "Deuxième Tranche",
            numero_tranche: 2,
            id_sous_projet: 4,
            sous_projet: "TMS",
            etape_id: 7,
            numero_paiement: 2,
            controller: "phaseexecution",
            key: "id",
            value: 7,
            affiche_titre_prefix: "Deuxième Tranche",
        },
        "/importation/paiement/tms/troisieme-paiement": {
            titre: " Troisième Tranche",
            numero_tranche: 3,
            id_sous_projet: 4,
            sous_projet: "TMS",
            etape_id: 8,
            numero_paiement: 3,
            controller: "phaseexecution",
            key: "id",
            value: 8,
            affiche_titre_prefix: "Troisième Tranche",
        },
    };
    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public constant_service: ConstantService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}
    @ViewChild("aucun_etat_paiement", { static: true })
    aucun_etat_paiement_template: TemplateRef<any>;
    @ViewChild("supprimer_paiement", { static: true })
    supprimer_paiement: TemplateRef<any>;
    ngOnInit(): void {
        this.index_api.getAll("agence_p").subscribe((res) => {
            this.all_agep = res.response;
        });
        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("annee").subscribe((res) => {
            this.all_annee = res.response;
        });
        this.form_import_paiement = this.form_builder.group({
            tranche: ["", Validators.required],
            pourcentage: [""],
            montant_a_payer: ["", Validators.required],
            agep_id: ["", Validators.required],
        });
        this.all_menage_beneficiaire = [
            {
                numero_recepisse: "test",
                nomchefmenage: "test",
                NomTravailleur: "test",
                NomTravailleurSuppliant: "test",
                numero_compte_bancaire: "test",
                domiciliation: "test",
                montanttotalapayer: "test",
                montantpayetravailleur: "test",
                date_virement: "test",
            },
        ];
        this.paiement = {};
        this.filtre_form = this.form_builder.group({
            id_ile: [""],
            id_region: [""],
            id_commune: [""],
            village_id: [""],
            agep_id: [""],
            id_annee: [""],
            etape_id: [""],
        });

        // Récupérer le chemin actuel
        const currentPath = "/" + (this.route.snapshot.routeConfig?.path || "");
        this.config = this.configurations[currentPath];
        if (this.config) {
            this.fetchData(
                this.config.controller,
                this.config.key,
                this.config.value,
                this.config.affiche_titre_prefix
            );
        } else {
            console.error(
                `Aucune configuration trouvée pour l'URL : ${currentPath}`
            );
        }
        this.index_api
            .getAPIgeneraliserREST(
                "Phaseexecution",
                "cle_etrangere",
                this.config.id_sous_projet
            )
            .subscribe((res) => {
                this.all_etape = res.response;
            });
        this.show_btn_supprimer_paiement_deja_importe = false;
    }

    private fetchData(
        controller: string,
        key: string,
        value: number,
        afficheTitrePrefix: string
    ): void {
        this.index_api.getAPIgeneraliserREST(controller, key, value).subscribe(
            (res) => {
                const response = res.response[0];
                this.import_paiement.montant_a_payer = parseInt(
                    response.indemnite,
                    10
                );
                this.import_paiement.pourcentage = parseInt(
                    response.pourcentage,
                    10
                );
                this.import_paiement.tranche = response.Phase;
                if (this.config.sous_projet === "TMS" || this.config.titre === "Fond de soutien") {
                    this.import_paiement.affiche_titre = `${this.config.affiche_titre_prefix}`;
                    this.afficher_champ_pourcentage = false;
                } else {
                    this.import_paiement.affiche_titre = `${this.config.affiche_titre_prefix} ${response.pourcentage}%`;
                    this.afficher_champ_pourcentage = true;
                }
                // this.import_paiement.affiche_titre = `${afficheTitrePrefix} ${response.pourcentage}%`;
            },
            (error) => {
                console.error("Erreur lors de l’appel à l’API :", error);
            }
        );
    }
    onFileChange(event: any): void {
        console.log("onFileChange déclenché, événement:", event);
        const files = event.target.files;
        if (files && files.length > 0) {
            this.selectedFile = files[0];
            this.fileName = this.selectedFile.name;
        }
    }
    uploadFile(): void {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            formData.append("repertoire", "importexcel");
            formData.append("id_ile", "1");
            formData.append("id_region", "1");
            formData.append("id_commune", "1");
            formData.append("village_id", "1");

            const data = {
                file: this.selectedFile,
                repertoire: "importexcel",
                id_ile: 1,
                id_region: 1,
                id_commune: 1,
                village_id: 1,
            };

            const uploadUrl = `${this.constant_service.apiUrl}Upload_fichier/upload_paiement`;
            //   this.http.post(uploadUrl, data, {
            //     headers: new HttpHeaders({
            //       'enctype': 'multipart/form-data'
            //     })
            //   }).subscribe(
            //     (response: any) => {
            //       console.log('Upload successful', response);
            //       if (response?.reponse === 'OK') {
            //         alert('Fichier importé avec succès.');
            //       } else {
            //         alert('Erreur lors de l’importation du fichier.');
            //       }
            //     },
            //     (error) => {
            //       console.error('Erreur de téléchargement', error);
            //       alert('Une erreur s’est produite lors de l’importation.');
            //     }
            //   );
            this.http
                .post(
                    "http://localhost/2024/pfss_comores_ss/api/index.php/api/Upload_fichier/upload_paiement",
                    data
                )
                .subscribe(
                    (response) => {
                        console.log("File uploaded successfully");
                    },
                    (error) => {
                        console.error("Error uploading file", error);
                    }
                );
        }
    }
    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.paiement.id_ile
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
                this.paiement.id_region
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
                this.paiement.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtrer_detail() {
        this.index_api
            .getAPIgeneraliserREST(
                "fiche_paiement",
                "ile_id",
                this.paiement.id_ile,
                "id_region",
                this.paiement.id_region,
                "id_commune",
                this.paiement.id_commune,
                "id_village",
                this.paiement.village_id,
                "id_sous_projet",
                this.config.id_sous_projet,
                "numero_paiement",
                this.config.numero_paiement,
                "etape_id",
                this.config.etape_id
            )
            .subscribe((res) => {
                this.all_etat_paiement = res.response;
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
    supprimerPaiementDejaImporte() {
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
                id_sous_projet: this.config.id_sous_projet,
            };
            this.index_api
                .add("Fiche_paiement", this.serializeData(datas), config)
                .subscribe((res) => {
                    this.all_etat_paiement = this.all_etat_paiement.filter(
                        (item) =>
                            item.id !== this.selected_item_paiement_importe.id
                    );
                    this.selected_item_paiement_importe = {};
                });
            this.dialog.closeAll();
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    private serializeData(data: any) {
        var buffer = [];
        // Serialize each key in the object.
        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
            var value = data[name];
            buffer.push(
                encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent(value == null ? "" : value)
            );
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
}
