import { Component, OnInit,  TemplateRef, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndexApiService } from 'app/_services/index-api.service';

@Component({
  selector: 'app-type-resultat-plainte',
  templateUrl: './type-resultat-plainte.component.html',
  styleUrls: ['./type-resultat-plainte.component.scss']
})
export class TypeResultatPlainteComponent implements OnInit {
     //type plainte
     all_type_plainte: any[];
     rows_type_plainte: any[];
     selected_type_plainte: any;
     current_item_type_plainte: any;
     new_item_type_plainte: boolean;
     editing_type_plainte = {};
     index_selected_type_plainte: number;
     item_selected_type_plainte = [];
     @ViewChild("suppression_dialog_type_plainte", { static: true })
     suppression_dialog_type_plainte: TemplateRef<any>;
     search_type_plainte:string = "";

      //resultat plainte
      all_resultat_plainte: any[];
      rows_resultat_plainte: any[];
      selected_resultat_plainte: any;
      current_item_resultat_plainte: any;
      new_item_resultat_plainte: boolean;
      editing_resultat_plainte = {};
      index_selected_resultat_plainte: number;
      item_selected_resultat_plainte = [];
      @ViewChild("suppression_dialog_resultat_plainte", { static: true })
      suppression_dialog_resultat_plainte: TemplateRef<any>;
      search_resultat_plainte:string = "";

      //responsable enregistrement plainte
      all_responsable_plainte: any[];
      rows_responsable_plainte: any[];
      selected_responsable_plainte: any;
      current_item_responsable_plainte: any;
      new_item_responsable_plainte: boolean;
      editing_responsable_plainte = {};
      index_selected_responsable_plainte: number;
      item_selected_responsable_plainte = [];
      @ViewChild("suppression_dialog_responsable_plainte", { static: true })
      suppression_dialog_responsable_plainte: TemplateRef<any>;
      search_responsable_plainte:string = "";

  constructor(private index_api: IndexApiService, public dialog: MatDialog) { 
    //type plainte
    this.rows_type_plainte = [];
    this.new_item_type_plainte = false;

    //resultat plainte
    this.rows_resultat_plainte = [];
    this.new_item_resultat_plainte = false;

    //responsable enregistrement plainte
    this.rows_responsable_plainte = [];
    this.new_item_responsable_plainte = false;
  }

  ngOnInit(): void {
    //type plainte
    this.index_api.getAll("type_plainte").subscribe((resp) => {
        this.all_resultat_plainte = [...resp.response];
        this.rows_type_plainte = resp.response;
    });
    //resultat plainte
    this.index_api.getAll("resultat_plainte").subscribe((resp) => {
        this.all_type_plainte = [...resp.response];
        this.rows_resultat_plainte = resp.response;        
    });
    //responsable enregistrement plainte
    this.index_api.getAll("responsable_enreg_plainte").subscribe((resp) => {
        this.all_responsable_plainte = [...resp.response];
        this.rows_responsable_plainte = resp.response;
        console.log(this.rows_responsable_plainte);
    });
  }
  //type plainte
  AjouterTypePlainte() {
    this.new_item_type_plainte = true;
    let item = {
        id: "0",
        Code: "",
        TypePlainte: "",
        a_ete_modifie: 0,
    };

    this.rows_type_plainte.unshift(item);

    this.rows_type_plainte = [...this.rows_type_plainte];

    this.editing_type_plainte[0] = true;
    this.index_selected_type_plainte = 0;

    if (this.item_selected_type_plainte.length > 0) {
        this.item_selected_type_plainte[0] = item;
    } else {
        this.item_selected_type_plainte.push(item);
    }
}
annulerTypePlainte() {
    this.editing_type_plainte[this.index_selected_type_plainte] = false;
    this.item_selected_type_plainte = [];

    if (this.new_item_type_plainte) {
        this.new_item_type_plainte = false;
        this.rows_type_plainte.shift();
        this.rows_type_plainte = [...this.rows_type_plainte];
        this.all_type_plainte = [...this.rows_type_plainte];
    } else {
        this.rows_type_plainte[this.index_selected_type_plainte] = this.current_item_type_plainte;
        this.rows_type_plainte = [...this.rows_type_plainte];
    }
}
onSelectTypePlainte({ selected }) {
    if (selected) {
        this.index_selected_type_plainte = this.rows_type_plainte.indexOf(selected[0]);
        this.current_item_type_plainte = JSON.parse(JSON.stringify(selected[0]));
    }
}
ModifierTypePlainte() {
    this.editing_type_plainte[this.index_selected_type_plainte] = true;
}
supprimerTypePlainte() {
    this.dialog.open(this.suppression_dialog_type_plainte, { disableClose: true }); 
}
suppressionConfirmerTypePlainte()
{
    this.save_in_base_type_plainte(1);
} 
updateValueTypePlainte(e, c, i) {
    this.rows_type_plainte[i][c] = e.target.value;
}
save_in_base_type_plainte(etat_suppression) {
    this.editing_type_plainte[this.index_selected_type_plainte] = false;

    let config = {
        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded;charset=utf-8;",
        },
    };

