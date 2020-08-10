import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventEmitterService, EventEmitterServiceEnum } from '../../../shared/services/event-emitter/event-emitter.service';

@Component({
    selector: 'app-site-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SiteSidebarComponent implements OnChanges {
    @Input() data: any;
    @Input() type: string = 'campaign';
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

    constructor(private modalService: NgbModal) { }

    ngOnChanges() {
        this.handleData();
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
        // this.campaignUpdateTemplate();
    }

    defineComponent() {
        const component = this.selectedComponent;
        this.data.component.html = component.html
        this.data.component.css = component.css
        this.data.component.script = component.script
        this.data.component.name = ''
        this.campaignUpdateTemplate();
    }

    async getComponent(id: string) {

    }

    async updateComponent(component: any, type: 'campaign' | 'pledge') {
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
        const post = {
            html: this.data.component.html,
            css: this.data.component.css,
            script: this.data.component.script,
            isPublished: this.componentIsPublished,
            isTheme: false,
            name: 'editor',
            // type: ComponentTypeColumnEnum.DEFAULT,
            theme: (this.selectedTheme) ? this.selectedTheme.id : null,
            site: this.data.site.id,
            page: this.data.id
        };

        // await this._requestService.requestWithToken('POST', `api/page/component/`, post);
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
        name: null,
        path: null,
        type: null,
    }
    async createPageApi() {
        const body = {
            ...this.formCreatePage,
            site: this.data.site.id
        }
    }

    async getPage() {
        // const url = `api/page/${this.data.id}`;

    }
}