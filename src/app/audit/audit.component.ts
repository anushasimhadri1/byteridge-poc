import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    size = 10;
    current = 0;
    audits = [];
    currentUser = {}
    dateFormat = true;
    data = [];
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllAudits();
    }

    private loadAllAudits() {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => {
                this.audits = audits;
                this.data = this.audits.slice(0, this.size)
                this.current = this.size
            }
            );
    }
    pre() {
        if (this.current > 0) {

            this.data = this.audits.slice(this.current,  this.current-this.size)
            this.current = this.current - this.size;
        }
    }
    next() {
        const cSize = this.current;
        this.current = this.current + this.size;
        if (this.current < this.audits.length) {
            this.data = this.audits.slice(cSize, this.current)
        }
    }

}