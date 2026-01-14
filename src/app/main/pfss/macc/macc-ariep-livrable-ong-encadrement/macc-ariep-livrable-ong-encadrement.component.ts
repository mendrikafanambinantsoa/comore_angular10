import { Component, Injectable, OnInit, OnDestroy } from "@angular/core";
import { ConstantService } from "../../../../_services/constant.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from, Observable, of, Subject } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../macc-sensibilisation-menage/message-dialog.component";
import { ConfirmDialogComponent } from "../../indicateur/confirmation-dialog.component";

enum Message {
    ERROR = "Une erreur est survenue lors de la récupération des données",
    SUCCESS = "Les données ont été récupérées avec succès",
    WARNING = "Il n'y a pas de données pour le moment",
}

@Component({
    selector: "app-macc-ariep-livrable-ong-encadrement",
    templateUrl: "./macc-ariep-livrable-ong-encadrement.component.html",
    styleUrls: ["./macc-ariep-livrable-ong-encadrement.component.scss"],
})
export class MaccAriepLivrableOngEncadrementComponent
    implements OnInit, OnDestroy
{
    title: string = "";
    breadcrumb_title = "";

    search = "";

    livrableEncadrementForm: FormGroup;
    filtreForm: FormGroup;
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);
    private destroy$ = new Subject<void>();

    isLoading$ = this.isLoadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();

    is_edit_mode: boolean = false;

    livrableData$: Observable<any[]>;
    ileData$: Observable<any[]>;
    prefectureData$: Observable<any[]>;
    communeData$: Observable<any[]>;
    commune_id: number;
    filtered_prefecture$: Observable<any[]>;
    filtered_commune$: Observable<any[]>;
    show_hide_form = false;
    selected_livrable: any = [];
    message: string = "";
    show_hide_message: boolean = false;
    create_livrable_button: boolean = false;
    edit_livrable_button: boolean = false;
    delete_livrable_button: boolean = false;
    agentExData$: Observable<any[]>;
    contratAgexData$: Observable<any[]>;
    filteredContratAgex$: Observable<any[]>;

    livrableOngColum = [
        { name: `ONG d'encadrement`, prop: "agex.nom" },
        { name: `Contrat`, prop: "contrat_agex" },
        { name: `Date d'edition`, prop: "date_edition" },
        { name: `Mission de l'ONG`, prop: "mission_ong" },
        { name: `Methodologie`, prop: "methodologie" },
        { name: `Outils de travail`, prop: "outil_travail" },
        { name: `Planing par groupe de formation`, prop: "planning_groupe" },
    ];
    constructor(
        private form_builder: FormBuilder,
        private service: MaccAriepLivrableEncadrementService,
        private mat_dialog: MatDialog
    ) {
        this.initializeFiltreForm();
        this.initializeLivrableForm();
        this.fetchIle();
        this.fetchPrefecture();
        this.fetchCommune();
        this.fetchAgent_ex();
        this.fetchContratAgex();

        this.ileData$ = this.service.ile$;
        this.prefectureData$ = this.service.prefecture$;
        this.communeData$ = this.service.commune$;
        this.agentExData$ = this.service.agenEx$;
        this.contratAgexData$ = this.service.contratAgex$;
        this.livrableData$ = this.service.livrable$;
    }

    ngOnInit(): void {}

    initializeFiltreForm() {
        this.filtreForm = this.form_builder.group({
            ile_id: [""],
            prefecture_id: [""],
            commune_id: [""],
        });
    }

    initializeLivrableForm() {
        this.livrableEncadrementForm = this.form_builder.group({
            id_agex: [""],
            // id_contrat_agex: [""],
            mission: [""],
            outil_travail: [""],
            methodologie: [""],
            planning: [""],
            date_edition: [""],
        });
    }

    toggleForm(setEdit?: boolean) {
        this.show_hide_form = !this.show_hide_form;
        if (this.show_hide_form === false) {
            this.edit_livrable_button = false;
            this.delete_livrable_button = false;
            this.create_livrable_button = false;
            this.livrableEncadrementForm.reset();
            //this.selected_livrable = [];
        } else {
            setEdit === true
                ? this.updateLivrableForm()
                : this.initializeLivrableForm();
        }
        this.is_edit_mode = setEdit === true ? true : false;
    }

    fetchLivrable() {
        this.isLoadingSubject.next(true);
        try {
            this.service
                .fetchLivrable(this.commune_id)
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(error.message);
                        this.livrableData$ = of([]);
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
                                        this.fetchLivrable();
                                    }
                                });
                            } else {
                                this.show_hide_message = false;
                            }
                        }
                    },
                    error: (error) => {
                        console.error(`Error fetching livrable ong`, error);
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

    createlivrable() {
        this.isLoadingSubject.next(true); // Set loading state to true
        this.errorSubject.next(null); // Clear any previous errors
        try {
            const livrable_form_data = this.livrableEncadrementForm.value;
            const livrable_data = {
                id_commune: this.commune_id,
                id_contrat_agex: 23,
                ...livrable_form_data,
            };
            console.log(`Livrable form datas: `, livrable_data);

            this.service.createLivrable(livrable_data).subscribe({
                next: (response) => {
                    if (response.status === true) {
                        this.isLoadingSubject.next(false); // Set loading state to false
                        this.showMessage(
                            "Livrable created successfully",
                            "success"
                        );
                        this.show_hide_form = false;
                    }
                },
                error: (error) => {
                    this.isLoadingSubject.next(false); // Set loading state to false
                    this.errorSubject.next(
                        `Error while creating livrable: ${error.message}`
                    );
                },
            });
        } catch (error) {
            this.errorSubject.next(
                `Error while creating livrable: ${error.message}`
            );
            this.isLoadingSubject.next(false); // Set loading state to false
            this.showMessage(Message.ERROR);
        }
    }

    updatelivrable() {
        this.isLoadingSubject.next(true); // Set loading state to true
        this.errorSubject.next(null); // Clear any previous errors
        try {
            const livrable_form_data = this.livrableEncadrementForm.value;

            this.service.updateLivrable(livrable_form_data).subscribe({
                next: (response) => {
                    this.isLoadingSubject.next(false); // Set loading state to false
                    this.showMessage(
                        "Livrable updated successfully",
                        "success"
                    );
                    //this.fetchLivrable(); // Refresh the livrable data
                    this.show_hide_form = false; // Hide the form after update
                },
                error: (error) => {
                    this.isLoadingSubject.next(false); // Set loading state to false
                    this.errorSubject.next(
                        `Error while updating livrable: ${error.message}`
                    );
                },
            });
        } catch (error) {
            this.errorSubject.next(
                `Error while updating livrable: ${error.message}`
            );
            this.isLoadingSubject.next(false); // Set loading state to false
            this.showMessage(Message.ERROR);
        }
    }

    deletelivrable() {
        const dialogRef = this.mat_dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.isLoadingSubject.next(true); // Set loading state to true
                this.errorSubject.next(null); // Clear any previous errors
                try {
                    const livrable_id = this.selected_livrable.id;

                    this.service.deleteLivrable(livrable_id).subscribe({
                        next: (response) => {
                            this.isLoadingSubject.next(false); // Set loading state to false
                            this.showMessage(
                                "Livrable deleted successfully",
                                "success"
                            );
                            this.fetchLivrable(); // Refresh the livrable data
                        },
                        error: (error) => {
                            this.isLoadingSubject.next(false); // Set loading state to false
                            this.errorSubject.next(
                                `Error while deleting livrable: ${error.message}`
                            );
                        },
                    });
                } catch (error) {
                    this.errorSubject.next(
                        `Error while deleting livrable: ${error.message}`
                    );
                    this.isLoadingSubject.next(false); // Set loading state to false
                    this.showMessage(Message.ERROR);
                }
            }
        });
    }

    updateLivrableForm() {
        this.livrableEncadrementForm.patchValue({
            id_agex: this.selected_livrable.agex.id,
            id_contrat_agex: this.selected_livrable.contrat_agex.id,
            mission: this.selected_livrable.mission,
            outil_travail: this.selected_livrable.outil_travail,
            methodologie: this.selected_livrable.methodologie,
            planning: this.selected_livrable.planning_groupe,
            date_edition: this.selected_livrable.date_edition,
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
            this.errorSubject.next(
                `Error while fetching ile: ${error.message}`
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

    fetchAgent_ex() {
        try {
            this.service
                .fetchAgentEx()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching agent_ex: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching agent_ex: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    fetchContratAgex() {
        try {
            this.service
                .fetchContratAgex()
                .pipe(
                    catchError((error) => {
                        this.errorSubject.next(
                            `Error while fetching contrat_agex: ${error.message}`
                        );
                        throw error;
                    }),
                    finalize(() => this.isLoadingSubject.next(false))
                )
                .subscribe();
        } catch (error) {
            this.errorSubject.next(
                `Error while fetching contrat_agex: ${error.message}`
            );
            this.isLoadingSubject.next(false);
        }
    }

    filterData() {
        const filtered_data = this.filtreForm.value;
        console.log(`Filtered data: `, filtered_data);
        this.commune_id = filtered_data.commune_id;
        console.log(`Filtered commune data: `, this.commune_id);
        this.fetchLivrable();
        this.isLoadingSubject.next(true); // Set loading state to true
        this.errorSubject.next(null); // Clear any previous errors
        this.create_livrable_button = true;
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

    onSelectOngEncadrement(event) {
        const selected_ong = event.value;

        this.filteredContratAgex$ = this.contratAgexData$.pipe(
            map((contratData) => {
                const filte = contratData.filter(
                    (item) => item.id_agex === selected_ong
                );
                console.log(`Filtered contratAgex: `, filte);
                return filte;
            })
        );
    }

    onSelectCommune(event) {
        this.create_livrable_button = true;
    }

    onSelectLivrable(event) {
        const selected = event.selected[0];
        console.log(`Selected livrable: `, selected);

        this.selected_livrable = selected;
        this.edit_livrable_button = true;
        this.delete_livrable_button = true;
    }

    showMessage(
        message: string,
        type: "success" | "error" | "warning" = "success"
    ) {
        this.message = message;
    }
    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
        this.destroy$.next();
        this.destroy$.complete();
    }
}

@Injectable({
    providedIn: "root",
})
export class MaccAriepLivrableEncadrementService {
    private livrableSubject = new BehaviorSubject<any[]>([]);
    livrable$ = this.livrableSubject.asObservable();

    private ileSubject = new BehaviorSubject<any[]>([]);
    ile$ = this.ileSubject.asObservable();

    private prefectureSubject = new BehaviorSubject<any[]>([]);
    prefecture$ = this.prefectureSubject.asObservable();

    private communeSubject = new BehaviorSubject<any[]>([]);
    commune$ = this.communeSubject.asObservable();

    private agenExSubject = new BehaviorSubject<any[]>([]);
    agenEx$ = this.agenExSubject.asObservable();

    private contratAgexSubject = new BehaviorSubject<any[]>([]);
    contratAgex$ = this.contratAgexSubject.asObservable();

    constructor(
        private end_point_url: ConstantService,
        private http: HttpClient
    ) {}

    fetchLivrable(commune_id: number): Observable<any> {
        return this.http
            .get<any[]>(
                this.end_point_url.apiUrl +
                    `Livrable_ong_encadrement?menu=getlivrable_ong_encadrementBycommune&id_commune=${commune_id}`
            )
            .pipe(
                tap((response) =>
                    this.livrableSubject.next(response["response"])
                )
            );
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

    fetchAgentEx(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Agent_ex")
            .pipe(
                tap((response) => this.agenExSubject.next(response["response"]))
            );
    }

    fetchContratAgex(): Observable<any> {
        return this.http
            .get<any[]>(this.end_point_url.apiUrl + "Contrat_ugp_agex")
            .pipe(
                tap((response) =>
                    this.contratAgexSubject.next(response["response"])
                )
            );
    }

    createLivrable(livrable_data: any): Observable<any> {
        const payload = {
            livrableData: livrable_data,
        };

        return this.http
            .post(
                this.end_point_url.apiUrl + "Livrable_ong_encadrement",
                payload
            )
            .pipe(
                tap(() =>
                    this.fetchLivrable(+livrable_data.id_commune).subscribe()
                )
            );
    }

    updateLivrable(livrableData: any): Observable<any> {
        return this.http
            .put<any>(
                this.end_point_url.apiUrl + "Livrable_ong_encadrement",
                livrableData
            )
            .pipe(
                tap((response) => {
                    const currentLivrables = this.livrableSubject.value;
                    const index = currentLivrables.findIndex(
                        (livrable) => livrable.id === response.id
                    );
                    if (index !== -1) {
                        currentLivrables[index] = response;
                        this.livrableSubject.next([...currentLivrables]);
                    }
                })
            );
    }

    deleteLivrable(livrableId: number): Observable<any> {
        return this.http
            .delete<any>(
                this.end_point_url.apiUrl +
                    `Livrable_ong_encadrement/${livrableId}`
            )
            .pipe(
                tap(() => {
                    const currentLivrables = this.livrableSubject.value;
                    const updatedLivrables = currentLivrables.filter(
                        (livrable) => livrable.id !== livrableId
                    );
                    this.livrableSubject.next(updatedLivrables);
                })
            );
    }
}
