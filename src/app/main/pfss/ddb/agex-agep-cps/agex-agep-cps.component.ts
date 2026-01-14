import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IndexApiService } from "app/_services/index-api.service";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: "app-agex-agep-cps",
    templateUrl: "./agex-agep-cps.component.html",
    styleUrls: ["./agex-agep-cps.component.scss"],
})
export class AgexAgepCpsComponent implements OnInit {
    //agence d'execution
    all_agence_execution: any[];
    rows_agence_execution: any[];
    selected_agence_execution: any;
    current_item_agence_execution: any;
    new_item_agence_execution: boolean;
    editing_agence_execution = {};
    index_selected_agence_execution: number;
    item_selected_agence_execution = [];
    @ViewChild("suppression_dialog_agence_execution", { static: true })
    suppression_dialog_agence_execution: TemplateRef<any>;
    search_agence_execution: string = "";

    //agence paiement
    all_agence_paiement: any[];
    rows_agence_paiement: any[];
    selected_agence_paiement: any;
    current_item_agence_paiement: any;
    new_item_agence_paiement: boolean;
    editing_agence_paiement = {};
    index_selected_agence_paiement: number;
    item_selected_agence_paiement = [];
    @ViewChild("suppression_dialog_agence_paiement", { static: true })
    suppression_dialog_agence_paiement: TemplateRef<any>;
    search_agence_paiement: string = "";

     //cellule protection sociale
     all_cellule_protection_sociale: any[];
     rows_cellule_protection_sociale: any[];
     selected_cellule_protection_sociale: any;
     current_item_cellule_protection_sociale: any;
     new_item_cellule_protection_sociale: boolean;
     editing_cellule_protection_sociale = {};
     index_selected_cellule_protection_sociale: number;
     item_selected_cellule_protection_sociale = [];
     @ViewChild("suppression_dialog_cellule_protection_sociale", { static: true })
     suppression_dialog_cellule_protection_sociale: TemplateRef<any>;
     search_cellule_protection_sociale: string = "";

     //others
     all_ile: any[];
     all_prefecture: any[];
     all_commune: any[];
     all_village: any[];
     all_programme: any[];

    constructor(private index_api: IndexApiService, public dialog: MatDialog) {
        //agence d'execution
        this.rows_agence_execution = [];
        this.new_item_agence_execution = false;

        //agence paiement
        this.rows_agence_paiement = [];
        this.new_item_agence_paiement = false;

         //cellule protection sociale
         this.rows_cellule_protection_sociale = [];
         this.new_item_cellule_protection_sociale = false;
    }

    ngOnInit(): void {
        //agence d'execution
        this.index_api.getAll("Agent_ex").subscribe((resp) => {
            this.all_agence_execution = [...resp.response];
            this.rows_agence_execution = resp.response;
            
        });

        //agence paiement
        this.index_api.getAll("Agence_p").subscribe((resp) => {
            this.all_agence_paiement = [...resp.response];
            this.rows_agence_paiement = resp.response;           
        });

        //cellule protection sociale
        this.index_api.getAll("protection_sociale").subscribe((resp) => {
            this.all_cellule_protection_sociale = [...resp.response];
            this.rows_cellule_protection_sociale = resp.response;
            console.log(this.rows_cellule_protection_sociale);            
        });

        //ile
        this.index_api.getAll("Ile").subscribe((resp) => {
            this.all_ile = [...resp.response];   
            // console.log("tous ile", this.all_ile);                     
        });

        //programme
        this.index_api.getAll("sous_projet").subscribe((resp) => {
            this.all_programme = [...resp.response];                        
        });
    }

