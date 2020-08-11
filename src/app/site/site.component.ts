import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventEmitterService, EventEmitterServiceEnum } from "../site/shared/services/event-emitter/event-emitter.service";
import { RequestService } from './shared/services/request/request.service';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html'
})
export class SiteComponent {
    constructor(private route: ActivatedRoute, private _requestService: RequestService) { }
}
