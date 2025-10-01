import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(), // <-- this provides HttpClient for standalone components
//   ],
// }).catch((err) => console.error(err));
