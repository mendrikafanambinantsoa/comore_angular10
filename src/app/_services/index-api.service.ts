import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { from } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class IndexApiService {
    constructor(
        private http: HttpClient,
        private constantService: ConstantService,
    ) {}

    add(controller, data, config) {
        return this.http.post(
            this.constantService.apiUrl + controller,
            data,
            config,
        );
    }

    getAll(controller) {
        return this.http
            .get<any>(
                this.constantService.apiUrl + controller + "?type_get=findAll",
            )
            .pipe(
                map((user) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    return user;
                }),
            );
    }
    getAPIgeneraliserREST(
        controller,
        champ1,
        valeur1,
        champ2?,
        valeur2?,
        champ3?,
        valeur3?,
        champ4?,
        valeur4?,
        champ5?,
        valeur5?,
        champ6?,
        valeur6?,
        champ7?,
        valeur7?,
        champ8?,
        valeur8?,
        champ9?,
        valeur9?,
        champ10?,
        valeur10?,
        champ11?,
        valeur11?,
    ) {
        //DP
        return this.http.get<any>(
            this.constantService.apiUrl +
                controller +
                "?" +
                champ1 +
                "=" +
                valeur1 +
                "&" +
                champ2 +
                "=" +
                valeur2 +
                "&" +
                champ3 +
                "=" +
                valeur3 +
                "&" +
                champ4 +
                "=" +
                valeur4 +
                "&" +
                champ5 +
                "=" +
                valeur5 +
                "&" +
                champ6 +
                "=" +
                valeur6 +
                "&" +
                champ7 +
                "=" +
                valeur7 +
                "&" +
                champ8 +
                "=" +
                valeur8 +
                "&" +
                champ9 +
                "=" +
                valeur9 +
                "&" +
                champ10 +
                "=" +
                valeur10 +
                "&" +
                champ11 +
                "=" +
                valeur11,
        );
    }

    getAllByClient(controller, idcl, parametre) {
        //DP
        return this.http.get<any>(
            this.constantService.apiUrl +
                controller +
                "?idcl=" +
                idcl +
                "&?parametre=" +
                parametre,
        );
    }
    getgeneralise(controller, filtre) {
        return this.http.get<any>(
            this.constantService.apiUrl + controller + filtre,
        );
    }

    get_user(email, pwd) {
        return this.http.get<any>(
            this.constantService.apiUrl +
                "utilisateurs?email=" +
                email +
                "&pwd=" +
                pwd,
        );
    }
    getParamsDynamic(params: string): Observable<any> {
        return this.http.get<any>(`${this.constantService.apiUrl}${params}`);
    }
}