import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { ConstantService } from "../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, filter, finalize, tap, takeUntil, map } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndicateurService } from "../indicateur/indicateur.component";
import { AlertService } from '../../../_services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../indicateur/confirmation-dialog.component';

@Component({
    selector: "app-tableau-de-bord-ariep-actr",
    templateUrl: "./tableau-de-bord-ariep-actr.component.html",
    styleUrls: ["./tableau-de-bord-ariep-actr.component.scss"],
})
export class TableauDeBordAriepActrComponent implements OnInit, OnDestroy {
    breadcrumb_title: string = "";
    title: string = "";

    // State management properties
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);
    // Expose the loading and error states as observables
    isLoading$ = this.isLoadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();
    is_edit_mode: boolean = false;
    search: string = "";

    ileData$: Observable<any[]>;
    indicateurTdbData$: Observable<any[]>;
    tableau_de_bord_data$: Observable<any[]>;
    tableau_de_bord_data_global$: Observable<any[]>;

    // Observables pour chaque île
    tableau_de_bord_ngazidja$: Observable<any[]>;
    tableau_de_bord_ndzouani$: Observable<any[]>;
    tableau_de_bord_mwali$: Observable<any[]>;

    objectifForm: FormGroup;
    objectif_data$: Observable<any[]>;

    show_hide_form: boolean = false;
    selected_objectif: any = [];
    button_edit_delete: boolean = false;
    type_tdb: string = "";

    visible: any;
    rang: any;

    is_tableau_de_bord: boolean = false

    private destroy$ = new Subject<void>();

    objectif_datatable_row = [
        { name: `Ile`, prop: "ile" },
        { name: `Indicateur`, prop: "indicateur" },
        { name: `Objectif vague 1`, prop: "objectif_nombre_vague1" },
        { name: `Nbr village vague 1`, prop: "objectif_village_vague1" },
        { name: `Objectif vague 2`, prop: "objectif_nombre_vague2" },
        { name: `Nbr village vague 2`, prop: "objectif_village_vague2" },
        { name: `Objectif vague 3`, prop: "objectif_nombre_vague3" },
        { name: `Nbr village vague 3`, prop: "objectif_village_vague3" },
    ];

    tableau_de_bord_vague_1 = [
      { name: `Nombre Objectif`, prop: `objectif_nombre_vague1` },
      { name: `Nombre de realisation`, prop: `real_nombre_vague1` },
      { name: `Taux de realisation`, prop: `taux_de_realisation_vague1` },
      { name: `Nombre de village realise`, prop: `objectif_village_vague1` },
      { name: `Nombre de village non realise`, prop: `nombre_village_vague1`},
      { name: `% Non-realisation`, prop: `taux_de_non_realisation_vague1`}
    ]

    tableau_de_bord_vague_2 = [
      { name: `Nombre Objectif`, prop: `objectif_nombre_vague2` },
      { name: `Nombre de realisation`, prop: `real_nombre_vague2` },
      { name: `Taux de realisation`, prop: `taux_de_realisation_vague2` },
      { name: `Nombre de village realise`, prop: `objectif_village_vague2` },
      { name: `Nombre de village non realise`, prop: `nombre_village_vague2`},
      { name: `% Non-realisation`, prop: `taux_de_non_realisation_vague2`}
    ]
    
    tableau_de_bord_vague_3 = [
      { name: `Nombre Objectif`, prop: `objectif_nombre_vague3` },
      { name: `Nombre de realisation`, prop: `real_nombre_vague3` },
      { name: `Taux de realisation`, prop: `taux_de_realisation_vague3` },
      { name: `Nombre de village realise`, prop: `objectif_village_vague3` },
      { name: `Nombre de village non realise`, prop: `nombre_village_vague3`},
      { name: `% Non-realisation`, prop: `taux_de_non_realisation_vague3`}
    ]
    
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: TableauDeBordArieActrService,
        private formBuilder: FormBuilder,
        private indicateur_tdb_service: IndicateurService,
        public alert: AlertService,
        public mat_dialog: MatDialog
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateBreadcrumb();
            });

        this.ileData$ = this.service.ile$;
        this.indicateurTdbData$ = indicateur_tdb_service.indicateur$
        this.objectif_data$ = service.objectif$;
        
        // Configuration des observables filtrés par île
        this.tableau_de_bord_data$ = service.reporting$;
        this.tableau_de_bord_data_global$ = service.reportingGlobal$;

        // Filtrage des données par île
        this.tableau_de_bord_ngazidja$ = service.reporting$.pipe(
            map(data => data.filter(item => item.ile_id === "2"))
        );
        
        this.tableau_de_bord_ndzouani$ = service.reporting$.pipe(
            map(data => data.filter(item => item.ile_id === "4"))
        );
        
        this.tableau_de_bord_mwali$ = service.reporting$.pipe(
            map(data => data.filter(item => item.ile_id === "1"))
        );

        this.fetchIle();
        this.fetchIndicateur();

        this.initializeObjectifForm();
        this.activatedRoute.data.subscribe(data => {
          this.is_tableau_de_bord = data.is_tableau_de_bord
        })
    }

    ngOnInit(): void {
        //this.fetchObjectif();
        //this.fetchTableauDeBord()
        this.is_tableau_de_bord === true ? this.fetchTableauDeBord() : this.fetchObjectif()
    }

    updateBreadcrumb() {
        let route = this.activatedRoute.firstChild || this.activatedRoute;
       
        while (route && route.firstChild) {
            route = route.firstChild;
        }
        this.title = route?.snapshot?.data["title"] || "";
        this.breadcrumb_title = route?.snapshot?.data["breadcrumb"] || "";
        this.type_tdb = route?.snapshot?.data["type_tdb"] || "";
        //this.is_tableau_de_bord = route?.snapshot?.data['is_tableau_de_bord']
    }

    initializeObjectifForm() {
        this.objectifForm = this.formBuilder.group({
            id: [""],
            ile_id: ["", Validators.required],
            indicateur_id: ["", Validators.required],
            objectif_nombre_vague1: ["", Validators.required],
            objectif_village_vague1: ["", Validators.required],
            objectif_nombre_vague2: ["", Validators.required],
            objectif_village_vague2: ["", Validators.required],
            objectif_nombre_vague3: ["", Validators.required],
            objectif_village_vague3: ["", Validators.required],
        });
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
          this.errorSubject.next(`Error while fetching ile: ${error.message}`);
          this.isLoadingSubject.next(false);
        }
    }

    fetchIndicateur() {
        try {
            this.indicateur_tdb_service
                .fetchIndicateurList()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching indicateur ${error.message}`
                        );
                        throw error
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
          this.errorSubject.next(`Error while fetching indicateur: ${error.message}`);
          this.isLoadingSubject.next(false);
        }
    }

    fetchObjectif() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
        try {
            this.service
                .fetchObjectif(this.type_tdb)
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching objectif: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            console.error(`Error fetching objectif:`, error);
        }
    }

    fetchTableauDeBord() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      try {
        this.service.fetchTableauDeBord().pipe(
          catchError((error) => {
            this.errorSubject.next(`Error while fetching tableau de bord: ${error.message}`);
            throw error;
          }),
          finalize(() => this.isLoadingSubject.next(false))
        ).subscribe();

        this.service.fetchTableauDeBordGlobal().pipe(
          catchError((error) => {
            this.errorSubject.next(`Error while fetching tableau de bord global: ${error.message}`);
            throw error;
          }),
          finalize(() => this.isLoadingSubject.next(false))
        ).subscribe();
      } catch (error) {
        console.error(`Error fetching tableau de bord:`, error);
        
      }
    }

    toggleForm(setEdit?: boolean) {
        this.show_hide_form = !this.show_hide_form;
        if (this.show_hide_form === false) {
            this.button_edit_delete = false;
            this.objectifForm.reset();
        } else {
            setEdit === true
                ? this.updateObjectifForm()
                : this.initializeObjectifForm();
        }
        this.is_edit_mode = setEdit === true ? true : false;
    }

    updateObjectifForm() {
        this.objectifForm.patchValue({
            id: this.selected_objectif[0].id,
            ile_id: this.selected_objectif[0].ile_id,
            indicateur_id: this.selected_objectif[0].indicateur_id,
            objectif_nombre_vague1:
                this.selected_objectif[0].objectif_nombre_vague1,
            objectif_village_vague1:
                this.selected_objectif[0].objectif_village_vague1,
            objectif_nombre_vague2:
                this.selected_objectif[0].objectif_nombre_vague2,
            objectif_village_vague2:
                this.selected_objectif[0].objectif_village_vague2,
            objectif_nombre_vague3:
                this.selected_objectif[0].objectif_nombre_vague3,
            objectif_village_vague3:
                this.selected_objectif[0].objectif_village_vague3
        });
    }

    createObjectif() {
        this.isLoadingSubject.next(true); // Set loading state to true
        this.errorSubject.next(null); // Clear any previous errors

        const objectif_form_data = this.objectifForm.value

        const data = {
          type_tdb: this.type_tdb,
          rang:  this.rang,
          visible: 1,
          ...objectif_form_data
        }
        
        try {
          this.service.createObjectif(data).subscribe(
            response => {
              if (response.status === true) {
                this.show_hide_form = !this.show_hide_form
                this.alert.success(response.message)
              }
            }
          )
          this.isLoadingSubject.next(false)
        } catch (error) {
          this.errorSubject.next(`Error while creating new objectif : ${error.message}`)
          this.isLoadingSubject.next(false)
        }
    }

    updateObjectif() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors

      const updated_objectif_form_data = this.objectifForm.value

      try {
        this.service.updateObjectif({...updated_objectif_form_data}).subscribe(
          response => {
            if (response.status === true) {
              this.show_hide_form = !this.show_hide_form
              this.objectifForm.reset()
              this.selected_objectif = []
              this.button_edit_delete = false
            }
          }
        )
        this.isLoadingSubject.next(false)
      } catch (error) {
        this.errorSubject.next(`Error while updating indicateur: ${error.message}`); // Set error state
        this.isLoadingSubject.next(false); // Set loading state to false when done
      }
    }

    deleteObjectif() {
      const dialogRef = this.mat_dialog.open(ConfirmDialogComponent)

      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.isLoadingSubject.next(true); // Set loading state to true
          this.errorSubject.next(null); // Clear any previous errors
          try {
            const objectif_id = this.selected_objectif[0].id

            this.service.deleteObjectif(objectif_id).subscribe(
              response => {
                if (response.status === true) {
                  this.alert.success(response.message)
                  this.objectifForm.reset()
                  this.selected_objectif = []
                  this.button_edit_delete = false
                }
              }
            )
            this.isLoadingSubject.next(false)
          } catch (error) {
            this.errorSubject.next(`Error while deleting indicateur: ${error.message}`); // Set error state
            this.isLoadingSubject.next(false); // Set loading state to false when done
          }
        }
      })
    }

    onSelectObjectif(event) {
        const selected_objectif = event.selected;


        this.selected_objectif = selected_objectif;
        this.button_edit_delete = true
    }

    onSelectIle(event) {
        const selected_ile = event.value;
   
        
        this.service.objectif$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (data) => {
                    // Filtrer d'abord par ile_id puis prendre le dernier rang
                    const filteredData = data
                        .filter(item => item.ile_id === selected_ile)
                        .sort((a, b) => Number(b.rang) - Number(a.rang))[0]; // Conversion en nombre et tri décroissant
                
                    this.rang = +filteredData.rang + 1;
                },
                error: (error) => {
                    console.error('Erreur lors de la récupération des données:', error);
                }
            });
    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}

@Injectable({
    providedIn: "root",
})
export class TableauDeBordArieActrService {
    private ileSubject = new BehaviorSubject<any[]>([]);
    ile$ = this.ileSubject.asObservable();

    objectfiSubject = new BehaviorSubject<any[]>([]);
    objectif$ = this.objectfiSubject.asObservable();

    reportingSubject = new BehaviorSubject<any[]>([]);
    reporting$ = this.reportingSubject.asObservable();

    reportingGlobalSubject = new BehaviorSubject<any[]>([]);
    reportingGlobal$ = this.reportingGlobalSubject.asObservable();

    private indicateurSubject = new BehaviorSubject<any[]>([]);
    indicateur_tbd$ = this.indicateurSubject.asObservable;

    type_tdb: any
    constructor(
        private end_point_url: ConstantService,
        private http: HttpClient,
        private router: Router,
        private activated_route: ActivatedRoute
    ) {
      this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activated_route.firstChild || this.activated_route;
        this.type_tdb = route?.snapshot?.data["type_tdb"] || "";
        console.log(`Type tdb service`, this.type_tdb);
        
      });
    }

    
    fetchIle(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Ile")
            .pipe(
                tap((response) => this.ileSubject.next(response["response"]))
            );
    }

    fetchObjectif(type_tdb: string): Observable<any> {
        return this.http
            .get<any>(
                this.end_point_url.apiUrl +
                    `Tableau_de_bord/index?type_tdb=` +
                    type_tdb
            )
            .pipe(
                tap((response) =>
                    this.objectfiSubject.next(response["response"])
                )
            );
    }

    createObjectif(data: any): Observable<any> {
        const datas = {
          data_objectif: data,
        };
        return this.http
            .post(this.end_point_url.apiUrl + "Tableau_de_bord", datas)
            .pipe(
                tap((response) => {
                    this.fetchObjectif(this.type_tdb).subscribe();
                })
            );
    }

    updateObjectif(data: any): Observable<any> {
        const datas = {
          updated_objectif: data,
        };
        return this.http
            .put(this.end_point_url.apiUrl + "Tableau_de_bord", datas)
            .pipe(
                tap((response) => {
    
                    this.fetchObjectif(this.type_tdb).subscribe();
                })
            );
    }

    deleteObjectif(id: number): Observable<any> {
        return this.http
            .delete(
                this.end_point_url.apiUrl +
                    `Tableau_de_bord/delete_tableau_de_bord/${id}`
            )
            .pipe(
                tap((response) => {
          
                    this.fetchObjectif(this.type_tdb).subscribe();
                })
            );
    }

    fetchTableauDeBord(): Observable<any> {
      return this.http
          .get<any[]>(
              this.end_point_url.apiUrl +
                  `Tableau_de_bord/index?type_tdb=${this.type_tdb}&tableau_de_bord=1&detail=1`
          )
          .pipe(
              tap((response) => {
                  // Calculer les taux pour chaque élément
                  const processedData = response["response"].map(item => ({
                      ...item,
                      // Taux de réalisation pour le nombre
                      taux_de_realisation_vague1: this.calculerTaux(item.real_nombre_vague1, item.objectif_nombre_vague1),
                      taux_de_realisation_vague2: this.calculerTaux(item.real_nombre_vague2, item.objectif_nombre_vague2),
                      taux_de_realisation_vague3: this.calculerTaux(item.real_nombre_vague3, item.objectif_nombre_vague3),
                      
                      // Taux de non-réalisation pour les villages
                      taux_de_non_realisation_vague1: this.calculerTaux(
                          ((Number(item.nombre_village_vague1) * 1) - (Number(item.real_village_vague1) * 1)), 
                          item.nombre_village_vague1
                      ),
                      taux_de_non_realisation_vague2: this.calculerTaux(
                          ((Number(item.nombre_village_vague2) * 1) - (Number(item.real_village_vague2) * 1)), 
                          item.nombre_village_vague2
                      ),
                      taux_de_non_realisation_vague3: this.calculerTaux(
                          ((Number(item.nombre_village_vague3) * 1) - (Number(item.real_village_vague3) * 1)), 
                          item.nombre_village_vague3
                      )
                  }));
                  console.log(`Processed data`, processedData);
                  
                  this.reportingSubject.next(processedData);
              })
          );
  }

  fetchTableauDeBordGlobal(): Observable<any> {
    console.log(`Type tdb service`, this.type_tdb);
    
    return this.http
    .get<any[]>(
        this.end_point_url.apiUrl +
            `Tableau_de_bord/index?type_tdb=${this.type_tdb}&tableau_de_bord=1&recap=1`
    )
    .pipe(
        tap((response) => {
          console.log(`Response global`, response);
          
            // Calculer les taux pour chaque élément
            const processedData = response["response"].map(item => ({
                ...item,
                // Taux de réalisation pour le nombre
                taux_de_realisation_vague1: this.calculerTaux(item.real_nombre_vague1, item.objectif_nombre_vague1),
                taux_de_realisation_vague2: this.calculerTaux(item.real_nombre_vague2, item.objectif_nombre_vague2),
                taux_de_realisation_vague3: this.calculerTaux(item.real_nombre_vague3, item.objectif_nombre_vague3),
                
                // Taux de non-réalisation pour les villages
                taux_de_non_realisation_vague1: this.calculerTaux(
                    ((Number(item.nombre_village_vague1) * 1) - (Number(item.real_village_vague1) * 1)), 
                    item.nombre_village_vague1
                ),
                taux_de_non_realisation_vague2: this.calculerTaux(
                    ((Number(item.nombre_village_vague2) * 1) - (Number(item.real_village_vague2) * 1)), 
                    item.nombre_village_vague2
                ),
                taux_de_non_realisation_vague3: this.calculerTaux(
                    ((Number(item.nombre_village_vague3) * 1) - (Number(item.real_village_vague3) * 1)), 
                    item.nombre_village_vague3
                )
            }));
            console.log(`Processed data`, processedData);
            
            this.reportingGlobalSubject.next(processedData);
        })
    );
      
  }
  // Fonction utilitaire pour calculer le taux
  private calculerTaux(realisation: any, objectif: any): string {
      if (parseFloat(realisation) > 0 && parseFloat(objectif)) {
          return Number(((parseFloat(realisation) / parseFloat(objectif)) * 100).toFixed(2)).toString();
      } else {
          return "";
      }
  }
}
