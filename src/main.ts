import { enableProdMode, HostListener } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import helmetCsp from 'helmet-csp';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  
}

const csp = helmetCsp({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
    imgSrc: ["'self'"],
    fontSrc: ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: []
  }
});


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  
