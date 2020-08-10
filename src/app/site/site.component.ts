import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventEmitterService, EventEmitterServiceEnum } from "../site/shared/services/event-emitter/event-emitter.service";
import { RequestService } from './shared/services/request/request.service';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit {
    component = {
        client: '',
        data: null,
        template: '',
    }

    constructor(private route: ActivatedRoute, private _requestService: RequestService) { }

    ngOnInit() {
        this.getDynamic();
    }

    getDynamic() {
        this.route.params.subscribe(params => {
            EventEmitterService.get(EventEmitterServiceEnum.dynamic)
                .emit(params['campaign']);
                console.log(params['campaign'])
            this.component.client = params['campaign'];
            // this.getData();
        });
    }

    // async getData() {
    //     const { error, result } = await this._requestService.request('assets/data/page.json');

    //     if (!error && result[this.component.client]) {
    //         const data = result[this.component.client];
    //         this.component.data = data;
    //         this.component.template = data['template'];
    //     }
    // }
}
