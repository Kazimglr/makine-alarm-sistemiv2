import 'zone.js'; // <-- BU SATIR MUTLAKA EN ÜSTTE OLACAK!

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});
