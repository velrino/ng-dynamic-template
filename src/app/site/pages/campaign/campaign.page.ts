import { Component, OnInit } from '@angular/core';
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
    page: 'home',
    layout: {
      template: '',
      pledge: '',
    }
  }

  constructor(private route: ActivatedRoute, private _requestService: RequestService) {
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
      this.component.template = this.prepareTemplate();
    }
  }

  replaceCumulative(str, find, replace): string {
    for (var i = 0; i < find.length; i++)
      str = str.replace(new RegExp(find[i], "g"), replace[i]);
    return str;
  }

  prepareTemplate(): string {
    const pledge = this.prepareTemplatePledge();
    return this.replaceCumulative(
      this.component.data.template.html,
      ["PLEDGE"],
      [pledge]
    );
  }

  prepareTemplatePledge(): string {
    let template = '';
    const { pledge } = this.component.data;
    for (let index = 0; index < pledge.length; index++) {
      const item = pledge[index];
      template += this.replaceCumulative(
        item.template.html,
        ["NAME", "BODY"],
        [item.name, item.body]
      );
    }
    console.log(template);
    return template;
  }
}
