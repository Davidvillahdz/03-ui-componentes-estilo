import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';


export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),

  provideFirebaseApp(() =>
    initializeApp({
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      storageBucket: "angular-icc-ppw-2d644.firebasestorage.app",
      messagingSenderId: "...",
      appId: "...",
      measurementId: "..."
    })
  ),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()) // ← ESTE ES EL IMPORTANTE
]
};