    let data = {
        id: this.item_selected_type_plainte[0].id,
        supprimer: etat_suppression,
        Code: this.item_selected_type_plainte[0].Code,
        TypePlainte: this.item_selected_type_plainte[0].TypePlainte,
        a_ete_modifie: this.item_selected_type_plainte[0].a_ete_modifie = 0
    };

    this.index_api
        .add("type_plainte", this.convertion_data(data), config)
        .subscribe(
            (response) => {
                if (!this.new_item_type_plainte) {
                    if (etat_suppression == 1) {
                        this.all_type_plainte.splice(this.index_selected_type_plainte, 1);
                        this.all_type_plainte = [...this.all_type_plainte];
                        this.rows_type_plainte = [...this.all_type_plainte];
                    }
                } else {
                    this.new_item_type_plainte = false;
                    this.rows_type_plainte[this.index_selected_type_plainte]["id"] =
                        String(response["response"]);
                    this.all_type_plainte = [...this.rows_type_plainte];
                }

                this.item_selected_type_plainte = [];
                this.dialog.closeAll();
            },
            (error) => {
                alert("erreur");
            }
        );
}

//resultat plainte
AjouterResultatPlainte() {
    this.new_item_resultat_plainte = true;
    let item = {
        id: "0",
        Code: "",
        libelle: "",
        a_ete_modifie: 0,
    };

    this.rows_resultat_plainte.unshift(item);

    this.rows_resultat_plainte = [...this.rows_resultat_plainte];

    this.editing_resultat_plainte[0] = true;
    this.index_selected_resultat_plainte = 0;

    if (this.item_selected_resultat_plainte.length > 0) {
        this.item_selected_resultat_plainte[0] = item;
    } else {
        this.item_selected_resultat_plainte.push(item);
    }
}
annulerResultatPlainte() {
    this.editing_resultat_plainte[this.index_selected_resultat_plainte] = false;
    this.item_selected_resultat_plainte = [];

    if (this.new_item_resultat_plainte) {
        this.new_item_resultat_plainte = false;
        this.rows_resultat_plainte.shift();
        this.rows_resultat_plainte = [...this.rows_resultat_plainte];
        this.all_resultat_plainte = [...this.rows_resultat_plainte];
    } else {
        this.rows_resultat_plainte[this.index_selected_resultat_plainte] = this.current_item_type_plainte;
        this.rows_resultat_plainte = [...this.rows_resultat_plainte];
    }
}
onSelectResultatPlainte({ selected }) {
    if (selected) {
        this.index_selected_resultat_plainte = this.rows_resultat_plainte.indexOf(selected[0]);
        this.current_item_type_plainte = JSON.parse(JSON.stringify(selected[0]));
    }
}
ModifierResultatPlainte() {
    this.editing_resultat_plainte[this.index_selected_resultat_plainte] = true;
}
supprimerResultatPlainte() {
    this.dialog.open(this.suppression_dialog_resultat_plainte, { disableClose: true }); 
}
suppressionConfirmerResultatPlainte()
{
    this.save_in_base_resultat_plainte(1);
} 
updateValueResultatPlainte(e, c, i) {
    this.rows_resultat_plainte[i][c] = e.target.value;
}
save_in_base_resultat_plainte(etat_suppression) {
    this.editing_resultat_plainte[this.index_selected_resultat_plainte] = false;

    let config = {
        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded;charset=utf-8;",
        },
    };

    let data = {
        id: this.item_selected_resultat_plainte[0].id,
        supprimer: etat_suppression,
        code: this.item_selected_resultat_plainte[0].code,
        libelle: this.item_selected_resultat_plainte[0].libelle,
        a_ete_modifie: this.item_selected_resultat_plainte[0].a_ete_modifie = 0
    };

    this.index_api
        .add("resultat_plainte", this.convertion_data(data), config)
        .subscribe(
            (response) => {
                if (!this.new_item_resultat_plainte) {
                    if (etat_suppression == 1) {
                        this.all_resultat_plainte.splice(this.index_selected_resultat_plainte, 1);
                        this.all_resultat_plainte = [...this.all_resultat_plainte];
                        this.rows_resultat_plainte = [...this.all_resultat_plainte];
                    }
                } else {
                    this.new_item_resultat_plainte = false;
                    this.rows_resultat_plainte[this.index_selected_resultat_plainte]["id"] =
                        String(response["response"]);
                    this.all_resultat_plainte = [...this.rows_resultat_plainte];
                }

                this.item_selected_resultat_plainte = [];
                this.dialog.closeAll();
            },
            (error) => {
                alert("erreur");
            }
        );
}

