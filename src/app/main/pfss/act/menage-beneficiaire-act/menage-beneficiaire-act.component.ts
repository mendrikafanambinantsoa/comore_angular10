import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../actr-service.service";

@Component({
  selector: "app-menage-beneficiaire-act",
  templateUrl: "./menage-beneficiaire-act.component.html",
  styleUrls: ["./menage-beneficiaire-act.component.scss"],
})
export class MenageBeneficiaireActComponent implements OnInit {
  menage_beneficiaire: any;
  menage_information: any;
  filtre: any;
  filtre_menage_beneficiaire: FormGroup;
  all_ile: any;
  all_region: any;
  all_commune: any;
  all_village: any;
  all_menages: any;
  all_lienparental: any;
  all_lienparental_autre: any;
  all_niveau_de_classe: any;
  lienparental_autre: any;
  all_zone: any;
  nouvelle_element: any;
  selected: any = [];
  selectedItem: any;
  modification_menage_beneficiaire: FormGroup;
  information_menage: FormGroup;

  search_menage = "";
  search_individu = "";

  afficher_btn_modifier = false;
  afficher_btn_supprimer = false;
  afficher_btn_retour_preselectionne = false;
  afficher_btn_sorti_programme = false;
  afficher_btn_carte_beneficiaire: boolean;
  afficher_btn_actualiser: boolean;
  desactiver_onglets = true;
  affichage_masque = false;

  //carte beneficiaire
  nombre_envoi: any;
  liste_carte_beneficiaire: any;
  status: any;

  //individu
  all_individus: any;
  selectedItem_individu: any;
  nouvelItem_individu: any;
  masque_individu: FormGroup;
  individu: any;
  affichage_masque_individu: boolean;
  afficher_btn_ajout_individu: boolean;
  afficher_btn_modifier_individu: boolean;
  afficher_btn_supprimer_individu: boolean;

  //export excel

  config: any;

  constructor(
    private index_api: IndexApiService,
    private form_builder: FormBuilder,
    public dialog: MatDialog,
    public constant_service: ConstantService,
    private route: ActivatedRoute,
    private actr_service: ActrServiceService,
  ) {}

  @ViewChild("aucun_menage_beneficiaire_par_village", { static: true })
  aucun_menage_beneficiaire_par_village: TemplateRef<any>;

  @ViewChild("supprimer_menage_beneficiaire", { static: true })
  supprimer_menage_beneficiaire: TemplateRef<any>;

  @ViewChild("retour_preselectionne", { static: true })
  retour_preselectionne: TemplateRef<any>;

  @ViewChild("supprimer_individus", { static: true })
  supprimer_individus: TemplateRef<any>;

  ngOnInit(): void {
    const url = this.route.snapshot.routeConfig.path;
    this.config = this.actr_service.getConfiguration(`/${url}`);
    //menage beneficiaire
    this.menage_beneficiaire = {};
    this.menage_information = {};
    this.nouvelle_element = false;
    //individu
    this.individu = {};
    this.nouvelItem_individu = false;
    this.afficher_btn_ajout_individu = true;

    this.index_api.getAll("ile").subscribe((res) => {
      this.all_ile = res.response;
    });
    this.index_api.getAll("lienparental").subscribe((res) => {
      this.all_lienparental = res.response;
    });
    this.index_api.getAll("lienparental_autre").subscribe((res) => {
      this.all_lienparental_autre = res.response;
      console.log("other all lien parental", this.all_lienparental_autre);
    });
    this.index_api.getAll("lienparental_autre").subscribe((res) => {
      this.lienparental_autre = res.response;
    });
    this.index_api.getAll("niveau_de_classe").subscribe((res) => {
      this.all_niveau_de_classe = res.response;
    });
    this.index_api.getAll("zip").subscribe((res) => {
      this.all_zone = res.response;
    });
    this.filtre_menage_beneficiaire = this.form_builder.group({
      id_ile: ["", Validators.required],
      id_region: ["", Validators.required],
      id_commune: ["", Validators.required],
      village_id: ["", Validators.required],
    });
    this.afficher_btn_carte_beneficiaire = true;
    this.afficher_btn_actualiser = true;

    this.modification_menage_beneficiaire = this.form_builder.group({
      activite_ciblage: [""],
      type_de_plainte: [""],
      code_acces_aux_plaintes: [""],
      nom_et_prenom_de_l_agent: [""],
      milieu: ["", Validators.required],
      quartier: [""],
      point_d_inscription: ["", Validators.required],
      numero_d_ordre: ["", Validators.required],
      numero_recepisse: ["", Validators.required],
      nom_chef_menage: ["", Validators.required],
      prenom1: ["", Validators.required],
      prenom2: ["", Validators.required],
      sexe: ["", Validators.required],
      nin: ["", Validators.required],
      date_naissance: ["", Validators.required],
      telephone1: ["", Validators.required],
      telephone2: [""],
      membre_venu_inscrire: ["", Validators.required],
      adresse: ["", Validators.required],
      zone: ["", Validators.required],
      ong: ["", Validators.required],
      numero_adc: ["", Validators.required],
      nom_adc: [""],
      enquete_va_etre_realise: ["", Validators.required],
      cause_non_realisation_enquete: [""],
      preciser_non_realisation_enquete: [""],
      observation: [""],
      qui_va_repondre_enquete: ["", Validators.required],
      autre_qui_va_repondre_enquete: [""],
      nom_repondant: ["", Validators.required],
      // membre_vivant_etranger_qui_aide_financierement: [""],
      // personne_qui_envoi_argent_regulier: [""],
      // type_de_logement: [""],
      // logement_vous_appartient: ["", Validators.required],
      // mode_eclairage: [""],
      // mode_eclairage_autre_a_preciser: ["", Validators.required],
      NomTravailleurSuppliant: [""],
      SexeTravailleurSuppliant: [""],
      datenaissancesuppliant: [""],
      agesuppliant: [""],
      lien_suppleant: [""],
      autres_lien_de_parente: [""],
      autre_lien_travailleur: [""],
      autres_lien_de_parente_suppleant: [""],
      autre_lien_suppleant: [""],
      nin_travailleur: [""],
      confirmer_nin_travailleur: ["", Validators.required],
      travailleur_possede_telephone: ["", Validators.required],
      telephone_travailleur: [""],
      confirmer_telephone_travailleur: [""],
      nin_suppleant: ["", Validators.required],
      confirmer_nin_suppleant: ["", Validators.required],
      suppleant_possede_telephone: ["", Validators.required],
      telephone_suppleant: [""],
      confirmer_telephone_suppleant: [""],
      lien_de_parente_travailleur: [""],
      lien_de_parente_suppleant: [""],
    });
    this.information_menage = this.form_builder.group({
      taille_menage: [""],
      nombre_personne_plus_70ans: [""],
      nombre_jeune_18_35ans: [""],
      nombre_enfant_moins_15ans: [""],
      nombre_enfant_6_14ans_non_scolarises: [""],
      nombre_enfant_moins_5ans: [""],
      nombre_adulte_travaille_secteur_formel: [""],
      nombre_handicap: [""],
      membre_vivant_etranger_qui_aide_financierement: [""],
      personne_qui_envoi_argent_regulier: [""],
      chef_menage_femme: [""],
      chef_menage_au_plus_primaire: [""],
      maison_non_dure: [""],
      non_acces_electricite: [""],
      non_acces_robinet: [""],
      membre_salarie: [""],
      antenne_parabolique: [""],
      frigo_fonctionnel: [""],
      beneficiaire_aide: [""],
      membre_etranger_recoit: [""],
      membre_etranger_envoie: [""],
      proprietaire_logement: [""],
      inclusion_exclusion: [""],
      cause_inclusion_exclusion: [""],
      scores: [""],
      scores_apres_plainte: [""],
      gps: [""],
    });

    this.masque_individu = this.form_builder.group({
      nom: ["", Validators.required],
      prenom: [""],
      prenom2: [""],
      sexe: ["", Validators.required],
      date_naissance: ["", Validators.required],
      lienparental: ["", Validators.required],
      frequente_ecole: [""],
      niveau_scolaire: [""],
      exerce_travail: ["", Validators.required],
      type_employeur: [""],
      poste_occupe: [""],
      salaire: [""],
      stabilite_travail: [""],
      autre_stabilite_travail: [""],
      possede_cin: ["", Validators.required],
      numero_cin: [""],
      confirmer_numero_cin: [""],
      possede_telephone: ["", Validators.required],
      premier_numero_telephone: [""],
      confirmer_premier_numero_telephone: [""],
      deuxieme_numero_telephone: [""],
      confirmer_deuxieme_numero_telephone: [""],
      possede_handicap: ["", Validators.required],
      type_handicap: [""],
      type_handicap_aveugle: [""],
      type_handicap_muet_sourd: [""],
      handicap_membres_superieurs: [""],
      handicap_membres_inferieurs: [""],
      handicap_deficience: [""],
      handicap_mentale: [""],
      handicap_autre: [""],
      handicap_autre_preciser: [""],
    });
  }
  filtre_region() {
    this.index_api
      .getAPIgeneraliserREST(
        "region",
        "cle_etrangere",
        this.menage_beneficiaire.id_ile,
      )
      .subscribe((res) => {
        this.all_region = res.response;
      });
  }
  filtre_commune() {
    this.index_api
      .getAPIgeneraliserREST(
        "commune",
        "cle_etrangere",
        this.menage_beneficiaire.id_region,
      )
      .subscribe((res) => {
        this.all_commune = res.response;
      });
  }
  filtre_village() {
    this.index_api
      .getAPIgeneraliserREST(
        "village",
        "cle_etrangere",
        this.menage_beneficiaire.id_commune,
      )
      .subscribe((res) => {
        this.all_village = res.response;
      });
  }
  filtreMenageByVillage() {
    this.nombre_envoi = 0;
    this.index_api
      .getAPIgeneraliserREST(
        "menage",
        "cle_etrangere",
        this.menage_beneficiaire.village_id,
        "etat_statut",
        "beneficiaire",
        "id_sous_projet",
        // this.id_sous_projet,
        this.config.id_sous_projet,
        "beneficiaire",
        1,
      )
      .subscribe((res) => {
        this.all_menages = res.response;
        console.log(this.all_menages);

        if (res.response == 0) {
          this.dialog.open(this.aucun_menage_beneficiaire_par_village, {
            disableClose: true,
          });
        } else {
          this.index_api
            .getAPIgeneraliserREST(
              "menage",
              "nombre_envoi",
              99,
              "cle_etrangere",
              this.menage_beneficiaire.village_id,
              "etat_statut",
              "beneficiaire",
              "id_sous_projet",
              this.config.id_sous_projet,
            )
            .subscribe((res) => {
              this.nombre_envoi = res.response;
            });
        }
      });
  }

