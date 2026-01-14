import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-plan-action-reinstallation",
    templateUrl: "./plan-action-reinstallation.component.html",
    styleUrls: ["./plan-action-reinstallation.component.scss"],
})
export class PlanActionReinstallationComponent implements OnInit {
    constructor(
        private index_api: IndexApiService,
        public dialog: MatDialog,
        private form_builder: FormBuilder,
    ) {}

    //all_plan
    all_plan: any;
    rows_plan: any;
    plan: any;
    selected_item_plan: any;
    nouvel_item_plan: boolean;

    afficher_btn_modifier_plan: boolean;
    afficher_btn_supprimer_plan: boolean;
    afficher_btn_annuler_plan: boolean;
    afficher_form_ajout_plan: boolean;
    form_ajout_plan: FormGroup;
    //Dom element in plan_action_reinstallation:#supprimer_plan
    @ViewChild("supprimer_plan", { static: true })
    supprimer_plan: TemplateRef<any>;

    //all_activite
    all_activite: any;
    rows_activite: any;
    activite: any;
    selected_item_activite: any;
    nouvel_item_activite: boolean;

    afficher_btn_modifier_activite: boolean;
    afficher_btn_supprimer_activite: boolean;
    afficher_btn_annuler_activite: boolean;
    afficher_form_ajout_activite: boolean;
    form_ajout_activite: FormGroup;
    //Dom element in activite_par:#supprimer_activite
    @ViewChild("supprimer_activite", { static: true })
    supprimer_activite: TemplateRef<any>;

    //Sous_projet
    all_sous_projet: any;
    rows_sous_projet: any;
    sous_projet: any;
    selected_item_sous_projet: any;
    nouvel_item_sous_projet: boolean;

    afficher_btn_modifier_sous_projet: boolean;
    afficher_btn_supprimer_sous_projet: boolean;
    afficher_btn_annuler_sous_projet: boolean;
    afficher_form_ajout_sous_projet: boolean;
    form_ajout_sous_projet: FormGroup;
    //Dom element in activite_par:#supprimer_activite
    @ViewChild("supprimer_sous_projet", { static: true })
    supprimer_sous_projet: TemplateRef<any>;

    //init
    ngOnInit(): void {
        //Plan action réinstallation
        this.index_api
            .getAll("plan_action_reinstallation")
            .subscribe((resp) => {
                this.all_plan = resp.response;
                console.log("all plan", this.all_plan);
            });
        this.afficher_btn_modifier_plan = false;
        this.afficher_btn_supprimer_plan = false;
        this.afficher_btn_annuler_plan = false;
        this.afficher_form_ajout_plan = false;
        this.plan = {};
        this.nouvel_item_plan = false;
        this.form_ajout_plan = this.form_builder.group({
            intitule: ["", Validators.required],
            ser: ["", Validators.required],
            date_elaboration: ["", Validators.required],
        });

        //Activite_par
        this.index_api.getAll("activite_par").subscribe((resp) => {
            this.all_activite = resp.response;
            console.log("all_activite", this.all_activite);
        });
        this.afficher_btn_modifier_activite = false;
        this.afficher_btn_supprimer_activite = false;
        this.afficher_btn_annuler_activite = false;
        this.afficher_form_ajout_activite = false;
        this.activite = {};
        this.nouvel_item_activite = false;
        this.form_ajout_activite = this.form_builder.group({
            activite: ["", Validators.required],
            nbr_menage: ["", Validators.required],
            bien_ressource: ["", Validators.required],
            calendrier_execution: ["", Validators.required],
            cout_estimatif: ["", Validators.required],
            mesure_compensatoire: ["", Validators.required],
            responsable: ["", Validators.required],
        });

        //Sous_project
        this.index_api.getAll("sous_projet").subscribe((resp) => {
            this.all_sous_projet = resp.response;
            console.log("all_sous_projet", this.all_sous_projet);
        });
        this.afficher_btn_modifier_sous_projet = false;
        this.afficher_btn_supprimer_sous_projet = false;
        this.afficher_btn_annuler_sous_projet = false;
        this.afficher_form_ajout_sous_projet = false;
        this.sous_projet = {};
        this.nouvel_item_sous_projet = false;
        this.form_ajout_sous_projet = this.form_builder.group({
            code: ["", Validators.required],
            type: [""],
            description: ["", Validators.required],
            plan_action_reinstallation: ["", Validators.required],
        });
    }