    //agence d'execution
    AjouterAgenceExecution() {
        this.new_item_agence_execution = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_agence_execution.unshift(item);

        this.rows_agence_execution = [...this.rows_agence_execution];

        this.editing_agence_execution[0] = true;
        this.index_selected_agence_execution = 0;

        if (this.item_selected_agence_execution.length > 0) {
            this.item_selected_agence_execution[0] = item;
        } else {
            this.item_selected_agence_execution.push(item);
        }
    }
    annulerAgenceExecution() {
        this.editing_agence_execution[this.index_selected_agence_execution] =
            false;
        this.item_selected_agence_execution = [];

        if (this.new_item_agence_execution) {
            this.new_item_agence_execution = false;
            this.rows_agence_execution.shift();
            this.rows_agence_execution = [...this.rows_agence_execution];
            this.all_agence_execution = [...this.rows_agence_execution];
        } else {
            this.rows_agence_execution[this.index_selected_agence_execution] =
                this.current_item_agence_execution;
            this.rows_agence_execution = [...this.rows_agence_execution];
        }
    }
    onSelectAgenceExecution({ selected }) {
        if (selected) {
            this.index_selected_agence_execution =
                this.rows_agence_execution.indexOf(selected[0]);
            this.current_item_agence_execution = JSON.parse(
                JSON.stringify(selected[0])
            );
        }
    }
    ModifierAgenceExecution() {
        this.editing_agence_execution[this.index_selected_agence_execution] =
            true;
    }
    supprimerAgenceExecution() {
        this.dialog.open(this.suppression_dialog_agence_execution, {
            disableClose: true,
        });
    }
    suppressionConfirmerAgenceExecution() {
        this.save_in_base_agence_execution(1);
    }
    updateValueAgenceExecution(e, c, i) {
        this.rows_agence_execution[i][c] = e.target.value;
    }
    save_in_base_agence_execution(etat_suppression) {
        this.editing_agence_execution[this.index_selected_agence_execution] =
            false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_agence_execution[0].id,
            supprimer: etat_suppression,
            Nom: this.item_selected_agence_execution[0].Nom,
            adresse_agex: this.item_selected_agence_execution[0].adresse_agex,
            identifiant_agex: this.item_selected_agence_execution[0].identifiant_agex,
            intervenant_agex: this.item_selected_agence_execution[0].intervenant_agex,
            nom_contact_agex: this.item_selected_agence_execution[0].nom_contact_agex,
            numero_phone_contact: this.item_selected_agence_execution[0].numero_phone_contact,
            titre_contact: this.item_selected_agence_execution[0].titre_contact
        };

        this.index_api
            .add("Agent_ex", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_agence_execution) {
                        if (etat_suppression == 1) {
                            this.all_agence_execution.splice(
                                this.index_selected_agence_execution,
                                1
                            );
                            this.all_agence_execution = [
                                ...this.all_agence_execution,
                            ];
                            this.rows_agence_execution = [
                                ...this.all_agence_execution,
                            ];
                        }
                    } else {
                        this.new_item_agence_execution = false;
                        this.rows_agence_execution[
                            this.index_selected_agence_execution
                        ]["id"] = String(response["response"]);
                        this.all_agence_execution = [
                            ...this.rows_agence_execution,
                        ];
                    }

