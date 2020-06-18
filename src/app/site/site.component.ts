import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit {

    component = {
        dynamic: ''
    };

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.getDynamic();
    }

    getDynamic() {
        this.route.params.subscribe(params => {
            this.component.dynamic = params['dynamic'];
            this.getData();
        });
    }

    getData() {

    }
}
