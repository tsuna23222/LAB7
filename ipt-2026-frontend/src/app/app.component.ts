import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { AlertComponent } from '@app/_components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, AlertComponent],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    account: Account | null = null;

    constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit() {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }
}