                    this.item_selected_agence_execution = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }


    //agence paiement
    AjouterAgencePaiement() {
        this.new_item_agence_paiement = true;
        let item = {
            id: "0",
            code: "",
            Libelle: "",
        };

        this.rows_agence_paiement.unshift(item);

        this.rows_agence_paiement = [...this.rows_agence_paiement];

        this.editing_agence_paiement[0] = true;
        this.index_selected_agence_paiement = 0;

        if (this.item_selected_agence_paiement.length > 0) {
            this.item_selected_agence_paiement[0] = item;
        } else {
            this.item_selected_agence_paiement.push(item);
        }
    }
    annulerAgencePaiement() {
        this.editing_agence_paiement[this.index_selected_agence_paiement] =
            false;
        this.item_selected_agence_paiement = [];

        if (this.new_item_agence_paiement) {
            this.new_item_agence_paiement = false;
            this.rows_agence_paiement.shift();
            this.rows_agence_paiement = [...this.rows_agence_paiement];
            this.all_agence_paiement = [...this.rows_agence_paiement];
        } else {
            this.rows_agence_paiement[this.index_selected_agence_paiement] =
                this.current_item_agence_paiement;
            this.rows_agence_paiement = [...this.rows_agence_paiement];
        }
    }
    onSelectAgencePaiement({ selected }) {
        if (selected) {
            this.index_selected_agence_paiement =
                this.rows_agence_paiement.indexOf(selected[0]);
            this.current_item_agence_paiement = JSON.parse(
                JSON.stringify(selected[0])
            );
        }
    }
    ModifierAgencePaiement() {
        this.editing_agence_paiement[this.index_selected_agence_paiement] =
            true;
    }
    supprimerAgencePaiement() {
        this.dialog.open(this.suppression_dialog_agence_paiement, {
            disableClose: true,
        });
    }
    suppressionConfirmerAgencePaiement() {
        this.save_in_base_agence_paiement(1);
    }
    updateValueAgencePaiement(e, c, i) {
        this.rows_agence_paiement[i][c] = e.target.value;
    }
    save_in_base_agence_paiement(etat_suppression) {
        this.editing_agence_paiement[this.index_selected_agence_paiement] =
            false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_agence_paiement[0].id,
            supprimer: etat_suppression,
            adresse: this.item_selected_agence_paiement[0].adresse,
            identifiant: this.item_selected_agence_paiement[0].identifiant,
            nom_contact: this.item_selected_agence_paiement[0].nom_contact,
            numero_phone_contact: this.item_selected_agence_paiement[0].numero_phone_contact,
            raison_social: this.item_selected_agence_paiement[0].raison_social,
            titre_contact: this.item_selected_agence_paiement[0].titre_contact,
        };

        this.index_api
            .add("Agence_p", this.convertion_data(data), config)
            .subscribe(
                (response) => {
                    if (!this.new_item_agence_paiement) {
                        if (etat_suppression == 1) {
                            this.all_agence_paiement.splice(
                                this.index_selected_agence_paiement,
                                1
                            );
                            this.all_agence_paiement = [
                                ...this.all_agence_paiement,
                            ];
                            this.rows_agence_paiement = [
                                ...this.all_agence_paiement,
                            ];
                        }
                    } else {
                        this.new_item_agence_paiement = false;
                        this.rows_agence_paiement[
                            this.index_selected_agence_paiement
                        ]["id"] = String(response["response"]);
                        this.all_agence_paiement = [
                            ...this.rows_agence_paiement,
                        ];
                    }

                    this.item_selected_agence_paiement = [];
                    this.dialog.closeAll();
                },
                (error) => {
                    alert("erreur");
                }
            );
    }

    //cellule protection sociale
    AjouterCelluleProtectionSociale() {
        this.new_item_cellule_protection_sociale = true;
        let item = {
            id: "0",
            Code: "",
            Nom: "",
            Contact: "",
            NumeroTelephone: "",
            Representant: "",
            ile: {id: null, Ile:''},
            region: {id: null, Region:''},
            commune: {id: null, Commune:''},
            village: {id: null, Village:''},
            programme:{id: null, code:''},
        };

        this.rows_cellule_protection_sociale.unshift(item);

        this.rows_cellule_protection_sociale = [...this.rows_cellule_protection_sociale];

        this.editing_cellule_protection_sociale[0] = true;
        this.index_selected_cellule_protection_sociale = 0;

        if (this.item_selected_cellule_protection_sociale.length > 0) {
            this.item_selected_cellule_protection_sociale[0] = item;
        } else {
            this.item_selected_cellule_protection_sociale.push(item);
        }
    }
    annulerCelluleProtectionSociale() {
        this.editing_cellule_protection_sociale[this.index_selected_cellule_protection_sociale] =
            false;
        this.item_selected_cellule_protection_sociale = [];

        if (this.new_item_cellule_protection_sociale) {
            this.new_item_cellule_protection_sociale = false;
            this.rows_cellule_protection_sociale.shift();
            this.rows_cellule_protection_sociale = [...this.rows_cellule_protection_sociale];
            this.all_cellule_protection_sociale = [...this.rows_cellule_protection_sociale];
        } else {
            this.rows_cellule_protection_sociale[this.index_selected_cellule_protection_sociale] =
                this.current_item_cellule_protection_sociale;
            this.rows_cellule_protection_sociale = [...this.rows_cellule_protection_sociale];
        }
    }
    onSelectCelluleProtectionSociale({ selected }) {
        if (selected) {
            this.index_selected_cellule_protection_sociale =
                this.rows_cellule_protection_sociale.indexOf(selected[0]);
            this.current_item_cellule_protection_sociale = JSON.parse(
                JSON.stringify(selected[0])
            );
        }
    }
    ModifierCelluleProtectionSociale() {
        this.editing_cellule_protection_sociale[this.index_selected_cellule_protection_sociale] =
            true;
    }
    supprimerCelluleProtectionSociale() {
        this.dialog.open(this.suppression_dialog_cellule_protection_sociale, {
            disableClose: true,
        });
    }
    suppressionConfirmerCelluleProtectionSociale() {
        this.save_in_base_cellule_protection_sociale(1);
    }
    updateValueCelluleProtectionSociale(e, c, i) {
        this.rows_cellule_protection_sociale[i][c] = e.target.value;
    }
    updateValue_select_ile(e,c,i)
    {
      var ile= this.all_ile.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_cellule_protection_sociale[i][c] = {id: String(e.value),nom: ile[0].nom};
      console.log(ile);
      
    }
    updateValue_select_prefecture(e,c,i)
    {
      var prefecture= this.all_prefecture.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_cellule_protection_sociale[i][c] = {id: String(e.value),nom: prefecture[0].Region};
      console.log(prefecture);
      
    }
    updateValue_select_commune(e,c,i)
    {
      var commune= this.all_commune.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_cellule_protection_sociale[i][c] = {id: String(e.value),nom: commune[0].Commune};
      console.log(commune);
      
    }
    updateValue_select_village(e,c,i)
    {
      var village= this.all_village.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_cellule_protection_sociale[i][c] = {id: String(e.value),nom: village[0].Village};
      
    }
    updateValue_select_programme(e,c,i)
    {
      var programme= this.all_programme.filter(function(obj) {
  
        return obj.id == e.value;
      });
      this.rows_cellule_protection_sociale[i][c] = {id: String(e.value),nom: programme[0].code};
      console.log(programme);
      
    }
    save_in_base_cellule_protection_sociale(etat_suppression) {
        this.editing_cellule_protection_sociale[this.index_selected_cellule_protection_sociale] =
            false;

        let config = {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8;",
            },
        };

        let data = {
            id: this.item_selected_cellule_protection_sociale[0].id,
            supprimer: etat_suppression,
            Code: this.item_selected_cellule_protection_sociale[0].Code,
            Nom: this.item_selected_cellule_protection_sociale[0].Nom,
            Contact: this.item_selected_cellule_protection_sociale[0].Contact,
            NumeroTelephone: this.item_selected_cellule_protection_sociale[0].NumeroTelephone,
            Representant: this.item_selected_cellule_protection_sociale[0].Representant,
            ile: this.item_selected_cellule_protection_sociale[0].ile.id,
            region: this.item_selected_cellule_protection_sociale[0].region.id,
            commune: this.item_selected_cellule_protection_sociale[0].commune.id,
            village: this.item_selected_cellule_protection_sociale[0].village.id,
            programme: this.item_selected_cellule_protection_sociale[0].programme.id,
        };

        console.log(data);
        

        // this.index_api
        //     .add("type_infrastructure", this.convertion_data(data), config)
        //     .subscribe(
        //         (response) => {
        //             if (!this.new_item_cellule_protection_sociale) {
        //                 if (etat_suppression == 1) {
        //                     this.all_cellule_protection_sociale.splice(
        //                         this.index_selected_cellule_protection_sociale,
        //                         1
        //                     );
        //                     this.all_cellule_protection_sociale = [
        //                         ...this.all_cellule_protection_sociale,
        //                     ];
        //                     this.rows_cellule_protection_sociale = [
        //                         ...this.all_cellule_protection_sociale,
        //                     ];
        //                 }
        //             } else {
        //                 this.new_item_cellule_protection_sociale = false;
        //                 this.rows_cellule_protection_sociale[
        //                     this.index_selected_cellule_protection_sociale
        //                 ]["id"] = String(response["response"]);
        //                 this.all_cellule_protection_sociale = [
        //                     ...this.rows_cellule_protection_sociale,
        //                 ];
        //             }

        //             this.item_selected_cellule_protection_sociale = [];
        //             this.dialog.closeAll();
        //         },
        //         (error) => {
        //             alert("erreur");
        //         }
        //     );
    }

    //others
    get_prefecture_by_ile(id_ile){
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                id_ile,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((response) => {
                this.all_prefecture = response["response"];
                console.log('liste prefecture', this.all_prefecture);
            });
        
    }

    get_commune_by_prefecture(id_prefecture){
        console.log("id prefecture", id_prefecture);
        
        this.index_api
            .getAPIgeneraliserREST(
                "commune",
                "cle_etrangere",
                id_prefecture,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((response) => {
                this.all_commune = response["response"];
                console.log('liste commune', this.all_commune);
            });
        
    }
    get_village_by_commune(id_commune){
        console.log("id prefecture", id_commune);
        
        this.index_api
            .getAPIgeneraliserREST(
                "village",
                "cle_etrangere",
                id_commune,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            )
            .subscribe((response) => {
                this.all_village = response["response"];
                console.log('liste village', this.all_village);
            });
        
    }

    suppressionAnnuler() {
        this.dialog.closeAll();
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