  affichage_etat_statut(etat: string) {
    if (parseInt(etat) > 0) {
      return "Oui";
    } else {
      return "Non";
    }
  }
  affichage_etat_envoie(id_serveur_centrale: number) {
    if (id_serveur_centrale) {
      return "Envoyé";
    } else {
      return "Non envoyé";
    }
  }

  on_select_menage_beneficiaire(event: any) {
    this.afficher_btn_modifier = true;
    this.afficher_btn_supprimer = true;
    this.afficher_btn_retour_preselectionne = true;
    this.afficher_btn_sorti_programme = true;
    this.selectedItem = event.selected[0];
    this.desactiver_onglets = false;
    this.affichage_masque = false;
    console.log("donnes selectionnee", this.selectedItem);
    this.get_individus_by_menage(this.selectedItem.id);

    this.menage_information = {
      numero_recepisse: this.selectedItem.numero_recepisse,
      nom_chef_menage: this.selectedItem.nom_chef_menage,
      identifiant_menage: this.selectedItem.identifiant_menage,
      taille_menage: this.selectedItem.taille_menage,
      nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
      nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
      nombre_enfant_moins_15ans: this.selectedItem.nombre_enfant_moins_15ans,
      nombre_enfant_6_14ans_non_scolarises:
        this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
      nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
      nombre_adulte_travaille_secteur_formel:
        this.selectedItem.nombre_adulte_travaille_secteur_formel,
      nombre_handicap: this.selectedItem.nombre_handicap,
      membre_vivant_etranger_qui_aide_financierement:
        this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
      personne_qui_envoi_argent_regulier:
        this.selectedItem.personne_qui_envoi_argent_regulier,
      chef_menage_femme: this.selectedItem.chef_menage_femme,
      chef_menage_au_plus_primaire:
        this.selectedItem.chef_menage_au_plus_primaire,
      maison_non_dure: this.selectedItem.maison_non_dure,
      non_acces_electricite: this.selectedItem.non_acces_electricite,
      non_acces_robinet: this.selectedItem.non_acces_robinet,
      membre_salarie: this.selectedItem.membre_salarie,
      antenne_parabolique: this.selectedItem.antenne_parabolique,
      frigo_fonctionnel: this.selectedItem.frigo_fonctionnel,
      beneficiaire_aide: this.selectedItem.beneficiaire_aide,
      membre_etranger_recoit: this.selectedItem.membre_etranger_recoit,
      membre_etranger_envoie: this.selectedItem.membre_etranger_envoie,
      proprietaire_logement: this.selectedItem.proprietaire_logement,
      inclusion_exclusion: this.selectedItem.inclusion_exclusion,
      cause_inclusion_exclusion: this.selectedItem.cause_inclusion_exclusion,
      scores: this.selectedItem.scores,
      scores_apres_plainte: this.selectedItem.scores_apres_plainte,
      gps: this.selectedItem.gps,
    };
    // console.log("information menage", this.menage_information);
  }

