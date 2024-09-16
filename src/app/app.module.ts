import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { WorkWithQbComponent } from './components/work-with-qb/work-with-qb.component';
import { DownloadAppComponent } from './components/download-app/download-app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'; // Import this module

// import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './components/signup/signup.component';
import { RestsStructureComponent } from './components/restaurants/rests-structure/rests-structure.component';
import { RestCardComponent } from './components/restaurants/rest-card/rest-card.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { RestItemComponent } from './components/restaurants/rest-item/rest-item.component';
import { MenuSectionComponent } from './components/restaurants/menu-section/menu-section.component';
import { MenuItemModalComponent } from './components/restaurants/menu-item-modal/menu-item-modal.component';
import { ShoppingCartComponent } from './components/restaurants/shopping-cart/shopping-cart.component';

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
    RestaurantPageComponent,
    HeaderComponent,
    RestItemComponent,
    MenuSectionComponent,
    MenuItemModalComponent,
    ShoppingCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], // Add HttpClientModule to the imports array
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
