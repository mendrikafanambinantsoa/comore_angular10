import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-phase-execution-et-annee",
    templateUrl: "./phase-execution-et-annee.component.html",
    styleUrls: ["./phase-execution-et-annee.component.scss"],
})
export class PhaseExecutionEtAnneeComponent implements OnInit {
    //sous_proje
    all_sous_projet: any;

    //Phases
    all_phase: any;
    rows_phases: any;
    selected: any;
    phase: any;
    selected_item_phase: any;
    nouvel_item_phase: boolean;

    afficher_btn_modifier_phase: boolean;
    afficher_btn_supprimer_phase: boolean;
    afficher_btn_annuler_phase: boolean;
    afficher_form_ajout_phase: boolean;
    form_ajout_phase: FormGroup;

    constructor(
        private index_api: IndexApiService,
        public dialog: MatDialog,
        private form_builder: FormBuilder,
    ) {}

    ngOnInit(): void {
        //pges_execution
        this.index_api.getAll("phaseexecution").subscribe((resp) => {
            this.all_phase = resp.response;
            console.log("all phases", this.all_phase);
        });
        this.index_api.getAll("sous_projet").subscribe((resp) => {
            this.all_sous_projet = resp.response;
            console.log("all_sous_projet", this.all_sous_projet);
        });

        this.afficher_btn_modifier_phase = false;
        this.afficher_btn_supprimer_phase = false;
        this.afficher_btn_annuler_phase = false;
        this.afficher_form_ajout_phase = false;
        this.phase = {};
        this.nouvel_item_phase = false;
        this.form_ajout_phase = this.form_builder.group({
            id_sous_projet: ["", Validators.required],
            Code: ["", Validators.required],
            Phase: ["", Validators.required],
            indemnite: ["", Validators.required],
            pourcentage: ["", Validators.required],
        });
    }
    onSelectPhase(event: any) {
        this.afficher_btn_modifier_phase = true;
        this.afficher_btn_supprimer_phase = true;
        this.afficher_btn_annuler_phase = true;
        this.selected_item_phase = event.selected[0];
        console.log("phase selectioné", this.selected_item_phase);
    }
    annuler(event: any) {
        this.afficher_btn_modifier_phase = false;
        this.afficher_btn_supprimer_phase = false;
        this.afficher_btn_annuler_phase = false;
        this.selected_item_phase = {};
    }
    modifierPhase() {
        this.afficher_form_ajout_phase = true;
        this.nouvel_item_phase = false;
        this.phase = {
            // id_sous_project: this.selected_item_phase.sous_projet.id,
            id_sous_projet: this.selected_item_phase.sous_projet.id,
            Code: this.selected_item_phase.Code,
            Phase: this.selected_item_phase.Phase,
            indemnite: this.selected_item_phase.indemnite,
            pourcentage: this.selected_item_phase.pourcentage,
        };
        console.log("Phase d'execution", this.phase);
    }
    fermerFormPhase() {
        this.afficher_form_ajout_phase = false;
        this.selected_item_phase = {};
    }
    enregistrerPhase(phase: any) {
        let id = 0;
        if (!this.nouvel_item_phase) {
            id = this.selected_item_phase.id;
        }
        this.afficher_form_ajout_phase = false;
        const data = {
            supprimer: 0,
            id,
            ...phase,
        };
        this.save_in_base(data);
        this.closeDialog();
    }
    closeDialog() {
        this.dialog.closeAll();
    }
    save_in_base(datas: any): any {
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            this.index_api
                .add("phaseexecution", this.serializeData(datas), config)
                .subscribe((resp) => {
                    this.getPhase();
                });
        } catch (error) {
            console.log("erreur d'enregistrement");
        }
        console.log("donner enregistré", datas);
    }
    getPhase() {
        this.index_api.getAll("phaseexecution").subscribe((resp) => {
            this.all_phase = resp.response;
            console.log("all phases", this.all_phase);
        });
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
}