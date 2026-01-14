import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../act/actr-service.service";
import { formatDate } from "@angular/common";
import { MatTabGroup } from "@angular/material/tabs";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: "app-agex",
    templateUrl: "./agex.component.html",
    styleUrls: ["./agex.component.scss"],
})
export class AgexComponent implements OnInit {
    config: any;

    show_progress_bar: boolean;

    all_agex: any;
    all_sous_projet: any;
    all_contrat_ugp_agex: any;
    all_contrat_ugp_agex_avenant: any;
    all_contrat_ugp_agex_signataire: any;
    all_contrat_ugp_agex_modalite: any;
    all_status: any;

    //AGEX
    agex: any;
    agex_information: any;
    afficher_btn_actualiser: boolean;
    show_btn_ajout: boolean;
    search_agex = "";
    selected: any = [];
    selectedItem: any;
    default: any;
    affichage_masque: boolean;
    // rows_plainte: any;

    //AVENANT
    avenant: any;
    avenant_information: any;
    id_contrat_ugp_agex: number;
    montant_contrat: number;
    numero_contrat: any;
    show_btn_ajout_avenant: boolean;
    selected_AVENANT: any;
    all_type_avenant: any;
    affichage_masque_avenant: boolean;

    //SIGNATAIRE
    signataire: any;
    signataire_information: any;
    show_btn_signataire: boolean;
    selected_SIGNATAIRE: any;
    affichage_masque_signataire: boolean;

    //MODALITE
    modalite: any;
    modalite_information: any;
    show_btn_modalite: boolean;
    selected_MODALITE: any;
    affichage_masque_modalite: boolean;
    montant: number;

    desactiver_onglets = true;
    nouvelle_element: boolean;

    //Tous les formulaires
    form_agex: FormGroup;
    form_avenant: FormGroup;
    form_signataire: FormGroup;
    form_modalite: FormGroup;

    // @ViewChild("avenant") avenant: MatTabGroup;
    // @ViewChild("signataire") signataire: NgxDatatable;

    //element child:DIALOG
    @ViewChild("suppression_AGEX", { static: true })
    suppression_AGEX: TemplateRef<any>;

    //element child:DIALOG
    @ViewChild("suppression_AVENANT", { static: true })
    suppression_AVENANT: TemplateRef<any>;

    //element child:DIALOG
    @ViewChild("suppression_SIGNATAIRE", { static: true })
    suppression_SIGNATAIRE: TemplateRef<any>;

    //element child:DIALOG
    @ViewChild("suppression_MODALITE", { static: true })
    suppression_MODALITE: TemplateRef<any>;

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        private actr_service: ActrServiceService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.get_all_sous_projet();
        this.get_all_agex();
        this.get_all_contrat_ugp_agex();
        // this.get_all_contrat_ugp_agex_avenant();
        // this.get_all_contrat_ugp_agex_signataires();
        // this.get_all_contrat_ugp_agex_modalite();

        //all status
        this.all_status = [
            {
                id: 1,
                status: "En cours",
            },
            {
                id: 2,
                status: "Terminé",
            },
            {
                id: 3,
                status: "Résilié",
            },
        ];

        //all Type avenant
        this.all_type_avenant = [
            {
                id: 1,
                type: "Financier",
            },
            {
                id: 2,
                type: "Délai",
            },
            {
                id: 3,
                type: "Financier et Délai",
            },
        ];

        //AGEX
        this.show_btn_ajout = false;
        this.agex = {};
        this.nouvelle_element = false;
        this.affichage_masque = false;

        const defaultStatus = "En cours";
        this.agex.status_contrat = defaultStatus;
        const default_note_resiliation = " ";
        this.agex.note_resiliation = default_note_resiliation;

        //AVENANT
        this.avenant = {};
        this.show_btn_ajout_avenant = false;
        this.affichage_masque_avenant = false;

        const defaultStatus_avenant = "En cours";
        this.avenant.status_contrat = defaultStatus_avenant;
        const default_note_resiliation_avenant = " ";
        this.avenant.note_resiliation = default_note_resiliation_avenant;

