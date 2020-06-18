import { Component, OnInit } from '@angular/core';

import { EventEmitterService, EventEmitterServiceEnum } from "src/app/site/shared/services/event-emitter/event-emitter.service";
import { RequestService } from 'src/app/site/shared/services/request/request.service';

@Component({
  selector: 'app-site-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class SiteHomePage implements OnInit {
  component = {
    client: '',
    data: null,
    template: '',
  }

  constructor(private _requestService: RequestService) {
    EventEmitterService.get(EventEmitterServiceEnum.dynamic)
      .subscribe((data: string) => this.component.client = data);
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const { error, result } = await this._requestService.request('/assets/data/page.json');

    if (!error && result[this.component.client]['home']) {
      const data = result[this.component.client]['home'];
      this.component.data = data;
      this.component.template = data['template'];
    }
  }
}