//responsable enregistrement plainte
AjouterResponsablePlainte() {
    this.new_item_responsable_plainte = true;
    let item = {
        id: "0",
        description: "",
    };

    this.rows_responsable_plainte.unshift(item);

    this.rows_responsable_plainte = [...this.rows_responsable_plainte];

    this.editing_responsable_plainte[0] = true;
    this.index_selected_responsable_plainte = 0;

    if (this.item_selected_responsable_plainte.length > 0) {
        this.item_selected_responsable_plainte[0] = item;
    } else {
        this.item_selected_responsable_plainte.push(item);
    }
}
onSelectResponsablePlainte({ selected }) {
    if (selected) {
        this.index_selected_responsable_plainte = this.rows_responsable_plainte.indexOf(selected[0]);
        this.current_item_responsable_plainte = JSON.parse(JSON.stringify(selected[0]));
    }
}
updateValueResponsablePlainte(e, c, i) {
    this.rows_responsable_plainte[i][c] = e.target.value;
}
annulerResponsablePlainte() {
    this.editing_responsable_plainte[this.index_selected_responsable_plainte] = false;
    this.item_selected_responsable_plainte = [];

    if (this.new_item_responsable_plainte) {
        this.new_item_responsable_plainte = false;
        this.rows_responsable_plainte.shift();
        this.rows_responsable_plainte = [...this.rows_responsable_plainte];
        this.all_responsable_plainte = [...this.rows_responsable_plainte];
    } else {
        this.rows_responsable_plainte[this.index_selected_responsable_plainte] = this.current_item_responsable_plainte;
        this.rows_responsable_plainte = [...this.rows_responsable_plainte];
    }
}
ModifierResponsablePlainte() {
    this.editing_responsable_plainte[this.index_selected_responsable_plainte] = true;
}
supprimerResponsablePlainte() {
    this.dialog.open(this.suppression_dialog_responsable_plainte, { disableClose: true }); 
}
suppressionConfirmerResponsablePlainte()
{
    this.save_in_base_responsable_plainte(1);
} 
save_in_base_responsable_plainte(etat_suppression) {
    this.editing_responsable_plainte[this.index_selected_responsable_plainte] = false;

    let config = {
        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded;charset=utf-8;",
        },
    };

    let data = {
        id: this.item_selected_responsable_plainte[0].id,
        supprimer: etat_suppression,
        description: this.item_selected_responsable_plainte[0].description,
    };

    this.index_api
        .add("responsable_enreg_plainte", this.convertion_data(data), config)
        .subscribe(
            (response) => {
                if (!this.new_item_responsable_plainte) {
                    if (etat_suppression == 1) {
                        this.all_responsable_plainte.splice(this.index_selected_responsable_plainte, 1);
                        this.all_responsable_plainte = [...this.all_responsable_plainte];
                        this.rows_responsable_plainte = [...this.all_responsable_plainte];
                    }
                } else {
                    this.new_item_responsable_plainte= false;
                    this.rows_responsable_plainte[this.index_selected_responsable_plainte]["id"] =
                        String(response["response"]);
                    this.all_responsable_plainte = [...this.rows_responsable_plainte];
                }

                this.item_selected_responsable_plainte = [];
                this.dialog.closeAll();
            },
            (error) => {
                alert("erreur");
            }
        );
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