        //SIGNATAIRE
        this.signataire = {};
        this.show_btn_signataire = false;
        this.affichage_masque_signataire = false;

        //MODALITE
        this.modalite = {};
        this.show_btn_modalite = false;
        this.affichage_masque_modalite = false;
        //numero_tranche
        const defaultTranche = 1;
        this.modalite.numero_tranche = defaultTranche;
        //pourcentage
        const defaultPourcentage = 50;
        this.modalite.pourcentage = defaultPourcentage;

        // const today = new Date();
        // const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
        // // const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        // this.agex.date_signature = formattedDate;

        //FORM AGEX
        this.form_agex = this.form_builder.group({
            numero_contrat: ["", Validators.required],
            id_agex: ["", Validators.required],
            id_sous_projet: ["", Validators.required],
            objet_contrat: ["", Validators.required],
            montant_contrat: ["", Validators.required],
            date_signature: ["", Validators.required],
            date_prevu_fin_contrat: ["", Validators.required],
            status_contrat: [this.agex.status_contrat, Validators.required],
            note_resiliation: [this.agex.note_resiliation, Validators.required],
        });

        //FORM AVENANT
        this.form_avenant = this.form_builder.group({
            type: ["", Validators.required],
            objet_contrat: ["", Validators.required],
            montant_contrat: ["", Validators.required],
            date_signature: ["", Validators.required],
            date_prevu_fin_contrat: ["", Validators.required],
            status_contrat: [this.avenant.status_contrat, Validators.required],
            note_resiliation: [
                this.avenant.note_resiliation,
                Validators.required,
            ],
        });

        //FORM SIGNATAIRE
        this.form_signataire = this.form_builder.group({
            nom_signataire: ["", Validators.required],
            titre_signatire: ["", Validators.required],
        });

