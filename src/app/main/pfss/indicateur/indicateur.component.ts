import { HttpClient } from "@angular/common/http";
import { Component, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { ConstantService } from "../../../_services/constant.service"
import { catchError, finalize, tap } from "rxjs/operators";
import { AlertService } from '../../../_services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmation-dialog.component';

@Component({
  selector: "app-indicateur",
  templateUrl: "./indicateur.component.html",
  styleUrls: ["./indicateur.component.scss"],
})
export class IndicateurComponent implements OnInit {
  // Observable to hold the data for the datatable
  indicateur_data$: Observable<any[]>;
  indicateur_form: FormGroup;

  indicateurFom: boolean = true;
  indicateur_datatable_row = [{ name: `Descriptions`, prop: 'description' }];

  button_edit_delete: boolean = false;
  selected: any = [];
  show_hide_form: boolean = false;
  // State management properties
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  // Expose the loading and error states as observables
  isLoading$ = this.isLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  is_edit_mode: boolean = false
  search: string = ""
  constructor(
      private indicateurService: IndicateurService,
      private form_builder: FormBuilder,
      private alert: AlertService,
      public mat_dialog: MatDialog
  ) {
      // Subscribe to the indicateur data observable from the service
      this.indicateur_data$ = this.indicateurService.indicateur$;

      this.initializeIndicateurForm();
  }

  ngOnInit(): void {
      this.fetchIndicateurList();
  }

  initializeIndicateurForm() {
      this.indicateur_form = this.form_builder.group({
          description: ['', Validators.required]
      });
      if (!this.show_hide_form) {
          this.indicateur_form.reset();
      }
  }

  updateIndicateurForm() {
      this.indicateur_form.patchValue({
          description: this.selected[0].description
      });
  }

  // Method to fetch the list of indicateurs
  fetchIndicateurList(): void {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      this.indicateurService.fetchIndicateurList().pipe(
          catchError(error => {
              this.errorSubject.next(`Error while fetching indicateur list: ${error.message}`); // Set error state
              throw error;
          }),
          finalize(() => this.isLoadingSubject.next(false)) // Set loading state to false when done
      ).subscribe();
  }

  toggleForm(setEdit?: boolean) {
    this.show_hide_form = !this.show_hide_form;

    if (this.show_hide_form === false) {
        this.button_edit_delete = false
        this.indicateur_form.reset();
    } else {
        setEdit === true ? this.updateIndicateurForm() : this.initializeIndicateurForm();
    }

    this.is_edit_mode = setEdit === true ? true : false;        
}

  // Method to create a new indicateur
  async createIndicateur() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      try {
          // Logic to create an indicateur
          const indicateur_form_data = this.indicateur_form.value;

          this.indicateurService.createIndicateur(indicateur_form_data).subscribe(
              response => {
                  console.log(`server Response`, response);
                  if (response.status === true) {
                      this.show_hide_form = !this.show_hide_form;
                      console.log(`Form status`, this.show_hide_form);
                      this.alert.success(response.message);
                  }
              }
          );

          this.isLoadingSubject.next(false); // Set loading state to false when done
      } catch (error) {
          this.errorSubject.next(`Error while creating indicateur: ${error.message}`); // Set error state
          this.isLoadingSubject.next(false); // Set loading state to false when done
      }
  }

  // Method to update an existing indicateur
  async updateIndicateur() {
      this.isLoadingSubject.next(true); // Set loading state to true
      this.errorSubject.next(null); // Clear any previous errors
      try {
          // Logic to update an indicateur
          const indicateur_form_data = this.indicateur_form.value;
        
          this.indicateurService.updateIndicateur({ id: this.selected[0].id, ...indicateur_form_data }).subscribe(
              response => {
                  console.log(`server Response`, response);
                  if (response.status === true) {
                      this.show_hide_form = !this.show_hide_form;
                      console.log(`Form status`, this.show_hide_form);
                      this.alert.success(response.message);
                      this.indicateur_form.reset()
                      this.selected = []; // Clear the selected item
                      this.button_edit_delete = false; // Disable edit/delete buttons
                  }
                  this.isLoadingSubject.next(false); // Set loading state to false after response
              },
              error => {
                  this.errorSubject.next(`Error while updating indicateur: ${error.message}`);
                  this.isLoadingSubject.next(false);
              }
          );
      } catch (error) {
          this.errorSubject.next(`Error while updating indicateur: ${error.message}`);
          this.isLoadingSubject.next(false);
      }
  }

  // Method to delete an indicateur
  async deleteIndicateur() {
      const dialogRef = this.mat_dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.isLoadingSubject.next(true); // Set loading state to true
              this.errorSubject.next(null); // Clear any previous errors
              
              // Logic to delete an indicateur
              const indicateur_id = this.selected[0].id;

              this.indicateurService.deleteIndicateur(indicateur_id).subscribe(
                  response => {
                      console.log(`server Response`, response);
                      if (response.status === true) {
                          this.alert.success(response.message);
                          this.indicateur_form.reset()
                          this.selected = []; // Clear the selected item
                          this.button_edit_delete = false; // Disable edit/delete buttons
                      }
                      this.isLoadingSubject.next(false); // Set loading state to false after success
                  },
                  error => {
                      this.errorSubject.next(`Error while deleting indicateur: ${error.message}`); // Set error state
                      this.isLoadingSubject.next(false); // Set loading state to false after error
                  }
              );
          }
      });
  }

  async onSelectIndicateur(event) {
      const selected_indicateur = await event.selected
      this.selected = selected_indicateur;
      console.log(`Selected row`, selected_indicateur);
      this.button_edit_delete = true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {
  // BehaviorSubject to hold the current state of indicateur data
  private indicateurSubject = new BehaviorSubject<any[]>([]);
  // Observable to expose the current state of indicateur data
  indicateur$ = this.indicateurSubject.asObservable();

  constructor(private http: HttpClient, private constant: ConstantService) {}

  // Method to fetch the list of indicateurs from the API
  fetchIndicateurList(): Observable<any> {
      return this.http.get<any[]>(this.constant.apiUrl + 'Indicateur_tdb').pipe(
          tap(response => this.indicateurSubject.next(response['response']))
      );
  }

  // Method to create a new indicateur
  createIndicateur(data_indicateur: any): Observable<any> {
      const data = {
          data_indicateur: data_indicateur
      };
      return this.http.post(this.constant.apiUrl + 'Indicateur_tdb', data).pipe(
          tap(() => this.fetchIndicateurList().subscribe())
      );
  }

  // Method to update an existing indicateur
  updateIndicateur(data: any): Observable<any> {
    console.log(`Update data aty amin'ny service`, data);
    const update_indicateur_data = {
      update_indicateur: data
    }
    
      return this.http.put(this.constant.apiUrl + 'Indicateur_tdb', update_indicateur_data).pipe(
          tap(() => this.fetchIndicateurList().subscribe())
      );
  }

  deleteIndicateur(id: number): Observable<any> {
    console.log('Deleting indicateur with ID:', id);
    return this.http.delete(this.constant.apiUrl + `Indicateur_tdb/delete_indicateur/${id}`).pipe(
        tap((response) => {
            console.log('Delete response:', response);
            this.fetchIndicateurList().subscribe();
        }),
        catchError((error) => {
            console.error('Delete error:', error);
            return throwError(error);
        })
    );
}
}