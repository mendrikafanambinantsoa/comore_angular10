import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndexApiService } from "app/_services/index-api.service";

@Component({
    selector: "app-utilisateur",
    templateUrl: "./utilisateur.component.html",
    styleUrls: ["./utilisateur.component.scss"],
})
export class UtilisateurComponent implements OnInit {
    rows_users: any[];
    userFormModification: FormGroup;
    afficherUserFormModification: boolean;
    afficherBouttonModifier: boolean;
    selected_user = [];
    rechercher_user = "";
    index_selected_user: number;
    utilisateur: any;

    loadingIndicator: boolean;
    reorderable: boolean;

    constructor(
        private _formbuilder: FormBuilder,
        private index_api: IndexApiService
    ) {}

    ngOnInit(): void {
        this.afficherBouttonModifier = false;
        this.selected_user = [];
        this.afficherUserFormModification = false;
        this.utilisateur = {};
        this.index_api.getAll("utilisateurs").subscribe((response) => {
            this.rows_users = response["response"];
        });

        this.userFormModification = this._formbuilder.group({
            id: [""],
            nom: ["", Validators.required],
            prenom: ["", Validators.required],
            email: ["", Validators.required],
            enabled: ["", Validators.required],
            user: [""],
            admin: [""],
            ddb: [""],
        });
    }

    affichage_etat(etat) {
        switch (etat) {
            case "0": {
                return "INACTIF";
            }
            case "1": {
                return "ACTIF";
            }

            default:
                break;
        }
    }
    onSelectUtilisateur({ selected }) {
        this.afficherBouttonModifier = true;
        if (selected) {
            this.index_selected_user = this.rows_users.indexOf(selected[0]);
        }
    }
    ModifierUtilisateur() {
        this.afficherUserFormModification = true;
        this.utilisateur = {
            id: this.selected_user[0].id,
            nom: this.selected_user[0].nom,
            prenom: this.selected_user[0].prenom,
            email: this.selected_user[0].email,
            enabled: this.selected_user[0].enabled,
            user: this.affichage_privilege("USER", this.selected_user[0].roles),
            ddb: this.affichage_privilege("DDB", this.selected_user[0].roles),
            admin: this.affichage_privilege(
                "ADMIN",
                this.selected_user[0].roles
            ),
        };
    }
    affichage_privilege(role, roles) {
        return roles.includes(role);
    }
    fermerFormModificationUser() {
        this.afficherUserFormModification = false;
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
            encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
          );
        }
    
        var source = buffer.join("&").replace(/%20/g, "+");
        return (source);
      }
}