        //FORM MODALITE
        this.refresh_input_modalite(
            this.montant_contrat,
            this.modalite.pourcentage,
        );
    }

    //GET DATA
    get_all_agex() {
        //All agex
        this.show_progress_bar = true;
        this.index_api.getAll("Agent_ex").subscribe((res) => {
            this.show_progress_bar = false;
            this.all_agex = res.response;
            console.log("all_agex", this.all_agex);
        });
    }
    get_all_sous_projet() {
        //All sous_projet
        this.show_progress_bar = true;
        this.index_api.getAll("sous_projet").subscribe((res) => {
            this.show_progress_bar = false;
            this.all_sous_projet = res.response;
            console.log("all_sous_projet", this.all_sous_projet);
        });
    }
    get_all_contrat_ugp_agex() {
        this.show_progress_bar = true;
        this.index_api
            .getParamsDynamic("Contrat_ugp_agex/index?get_all=true")
            .subscribe((res) => {
                this.show_progress_bar = false;
                this.all_contrat_ugp_agex = res.response;
                console.log("all_contrat_ugp_agex", this.all_contrat_ugp_agex);
            });
    }
    get_all_contrat_ugp_agex_avenant() {
        this.show_progress_bar = true;
        this.index_api
            .getParamsDynamic(
                "Contrat_ugp_agex_avenant/index?id_contrat_ugp_agex=" +
                    this.id_contrat_ugp_agex,
            )
            .subscribe((res) => {
                this.show_progress_bar = false;
                this.all_contrat_ugp_agex_avenant = res.response;
                console.log(
                    "all_contrat_ugp_agex_avenant",
                    this.all_contrat_ugp_agex_avenant,
                );
            });
    }
    get_all_contrat_ugp_agex_signataires() {
        this.show_progress_bar = true;
        this.index_api
            .getAPIgeneraliserREST(
                "Contrat_ugp_agex_signataires/index",
                "id_contrat_ugp_agex",
                this.id_contrat_ugp_agex,
            )
            .subscribe((res) => {
                this.show_progress_bar = false;
                this.all_contrat_ugp_agex_signataire = res.response;
                console.log(
                    "all_contrat_ugp_agex_signataire",
                    this.all_contrat_ugp_agex_signataire,
                );
            });
    }
    get_all_contrat_ugp_agex_modalite() {
        this.show_progress_bar = true;
        this.index_api
            .getAPIgeneraliserREST(
                "Contrat_ugp_agex_modalite_payement/index",
                "id_contrat_ugp_agex",
                this.id_contrat_ugp_agex,
            )
            .subscribe((res) => {
                this.all_contrat_ugp_agex_modalite = res.response;
                console.log(
                    "all_contrat_ugp_agex_modalite",
                    this.all_contrat_ugp_agex_modalite,
                );
            });
    }

    //Actualise les tables
    refresh(event: MatTabChangeEvent): void {
        this.get_all_contrat_ugp_agex_avenant();
        this.get_all_contrat_ugp_agex_signataires();
        this.get_all_contrat_ugp_agex_modalite();
        //fonction qui rafraichi le formulaire d'ajout MODALITE
        this.refresh_input_modalite(
            this.montant_contrat,
            this.modalite.pourcentage,
        );
    }

    //mettre les valeurs dans la formulaire modalite
    refresh_input_modalite(montant_contrat: number, pourcentage: any) {
        pourcentage = this.modalite.pourcentage;
        montant_contrat = (montant_contrat * pourcentage) / 100;

        //FORM MODALITE
        this.modalite.montant = montant_contrat;
        this.form_modalite = this.form_builder.group({
            numero_tranche: [this.modalite.numero_tranche, Validators.required],
            poucentage: [pourcentage, Validators.required],
            montant: [montant_contrat, Validators.required],
        });
    }

    //AGEX
    ajouter_AGEX() {
        this.affichage_masque = true;
        this.nouvelle_element = true;
        this.agex = {
            ...this.agex,
        };
    }
    on_select_AGEX(event: any) {
        this.show_btn_ajout = true;
        this.selectedItem = event.selected[0];
        this.nouvelle_element = false;
        this.desactiver_onglets = false;
        this.agex_information = {
            ...this.selectedItem,
        };
        this.numero_contrat = this.selectedItem.numero_contrat;
        this.id_contrat_ugp_agex = this.selectedItem.id;
        this.montant_contrat = this.selectedItem.montant_contrat;
        console.log("id_contrat_ugp_agex", this.id_contrat_ugp_agex);
        console.log("ref_contrat", this.numero_contrat);
        console.log("agex_information", this.agex_information);
        console.log("montant_contrat", this.montant_contrat);
        this.get_all_contrat_ugp_agex_avenant();
        this.get_all_contrat_ugp_agex_signataires();
        this.get_all_contrat_ugp_agex_modalite();
    }
    modifier_AGEX() {
        this.affichage_masque = true;
        this.nouvelle_element = false;
        this.agex = {
            ...this.selectedItem,
        };
        console.log("agex à modifier", this.agex);
    }
    supprimer_AGEX() {
        this.dialog.open(this.suppression_AGEX, {
            disableClose: true,
        });
    }

    confirm_suppression_AGEX() {
        const datas = {
            supprimer: 1,
            ...this.selectedItem,
        };
        this.save_in_baseAGEX(datas);
        this.dialog.closeAll();
    }
    save_AGEX(agex: any, suppression: any) {
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selectedItem.id;
        }

        datas = {
            supprime: suppression,
            id: id,
            ...agex,
        };
        console.log("AGEX à enregistrer", datas);
        this.save_in_baseAGEX(datas);
    }
    save_in_baseAGEX(data: any) {
        this.affichage_masque = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("AGEX à enregistrer", data);

            this.index_api
                .add("Contrat_ugp_agex", this.serializeData(data), config)
                .subscribe((res) => {
                    console.log("enregistrement reussi", res);
                    this.selectedItem = {};
                    this.affichage_masque = false;
                    this.get_all_contrat_ugp_agex();
                });
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    hideAffichageMasque() {
        this.affichage_masque = false;
        this.agex = {};
    }

    //ALL USEFULL FUNCTIONS
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
                    encodeURIComponent(value == null ? "" : value),
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
    closeDialog() {
        this.dialog.closeAll();
    }

    //AVENANT
    save_AVENANT(avenant: any, suppression: any) {
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selected_AVENANT.id;
        }

        datas = {
            supprime: suppression,
            id: id,
            id_contrat_ugp_agex: this.id_contrat_ugp_agex,
            ...avenant,
        };
        console.log("AGEX à enregistrer", datas);
        this.save_in_baseAVENANT(datas);
    }
    ajout_AVENANT() {
        this.affichage_masque_avenant = true;
        this.nouvelle_element = true;
        this.avenant = {
            ...this.avenant,
        };
        console.log("avenant à ajouter", this.avenant);
    }
    save_in_baseAVENANT(data: any) {
        this.affichage_masque_avenant = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("AVENANT à enregistrer", data);

            this.index_api
                .add(
                    "Contrat_ugp_agex_avenant",
                    this.serializeData(data),
                    config,
                )
                .subscribe((res) => {
                    console.log("enregistrement reussi", res);
                    this.selectedItem = {};
                    this.affichage_masque = false;
                    this.get_all_contrat_ugp_agex_avenant();
                });
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    on_select_AVENANT(event: any) {
        this.show_btn_ajout_avenant = true;
        this.selected_AVENANT = event.selected[0];
        this.nouvelle_element = false;
        this.desactiver_onglets = false;
        this.avenant_information = {
            ...this.selected_AVENANT,
        };
        console.log("Avenant_information", this.avenant_information);
    }
    modifier_AVENANT() {
        this.affichage_masque_avenant = true;
        this.nouvelle_element = false;
        this.avenant = {
            ...this.selected_AVENANT,
        };
        console.log("avenant à modifier", this.avenant);
    }
    supprimer_AVENANT() {
        this.dialog.open(this.suppression_AVENANT, {
            disableClose: true,
        });
    }
    confirm_suppression_AVENANT() {
        const datas = {
            supprimer: 1,
            ...this.selected_AVENANT,
        };
        console.log("à supprimer", datas);
        this.save_in_baseAVENANT(datas);
        this.dialog.closeAll();
    }
    hideAffichageMasque_AVENANT() {
        this.affichage_masque_avenant = false;
        this.avenant = {};
    }

    //SIGNATAIRE
    ajout_SIGNATAIRE() {
        this.affichage_masque_signataire = true;
        this.nouvelle_element = true;
        this.signataire = {
            ...this.signataire,
        };
        console.log("signataire à ajouter", this.signataire);
    }
    on_select_SIGNATAIRE(event: any) {
        this.show_btn_signataire = true;
        this.selected_SIGNATAIRE = event.selected[0];
        this.nouvelle_element = false;
        this.desactiver_onglets = false;
        this.signataire_information = {
            ...this.selected_SIGNATAIRE,
        };
        console.log("Signataire_information", this.signataire_information);
    }
    modifier_SIGNATAIRE() {
        this.affichage_masque_signataire = true;
        this.nouvelle_element = false;
        this.signataire = {
            ...this.selected_SIGNATAIRE,
        };
        console.log("signataire à modifier", this.signataire);
    }
    save_SIGNATAIRE(signataire: any, suppression: any) {
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selected_SIGNATAIRE.id;
        }

        datas = {
            supprime: suppression,
            id: id,
            id_contrat_ugp_agex: this.id_contrat_ugp_agex,
            ...signataire,
        };
        console.log("SIGNATAIRE à enregistrer", datas);
        this.save_in_baseSIGNATAIRE(datas);
    }
    save_in_baseSIGNATAIRE(data: any) {
        this.affichage_masque_signataire = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("AVENANT à enregistrer", data);

            this.index_api
                .add(
                    "Contrat_ugp_agex_signataires",
                    this.serializeData(data),
                    config,
                )
                .subscribe((res) => {
                    console.log("enregistrement reussi", res);
                    this.selected_SIGNATAIRE = {};
                    this.affichage_masque_signataire = false;
                    this.get_all_contrat_ugp_agex_signataires();
                });
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    hideAffichageMasque_SIGNATAIRE() {
        this.affichage_masque_signataire = false;
        this.signataire = {};
    }
    supprimer_SIGNATAIRE() {
        this.dialog.open(this.suppression_SIGNATAIRE, {
            disableClose: true,
        });
    }
    confirm_suppression_SIGNATAIRE() {
        const datas = {
            supprimer: 1,
            ...this.selected_SIGNATAIRE,
        };
        console.log("à supprimer", datas);
        this.save_in_baseSIGNATAIRE(datas);
        this.dialog.closeAll();
    }

    //MODALITE
    ajout_MODALITE(montant_contrat: any): void {
        this.affichage_masque_modalite = true;
        this.nouvelle_element = true;

        //numero_tranche
        const tranche_numero = this.all_contrat_ugp_agex_modalite.length + 1;

        //Pourcentage
        const pourcentages = { 1: 50, 2: 45, 3: 5 };
        let prc = pourcentages[tranche_numero] || 0;

        //tranches
        const tranches = {
            1: "Premier accompte",

            2: "Second accompte",

            3: "Troisième accompte",

            4: "Autres tranches",
        };
        let tranche = tranches[tranche_numero] || 0;

        switch (tranche_numero) {
            case 1:
                tranche = "Premier accompte";
                prc = 50;
                break;
            case 2:
                tranche = "Second accompte";
                prc = 45;
                break;
            case 3:
                tranche = "Dernier accompte";
                prc = 5;
                break;
            default:
                tranche = "Autres accomptes";
                prc = 0;
                break;
        }

        this.modalite = {
            id: "0",
            numero_tranche: tranche_numero,
            tranche: tranche,
            id_contrat_ugp_agex: this.id_contrat_ugp_agex,
            poucentage: prc,
            montant: (this.modalite.montant * prc) / 100,
        };

        //   this.allModalites.unshift(newItem);
        //   this.selectedModalite = newItem;
        // }
    }
    save_MODALITE(modalite: any, suppression: any) {
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selected_MODALITE.id;
        }

        datas = {
            supprime: suppression,
            id: id,
            id_contrat_ugp_agex: this.id_contrat_ugp_agex,
            ...modalite,
        };
        console.log("MODALITE à enregistrer", datas);
        this.save_in_baseMODALITE(datas);
    }
    save_in_baseMODALITE(data: any) {
        this.affichage_masque_modalite = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("MODALITE à enregistrer", data);

            this.index_api
                .add(
                    "Contrat_ugp_agex_modalite_payement",
                    this.serializeData(data),
                    config,
                )
                .subscribe((res) => {
                    console.log("enregistrement reussi", res);
                    this.selected_MODALITE = {};
                    this.affichage_masque_modalite = false;
                    this.get_all_contrat_ugp_agex_modalite();
                });
        } catch (error) {
            console.log("erreur pendant enregistrement", error);
        }
    }
    hideAffichageMasque_MODALITE() {
        this.affichage_masque_modalite = false;
        this.modalite = {};
    }

    on_select_MODALITE(event: any) {
        this.show_btn_modalite = true;
        this.selected_MODALITE = event.selected[0];
        this.nouvelle_element = false;
        this.modalite_information = {
            ...this.selected_MODALITE,
        };
        console.log("modelite_information", this.modalite_information);
    }
    // modifier_MODALITE() {}
    supprimer_MODALITE() {
        this.dialog.open(this.suppression_MODALITE, {
            disableClose: true,
        });
    }
    confirm_suppression_MODALITE() {
        const datas = {
            supprimer: 1,
            ...this.selected_MODALITE,
        };
        console.log("à supprimer", datas);
        this.save_in_baseMODALITE(datas);
        this.dialog.closeAll();
    }
    // hideAffichageMasque_MODALITE() {}
}