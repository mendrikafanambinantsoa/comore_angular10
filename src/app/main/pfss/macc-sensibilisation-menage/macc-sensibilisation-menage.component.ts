import { HttpClient } from "@angular/common/http";
import { Component, Injectable, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { catchError, filter, finalize, map, tap } from "rxjs/operators";
import { ConstantService } from "../../../_services/constant.service";
import { MessageDialogComponent } from "./message-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../indicateur/confirmation-dialog.component";

enum Message {
    ERROR = "Une erreur est survenue lors de la récupération des données",
    SUCCESS = "Les données ont été récupérées avec succès",
    WARNING = "Il n'y a pas de données pour le moment",
}

@Component({
    selector: "app-macc-sensibilisation-menage",
    templateUrl: "./macc-sensibilisation-menage.component.html",
    styleUrls: ["./macc-sensibilisation-menage.component.scss"],
})
export class MaccSensibilisationMenageComponent implements OnInit, OnDestroy {
    title: String = "";
    breadcrumb_title: string = "";
    type: any;

    search: string = "";

    filtreForm: FormGroup;
    sensibilisationForm: FormGroup;
    message: string = "";

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);
    private destroy$ = new Subject<void>();

    isLoading$ = this.isLoadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();

    is_edit_mode: boolean = false;

    ileData$: Observable<any[]>;
    prefectureData$: Observable<any[]>;
    communeData$: Observable<any[]>;
    villageData$: Observable<any[]>;
    sensibilisationData$: Observable<any[]>;
    themeData$: Observable<any[]>;
    outilsData$: Observable<any[]>;
    formationMlData$: Observable<any[]>;

    show_hide_form: boolean = false;
    selected_sensibilisation: any = [];
    button_edit_delete: boolean = false;

    filtered_prefecture$: Observable<any[]>;
    filtered_commune$: Observable<any[]>;
    filtered_village$: Observable<any[]>;

    village_id: number;
    show_hide_message: boolean = false;
    columns_sensibilisation = [
        { name: `Date sensibilisation`, prop: `date_sensibilisation` },
        { name: `Localité quartier`, prop: `localite_quartier` },
        { name: `Theme aborde`, prop: `theme_sensibilisation` },
        { name: `Outil utilisé`, prop: `outil_utilise_sensibilisation` },
        { name: `Participant homme`, prop: `participant_homme` },
        { name: `Participant femme`, prop: `participant_femme` },
        { name: `Participant enfant`, prop: `participant_enfant` },
        { name: `Animateur`, prop: `animateur` },
        { name: `Observation`, prop: `observation` },
    ];

    enable_add_button: boolean = false
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private form_builder: FormBuilder,
        private service: MaccSensibilisationMenageService,
        private mat_dialog: MatDialog,
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateBreadcrumb();
            });
        this.initializeFiltreForm();
        this.initializeSensibilisationForm();

        this.fetchIle();
        this.fetchPrefecture();
        this.fetchCommune();
        this.fetchVillage();
        this.fetchTheme();
        this.fetchOutils();
        this.fetchFormationMl();

        this.ileData$ = this.service.ile$;
        this.prefectureData$ = this.service.prefecture$;
        this.communeData$ = this.service.commune$;
        this.villageData$ = this.service.village$;
        this.outilsData$ = this.service.outils$;
        this.sensibilisationData$ = this.service.sensibilisation$;
        this.themeData$ = this.service.theme$;  
    }

    ngOnInit(): void {}

    updateBreadcrumb() {
        let route = this.activatedRoute.firstChild || this.activatedRoute;

        while (route && route.firstChild) {
            route = route.firstChild;
        }
        this.title = route?.snapshot?.data["title"] || "";
        this.breadcrumb_title = route?.snapshot?.data["breadcrumb"] || "";
        this.type = route?.snapshot?.data["type"] || "";
    }

    initializeFiltreForm() {
        this.filtreForm = this.form_builder.group({
            ile_id: [""],
            prefecture_id: [""],
            commune_id: [""],
            village_id: [""],
        });
    }

    initializeSensibilisationForm() {
        this.sensibilisationForm = this.form_builder.group({
            id: [""],
            date_sensibilisation: ["", Validators.required],
            localite_quartier: ["", Validators.required],
            theme_sensibilisation_id: [""],
            outil_utilise_sensibilisation_id: [""],
            participant_homme: [""],
            participant_femme: [""],
            participant_enfant: [""],
            animateur: [""],
            observation: [""],
            village_id: this.village_id,
        });
    }

    toggleForm(setEdit?: boolean) {
      this.show_hide_form = !this.show_hide_form
      if (this.show_hide_form === false) {
        this.button_edit_delete = false
        this.sensibilisationForm.reset()
      } else {
        setEdit === true ? this.updateSensibilisationForm() : this.initializeSensibilisationForm()
      }
      this.is_edit_mode = setEdit === true ? true : false
    }

    fetchSensibilisation() {
        this.isLoadingSubject.next(true);
        this.message = ""; // Reset message at the start
        try {
            this.service
                .fetchFilteredSensibilisation(this.village_id)
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(error.message);
                        this.sensibilisationData$ = of([]);
                        this.showMessage(Message.ERROR);
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe({
                    next: (response) => {
                        if (response && response["response"]) {
                            this.errorSubject.next(null);
                            if (
                                response["status"] === false &&
                                response["response"].length === 0
                            ) {
                                this.showMessage(Message.WARNING);
                                this.show_hide_message = true;
                                const dialogRef = this.mat_dialog.open(
                                    MessageDialogComponent
                                );
                                dialogRef.afterClosed().subscribe((result) => {
                                    if (result) {
                                        this.fetchSensibilisation();
                                    }
                                });
                            } else {
                                this.show_hide_message = false;
                            }
                        }
                    },
                    error: (error) => {
                        console.error("Error fetching sensibilisation:", error);
                        this.showMessage(Message.ERROR);
                    },
                });
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching sensibilisation: ${error.message}`
            );
            this.isLoadingSubject.next(false);
            this.showMessage(Message.ERROR);
        }
    }

    updateSensibilisationForm() {
      this.sensibilisationForm.patchValue({
        id: this.selected_sensibilisation[0].id,
        date_sensibilisation: this.selected_sensibilisation[0].date_sensibilisation,
        localite_quartier: this.selected_sensibilisation[0].localite_quartier,
        theme_sensibilisation_id: this.selected_sensibilisation[0].theme_sensibilisation_id,
        outil_utilise_sensibilisation_id: this.selected_sensibilisation[0].outil_utilise_sensibilisation_id,
        participant_homme: this.selected_sensibilisation[0].participant_homme,  
        participant_femme: this.selected_sensibilisation[0].participant_femme,
        participant_enfant: this.selected_sensibilisation[0].participant_enfant,
        animateur: this.selected_sensibilisation[0].animateur,
        observation: this.selected_sensibilisation[0].observation,
        village_id: this.selected_sensibilisation[0].village_id,
        type_enreg: this.selected_sensibilisation[0].type_enreg 
      })
    }

    createSensibilisation() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      try {
        const sensibilisation_form_data = this.sensibilisationForm.value;
        const data = {
          ...sensibilisation_form_data,
          type_enreg: this.type
        }
        this.service.createSensibilisation(data)
          .subscribe(
            response => {
              if (response.status === true) {
                this.show_hide_form = !this.show_hide_form
                //this.alert.success(response.message)
              }
            }
          )
           this.isLoadingSubject.next(false); // Set loading state to false when done
      } catch (error) {
        this.errorSubject.next(`Error while creating indicateur: ${error.message}`); // Set error state
        this.isLoadingSubject.next(false); // Set loading state to false when done
      }
    }

    updateSensibilisation() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      try {
        const sensibilisation_form_data = this.sensibilisationForm.value;
        const data = {
          ...sensibilisation_form_data,
          type_enreg: this.type
        }
        console.log(`Data sensibilisation: `, data);
        
        this.service.updateSensibilisation(data)
          .subscribe(
            response => {
              if (response.status === true) {
                this.show_hide_form = !this.show_hide_form
                this.sensibilisationForm.reset()
                this.selected_sensibilisation = []
                this.button_edit_delete = false
              }
            }
          ) 
          this.isLoadingSubject.next(false); // Set loading state to false when done
      } catch (error) {
        this.errorSubject.next(`Error while updating sensibilisation: ${error.message}`); // Set error state
        this.isLoadingSubject.next(false); // Set loading state to false when done
      }
    }

    deleteSensibilisation() {
      const dialogRef = this.mat_dialog.open(ConfirmDialogComponent)

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isLoadingSubject.next(true);
          this.errorSubject.next(null);
          try {
            const sensibilisation_id = this.selected_sensibilisation[0].id

            this.service.deleteSensibilisation(sensibilisation_id, this.village_id).subscribe(
              response => {
                if (response.status === true) {
                  this.sensibilisationForm.reset()
                  this.selected_sensibilisation = []
                  this.button_edit_delete = false
                }
                }
            )
            this.isLoadingSubject.next(false)
          } catch (error) {
            this.errorSubject.next(`Error while deleting sensibilisation: ${error.message}`);
            this.isLoadingSubject.next(false)
          }
        }
      })
    }

    async onSelectSensibilisation(event) {
        const selected_sensibilisation = await event.selected;
        this.button_edit_delete = true;
        this.selected_sensibilisation = selected_sensibilisation;
    }
    filterData() {
        const filtered_data = this.filtreForm.value;
        console.log(`Filtered data: `, filtered_data);
        this.village_id = filtered_data.village_id;
        this.fetchSensibilisation();
    }
    onSelectIle(event) {
        const selected_ile = event.value;

        this.filtered_prefecture$ = this.prefectureData$.pipe(
            map((prefectures) => {
                console.log(`Prefectures: `, prefectures);
                const filtered = prefectures.filter(
                    (item) => item.ile.id === selected_ile
                );
                console.log(`Filtered prefectures: `, filtered);
                return filtered;
            })
        );
    }

    onSelectPrefecture(event) {
        const selected_prefecture = event.value;
        this.filtered_commune$ = this.communeData$.pipe(
            map((communes) => {
                const filtered = communes.filter(
                    (item) => item.prefecture.id === selected_prefecture
                );
                console.log(`Filtered communes: `, filtered);
                return filtered;
            })
        );
    }

    onSelectCommune(event) {
        const selected_commune = event.value;
        this.filtered_village$ = this.villageData$.pipe(
            map((villages) => {
                const filtered = villages.filter(
                    (item) => item.commune.id === selected_commune
                );
                console.log(`Filtered villages: `, filtered);
                return filtered;
            })
        );
    }

    onSelectVillage(event) {
      const selected_village = event.value
      this.enable_add_button = selected_village ? true : false
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    fetchIle() {
        try {
            this.service
                .fetchIle()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching ile: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching ile: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchPrefecture() {
        try {
            this.service
                .fetchPrefecture()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching prefecture: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching prefecture: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchCommune() {
        try {
            this.service
                .fetchCommune()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching commune: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching commune: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    showMessage(
        message: string,
        type: "success" | "error" | "warning" = "success"
    ) {
        this.message = message;
    }

    fetchTheme() {
        try {
            this.service
                .fetchTheme()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching theme: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching theme: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchOutils() {
        try {
            this.service
                .fetchOutils()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching outils: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching outils: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchFormationMl() {
        try {
            this.service
                .fetchFormationMl()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching formation ml: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching formation ml: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchVillage() {
        try {
            this.service
                .fetchVillage()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching village: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching village: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }
}

@Injectable({
    providedIn: "root",
})
export class MaccSensibilisationMenageService {
    type: string = "";

    private ileSubject = new BehaviorSubject<any[]>([]);
    ile$ = this.ileSubject.asObservable();

    private prefectureSubject = new BehaviorSubject<any[]>([]);
    prefecture$ = this.prefectureSubject.asObservable();

    private communeSubject = new BehaviorSubject<any[]>([]);
    commune$ = this.communeSubject.asObservable();

    private villageSubject = new BehaviorSubject<any[]>([]);
    village$ = this.villageSubject.asObservable();

    private sensibilisationSubject = new BehaviorSubject<any[]>([]);
    sensibilisation$ = this.sensibilisationSubject.asObservable();

    private themeSubject = new BehaviorSubject<any[]>([]);
    theme$ = this.themeSubject.asObservable();

    private outilsSubject = new BehaviorSubject<any[]>([]);
    outils$ = this.outilsSubject.asObservable();

    private formationMl = new BehaviorSubject<any[]>([]);
    formationMl$ = this.formationMl.asObservable();

    constructor(
        private end_point_url: ConstantService,
        private http: HttpClient,
        private router: Router,
        private activated_route: ActivatedRoute
    ) {
        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                let route =
                    this.activated_route.firstChild || this.activated_route;
                this.type = route?.snapshot?.data["type"] || "";
                console.log(`Type tdb service`, this.type);
            });
    }

    fetchIle(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Ile")
            .pipe(
                tap((response) => this.ileSubject.next(response["response"]))
            );
    }

    fetchPrefecture(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Region")
            .pipe(
                tap((response) =>
                    this.prefectureSubject.next(response["response"])
                )
            );
    }

    fetchCommune(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Commune")
            .pipe(
                tap((response) =>
                    this.communeSubject.next(response["response"])
                )
            );
    }

    fetchVillage(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Village")
            .pipe(
                tap((response) =>
                    this.villageSubject.next(response["response"])
                )
            );
    }

    fetchTheme(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Theme_sensibilisation")
            .pipe(
                tap((response) => this.themeSubject.next(response["response"]))
            );
    }

    fetchOutils(): Observable<any> {
        return this.http
            .get<any[]>(
                this.end_point_url.apiUrl + "Outils_utilise_sensibilisation"
            )
            .pipe(
                tap((response) => this.outilsSubject.next(response["response"]))
            );
    }

    fetchFormationMl(): Observable<any> {
        return this.http
            .get<any[]>(
                this.end_point_url.apiUrl + "Formation_ml_outil_communication"
            )
            .pipe(
                tap((response) => this.formationMl.next(response["response"]))
            );
    }

    fetchFilteredSensibilisation(village_id: number): Observable<any> {
        return this.http
            .get<any[]>(
                this.end_point_url.apiUrl +
                    `Sensibilisation_macc?cle_etrangere=${village_id}&type_enreg=${this.type}`
            )
            .pipe(
                tap((response) =>
                    this.sensibilisationSubject.next(response["response"])
                )
            );
    }

    createSensibilisation(sensibilisation_data: any): Observable<any> {
      const data = {
        data_sensibilisation: sensibilisation_data
      }

      console.log(`Data sensibilisation: `, data.data_sensibilisation.village_id);
      
      return this.http.post(this.end_point_url.apiUrl + "Sensibilisation_macc", data).pipe(
        tap(
          () => 
            this.fetchFilteredSensibilisation(+data.data_sensibilisation.village_id).subscribe())
      )
    }

    updateSensibilisation(sensibilisation_data: any): Observable<any> {
      const data = {
        updated_sensibilisation: sensibilisation_data
      }

      return this.http.put(this.end_point_url.apiUrl + "Sensibilisation_macc", data).pipe(
        tap(
          () => 
            this.fetchFilteredSensibilisation(+data.updated_sensibilisation.village_id).subscribe()
        )
      )
      
    }

    deleteSensibilisation(sensibilisation_id: number, village_id: number): Observable<any> {
      return this.http
        .delete(
          this.end_point_url.apiUrl + `Sensibilisation_macc/delete_sensibilisation/${sensibilisation_id}`
        )
        .pipe(
          tap((response) => {
            this.fetchFilteredSensibilisation(+village_id).subscribe()
          })
        )
    }
}
