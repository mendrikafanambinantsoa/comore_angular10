import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../actr-service.service";

@Component({
    selector: "app-carte-beneficiaire",
    templateUrl: "./carte-beneficiaire.component.html",
    styleUrls: ["./carte-beneficiaire.component.scss"],
})
export class CarteBeneficiaireComponent implements OnInit {
    
    constructor(
       
    ) {}

    ngOnInit(): void {
        
    }

    
}