  supprimer_menage() {
    this.dialog.open(this.supprimer_menage_beneficiaire, {
      disableClose: true,
    });
  }

  confirm_supprimer_menage() {
    const datas = {
      supprimer: 1,
      ...this.selectedItem,
    };
    this.save_in_base(datas);
    this.dialog.closeAll();
  }
  save_menage(menage, suppression) {
    let datas = {};
    datas = {
      supprimer: suppression,
      id: this.selectedItem.id,
      point_d_inscription: menage.point_d_inscription,
      identifiant_menage: menage.identifiant_menage,
      NumeroEnregistrement: menage.NumeroEnregistrement,
      nom_chef_menage: menage.nom_chef_menage,
      agechefdemenage: menage.agechefdemenage,
      sexe: menage.sexe,
      situation_matrimoniale: menage.situation_matrimoniale,
      adresse: menage.adresse,
      nin: menage.nin,
      NumeroCarteElectorale: menage.NumeroCarteElectorale,
      chef_frequente_ecole: menage.chef_frequente_ecole,
      niveau_instruction_chef: menage.niveau_instruction_chef,
      chef_menage_travail: menage.chef_menage_travail,
      activite_chef_menage: menage.activite_chef_menage,
      telephone1: menage.telephone1,
      milieu: menage.milieu,
      quartier: menage.quartier,
      PersonneInscription: menage.PersonneInscription,
      inapte: menage.inapte,
      nom_conjoint: menage.nom_conjoint,
      age_conjoint: menage.age_conjoint,
      sexe_conjoint: menage.sexe_conjoint,
      nin_conjoint: menage.nin_conjoint,
      carte_electorale_conjoint: menage.carte_electorale_conjoint,
      conjoint_frequente_ecole: menage.conjoint_frequente_ecole,
      niveau_instruction_conjoint: menage.niveau_instruction_conjoint,
      conjoint_travail: menage.conjoint_travail,
      activite_conjoint: menage.activite_conjoint,
      telephone_conjoint: menage.telephone_conjoint,
      datedenaissancetravailleur: menage.datedenaissancetravailleur,
      agetravailleur: menage.agetravailleur,
      SexeTravailleur: menage.SexeTravailleur,
      lien_travailleur: menage.lien_travailleur,
      numerocintravailleur: menage.numerocintravailleur,
      numerocarteelectoraletravailleur: menage.numerocarteelectoraletravailleur,
      telephone_travailleur: menage.telephone_travailleur,
      NomTravailleurSuppliant: menage.NomTravailleurSuppliant,
      datedenaissancesuppliant: menage.datedenaissancesuppliant,
      agesuppliant: menage.agesuppliant,
      SexeTravailleurSuppliant: menage.SexeTravailleurSuppliant,
      lien_suppleant: menage.lien_suppleant,
      numerocinsuppliant: menage.numerocinsuppliant,
      numerocarteelectoralesuppliant: menage.numerocarteelectoralesuppliant,
      telephone2: menage.telephone2,

      nom_et_prenom_de_l_agent: menage.nom_et_prenom_de_l_agent,
      prenom1: menage.prenom1,
      prenom2: menage.prenom2,
      zone: menage.zone,
      // nin : menage.nin ,
      // telephone1 : menage.telephone1 ,
      // telephone2 : menage.telephone2 ,

      NomTravailleur: this.selectedItem.NomTravailleur,
      membre_venu_inscrire: this.selectedItem.membre_venu_inscrire,
      numero_d_ordre: this.selectedItem.numero_d_ordre,
      numero_recepisse: this.selectedItem.numero_recepisse,
      date_naissance: this.selectedItem.date_naissance,
      serveur_central: this.constant_service.serveur_central,
      activite_ciblage: this.selectedItem.activite_ciblage,
      type_de_plainte: this.selectedItem.type_de_plainte,
      code_acces_aux_plaintes: this.selectedItem.code_acces_aux_plaintes,
      ong: this.selectedItem.ong,
      numero_adc: this.selectedItem.numero_adc,
      nom_adc: this.selectedItem.nom_adc,
      enquete_va_etre_realise: this.selectedItem.enquete_va_etre_realise,
      cause_non_realisation_enquete:
        this.selectedItem.cause_non_realisation_enquete,
      preciser_non_realisation_enquete:
        this.selectedItem.preciser_non_realisation_enquete,
      observation: this.selectedItem.observation,
      qui_va_repondre_enquete: this.selectedItem.qui_va_repondre_enquete,
      autre_qui_va_repondre_enquete:
        this.selectedItem.autre_qui_va_repondre_enquete,
      nom_repondant: this.selectedItem.nom_repondant,
      membre_vivant_etranger_qui_aide_financierement:
        this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
      personne_qui_envoi_argent_regulier:
        this.selectedItem.personne_qui_envoi_argent_regulier,
      type_de_logement: this.selectedItem.type_de_logement,
      logement_vous_appartient: this.selectedItem.logement_vous_appartient,
      mode_eclairage: this.selectedItem.mode_eclairage,
      mode_eclairage_autre_a_preciser:
        this.selectedItem.mode_eclairage_autre_a_preciser,
      source_eau: this.selectedItem.source_eau,
      autre_source_eau_a_preciser:
        this.selectedItem.autre_source_eau_a_preciser,
      abonnement_canal_fonctionnel:
        this.selectedItem.abonnement_canal_fonctionnel,
      possede_frigo_fonctionnel: this.selectedItem.possede_frigo_fonctionnel,
      beneficiaire_autre_programme:
        this.selectedItem.beneficiaire_autre_programme,
      membre_menage_salarie: this.selectedItem.membre_menage_salarie,
      combien_gagne_t_il: this.selectedItem.combien_gagne_t_il,
      possede_voiture_fonctionnelle:
        this.selectedItem.possede_voiture_fonctionnelle,
      pense_vivre_pendant_plus_6mois:
        this.selectedItem.pense_vivre_pendant_plus_6mois,
      calcul_eligibilite: this.selectedItem.calcul_eligibilite,
      taille_menage: this.selectedItem.taille_menage,
      nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
      nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
      nombre_enfant_moins_15ans: this.selectedItem.nombre_enfant_moins_15ans,
      nombre_enfant_6_14ans_non_scolarises:
        this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
      nombre_adulte_travaille_secteur_formel:
        this.selectedItem.nombre_adulte_travaille_secteur_formel,
      nombre_handicap: this.selectedItem.nombre_handicap,
      chef_menage_femme: this.selectedItem.chef_menage_femme,
      chef_menage_au_plus_primaire:
        this.selectedItem.chef_menage_au_plus_primaire,
      maison_non_dure: this.selectedItem.maison_non_dure,
      non_acces_electricite: this.selectedItem.non_acces_electricite,
      non_acces_robinet: this.selectedItem.non_acces_robinet,
      membre_salarie: this.selectedItem.membre_salarie,
      antenne_parabolique: this.selectedItem.antenne_parabolique,
      frigo_fonctionnel: this.selectedItem.frigo_fonctionnel,
      beneficiaire_aide: this.selectedItem.beneficiaire_aide,
      membre_etranger_recoit: this.selectedItem.membre_etranger_recoit,
      membre_etranger_envoie: this.selectedItem.membre_etranger_envoie,
      nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
      proprietaire_logement: this.selectedItem.proprietaire_logement,
      inclusion_exclusion: this.selectedItem.inclusion_exclusion,
      cause_inclusion_exclusion: this.selectedItem.cause_inclusion_exclusion,
      scores: this.selectedItem.scores,
      scores_apres_plainte: this.selectedItem.scores_apres_plainte,
      gps: this.selectedItem.gps,
      erreur: this.selectedItem.erreur,
      statut: this.selectedItem.statut,
      id_sous_projet: this.selectedItem.id_sous_projet,
      village_id: this.selectedItem.village_id,
      inscrit: this.selectedItem.inscrit,
      preselectionne: this.selectedItem.preselectionne,
      beneficiaire: this.selectedItem.beneficiaire,
      photo: this.selectedItem.photo,
      phototravailleur: this.selectedItem.phototravailleur,
      phototravailleursuppliant: this.selectedItem.phototravailleursuppliant,
      datenaissancetravailleur: this.selectedItem.datenaissancetravailleur,
      datenaissancesuppliant: this.selectedItem.datenaissancesuppliant,
      id_serveur_centrale: this.selectedItem.id_serveur_centrale,

      autres_lien_de_parente: this.selectedItem.autres_lien_de_parente,
      autre_lien_travailleur: this.selectedItem.autre_lien_travailleur,
      nin_travailleur: this.selectedItem.nin_travailleur,
      confirmer_nin_travailleur: this.selectedItem.confirmer_nin_travailleur,
      travailleur_possede_telephone:
        this.selectedItem.travailleur_possede_telephone,
      confirmer_telephone_travailleur:
        this.selectedItem.confirmer_telephone_travailleur,

      autres_lien_de_parente_suppleant:
        this.selectedItem.autres_lien_de_parente_suppleant,
      autre_lien_suppleant: this.selectedItem.autre_lien_suppleant,
      nin_suppleant: this.selectedItem.nin_suppleant,
      confirmer_nin_suppleant: this.selectedItem.confirmer_nin_suppleant,
      suppleant_possede_telephone:
        this.selectedItem.suppleant_possede_telephone,
      confirmer_telephone_suppleant:
        this.selectedItem.confirmer_telephone_suppleant,
      lien_de_parente_travailleur:
        this.selectedItem.lien_de_parente_travailleur,
      lien_de_parente_suppleant: this.selectedItem.lien_de_parente_suppleant,
    };
    this.save_in_base(datas);

    // console.log("menage preselectionner a enregistrer", datas);
    // this.save_in_base(datas);
    //     this.nouvelle_element = false;
    //     try {
    //         const data_menage = {
    //             id_ile: this.menage_beneficiaire.id_ile,
    //             id_region: this.menage_beneficiaire.id_region,
    //             id_commune: this.menage_beneficiaire.id_commune,
    //             village_id: this.menage_beneficiaire.village_id,
    //             id_serveur_centrale: this.selectedItem.id_serveur_centrale,

    //             taille_menage: this.selectedItem.taille_menage,
    //             nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
    //             nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
    //             nombre_enfant_moins_15ans:this.selectedItem.nombre_enfant_moins_15ans,
    //             nombre_enfant_6_14ans_non_scolarises: this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
    //             nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
    //             nombre_adulte_travaille_secteur_formel: this.selectedItem.nombre_adulte_travaille_secteur_formel,
    //             nombre_handicap: this.selectedItem.nombre_handicap,
    //             membre_vivant_etranger_qui_aide_financierement: this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
    //             personne_qui_envoi_argent_regulier: this.selectedItem.personne_qui_envoi_argent_regulier,
    //             chef_menage_femme: this.selectedItem.chef_menage_femme,
    //             chef_menage_au_plus_primaire: this.selectedItem.chef_menage_au_plus_primaire,
    //             maison_non_dure: this.selectedItem.maison_non_dure,
    //             non_acces_electricite: this.selectedItem.non_acces_electricite,
    //             non_acces_robinet: this.selectedItem.non_acces_robinet,
    //             membre_salarie: this.selectedItem.membre_salarie,
    //             antenne_parabolique: this.selectedItem.antenne_parabolique,
    //             frigo_fonctionnel: this.selectedItem.frigo_fonctionnel,
    //             beneficiaire_aide: this.selectedItem.beneficiaire_aide,
    //             membre_etranger_recoit: this.selectedItem.membre_etranger_recoit,
    //             membre_etranger_envoie: this.selectedItem.membre_etranger_envoie,
    //             proprietaire_logement: this.selectedItem.proprietaire_logement,
    //             inclusion_exclusion: this.selectedItem.inclusion_exclusion,
    //             cause_inclusion_exclusion: this.selectedItem.cause_inclusion_exclusion,
    //             scores: this.selectedItem.scores,
    //             scores_apres_plainte: this.selectedItem.scores_apres_plainte,
    //             gps: this.selectedItem.gps,

    //             ...menage
    //         }
    //         this.save_menage_in_base(data_menage, 0);
    //     } catch (error) {

    //     }
  }
  save_information_menage(information_menage: any, suppression: number) {
    const datas = {
      supprimer: suppression,
      id: this.selectedItem.id,

      taille_menage: information_menage.taille_menage,
      nombre_personne_plus_70ans: information_menage.nombre_personne_plus_70ans,
      nombre_jeune_18_35ans: information_menage.nombre_jeune_18_35ans,
      nombre_enfant_moins_15ans: information_menage.nombre_enfant_moins_15ans,
      nombre_enfant_6_14ans_non_scolarises:
        information_menage.nombre_enfant_6_14ans_non_scolarises,
      nombre_enfant_moins_5ans: information_menage.nombre_enfant_moins_5ans,
      nombre_adulte_travaille_secteur_formel:
        information_menage.nombre_adulte_travaille_secteur_formel,
      nombre_handicap: information_menage.nombre_handicap,
      membre_vivant_etranger_qui_aide_financierement:
        information_menage.membre_vivant_etranger_qui_aide_financierement,
      personne_qui_envoi_argent_regulier:
        information_menage.personne_qui_envoi_argent_regulier,
      chef_menage_femme: information_menage.chef_menage_femme,
      chef_menage_au_plus_primaire:
        information_menage.chef_menage_au_plus_primaire,
      maison_non_dure: information_menage.maison_non_dure,
      non_acces_electricite: information_menage.non_acces_electricite,
      non_acces_robinet: information_menage.non_acces_robinet,
      membre_salarie: information_menage.membre_salarie,
      antenne_parabolique: information_menage.antenne_parabolique,
      frigo_fonctionnel: information_menage.frigo_fonctionnel,
      beneficiaire_aide: information_menage.beneficiaire_aide,
      membre_etranger_recoit: information_menage.membre_etranger_recoit,
      membre_etranger_envoie: information_menage.membre_etranger_envoie,
      proprietaire_logement: information_menage.proprietaire_logement,
      inclusion_exclusion: information_menage.inclusion_exclusion,
      cause_inclusion_exclusion: information_menage.cause_inclusion_exclusion,
      scores: information_menage.scores,
      scores_apres_plainte: information_menage.scores_apres_plainte,
      gps: information_menage.gps,

      point_d_inscription: this.selectedItem.point_d_inscription,
      identifiant_menage: this.selectedItem.identifiant_menage,
      NumeroEnregistrement: this.selectedItem.NumeroEnregistrement,
      nom_chef_menage: this.selectedItem.nom_chef_menage,
      agechefdemenage: this.selectedItem.agechefdemenage,
      sexe: this.selectedItem.sexe,
      situation_matrimoniale: this.selectedItem.situation_matrimoniale,
      adresse: this.selectedItem.adresse,
      nin: this.selectedItem.nin,
      NumeroCarteElectorale: this.selectedItem.NumeroCarteElectorale,
      chef_frequente_ecole: this.selectedItem.chef_frequente_ecole,
      niveau_instruction_chef: this.selectedItem.niveau_instruction_chef,
      chef_menage_travail: this.selectedItem.chef_menage_travail,
      activite_chef_menage: this.selectedItem.activite_chef_menage,
      telephone1: this.selectedItem.telephone1,
      milieu: this.selectedItem.milieu,
      quartier: this.selectedItem.quartier,
      PersonneInscription: this.selectedItem.PersonneInscription,
      inapte: this.selectedItem.inapte,
      nom_conjoint: this.selectedItem.nom_conjoint,
      age_conjoint: this.selectedItem.age_conjoint,
      sexe_conjoint: this.selectedItem.sexe_conjoint,
      nin_conjoint: this.selectedItem.nin_conjoint,
      carte_electorale_conjoint: this.selectedItem.carte_electorale_conjoint,
      conjoint_frequente_ecole: this.selectedItem.conjoint_frequente_ecole,
      niveau_instruction_conjoint:
        this.selectedItem.niveau_instruction_conjoint,
      conjoint_travail: this.selectedItem.conjoint_travail,
      activite_conjoint: this.selectedItem.activite_conjoint,
      telephone_conjoint: this.selectedItem.telephone_conjoint,
      datedenaissancetravailleur: this.selectedItem.datedenaissancetravailleur,
      agetravailleur: this.selectedItem.agetravailleur,
      SexeTravailleur: this.selectedItem.SexeTravailleur,
      lien_travailleur: this.selectedItem.lien_travailleur,
      numerocintravailleur: this.selectedItem.numerocintravailleur,
      numerocarteelectoraletravailleur:
        this.selectedItem.numerocarteelectoraletravailleur,
      telephone_travailleur: this.selectedItem.telephone_travailleur,
      NomTravailleurSuppliant: this.selectedItem.NomTravailleurSuppliant,
      datedenaissancesuppliant: this.selectedItem.datedenaissancesuppliant,
      agesuppliant: this.selectedItem.agesuppliant,
      SexeTravailleurSuppliant: this.selectedItem.SexeTravailleurSuppliant,
      lien_suppleant: this.selectedItem.lien_suppleant,
      numerocinsuppliant: this.selectedItem.numerocinsuppliant,
      numerocarteelectoralesuppliant:
        this.selectedItem.numerocarteelectoralesuppliant,
      telephone2: this.selectedItem.telephone2,

      nom_et_prenom_de_l_agent: this.selectedItem.nom_et_prenom_de_l_agent,
      prenom1: this.selectedItem.prenom1,
      prenom2: this.selectedItem.prenom2,
      zone: this.selectedItem.zone,
      // nin : menage.nin ,
      // telephone1 : menage.telephone1 ,
      // telephone2 : menage.telephone2 ,

      NomTravailleur: this.selectedItem.NomTravailleur,
      membre_venu_inscrire: this.selectedItem.membre_venu_inscrire,
      numero_d_ordre: this.selectedItem.numero_d_ordre,
      numero_recepisse: this.selectedItem.numero_recepisse,
      date_naissance: this.selectedItem.date_naissance,
      serveur_central: this.constant_service.serveur_central,
      activite_ciblage: this.selectedItem.activite_ciblage,
      type_de_plainte: this.selectedItem.type_de_plainte,
      code_acces_aux_plaintes: this.selectedItem.code_acces_aux_plaintes,
      ong: this.selectedItem.ong,
      numero_adc: this.selectedItem.numero_adc,
      nom_adc: this.selectedItem.nom_adc,
      enquete_va_etre_realise: this.selectedItem.enquete_va_etre_realise,
      cause_non_realisation_enquete:
        this.selectedItem.cause_non_realisation_enquete,
      preciser_non_realisation_enquete:
        this.selectedItem.preciser_non_realisation_enquete,
      observation: this.selectedItem.observation,
      qui_va_repondre_enquete: this.selectedItem.qui_va_repondre_enquete,
      autre_qui_va_repondre_enquete:
        this.selectedItem.autre_qui_va_repondre_enquete,
      nom_repondant: this.selectedItem.nom_repondant,
      type_de_logement: this.selectedItem.type_de_logement,
      logement_vous_appartient: this.selectedItem.logement_vous_appartient,
      mode_eclairage: this.selectedItem.mode_eclairage,
      mode_eclairage_autre_a_preciser:
        this.selectedItem.mode_eclairage_autre_a_preciser,
      source_eau: this.selectedItem.source_eau,
      autre_source_eau_a_preciser:
        this.selectedItem.autre_source_eau_a_preciser,
      abonnement_canal_fonctionnel:
        this.selectedItem.abonnement_canal_fonctionnel,
      possede_frigo_fonctionnel: this.selectedItem.possede_frigo_fonctionnel,
      beneficiaire_autre_programme:
        this.selectedItem.beneficiaire_autre_programme,
      membre_menage_salarie: this.selectedItem.membre_menage_salarie,
      combien_gagne_t_il: this.selectedItem.combien_gagne_t_il,
      possede_voiture_fonctionnelle:
        this.selectedItem.possede_voiture_fonctionnelle,
      pense_vivre_pendant_plus_6mois:
        this.selectedItem.pense_vivre_pendant_plus_6mois,
      calcul_eligibilite: this.selectedItem.calcul_eligibilite,
      erreur: this.selectedItem.erreur,
      statut: this.selectedItem.statut,
      id_sous_projet: this.selectedItem.id_sous_projet,
      village_id: this.selectedItem.village_id,
      inscrit: this.selectedItem.inscrit,
      preselectionne: this.selectedItem.preselectionne,
      beneficiaire: this.selectedItem.beneficiaire,
      photo: this.selectedItem.photo,
      phototravailleur: this.selectedItem.phototravailleur,
      phototravailleursuppliant: this.selectedItem.phototravailleursuppliant,
      datenaissancetravailleur: this.selectedItem.datenaissancetravailleur,
      datenaissancesuppliant: this.selectedItem.datenaissancesuppliant,
      id_serveur_centrale: this.selectedItem.id_serveur_centrale,

      autres_lien_de_parente: this.selectedItem.autres_lien_de_parente,
      autre_lien_travailleur: this.selectedItem.autre_lien_travailleur,
      nin_travailleur: this.selectedItem.nin_travailleur,
      confirmer_nin_travailleur: this.selectedItem.confirmer_nin_travailleur,
      travailleur_possede_telephone:
        this.selectedItem.travailleur_possede_telephone,
      confirmer_telephone_travailleur:
        this.selectedItem.confirmer_telephone_travailleur,

      autres_lien_de_parente_suppleant:
        this.selectedItem.autres_lien_de_parente_suppleant,
      autre_lien_suppleant: this.selectedItem.autre_lien_suppleant,
      nin_suppleant: this.selectedItem.nin_suppleant,
      confirmer_nin_suppleant: this.selectedItem.confirmer_nin_suppleant,
      suppleant_possede_telephone:
        this.selectedItem.suppleant_possede_telephone,
      confirmer_telephone_suppleant:
        this.selectedItem.confirmer_telephone_suppleant,
      lien_de_parente_travailleur:
        this.selectedItem.lien_de_parente_travailleur,
      lien_de_parente_suppleant: this.selectedItem.lien_de_parente_suppleant,
    };
    this.save_in_base(datas);
  }
  save_in_base(data: any) {
    this.affichage_masque = false;
    try {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
        },
      };
      console.log("menage a enregistrer", data);

