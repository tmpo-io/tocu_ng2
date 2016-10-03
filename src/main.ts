import './polyfills.ts';

// rxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
