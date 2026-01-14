// toolbar.component.ts
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthenticationService } from '../../../_services/authentification.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
    // Configuration Fuse
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    
    // Navigation et langues
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    
    // Utilisateur
    currentUser = { nom: '', prenom: '' };
    
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private authenticationservice: AuthenticationService,
        private router: Router
    ) {
        // Récupérer l'utilisateur connecté
        if (this.authenticationservice.currentUserValue) {
            this.currentUser = this.authenticationservice.currentUserValue;
        }

        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'fr',
                title: 'Français',
                flag: 'fr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Toggle sidebar folded
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }

    /**
     * Toggle sidebar opened (mobile)
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Set the language
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    /**
     * Logout
     */
    logout(): void {
        this.authenticationservice.logout();
    }

    /**
     * Get user display name
     */
    getUserDisplayName(): string {
        if (this.currentUser.prenom && this.currentUser.nom) {
            return `${this.currentUser.prenom} ${this.currentUser.nom}`;
        }
        if (this.currentUser.prenom) {
            return this.currentUser.prenom;
        }
        if (this.currentUser.nom) {
            return this.currentUser.nom;
        }
        return 'Utilisateur';
    }

    /**
     * Get user role (vous pouvez adapter selon votre modèle utilisateur)
     */
    getUserRole(): string {
        // Si vous avez un champ 'role' dans votre currentUser, utilisez-le
        // return this.currentUser.role || 'Utilisateur';
        
        // Pour l'instant, retourne une valeur par défaut
        return 'Administrateur';
    }

    /**
     * Open profile
     */
    openProfile(): void {
        console.log('Ouvrir le profil');
        // TODO: Implémenter la navigation vers le profil
        // this.router.navigate(['/profile']);
    }

    /**
     * Open settings
     */
    openSettings(): void {
        console.log('Ouvrir les paramètres');
        // TODO: Implémenter la navigation vers les paramètres
        // this.router.navigate(['/settings']);
    }

    /**
     * Open activity
     */
    openActivity(): void {
        console.log('Ouvrir l\'activité récente');
        // TODO: Implémenter la navigation vers l'historique
        // this.router.navigate(['/activity']);
    }

    /**
     * Open help center
     */
    openHelp(): void {
        console.log('Ouvrir le centre d\'aide');
        // TODO: Ouvrir la documentation ou centre d'aide
        // window.open('https://votre-site.com/help', '_blank');
    }

    /**
     * Send feedback
     */
    sendFeedback(): void {
        console.log('Envoyer un feedback');
        // TODO: Ouvrir un dialog de feedback
        // Vous pouvez utiliser MatDialog pour afficher un formulaire
    }
}