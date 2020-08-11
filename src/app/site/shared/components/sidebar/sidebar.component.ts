import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventEmitterService, EventEmitterServiceEnum } from '../../../shared/services/event-emitter/event-emitter.service';
import { FirebaseDatabaseService } from '../../../../shared/services/firebase/firebase.service';

@Component({
    selector: 'app-site-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SiteSidebarComponent implements OnChanges {
    @Input() data: any;
    rows = 15;
    show = false;
    saveAsTheme = false;
    themes = [];
    site: any;
    selectedTheme = null;
    components = null;
    component: any;
    example: any;
    pageTypes = []
    selectedComponent: any;
    page: any;
    htmlEditorOptions = { theme: 'vs-dark', language: 'html' };
    cssEditorOptions = { theme: 'vs-dark', language: 'css' };
    jsonEditorOptions = { theme: 'vs-dark', language: 'json', readOnly: true };
    jsEditorOptions = { theme: 'vs-dark', language: 'json' };
    componentIsPublished: boolean = false;
    versions: any[] = [];

    constructor(private modalService: NgbModal,
        private _firebaseDatabaseService: FirebaseDatabaseService) { }

    ngOnChanges() {
        this.handleData();
        this.data.script = JSON.stringify(this.data.script, null, "\t")
    }

    handleData() {
        this.getPage();
    }

    campaignUpdateTemplate() {
        EventEmitterService.get(EventEmitterServiceEnum.dynamic).emit(this.data);
    }

    async sync(isPublished: boolean = false) {
        this.componentIsPublished = isPublished;
        await this.createComponent();
        await this.updateCampaign();
    }

    defineComponent() {
        this.data = this.selectedComponent;
        this.campaignUpdateTemplate();
    }

    async getComponent(id: string) {

    }

    async updateComponent(component: any) {
        const { id } = component;
        if (id) {
            const { selectedTheme } = this;
            const data = { ...component, theme: (selectedTheme) ? selectedTheme.slug : null };

            // await this._requestService.requestWithToken('POST', `api/component/`, data);
        }
    }

    async updateCampaign() {
        const { slug } = this.data;
        if (slug) {
            const url = `api/campaign/${slug}`;
            const { parameters } = this.data;
            // await this._requestService.requestWithToken('PUT', url, { parameters });
        }
    }

    previewTheme() {
        const { selectedTheme } = this;
        const hasSlug = selectedTheme['id'];
        if (hasSlug) {
            // this.getTheme(selectedTheme.id)
        } else if (!hasSlug) {
            // this.getComponent(this.data.component.id)
        }
    }

    async createComponent() {
        const body = {
            ...this.data,
            isPublished: this.componentIsPublished,
            createdAt: new Date().toISOString()
        };

        // await this._requestService.requestWithToken('POST', `api/page/component/`, post);
        this._firebaseDatabaseService.insert('pages', body);
        this.campaignUpdateTemplate();
    }

    toggleModal(content: any) {
        if (this.show) {
            this.closeModal();
        } else if (!this.show) {
            document.body.classList.add("overflow-auto");
            this.show = true;
            this.modalService.open(content, {
                backdrop: false,
                size: 'xl',
                windowClass: 'editor-modal-class'
            }).result.then((result) => {
                this.closeModal();
            }, (reason) => {
                this.closeModal();
            });
        }
    }

    closeModal() {
        this.show = false;
        document.body.classList.remove("overflow-auto");
        this.modalService.dismissAll();
    }

    formCreatePage = {
        path: null,
    }
    async createPageApi() {
        const { path } = this.formCreatePage;
        if (path !== null) {
            const body = {
                path,
                script: {},
                css: {},
                html: `<h1>Nova Página da URL ${path}</h1>`,
                isPublished: true,
                createdAt: new Date().toISOString(),
            }
            this._firebaseDatabaseService.insert('pages', body);
            window.location.href = `${window.location.origin}/${path}`
        }
    }

    async getPage() {
        if (this.data.path) {
            const result = this._firebaseDatabaseService.where('pages', "path", this.data.path)
            result.once('value', (snap) => {

                if (snap.val() !== null) {
                    this.versions = Object.keys(snap.val()).map(item => snap.val()[item]);
                }
            })
        }
    }
}