import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { appInitializer } from '@app/_helpers';
import { jwtInterceptor, errorInterceptor } from '@app/_helpers';
import { AccountService } from '@app/_services';
import { FakeBackendInterceptor } from '@app/_helpers';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([jwtInterceptor, errorInterceptor]),
            withInterceptorsFromDi()
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            deps: [AccountService],
            multi: true
        },
        ...(environment.production ? [] : [{
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        }])
    ]
};