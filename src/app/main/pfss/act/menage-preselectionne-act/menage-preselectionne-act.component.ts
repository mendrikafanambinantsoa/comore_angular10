import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ConstantService } from "app/_services/constant.service";
import { IndexApiService } from "app/_services/index-api.service";
import { ActrServiceService } from "../actr-service.service";

@Component({
    selector: "app-menage-preselectionne-act",
    templateUrl: "./menage-preselectionne-act.component.html",
    styleUrls: ["./menage-preselectionne-act.component.scss"],
})
export class MenagePreselectionneActComponent implements OnInit {
    config: any;

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

    form_filtre_par_village: FormGroup;
    form_menage_preselectionne: FormGroup;
    form_information_menage: FormGroup;
    menage_preselectionne: any;
    afficher_btn_actualiser: boolean;
    show_btn_ajout: boolean;
    search_menage = "";
    selected: any = [];
    selectedItem: any;

    affichage_masque: boolean;

    desactiver_onglets = true;
    menage_information: any
    nouvelle_element: any;

    constructor(
        private index_api: IndexApiService,
        private form_builder: FormBuilder,
        public dialog: MatDialog,
        public constant_service: ConstantService,
        private route: ActivatedRoute,
        private actr_service: ActrServiceService
    ) {}

    @ViewChild("aucun_menage_preselectionne_par_village", { static: true })
    aucun_menage_preselectionne_par_village: TemplateRef<any>;

    @ViewChild("suppression_menage_preselectionne", { static: true })
    suppression_menage_preselectionne: TemplateRef<any>;

    @ViewChild("choisir_sous_projet", { static: true })
    choisir_sous_projet: TemplateRef<any>;

    @ViewChild("retour_inscrit", { static: true })
    retour_inscrit: TemplateRef<any>;

    @ViewChild("faire_beneficier", { static: true })
    faire_beneficier: TemplateRef<any>;