      this.index_api
        .add("menage", this.serializeData(data), config)
        .subscribe((res) => {
          console.log("enregistrement reussi", res);
          this.selectedItem = {};
          this.affichage_masque = false;
          this.filtreMenageByVillage();
        });
    } catch (error) {
      console.log("erreur pendant enregistrement", error);
    }
  }
  modifier_statut(etat_statut: String) {
    console.log("etat statut a modifier", etat_statut);
    if (etat_statut == "PRESELECTIONNE") {
      this.dialog.open(this.retour_preselectionne, {
        disableClose: true,
      });
    }
  }
  // save_menage_in_base(menage: any, suppression: number) {
  //   try {
  //     let config = {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
  //       },
  //     };
  //     let id_mng = 0;
  //     if (!this.nouvelle_element) {
  //       id_mng = this.selectedItem.id;
  //     }
  //     const datas = {
  //       supprimer: suppression,
  //       id: id_mng,
  //       serveur_central: this.constant_service.serveur_central,
  //       ...menage,
  //     };
  //     console.log("donner enregistrer", datas);

  //     this.index_api.add("menage", this.serializeData(datas), config).subscribe(
  //       (res) => {
  //         console.log("reponse api", res);

  //         console.log("Callback de succès du serveur appelé", res[0].reponse);
  //         // Convertir l'ArrayBuffer en chaîne de caractères
  //         const decoder = new TextDecoder("utf-8");
  //         const jsonString = decoder.decode(res);

  //         try {
  //           // Analyser la réponse JSON
  //           const jsonResponse = JSON.parse(jsonString);
  //           console.log("Réponse du serveur (JSON) :", jsonResponse);
  //         } catch (e) {
  //           console.error(
  //             "Erreur lors de la conversion de la réponse en JSON :",
  //             e,
  //           );
  //           console.log("Réponse du serveur (non-JSON) :", jsonString);
  //         }
  //       },
  //       (error) => {
  //         console.error("Callback d'erreur du serveur appelé : ", error);
  //         console.error("Erreur :", error.message);
  //       },
  //     );
  //     this.affichage_masque = false;
  //   } catch (error) {
  //     console.error(`Error occured`, error);
  //   }
  // }

  retour_preselectionne_menage() {
    this.dialog.open(this.retour_preselectionne, {
      disableClose: true,
    });
  }

  confirm_retour_preselectionne_menage() {
    const datas = {
      supprimer: 0,
      mise_a_jour_statut: 1,
      ...this.selectedItem,
    };
    // console.log("data modifier", datas);
    this.save_in_base(datas);
    this.dialog.closeAll();
  }

  export_carte_beneficiaire(menage_beneficiaire: any) {
    this.index_api
      .getAPIgeneraliserREST(
        "requete_export",
        "id_ile",
        menage_beneficiaire.id_ile,
        "id_region",
        menage_beneficiaire.id_region,
        "id_commune",
        menage_beneficiaire.id_commune,
        "village_id",
        menage_beneficiaire.village_id,
        "id_sous_projet",
        this.config.id_sous_projet,
        "apiUrlbase",
        this.constant_service.apiUrlbase,
        "carte_beneficiaire",
        1,
        "export",
        1,
        "tab_liste_menage",
        JSON.stringify(this.liste_carte_beneficiaire),
        "",
        "",
        "",
        "",
      )
      .subscribe((res) => {
        this.status = res.response;
        console.log(this.status);
      });
  }

  export_excel(menage_beneficiaire: any) {
    this.index_api
      .getAPIgeneraliserREST(
        "reporting",
        "id_ile",
        menage_beneficiaire.id_ile,
        "id_region",
        menage_beneficiaire.id_region,
        "id_commune",
        menage_beneficiaire.id_commune,
        "village_id",
        menage_beneficiaire.village_id,
        "id_sous_projet",
        this.config.id_sous_projet,
        "etat_export_excel",
        1,
        "titre_etat",
        this.config.titre_etat,
        "etat",
        this.config.etat,
        "",
        "",
        "",
        "",
        "",
        "",
      )
      .subscribe((res) => {
        this.status = res.response;
        if (this.status) {
          var nom_file = res.data.nom_file;
          window.location.href =
            this.constant_service.apiUrlReporting + nom_file;
          // this.affiche_export = false;
        } else {
          // this.erreur = true;
          // this.affiche_export = false;
          // var message = "ERREUR";
          // this.showAlert(
          //     "Export ménage bénéficiaire en excel",
          //     message
          // );
          alert("une erreur s'est produite pendant export excel !");
        }
      });
  }
  modifier() {
    this.nouvelle_element = false;
    this.affichage_masque = true;
    this.afficher_btn_modifier = false;
    this.afficher_btn_retour_preselectionne = false;
    this.afficher_btn_sorti_programme = false;
    this.afficher_btn_supprimer = false;
    this.afficher_btn_carte_beneficiaire = false;
    this.afficher_btn_actualiser = false;
    this.menage_beneficiaire = {
      id_ile: this.menage_beneficiaire.id_ile,
      id_region: this.menage_beneficiaire.id_region,
      id_commune: this.menage_beneficiaire.id_commune,
      village_id: this.menage_beneficiaire.village_id,
      activite_ciblage: this.selectedItem.activite_ciblage,
      type_de_plainte: this.selectedItem.type_de_plainte,
      code_acces_aux_plaintes: this.selectedItem.code_acces_aux_plaintes,
      nom_et_prenom_de_l_agent: this.selectedItem.nom_et_prenom_de_l_agent,
      numero_recepisse: this.selectedItem.numero_recepisse,
      milieu: this.selectedItem.milieu,
      quartier: this.selectedItem.quartier,
      point_d_inscription: this.selectedItem.point_d_inscription,
      numero_d_ordre: this.selectedItem.numero_d_ordre,
      nom_chef_menage: this.selectedItem.nom_chef_menage,
      prenom1: this.selectedItem.prenom1,
      prenom2: this.selectedItem.prenom2,
      sexe: this.selectedItem.sexe,
      date_naissance: this.selectedItem.date_naissance,
      nin: this.selectedItem.nin,
      telephone1: this.selectedItem.telephone1,
      telephone2: this.selectedItem.telephone2,
      membre_venu_inscrire: this.selectedItem.membre_venu_inscrire,
      adresse: this.selectedItem.adresse,
      zone: this.selectedItem.zone,
      ong: this.selectedItem.ong,
      numero_adc: this.selectedItem.numero_adc,
      nom_adc: this.selectedItem.nom_adc,
      enquete_va_etre_realise: this.selectedItem.enquete_va_etre_realise,
      cause_non_realisation_enquete:
        this.selectedItem.cause_non_realisation_enquete,
      preciser_non_realisation_enquete:
        this.selectedItem.preciser_non_realisation_enquete,
      observation: this.selectedItem.observation,
      qui_va_repondre_enquete: this.selectedItem.qui_va_repondre_enquete,
      autre_qui_va_repondre_enquete:
        this.selectedItem.autre_qui_va_repondre_enquete,
      nom_repondant: this.selectedItem.nom_repondant,
      NomTravailleur: this.selectedItem.NomTravailleur,
      SexeTravailleur: this.selectedItem.SexeTravailleur,
      datenaissancetravailleur: this.selectedItem.datenaissancetravailleur,
      agetravailleur: this.selectedItem.agetravailleur,
      lien_de_parente_travailleur:
        this.selectedItem.lien_de_parente_travailleur,
      lien_travailleur: this.selectedItem.lien_travailleur,
      autre_lien_de_parente: this.selectedItem.autre_lien_de_parente,
      autre_lien_travailleur: this.selectedItem.autre_lien_travailleur,
      nin_travailleur: this.selectedItem.nin_travailleur,
      confirmer_nin_travailleur: this.selectedItem.confirmer_nin_travailleur,
      travailleur_possede_telephone:
        this.selectedItem.travailleur_possede_telephone,
      telephone_travailleur: this.selectedItem.telephone_travailleur,
      confirmer_telephone_travailleur:
        this.selectedItem.confirmer_telephone_travailleur,
      NomTravailleurSuppliant: this.selectedItem.NomTravailleurSuppliant,
      SexeTravailleurSuppliant: this.selectedItem.SexeTravailleurSuppliant,
      datenaissancesuppliant: this.selectedItem.datenaissancesuppliant,
      agesuppliant: this.selectedItem.agesuppliant,
      lien_de_parente_suppleant: this.selectedItem.lien_de_parente_suppleant,
      lien_suppleant: this.selectedItem.lien_suppleant,
      autres_lien_de_parente_suppleant:
        this.selectedItem.autres_lien_de_parente_suppleant,
      autre_lien_suppleant: this.selectedItem.autre_lien_suppleant,
      nin_suppleant: this.selectedItem.nin_suppleant,
      confirmer_nin_suppleant: this.selectedItem.confirmer_nin_suppleant,
      suppleant_possede_telephone:
        this.selectedItem.suppleant_possede_telephone,
      telephone_suppleant: this.selectedItem.telephone_suppleant,
      confirmer_telephone_suppleant:
        this.selectedItem.confirmer_telephone_suppleant,
      taille_menage: this.selectedItem.taille_menage,
      nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
      nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
      nombre_enfant_moins_15ans: this.selectedItem.nombre_enfant_moins_15ans,
      nombre_enfant_6_14ans_non_scolarises:
        this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
      nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
      nombre_adulte_travaille_secteur_formel:
        this.selectedItem.nombre_adulte_travaille_secteur_formel,
      nombre_handicap: this.selectedItem.nombre_handicap,
      membre_vivant_etranger_qui_aide_financierement:
        this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
      personne_qui_envoi_argent_regulier:
        this.selectedItem.personne_qui_envoi_argent_regulier,
      chef_menage_femme: this.selectedItem.chef_menage_femme,
      chef_menage_au_plus_primaire:
        this.selectedItem.chef_menage_au_plus_primaire,
      maison_non_dure: this.selectedItem.maison_non_dure,
      non_acces_electricite: this.selectedItem.non_acces_electricite,
      non_acces_robinet: this.selectedItem.non_acces_robinet,
      membre_salarie: this.selectedItem.membre_salarie,
      antenne_parabolique: this.selectedItem.antenne_parabolique,
      frigo_fonctionnel: this.selectedItem.frigo_fonctionnel,
      beneficiaire_aide: this.selectedItem.beneficiaire_aide,
      membre_etranger_recoit: this.selectedItem.membre_etranger_recoit,
      membre_etranger_envoie: this.selectedItem.membre_etranger_envoie,
      proprietaire_logement: this.selectedItem.proprietaire_logement,
      inclusion_exclusion: this.selectedItem.inclusion_exclusion,
      cause_inclusion_exclusion: this.selectedItem.cause_inclusion_exclusion,
      scores: this.selectedItem.scores,
      scores_apres_plainte: this.selectedItem.scores_apres_plainte,
      gps: this.selectedItem.gps,
    };
  }
  get_individus_by_menage(menage_id: number) {
    this.index_api
      .getAPIgeneraliserREST("individu", "cle_etrangere", menage_id)
      .subscribe((res) => {
        this.all_individus = res.response;
        this.all_individus.forEach((obj: any) => {
          // tsy maintsy fonction flechee fa tsy afaka mitifitra ilay this. lien_de_parente
          let lien_de_parente = "";
          this.all_lienparental.forEach((lie: any) => {
            // tsy maintsy fonction flechee fa tsy afaka mitifitra ilay this. lien_de_parente
            if (parseInt(lie.id) === parseInt(obj.lienparental)) {
              lien_de_parente = lie.description;
            }
          });
          obj.lien_de_parente = lien_de_parente;
        });
      });
  }
  selection_individu(event: any) {
    this.selectedItem_individu = event.selected[0];
    this.afficher_btn_supprimer_individu = true;
    this.afficher_btn_modifier_individu = true;
  }
  ajout_individu() {
    this.affichage_masque_individu = true;
    this.afficher_btn_ajout_individu = false;
    this.afficher_btn_modifier_individu = false;
    this.afficher_btn_supprimer_individu = false;
    this.nouvelItem_individu = true;
  }
  modifier_individu() {
    this.affichage_masque_individu = true;
    this.afficher_btn_ajout_individu = false;
    this.afficher_btn_modifier_individu = false;
    this.afficher_btn_supprimer_individu = false;
    this.nouvelItem_individu = false;
    this.individu = {
      nom: this.selectedItem_individu.nom,
      prenom: this.selectedItem_individu.prenom,
      prenom2: this.selectedItem_individu.prenom2,
      sexe: this.selectedItem_individu.sexe,
      date_naissance: this.selectedItem_individu.date_naissance,
      lienparental: this.selectedItem_individu.lienparental,
      lien_de_parente: this.selectedItem_individu.lien_de_parente,
      frequente_ecole: this.selectedItem_individu.frequente_ecole,
      niveau_scolaire: this.selectedItem_individu.niveau_scolaire,
      exerce_travail: this.selectedItem_individu.exerce_travail,
      type_employeur: this.selectedItem_individu.type_employeur,
      poste_occupe: this.selectedItem_individu.poste_occupe,
      salaire: this.selectedItem_individu.salaire,
      stabilite_travail: this.selectedItem_individu.stabilite_travail,
      autre_stabilite_travail:
        this.selectedItem_individu.autre_stabilite_travail,
      possede_cin: this.selectedItem_individu.possede_cin,
      numero_cin: this.selectedItem_individu.numero_cin,
      confirmer_numero_cin: this.selectedItem_individu.confirmer_numero_cin,
      possede_telephone: this.selectedItem_individu.possede_telephone,
      premier_numero_telephone:
        this.selectedItem_individu.premier_numero_telephone,
      confirmer_premier_numero_telephone:
        this.selectedItem_individu.confirmer_premier_numero_telephone,
      deuxieme_numero_telephone:
        this.selectedItem_individu.deuxieme_numero_telephone,
      confirmer_deuxieme_numero_telephone:
        this.selectedItem_individu.confirmer_deuxieme_numero_telephone,
      possede_handicap: this.selectedItem_individu.possede_handicap,
      type_handicap: this.selectedItem_individu.type_handicap,
      type_handicap_aveugle: this.selectedItem_individu.type_handicap_aveugle,
      type_handicap_muet_sourd:
        this.selectedItem_individu.type_handicap_muet_sourd,
      handicap_membres_superieurs:
        this.selectedItem_individu.handicap_membres_superieurs,
      handicap_membres_inferieurs:
        this.selectedItem_individu.handicap_membres_inferieurs,
      handicap_deficience: this.selectedItem_individu.handicap_deficience,
      handicap_mentale: this.selectedItem_individu.handicap_mentale,
      handicap_autre: this.selectedItem_individu.handicap_autre,
      handicap_autre_preciser:
        this.selectedItem_individu.handicap_autre_preciser,
    };
  }
  supprimer_individu() {
    this.dialog.open(this.supprimer_individus, {
      disableClose: true,
    });
  }
  confirm_supprimer_individu() {
    this.save_individu(this.selectedItem_individu, 1);
    this.dialog.closeAll();
  }
  save_individu(individu: any, suppression: number) {
    this.affichage_masque_individu = false;
    this.afficher_btn_ajout_individu = true;
    console.log("individu a supprimer", individu);
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
      },
    };

    let id_idv = 0;
    if (!this.nouvelItem_individu) {
      id_idv = this.selectedItem_individu.id;
    }
    var datas = {
      supprimer: suppression,
      id: id_idv,
      menage_id: this.selectedItem.id,
      index_menage: this.selectedItem.id,
      nom: individu.nom,
      prenom: individu.prenom,
      prenom2: individu.prenom2,
      sexe: individu.sexe,
      date_naissance: individu.date_naissance,
      lienparental: individu.lienparental,
      frequente_ecole: individu.frequente_ecole,
      niveau_scolaire: individu.niveau_scolaire,
      exerce_travail: individu.exerce_travail,
      type_employeur: individu.type_employeur,
      poste_occupe: individu.poste_occupe,
      salaire: individu.salaire,
      stabilite_travail: individu.stabilite_travail,
      autre_stabilite_travail: individu.autre_stabilite_travail,
      possede_cin: individu.possede_cin,
      numero_cin: individu.numero_cin,
      confirmer_numero_cin: individu.confirmer_numero_cin,
      possede_telephone: individu.possede_telephone,
      premier_numero_telephone: individu.premier_numero_telephone,
      confirmer_premier_numero_telephone:
        individu.confirmer_premier_numero_telephone,
      deuxieme_numero_telephone: individu.deuxieme_numero_telephone,
      confirmer_deuxieme_numero_telephone:
        individu.confirmer_deuxieme_numero_telephone,
      possede_handicap: individu.possede_handicap,
      type_handicap: individu.type_handicap,
      type_handicap_aveugle: individu.type_handicap_aveugle,
      type_handicap_muet_sourd: individu.type_handicap_muet_sourd,
      handicap_membres_superieurs: individu.handicap_membres_superieurs,
      handicap_membres_inferieurs: individu.handicap_membres_inferieurs,
      handicap_deficience: individu.handicap_deficience,
      handicap_mentale: individu.handicap_mentale,
      handicap_autre: individu.handicap_autre,
      handicap_autre_preciser: individu.handicap_autre_preciser,
    };
    // console.log("donnees a enregistrer", datas);
    this.index_api
      .add("individu", this.serializeData(datas), config)
      .subscribe((resp) => {
        console.log("reponse api", resp);
      });
  }
  fermerFormIndividu() {
    this.affichage_masque_individu = false;
    this.afficher_btn_ajout_individu = true;
    this.afficher_btn_modifier_individu = true;
    this.afficher_btn_supprimer_individu = true;
  }
  fermerModificationMenage() {
    this.affichage_masque = false;
    this.afficher_btn_modifier = false;
    this.afficher_btn_retour_preselectionne = false;
    this.afficher_btn_sorti_programme = false;
    this.afficher_btn_supprimer = false;
    this.afficher_btn_carte_beneficiaire = true;
    this.afficher_btn_actualiser = true;
  }

  exists(item: any, list: any) {
    if (list) {
      return list.indexOf(item) > -1;
    }
  }
  toggle(item: any, list: any) {
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }
  }
  toggleSelection(row: any, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    const idx = this.selected.findIndex(
      (selectedRow: any) => selectedRow.id === row.id,
    );
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(row);
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
  private serializeData(data: any) {
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
          encodeURIComponent(value == null ? "" : value),
      );
    }

    // Serialize the buffer and clean it up for transportation.
    var source = buffer.join("&").replace(/%20/g, "+");
    return source;
  }
}
