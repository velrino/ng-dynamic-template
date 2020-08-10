import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventEmitterService, EventEmitterServiceEnum } from "../../shared/services/event-emitter/event-emitter.service";
import { RequestService } from '../../shared/services/request/request.service';
import { FirebaseDatabaseService } from '../../../shared/services/firebase/firebase.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-site-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
  providers: [FirebaseDatabaseService]
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
  hasPage = false;
  script: any;
  constructor(private route: ActivatedRoute, private _firebaseDatabaseService: FirebaseDatabaseService, private componentFactoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {
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
    console.log(campaign)
    const result = this._firebaseDatabaseService.where('pages', "path", campaign)
    result.once('value', (snap) => {
      this.hasPage = (snap.val() !== null)

      if(this.hasPage) {
        const index = Object.keys(snap.val());
        const data = snap.val()[index[0]]
        this.component.template = data.html;
        this.component.data = result;
        this.component.script = data.script
      }
    })
  }
}
