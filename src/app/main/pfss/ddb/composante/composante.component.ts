import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef,ViewChild } from "@angular/core";
import { IndexApiService } from "app/_services/index-api.service";
import { MatDialog} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
    selector: "app-composante",
    templateUrl: "./composante.component.html",
    styleUrls: ["./composante.component.scss"],
})
export class ComposanteComponent implements OnInit {
    all_composante: any[];
    rows_composante: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    selectedItem: any;
    currentItem: any;
    afficher_bouton_Modifier_Suprrimer: Boolean;
    new_item: boolean;
    editing = {};
    index_selected: number;
    item_selected = [];
    search:string = "";
    @ViewChild('suppressionDialog', { static: true }) suppressionDialog:TemplateRef<any>;
    
    constructor(private index_api: IndexApiService, public dialog: MatDialog) {
        // Set the private defaults
        this.reorderable = true;
        this.loadingIndicator = true;
        this.rows_composante = [];
        this.new_item = false;
    }
    
    ngOnInit(): void {
        this.index_api.getAll("composante_pfss").subscribe((resp) => {
            this.all_composante = [...resp.response];
            this.rows_composante = resp.response;
        });
    }

    onSelectComposante({ selected }) {
        if (selected) {
            this.index_selected = this.rows_composante.indexOf(selected[0]);
            this.currentItem = JSON.parse(JSON.stringify(selected[0]));
        }
        this.afficher_bouton_Modifier_Suprrimer = true;
    }
    ajouter() {
        this.new_item = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
            montant_prevu: "",
        };

        this.rows_composante.unshift(item);

        this.rows_composante = [...this.rows_composante];

        this.editing[0] = true;
        this.index_selected = 0;

        if (this.item_selected.length > 0) {
            this.item_selected[0] = item;
        } else {
            this.item_selected.push(item);
        }
    }
    modifier() {
        this.editing[this.index_selected] = true;
    }
    supprimer() {
        this.dialog.open(this.suppressionDialog, { disableClose: true }); 
    }
    suppressionConfirmer()
    {
        this.save_in_base(1);
    } 
    suppressionAnnuler() {
        this.dialog.closeAll();
    }
    annuler() {
        this.editing[this.index_selected] = false;
        this.item_selected = [];

        if (this.new_item) {
            this.new_item = false;
            this.rows_composante.shift();
            this.rows_composante = [...this.rows_composante];
            this.all_composante = [...this.rows_composante];
        } else {
            this.rows_composante[this.index_selected] = this.currentItem;
            this.rows_composante = [...this.rows_composante];
        }
    }
    updateValue(e, c, i) {
        this.rows_composante[i][c] = e.target.value;
    }
    export_excel() {
        let repertoire = "tableau_de_bord/" ;
        
    }
    save_in_base(etat_suppression) {
        this.editing[this.index_selected] = false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected[0].id,
            supprimer: etat_suppression,
            code: this.item_selected[0].code,
            libelle: this.item_selected[0].libelle,
            montant_prevu: this.item_selected[0].montant_prevu,
        };

        this.index_api
            .add("composante_pfss", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item) {
                        if (etat_suppression == 1) {
                            this.all_composante.splice(this.index_selected, 1);
                            this.all_composante = [...this.all_composante];
                            this.rows_composante = [...this.all_composante];
                        }
                    } else {
                        this.new_item = false;
                        this.rows_composante[this.index_selected]["id"] =
                            String(response["response"]);
                        this.all_composante = [...this.rows_composante];
                    }

                    this.item_selected = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }
    private convertion_data(data) {
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

        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
}
