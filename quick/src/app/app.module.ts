import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { WorkWithQbComponent } from './components/work-with-qb/work-with-qb.component';
import { DownloadAppComponent } from './components/download-app/download-app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'; // Import this module

// import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './components/signup/signup.component';
import { RestsStructureComponent } from './components/restaurants/rests-structure/rests-structure.component';
import { RestCardComponent } from './components/restaurants/rest-card/rest-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorksComponent,
    WorkWithQbComponent,
    DownloadAppComponent,
    FooterComponent,
    SignupComponent,
    RestsStructureComponent,
    RestCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], // Add HttpClientModule to the imports array
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
