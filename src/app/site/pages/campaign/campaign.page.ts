import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventEmitterService, EventEmitterServiceEnum } from "src/app/site/shared/services/event-emitter/event-emitter.service";
import { RequestService } from 'src/app/site/shared/services/request/request.service';

@Component({
  selector: 'app-site-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss']
})
export class SiteCampaignPage implements OnInit {
  component = {
    campaign: '',
    data: null,
    template: '',
    style: '',
    script: null,
    page: 'home',
    layout: {
      template: '',
      pledge: '',
    }
  }
  script: any;
  constructor(private route: ActivatedRoute, private _requestService: RequestService, private componentFactoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {
    EventEmitterService.get(EventEmitterServiceEnum.dynamic)
      .subscribe((data: string) => this.component.campaign = data);
  }

  ngOnInit() {
    this.getCampaign();
  }

  getCampaign() {
    this.route.params.subscribe(params => {
      EventEmitterService.get(EventEmitterServiceEnum.dynamic)
        .emit(params['campaign']);
      this.component.campaign = params['campaign'];
      this.getData();
    });
  }

  async getData() {
    const { campaign } = this.component;

    const url = `http://localhost:3000/api/campaign/${campaign}`;

    const { error, result } = await this._requestService.request(url);

    if (!error && result) {
      const { data } = result;
      this.component.data = result;
      this.component.template = this.component.data.template.html;
      this.component.script = {
        name: 'lorem',
        lorem: 'ipsum',
      }
    }
  }
}
