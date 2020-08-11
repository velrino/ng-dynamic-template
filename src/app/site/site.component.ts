import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirebaseDatabaseService } from '../shared/services/firebase/firebase.service';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
    pages = [];

    constructor(private route: ActivatedRoute, private _firebaseDatabaseService: FirebaseDatabaseService) { }

    ngOnInit() {
        this._firebaseDatabaseService.db.list('pages').query.once('value', (snap) => {
            const hasPage = (snap.val() !== null)

            if (hasPage) {
                this.pages = [
                    ...new Set(Object.keys(snap.val())
                        .map(item => snap.val()[item].path))
                ]
            }
        })
    }
}
