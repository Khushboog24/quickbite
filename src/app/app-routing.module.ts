import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'rest', component: RestaurantPageComponent },
  { path: '', component: HomeComponent }, // Declare the route here
  // other routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
