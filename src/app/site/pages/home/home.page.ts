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
    page: 'home',
  }

  constructor(private _requestService: RequestService) {
    EventEmitterService.get(EventEmitterServiceEnum.dynamic)
      .subscribe((data: string) => this.component.client = data);
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const { client, page } = this.component;

    const url = `http://localhost:3000/api/template?filter=type||eq||${page}&filter=company.slug||eq||${client}&limit=1`;

    const { error, result } = await this._requestService.request(url);

    if (!error && result) {
      const { data } = result;
      this.component.data = data[0];
      this.component.template = data[0]['html'];
    }
  }
}