    //Lists of USEFUlL FUNCTIONS
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
                    encodeURIComponent(value == null ? "" : value),
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }

    //ALL PLAN FUNCTIONS
    onSelectPlan(event: any) {
        this.afficher_btn_modifier_plan = true;
        this.afficher_btn_supprimer_plan = true;
        this.afficher_btn_annuler_plan = true;
        this.selected_item_plan = event.selected[0];
        console.log("plan selectioné", this.selected_item_plan);
    }
    annulerPlan() {
        this.afficher_btn_modifier_plan = false;
        this.afficher_btn_supprimer_plan = false;
        this.afficher_btn_annuler_plan = false;
        this.selected_item_plan = {};
    }
    ajoutPlan() {
        this.afficher_form_ajout_plan = true;
        this.nouvel_item_plan = true;
        this.selected_item_plan = {};
    }
    enregistrerPlan(plan: any) {
        let id = 0;
        if (!this.nouvel_item_plan) {
            id = this.selected_item_plan.id;
        }
        this.afficher_form_ajout_plan = false;
        const data = {
            supprimer: 0,
            id,
            ...plan,
        };
        this.save_in_basePlan(data);
        this.closeDialog();
    }
    modifierPlan() {
        this.afficher_form_ajout_plan = true;
        this.nouvel_item_plan = false;
        this.plan = {
            intitule: this.selected_item_plan.intitule,
            ser: this.selected_item_plan.ser,
            date_elaboration: this.selected_item_plan.date_elaboration,
        };
    }
    supprimerPlan() {
        this.dialog.open(this.supprimer_plan, {
            disableClose: true,
        });
    }
    confirm_supprimer_plan() {
        const data = {
            supprimer: 1,
            ...this.selected_item_plan,
        };
        this.save_in_basePlan(data);
        this.closeDialog();
    }
    fermerFormPlan() {
        this.afficher_form_ajout_plan = false;
        this.selected_item_plan = {};
    }
    save_in_basePlan(datas: any): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add(
                    "plan_action_reinstallation",
                    this.serializeData(datas),
                    config,
                )
                .subscribe((resp) => {
                    this.getPlan();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donnée enregistrée", datas);
    }
    getPlan() {
        this.index_api
            .getAll("plan_action_reinstallation")
            .subscribe((resp) => {
                this.all_plan = resp.response;
                console.log("all plan", this.all_plan);
            });
    }

    //ALL ACTIVITE_PAR FUNCTIONS
    onSelectActivite(event: any) {
        this.afficher_btn_modifier_activite = true;
        this.afficher_btn_supprimer_activite = true;
        this.afficher_btn_annuler_activite = true;
        this.selected_item_activite = event.selected[0];
        console.log("Activité selectioné", this.selected_item_activite);
    }
    annulerActivite() {
        this.afficher_btn_modifier_activite = false;
        this.afficher_btn_supprimer_activite = false;
        this.afficher_btn_annuler_activite = false;
        this.selected_item_activite = {};
    }
    ajoutActivite() {
        this.afficher_form_ajout_activite = true;
        this.nouvel_item_activite = true;
        this.selected_item_activite = {};
    }
    enregistrerActivite(activite: any) {
        let id = 0;
        if (!this.nouvel_item_activite) {
            id = this.selected_item_activite.id;
        }
        this.afficher_form_ajout_activite = false;
        const data = {
            supprimer: 0,
            id,
            ...activite,
        };
        this.save_in_baseActivite(data);
        this.closeDialog();
    }
    modifierActivite() {
        this.afficher_form_ajout_activite = true;
        this.nouvel_item_activite = false;
        this.activite = {
            activite: this.selected_item_activite.activite,
            nbr_menage: this.selected_item_activite.nbr_menage,
            bien_ressource: this.selected_item_activite.bien_ressource,
            calendrier_execution:
                this.selected_item_activite.calendrier_execution,
            cout_estimatif: this.selected_item_activite.cout_estimatif,
            mesure_compensatoire:
                this.selected_item_activite.mesure_compensatoire,
            responsable: this.selected_item_activite.responsable,
        };
    }
    supprimerActivite() {
        this.dialog.open(this.supprimer_activite, {
            disableClose: true,
        });
    }
    confirm_supprimer_activite() {
        const data = {
            supprimer: 1,
            ...this.selected_item_activite,
        };
        this.save_in_baseActivite(data);
        this.closeDialog();
    }
    fermerFormActivite() {
        this.afficher_form_ajout_activite = false;
        this.selected_item_activite = {};
    }
    save_in_baseActivite(datas: any): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("activite_par", this.serializeData(datas), config)
                .subscribe((resp) => {
                    this.getActivite();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donnée enregistrée", datas);
    }
    getActivite() {
        this.index_api.getAll("activite_par").subscribe((resp) => {
            this.all_activite = resp.response;
            console.log("all activite", this.all_activite);
        });
    }

    //ALL SOUS_PROJECT FUNCTIONS
    onSelectSousProject(event: any) {
        this.afficher_btn_modifier_sous_projet = true;
        this.afficher_btn_supprimer_sous_projet = true;
        this.afficher_btn_annuler_sous_projet = true;
        this.selected_item_sous_projet = event.selected[0];
        console.log("Sous projet selectioné", this.selected_item_sous_projet);
    }
    annulerSousProject() {
        this.afficher_btn_modifier_sous_projet = false;
        this.afficher_btn_supprimer_sous_projet = false;
        this.afficher_btn_annuler_sous_projet = false;
        this.selected_item_sous_projet = {};
    }
    ajoutSousProjet() {
        this.afficher_form_ajout_sous_projet = true;
        this.nouvel_item_sous_projet = true;
        this.selected_item_sous_projet = {};
    }
    enregistrerSousProjet(sousProjet: any) {
        let id = 0;
        if (!this.nouvel_item_sous_projet) {
            id = this.selected_item_sous_projet.id;
        }
        this.afficher_form_ajout_sous_projet = false;
        const data = {
            supprimer: 0,
            id,
            ...sousProjet,
        };
        this.save_in_baseSousProjet(data);
        this.closeDialog();
    }
    // modifierSousProjet() {
    //     this.afficher_form_ajout_sous_projet = true;
    //     this.nouvel_item_sous_projet = false;
    //     this.sous_projet = {
    //         activite: this.selected_item_activite.activite,
    //         nbr_menage: this.selected_item_activite.nbr_menage,
    //         bien_ressource: this.selected_item_activite.bien_ressource,
    //         calendrier_execution:
    //             this.selected_item_activite.calendrier_execution,
    //         cout_estimatif: this.selected_item_activite.cout_estimatif,
    //         mesure_compensatoire:
    //             this.selected_item_activite.mesure_compensatoire,
    //         responsable: this.selected_item_activite.responsable,
    //     };
    // }
    // supprimerActivite() {
    //     this.dialog.open(this.supprimer_activite, {
    //         disableClose: true,
    //     });
    // }
    // confirm_supprimer_activite() {
    //     const data = {
    //         supprimer: 1,
    //         ...this.selected_item_activite,
    //     };
    //     this.save_in_baseActivite(data);
    //     this.closeDialog();
    // }
    // fermerFormActivite() {
    //     this.afficher_form_ajout_activite = false;
    //     this.selected_item_activite = {};
    // }
    save_in_baseSousProjet(datas: any): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("sous_projet", this.serializeData(datas), config)
                .subscribe((resp) => {
                    this.getSousProjet();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donnée enregistrée", datas);
    }
    getSousProjet() {
        this.index_api.getAll("sous_projet").subscribe((resp) => {
            this.all_activite = resp.response;
            console.log("all sous_projet", this.all_activite);
        });
    }
}