    ngOnInit(): void {
        const url = this.route.snapshot.routeConfig.path;
        this.config = this.actr_service.getConfiguration(`/${url}`);

        this.afficher_btn_actualiser = true;
        this.menage_preselectionne = {};
        this.menage_information = {};
        this.show_btn_ajout = false;
        this.affichage_masque = false;

        this.index_api.getAll("ile").subscribe((res) => {
            this.all_ile = res.response;
        });
        this.index_api.getAll("lienparental").subscribe((res) => {
            this.all_lienparental = res.response;
        });
        this.index_api.getAll("lienparental_autre").subscribe((res) => {
            this.all_lienparental_autre = res.response;
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

        this.form_filtre_par_village = this.form_builder.group({
            id_ile: ["", Validators.required],
            id_region: ["", Validators.required],
            id_commune: ["", Validators.required],
            village_id: ["", Validators.required],
        });
        this.form_menage_preselectionne = this.form_builder.group({
            //information chef menage
            point_d_inscription: [""],
            identifiant_menage: ["", Validators.required],
            NumeroEnregistrement: [""],
            nom_chef_menage: ["", Validators.required],
            agechefdemenage: [""],
            sexe: [""],
            situation_matrimoniale: [""],
            adresse: [""],
            NumeroCIN: [""],
            NumeroCarteElectorale: [""],
            chef_frequente_ecole: [""],
            niveau_instruction_chef: [""],
            chef_menage_travail: [""],
            activite_chef_menage: [""],
            telephone_chef_menage: [""],
            milieu: [""],
            quartier: [""],
            PersonneInscription: [""],
            inapte: [""],
            //information travailleur
            nom_conjoint: [""],
            age_conjoint: [""],
            sexe_conjoint: [""],
            nin_conjoint: [""],
            carte_electorale_conjoint: [""],
            conjoint_frequente_ecole: [""],
            niveau_instruction_conjoint: [""],
            conjoint_travail: [""],
            activite_conjoint: [""],
            telephone_conjoint: [""],
            //information travailleur
            NomTravailleur: [""],
            datedenaissancetravailleur: [""],
            agetravailleur: [""],
            SexeTravailleur: [""],
            lien_travailleur: [""],
            numerocintravailleur: [""],
            numerocarteelectoraletravailleur: [""],
            telephone_travailleur: [""],
            NomTravailleurSuppliant: [""],
            datedenaissancesuppliant: [""],
            agesuppliant: [""],
            SexeTravailleurSuppliant: [""],
            lien_suppleant: [""],
            numerocinsuppliant: [""],
            numerocarteelectoralesuppliant: [""],
            telephone_suppleant: [""],
        })
        this.form_information_menage = this.form_builder.group({
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
        })

        
    }

    filtre_region() {
        this.index_api
            .getAPIgeneraliserREST(
                "region",
                "cle_etrangere",
                this.menage_preselectionne.id_ile
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
                this.menage_preselectionne.id_region
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
                this.menage_preselectionne.id_commune
            )
            .subscribe((res) => {
                this.all_village = res.response;
            });
    }
    filtreMenageByVillage() {
        // this.nombre_envoi = 0;
        this.index_api
            .getAPIgeneraliserREST(
                "menage",
                "cle_etrangere",
                this.menage_preselectionne.village_id,
                "etat_statut",
                "preselectionne",
                "id_sous_projet",
                // this.id_sous_projet,
                this.config.id_sous_projet
            )
            .subscribe((res) => {
                this.all_menages = res.response;
                // console.log("all menages", this.all_menages);
                
                if (res.response == 0) {
                    this.dialog.open(
                        this.aucun_menage_preselectionne_par_village,
                        { disableClose: true }
                    );
                } else {
                    this.index_api
                        .getAPIgeneraliserREST(
                            "menage",
                            "nombre_envoi",
                            99,
                            "cle_etrangere",
                            this.menage_preselectionne.village_id,
                            "etat_statut",
                            "preselectionne",
                            "id_sous_projet",
                            this.config.id_sous_projet
                        )
                        .subscribe((res) => {
                            // this.nombre_envoi = res.response;
                        });
                }
            });
    }
    
    affichage_etat_statut(etat) {
        if (parseInt(etat) > 0) {
            return "Oui";
        } else {
            return "Non";
        }
    }
    affichage_etat_envoie(id_serveur_centrale) {
        if (id_serveur_centrale) {
            return "Envoyé";
        } else {
            return "Non envoyé";
        }
    }
    on_select_menage_preselectionne(event) {
        this.show_btn_ajout = true;
        this.selectedItem = event.selected[0];
        this.desactiver_onglets = false;
        this.menage_information = {
            numero_recepisse: this.selectedItem.numero_recepisse,
            nom_chef_menage: this.selectedItem.nom_chef_menage,
            identifiant_menage: this.selectedItem.identifiant_menage,
            NumeroEnregistrement: this.selectedItem.NumeroEnregistrement,
            taille_menage: this.selectedItem.taille_menage,
            nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
            nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
            nombre_enfant_moins_15ans: this.selectedItem.nombre_enfant_moins_15ans,
            nombre_enfant_6_14ans_non_scolarises: this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
            nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
            nombre_adulte_travaille_secteur_formel: this.selectedItem.nombre_adulte_travaille_secteur_formel,
            nombre_handicap: this.selectedItem.nombre_handicap,
            membre_vivant_etranger_qui_aide_financierement: this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
            personne_qui_envoi_argent_regulier: this.selectedItem.personne_qui_envoi_argent_regulier,
            chef_menage_femme: this.selectedItem.chef_menage_femme,
            chef_menage_au_plus_primaire: this.selectedItem.chef_menage_au_plus_primaire,
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
        }
        // console.log("menage information selectionne", this.selectedItem);

    }
    ajouter_menage() {
        this.nouvelle_element = true;
        this.affichage_masque = true;
        this.menage_preselectionne = {
            id_ile: this.menage_preselectionne.id_ile,
            id_region: this.menage_preselectionne.id_region,
            id_commune: this.menage_preselectionne.id_commune,
            village_id: this.menage_preselectionne.village_id, 
            statut:  "PRESELECTIONNE",
            id_sous_projet: this.config.id_sous_projet,
            preselectionne: 1,
            inscrit: 0,
            beneficiaire: 0,
            inapte: '0'
        };
    }
    modifier(){
        this.nouvelle_element = false;
        this.affichage_masque = true;
        this.menage_preselectionne = {
            id_ile: this.menage_preselectionne.id_ile,
            id_region: this.menage_preselectionne.id_region,
            id_commune: this.menage_preselectionne.id_commune,
            village_id: this.menage_preselectionne.village_id,
            activite_ciblage: this.selectedItem.activite_ciblage,
            type_de_plainte: this.selectedItem.type_de_plainte,
            identifiant_menage: this.selectedItem.identifiant_menage,
            NumeroEnregistrement: this.selectedItem.NumeroEnregistrement,
            code_acces_aux_plaintes: this.selectedItem.code_acces_aux_plaintes,
            nom_et_prenom_de_l_agent:this.selectedItem.nom_et_prenom_de_l_agent,
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
            inapte: this.selectedItem.inapte,
            numero_adc: this.selectedItem.numero_adc,
            nom_adc: this.selectedItem.nom_adc,
            enquete_va_etre_realise: this.selectedItem.enquete_va_etre_realise,
            cause_non_realisation_enquete: this.selectedItem.cause_non_realisation_enquete,
            preciser_non_realisation_enquete: this.selectedItem.preciser_non_realisation_enquete,
            observation: this.selectedItem.observation,
            qui_va_repondre_enquete: this.selectedItem.qui_va_repondre_enquete,
            autre_qui_va_repondre_enquete: this.selectedItem.autre_qui_va_repondre_enquete,
            nom_repondant: this.selectedItem.nom_repondant,
            NomTravailleur: this.selectedItem.NomTravailleur,
            SexeTravailleur: this.selectedItem.SexeTravailleur,
            datenaissancetravailleur: this.selectedItem.datenaissancetravailleur,
            agetravailleur: this.selectedItem.agetravailleur,
            lien_de_parente_travailleur: this.selectedItem.lien_de_parente_travailleur,
            lien_travailleur: this.selectedItem.lien_travailleur,
            autre_lien_de_parente: this.selectedItem.autre_lien_de_parente,
            autre_lien_travailleur: this.selectedItem.autre_lien_travailleur,
            nin_travailleur: this.selectedItem.nin_travailleur,
            confirmer_nin_travailleur: this.selectedItem.confirmer_nin_travailleur,
            travailleur_possede_telephone: this.selectedItem.travailleur_possede_telephone,
            telephone_travailleur: this.selectedItem.telephone_travailleur,
            confirmer_telephone_travailleur: this.selectedItem.confirmer_telephone_travailleur,
            NomTravailleurSuppliant: this.selectedItem.NomTravailleurSuppliant,
            SexeTravailleurSuppliant:this.selectedItem.SexeTravailleurSuppliant,
            datenaissancesuppliant: this.selectedItem.datenaissancesuppliant,
            agesuppliant: this.selectedItem.agesuppliant,
            lien_de_parente_suppleant: this.selectedItem.lien_de_parente_suppleant,
            lien_suppleant: this.selectedItem.lien_suppleant,
            autres_lien_de_parente_suppleant: this.selectedItem.autres_lien_de_parente_suppleant,
            autre_lien_suppleant: this.selectedItem.autre_lien_suppleant,
            nin_suppleant: this.selectedItem.nin_suppleant,
            confirmer_nin_suppleant: this.selectedItem.confirmer_nin_suppleant,
            suppleant_possede_telephone: this.selectedItem.suppleant_possede_telephone,
            telephone_suppleant: this.selectedItem.telephone_suppleant,
            confirmer_telephone_suppleant: this.selectedItem.confirmer_telephone_suppleant,
            taille_menage: this.selectedItem.taille_menage,
            nombre_personne_plus_70ans: this.selectedItem.nombre_personne_plus_70ans,
            nombre_jeune_18_35ans: this.selectedItem.nombre_jeune_18_35ans,
            nombre_enfant_moins_15ans: this.selectedItem.nombre_enfant_moins_15ans,
            nombre_enfant_6_14ans_non_scolarises: this.selectedItem.nombre_enfant_6_14ans_non_scolarises,
            nombre_enfant_moins_5ans: this.selectedItem.nombre_enfant_moins_5ans,
            nombre_adulte_travaille_secteur_formel: this.selectedItem.nombre_adulte_travaille_secteur_formel,
            nombre_handicap: this.selectedItem.nombre_handicap,
            membre_vivant_etranger_qui_aide_financierement: this.selectedItem.membre_vivant_etranger_qui_aide_financierement,
            personne_qui_envoi_argent_regulier: this.selectedItem.personne_qui_envoi_argent_regulier,
            chef_menage_femme: this.selectedItem.chef_menage_femme,
            chef_menage_au_plus_primaire: this.selectedItem.chef_menage_au_plus_primaire,
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
            datedenaissancetravailleur: this.selectedItem.datedenaissancetravailleur,
            numerocintravailleur: this.selectedItem.numerocintravailleur,
            numerocarteelectoraletravailleur: this.selectedItem.numerocarteelectoraletravailleur,
            datedenaissancesuppliant: this.selectedItem.datedenaissancesuppliant,
            numerocinsuppliant: this.selectedItem.numerocinsuppliant,
            numerocarteelectoralesuppliant: this.selectedItem.numerocarteelectoralesuppliant,
        };
        // console.log("modification menage preselectionne", this.menage_preselectionne);
        
    }
    save_in_base(data) {
        this.affichage_masque = false;
        try {
            let config = {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8;",
                },
            };
            console.log("menage a enregistrer", data);
            
            this.index_api.add("menage", this.serializeData(data), config).subscribe((res) => {
                console.log("enregistrement reussi", res);
                this.selectedItem = {};
                this.affichage_masque = false;
                this.filtreMenageByVillage();
                
            })

        } catch (error) {
            console.log("erreur pendant enregistrement", error);
            
        } 
    }
    save_menage_preselectionne(menage, suppression) {      
        let id = 0;
        let datas = {};
        if (!this.nouvelle_element) {
            id = this.selectedItem.id;
        }
        if(id === 0) {
            datas = {
                supprimer: suppression,
                id: id,
                serveur_central: this.constant_service.serveur_central,
                activite_ciblage : menage.activite_ciblage ,
                type_de_plainte : menage.type_de_plainte ,
                code_acces_aux_plaintes : menage.code_acces_aux_plaintes ,
                nom_et_prenom_de_l_agent : menage.nom_et_prenom_de_l_agent ,
                milieu : menage.milieu ,
                quartier : menage.quartier ,
                point_d_inscription : menage.point_d_inscription ,
                numero_d_ordre : menage.numero_d_ordre ,
                numero_recepisse : menage.numero_recepisse ,
                prenom1 : menage.prenom1 ,
                prenom2 : menage.prenom2 ,
                sexe : menage.sexe ,
                nin : menage.nin ,
                date_naissance : menage.date_naissance,
                telephone1 : menage.telephone1 ,
                telephone2 : menage.telephone2 ,
                nom_chef_menage : menage.nom_chef_menage ,
                membre_venu_inscrire : menage.membre_venu_inscrire ,
                adresse : menage.adresse ,
                zone : menage.zone ,
                ong : menage.ong ,
                numero_adc : menage.numero_adc ,
                nom_adc : menage.nom_adc ,
                enquete_va_etre_realise : menage.enquete_va_etre_realise ,
                cause_non_realisation_enquete : menage.cause_non_realisation_enquete ,
                preciser_non_realisation_enquete : menage.preciser_non_realisation_enquete ,
                observation : menage.observation ,
                qui_va_repondre_enquete : menage.qui_va_repondre_enquete ,
                autre_qui_va_repondre_enquete : menage.autre_qui_va_repondre_enquete ,
                nom_repondant : menage.nom_repondant ,
                membre_vivant_etranger_qui_aide_financierement : menage.membre_vivant_etranger_qui_aide_financierement ,
                personne_qui_envoi_argent_regulier : menage.personne_qui_envoi_argent_regulier,
                type_de_logement : menage.type_de_logement ,
                logement_vous_appartient : menage.logement_vous_appartient ,
                mode_eclairage : menage.mode_eclairage ,
                mode_eclairage_autre_a_preciser : menage.mode_eclairage_autre_a_preciser ,
                source_eau : menage.source_eau ,
                autre_source_eau_a_preciser : menage.autre_source_eau_a_preciser ,
                abonnement_canal_fonctionnel : menage.abonnement_canal_fonctionnel ,
                possede_frigo_fonctionnel : menage.possede_frigo_fonctionnel ,
                beneficiaire_autre_programme : menage.beneficiaire_autre_programme ,
                membre_menage_salarie : menage.membre_menage_salarie ,
                combien_gagne_t_il : menage.combien_gagne_t_il ,
                possede_voiture_fonctionnelle : menage.possede_voiture_fonctionnelle ,
                pense_vivre_pendant_plus_6mois : menage.pense_vivre_pendant_plus_6mois ,
                calcul_eligibilite : menage.calcul_eligibilite ,
                taille_menage : menage.taille_menage ,
                nombre_personne_plus_70ans : menage.nombre_personne_plus_70ans ,
                nombre_jeune_18_35ans : menage.nombre_jeune_18_35ans ,
                nombre_enfant_moins_15ans : menage.nombre_enfant_moins_15ans ,
                nombre_enfant_6_14ans_non_scolarises : menage.nombre_enfant_6_14ans_non_scolarises ,
                nombre_adulte_travaille_secteur_formel : menage.nombre_adulte_travaille_secteur_formel ,
                nombre_handicap : menage.nombre_handicap ,
                chef_menage_femme : menage.chef_menage_femme ,
                chef_menage_au_plus_primaire : menage.chef_menage_au_plus_primaire ,
                maison_non_dure : menage.maison_non_dure ,
                non_acces_electricite : menage.non_acces_electricite ,
                non_acces_robinet : menage.non_acces_robinet ,
                membre_salarie : menage.membre_salarie ,
                antenne_parabolique : menage.antenne_parabolique ,
                frigo_fonctionnel : menage.frigo_fonctionnel ,
                beneficiaire_aide : menage.beneficiaire_aide ,
                membre_etranger_recoit : menage.membre_etranger_recoit ,
                membre_etranger_envoie : menage.membre_etranger_envoie ,
                nombre_enfant_moins_5ans : menage.nombre_enfant_moins_5ans,
                proprietaire_logement : menage.proprietaire_logement ,
                inclusion_exclusion : menage.inclusion_exclusion ,
                cause_inclusion_exclusion : menage.cause_inclusion_exclusion ,
                scores : menage.scores ,
                scores_apres_plainte : menage.scores_apres_plainte ,
                gps : menage.gps ,
                erreur : menage.erreur ,						
                inapte  :  menage.inapte ,	
                statut : menage.statut ,
                id_sous_projet : menage.id_sous_projet ,
                NumeroEnregistrement :  menage.NumeroEnregistrement ,
                identifiant_menage :  menage.identifiant_menage ,
                village_id :  menage.village_id ,
                inscrit :  menage.inscrit ,
                preselectionne :  menage.preselectionne ,
                beneficiaire :  menage.beneficiaire ,
                photo :  menage.photo ,
                phototravailleur :  menage.phototravailleur ,
                phototravailleursuppliant :  menage.phototravailleursuppliant ,
                NomTravailleur :  menage.NomTravailleur ,
                SexeTravailleur :  menage.SexeTravailleur ,
                datenaissancetravailleur  :  menage.datenaissancetravailleur ,
                agetravailleur :  menage.agetravailleur ,
                lien_travailleur :  menage.lien_travailleur ,
                NomTravailleurSuppliant :  menage.NomTravailleurSuppliant ,
                SexeTravailleurSuppliant :  menage.SexeTravailleurSuppliant ,
                datenaissancesuppliant  :  menage.datenaissancesuppliant ,
                agesuppliant :  menage.agesuppliant ,
                lien_suppleant :  menage.lien_suppleant ,
                id_serveur_centrale :  menage.id_serveur_centrale , 
                
                autres_lien_de_parente : menage.autres_lien_de_parente ,
                autre_lien_travailleur : menage.autre_lien_travailleur ,
                nin_travailleur : menage.nin_travailleur ,
                confirmer_nin_travailleur : menage.confirmer_nin_travailleur ,
                travailleur_possede_telephone : menage.travailleur_possede_telephone ,
                telephone_travailleur : menage.telephone_travailleur ,
                confirmer_telephone_travailleur : menage.confirmer_telephone_travailleur ,
                            
                autres_lien_de_parente_suppleant : menage.autres_lien_de_parente_suppleant ,
                autre_lien_suppleant : menage.autre_lien_suppleant ,
                nin_suppleant : menage.nin_suppleant ,
                confirmer_nin_suppleant : menage.confirmer_nin_suppleant ,
                suppleant_possede_telephone : menage.suppleant_possede_telephone ,
                telephone_suppleant : menage.telephone_suppleant ,
                confirmer_telephone_suppleant : menage.confirmer_telephone_suppleant ,	
                lien_de_parente_travailleur : menage.lien_de_parente_travailleur,		
                lien_de_parente_suppleant : menage.lien_de_parente_suppleant,
            }
        } else {
            datas = {
                supprimer: suppression,
                id: id,
                point_d_inscription : menage.point_d_inscription ,
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

                nom_et_prenom_de_l_agent : menage.nom_et_prenom_de_l_agent ,
                prenom1 : menage.prenom1 ,
                prenom2 : menage.prenom2 ,
                zone : menage.zone ,
                // nin : menage.nin ,
                // telephone1 : menage.telephone1 ,
                // telephone2 : menage.telephone2 ,

                NomTravailleur: this.selectedItem.NomTravailleur,
                membre_venu_inscrire : this.selectedItem.membre_venu_inscrire ,
                numero_d_ordre : this.selectedItem.numero_d_ordre ,
                numero_recepisse : this.selectedItem.numero_recepisse ,
                date_naissance : this.selectedItem.date_naissance,
                serveur_central: this.constant_service.serveur_central,
                activite_ciblage : this.selectedItem.activite_ciblage ,
                type_de_plainte : this.selectedItem.type_de_plainte ,
                code_acces_aux_plaintes : this.selectedItem.code_acces_aux_plaintes ,
                ong : this.selectedItem.ong ,
                numero_adc : this.selectedItem.numero_adc ,
                nom_adc : this.selectedItem.nom_adc ,
                enquete_va_etre_realise : this.selectedItem.enquete_va_etre_realise ,
                cause_non_realisation_enquete : this.selectedItem.cause_non_realisation_enquete ,
                preciser_non_realisation_enquete : this.selectedItem.preciser_non_realisation_enquete ,
                observation : this.selectedItem.observation ,
                qui_va_repondre_enquete : this.selectedItem.qui_va_repondre_enquete ,
                autre_qui_va_repondre_enquete : this.selectedItem.autre_qui_va_repondre_enquete ,
                nom_repondant : this.selectedItem.nom_repondant ,
                membre_vivant_etranger_qui_aide_financierement : this.selectedItem.membre_vivant_etranger_qui_aide_financierement ,
                personne_qui_envoi_argent_regulier : this.selectedItem.personne_qui_envoi_argent_regulier,
                type_de_logement : this.selectedItem.type_de_logement ,
                logement_vous_appartient : this.selectedItem.logement_vous_appartient ,
                mode_eclairage : this.selectedItem.mode_eclairage ,
                mode_eclairage_autre_a_preciser : this.selectedItem.mode_eclairage_autre_a_preciser ,
                source_eau : this.selectedItem.source_eau ,
                autre_source_eau_a_preciser : this.selectedItem.autre_source_eau_a_preciser ,
                abonnement_canal_fonctionnel : this.selectedItem.abonnement_canal_fonctionnel ,
                possede_frigo_fonctionnel : this.selectedItem.possede_frigo_fonctionnel ,
                beneficiaire_autre_programme : this.selectedItem.beneficiaire_autre_programme ,
                membre_menage_salarie : this.selectedItem.membre_menage_salarie ,
                combien_gagne_t_il : this.selectedItem.combien_gagne_t_il ,
                possede_voiture_fonctionnelle : this.selectedItem.possede_voiture_fonctionnelle ,
                pense_vivre_pendant_plus_6mois : this.selectedItem.pense_vivre_pendant_plus_6mois ,
                calcul_eligibilite : this.selectedItem.calcul_eligibilite ,
                taille_menage : this.selectedItem.taille_menage ,
                nombre_personne_plus_70ans : this.selectedItem.nombre_personne_plus_70ans ,
                nombre_jeune_18_35ans : this.selectedItem.nombre_jeune_18_35ans ,
                nombre_enfant_moins_15ans : this.selectedItem.nombre_enfant_moins_15ans ,
                nombre_enfant_6_14ans_non_scolarises : this.selectedItem.nombre_enfant_6_14ans_non_scolarises ,
                nombre_adulte_travaille_secteur_formel : this.selectedItem.nombre_adulte_travaille_secteur_formel ,
                nombre_handicap : this.selectedItem.nombre_handicap ,
                chef_menage_femme : this.selectedItem.chef_menage_femme ,
                chef_menage_au_plus_primaire : this.selectedItem.chef_menage_au_plus_primaire ,
                maison_non_dure : this.selectedItem.maison_non_dure ,
                non_acces_electricite : this.selectedItem.non_acces_electricite ,
                non_acces_robinet : this.selectedItem.non_acces_robinet ,
                membre_salarie : this.selectedItem.membre_salarie ,
                antenne_parabolique : this.selectedItem.antenne_parabolique ,
                frigo_fonctionnel : this.selectedItem.frigo_fonctionnel ,
                beneficiaire_aide : this.selectedItem.beneficiaire_aide ,
                membre_etranger_recoit : this.selectedItem.membre_etranger_recoit ,
                membre_etranger_envoie : this.selectedItem.membre_etranger_envoie ,
                nombre_enfant_moins_5ans : this.selectedItem.nombre_enfant_moins_5ans,
                proprietaire_logement : this.selectedItem.proprietaire_logement ,
                inclusion_exclusion : this.selectedItem.inclusion_exclusion ,
                cause_inclusion_exclusion : this.selectedItem.cause_inclusion_exclusion ,
                scores : this.selectedItem.scores ,
                scores_apres_plainte : this.selectedItem.scores_apres_plainte ,
                gps : this.selectedItem.gps ,
                erreur : this.selectedItem.erreur ,						
                statut : this.selectedItem.statut ,
                id_sous_projet : this.selectedItem.id_sous_projet ,
                village_id :  this.selectedItem.village_id ,
                inscrit :  this.selectedItem.inscrit ,
                preselectionne :  this.selectedItem.preselectionne ,
                beneficiaire :  this.selectedItem.beneficiaire ,
                photo :  this.selectedItem.photo ,
                phototravailleur :  this.selectedItem.phototravailleur ,
                phototravailleursuppliant :  this.selectedItem.phototravailleursuppliant ,
                datenaissancetravailleur  :  this.selectedItem.datenaissancetravailleur ,
                datenaissancesuppliant  :  this.selectedItem.datenaissancesuppliant ,
                id_serveur_centrale :  this.selectedItem.id_serveur_centrale , 
                
                autres_lien_de_parente : this.selectedItem.autres_lien_de_parente ,
                autre_lien_travailleur : this.selectedItem.autre_lien_travailleur ,
                nin_travailleur : this.selectedItem.nin_travailleur ,
                confirmer_nin_travailleur : this.selectedItem.confirmer_nin_travailleur ,
                travailleur_possede_telephone : this.selectedItem.travailleur_possede_telephone ,
                confirmer_telephone_travailleur : this.selectedItem.confirmer_telephone_travailleur ,
                            
                autres_lien_de_parente_suppleant : this.selectedItem.autres_lien_de_parente_suppleant ,
                autre_lien_suppleant : this.selectedItem.autre_lien_suppleant ,
                nin_suppleant : this.selectedItem.nin_suppleant ,
                confirmer_nin_suppleant : this.selectedItem.confirmer_nin_suppleant ,
                suppleant_possede_telephone : this.selectedItem.suppleant_possede_telephone ,
                confirmer_telephone_suppleant : this.selectedItem.confirmer_telephone_suppleant ,	
                lien_de_parente_travailleur : this.selectedItem.lien_de_parente_travailleur,		
                lien_de_parente_suppleant : this.selectedItem.lien_de_parente_suppleant,
            }
        }
        // console.log("menage preselectionner a enregistrer", datas);
        this.save_in_base(datas);
    }
    save_information_menage(information_menage, suppression) {
        const datas = {
            supprimer: suppression,
            id: this.selectedItem.id,

            taille_menage: information_menage.taille_menage,
            nombre_personne_plus_70ans: information_menage.nombre_personne_plus_70ans,
            nombre_jeune_18_35ans: information_menage.nombre_jeune_18_35ans,
            nombre_enfant_moins_15ans: information_menage.nombre_enfant_moins_15ans,
            nombre_enfant_6_14ans_non_scolarises: information_menage.nombre_enfant_6_14ans_non_scolarises,
            nombre_enfant_moins_5ans: information_menage.nombre_enfant_moins_5ans,
            nombre_adulte_travaille_secteur_formel: information_menage.nombre_adulte_travaille_secteur_formel,
            nombre_handicap: information_menage.nombre_handicap,
            membre_vivant_etranger_qui_aide_financierement: information_menage.membre_vivant_etranger_qui_aide_financierement,
            personne_qui_envoi_argent_regulier: information_menage.personne_qui_envoi_argent_regulier,
            chef_menage_femme: information_menage.chef_menage_femme,
            chef_menage_au_plus_primaire: information_menage.chef_menage_au_plus_primaire,
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

            point_d_inscription : this.selectedItem.point_d_inscription ,
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
            niveau_instruction_conjoint: this.selectedItem.niveau_instruction_conjoint,
            conjoint_travail: this.selectedItem.conjoint_travail,
            activite_conjoint: this.selectedItem.activite_conjoint,
            telephone_conjoint: this.selectedItem.telephone_conjoint,
            datedenaissancetravailleur: this.selectedItem.datedenaissancetravailleur,
            agetravailleur: this.selectedItem.agetravailleur,
            SexeTravailleur: this.selectedItem.SexeTravailleur,
            lien_travailleur: this.selectedItem.lien_travailleur,
            numerocintravailleur: this.selectedItem.numerocintravailleur,
            numerocarteelectoraletravailleur: this.selectedItem.numerocarteelectoraletravailleur,
            telephone_travailleur: this.selectedItem.telephone_travailleur,
            NomTravailleurSuppliant: this.selectedItem.NomTravailleurSuppliant,
            datedenaissancesuppliant: this.selectedItem.datedenaissancesuppliant,
            agesuppliant: this.selectedItem.agesuppliant,
            SexeTravailleurSuppliant: this.selectedItem.SexeTravailleurSuppliant,
            lien_suppleant: this.selectedItem.lien_suppleant,
            numerocinsuppliant: this.selectedItem.numerocinsuppliant,
            numerocarteelectoralesuppliant: this.selectedItem.numerocarteelectoralesuppliant,
            telephone2: this.selectedItem.telephone2,

            nom_et_prenom_de_l_agent : this.selectedItem.nom_et_prenom_de_l_agent ,
            prenom1 : this.selectedItem.prenom1 ,
            prenom2 : this.selectedItem.prenom2 ,
            zone : this.selectedItem.zone ,
            // nin : menage.nin ,
            // telephone1 : menage.telephone1 ,
            // telephone2 : menage.telephone2 ,

            NomTravailleur: this.selectedItem.NomTravailleur,
            membre_venu_inscrire : this.selectedItem.membre_venu_inscrire ,
            numero_d_ordre : this.selectedItem.numero_d_ordre ,
            numero_recepisse : this.selectedItem.numero_recepisse ,
            date_naissance : this.selectedItem.date_naissance,
            serveur_central: this.constant_service.serveur_central,
            activite_ciblage : this.selectedItem.activite_ciblage ,
            type_de_plainte : this.selectedItem.type_de_plainte ,
            code_acces_aux_plaintes : this.selectedItem.code_acces_aux_plaintes ,
            ong : this.selectedItem.ong ,
            numero_adc : this.selectedItem.numero_adc ,
            nom_adc : this.selectedItem.nom_adc ,
            enquete_va_etre_realise : this.selectedItem.enquete_va_etre_realise ,
            cause_non_realisation_enquete : this.selectedItem.cause_non_realisation_enquete ,
            preciser_non_realisation_enquete : this.selectedItem.preciser_non_realisation_enquete ,
            observation : this.selectedItem.observation ,
            qui_va_repondre_enquete : this.selectedItem.qui_va_repondre_enquete ,
            autre_qui_va_repondre_enquete : this.selectedItem.autre_qui_va_repondre_enquete ,
            nom_repondant : this.selectedItem.nom_repondant ,
            type_de_logement : this.selectedItem.type_de_logement ,
            logement_vous_appartient : this.selectedItem.logement_vous_appartient ,
            mode_eclairage : this.selectedItem.mode_eclairage ,
            mode_eclairage_autre_a_preciser : this.selectedItem.mode_eclairage_autre_a_preciser ,
            source_eau : this.selectedItem.source_eau ,
            autre_source_eau_a_preciser : this.selectedItem.autre_source_eau_a_preciser ,
            abonnement_canal_fonctionnel : this.selectedItem.abonnement_canal_fonctionnel ,
            possede_frigo_fonctionnel : this.selectedItem.possede_frigo_fonctionnel ,
            beneficiaire_autre_programme : this.selectedItem.beneficiaire_autre_programme ,
            membre_menage_salarie : this.selectedItem.membre_menage_salarie ,
            combien_gagne_t_il : this.selectedItem.combien_gagne_t_il ,
            possede_voiture_fonctionnelle : this.selectedItem.possede_voiture_fonctionnelle ,
            pense_vivre_pendant_plus_6mois : this.selectedItem.pense_vivre_pendant_plus_6mois ,
            calcul_eligibilite : this.selectedItem.calcul_eligibilite ,
            erreur : this.selectedItem.erreur ,						
            statut : this.selectedItem.statut ,
            id_sous_projet : this.selectedItem.id_sous_projet ,
            village_id :  this.selectedItem.village_id ,
            inscrit :  this.selectedItem.inscrit ,
            preselectionne :  this.selectedItem.preselectionne ,
            beneficiaire :  this.selectedItem.beneficiaire ,
            photo :  this.selectedItem.photo ,
            phototravailleur :  this.selectedItem.phototravailleur ,
            phototravailleursuppliant :  this.selectedItem.phototravailleursuppliant ,
            datenaissancetravailleur  :  this.selectedItem.datenaissancetravailleur ,
            datenaissancesuppliant  :  this.selectedItem.datenaissancesuppliant ,
            id_serveur_centrale :  this.selectedItem.id_serveur_centrale , 
            
            autres_lien_de_parente : this.selectedItem.autres_lien_de_parente ,
            autre_lien_travailleur : this.selectedItem.autre_lien_travailleur ,
            nin_travailleur : this.selectedItem.nin_travailleur ,
            confirmer_nin_travailleur : this.selectedItem.confirmer_nin_travailleur ,
            travailleur_possede_telephone : this.selectedItem.travailleur_possede_telephone ,
            confirmer_telephone_travailleur : this.selectedItem.confirmer_telephone_travailleur ,
                        
            autres_lien_de_parente_suppleant : this.selectedItem.autres_lien_de_parente_suppleant ,
            autre_lien_suppleant : this.selectedItem.autre_lien_suppleant ,
            nin_suppleant : this.selectedItem.nin_suppleant ,
            confirmer_nin_suppleant : this.selectedItem.confirmer_nin_suppleant ,
            suppleant_possede_telephone : this.selectedItem.suppleant_possede_telephone ,
            confirmer_telephone_suppleant : this.selectedItem.confirmer_telephone_suppleant ,	
            lien_de_parente_travailleur : this.selectedItem.lien_de_parente_travailleur,		
            lien_de_parente_suppleant : this.selectedItem.lien_de_parente_suppleant,
        }
        this.save_in_base(datas);
    }
    modifier_statut(etat_statut) {
        // console.log("etat statut a modifier", etat_statut);
        // console.log("id sous projet", this.selectedItem.id_sous_projet);

        if (this.selectedItem.id_sous_projet>0) {
            if (etat_statut=='INSCRIT') {
                this.dialog.open(
                    this.retour_inscrit,
                    { disableClose: true }
                );                
            } else {
                this.dialog.open(
                    this.faire_beneficier,
                    { disableClose: true }
                );
            }
        } else {
            this.dialog.open(
                this.choisir_sous_projet,
                { disableClose: true }
            );
        }
    }
    faire_menage_retour_inscrit() {
        this.selectedItem.inscrit = 1
        const datas = {
            supprimer: 0,
            ...this.selectedItem
        }
        // console.log("data modifier", datas);
        this.save_in_base(datas);
        this.dialog.closeAll();
    }
    faire_menage_beneficier() {
        this.selectedItem.beneficiaire = 1
        const datas = {
            supprimer: 0,
            ...this.selectedItem
        }
        // console.log("data modifier", datas);
        this.save_in_base(datas);
        this.dialog.closeAll();
    }
    supprimer() {
        this.dialog.open(this.suppression_menage_preselectionne, {
            disableClose: true,
        });
    }
    confirm_supprimer_menage_preselectionne() {
        const datas = {
            supprimer: 1,
            ...this.selectedItem
        }
        this.save_in_base(datas);
        this.dialog.closeAll();
    }
    export_excel() {
        var repertoire = "tableau_de_bord/" ;
        this.index_api.getAPIgeneraliserREST("reporting","etat",this.config.etat,"etat_export_excel",1,"titre_etat",this.config.titre_etat,
           "village_id",this.menage_preselectionne.village_id,"commune_id",this.menage_preselectionne.id_commune,"region_id",this.menage_preselectionne.id_region,
           "ile_id",this.menage_preselectionne.id_ile,"id_sous_projet",this.config.id_sous_projet
        ).subscribe((res) => {
            console.log("export excel res", res);
            
        })
        
    }
    hideAffichageMasque() {
        this.affichage_masque = false;
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
                    encodeURIComponent(value == null ? "" : value)
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
    
}
