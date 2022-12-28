import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from './services/vehicle.service';

import { Routes, RouterModule } from '@angular/router';
import { VehicleCategoryMenuComponent } from './components/vehicle-category-menu/vehicle-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RentStatusComponent } from './components/rent-status/rent-status.component';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  // first matching path is executed
  {path: 'checkout', component: CheckoutComponent},
  {path: 'rent-details', component: RentDetailsComponent},
  {path: 'vehicles/:id', component: VehicleDetailsComponent},
  {path: 'search/:keyword', component: VehicleListComponent},
  {path: 'category/:id', component: VehicleListComponent},
  {path: 'category', component: VehicleListComponent},
  {path: 'vehicles', component: VehicleListComponent},
  {path: '', redirectTo: '/vehicles', pathMatch: 'full'},
  {path: '**', redirectTo: '/vehicles', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleCategoryMenuComponent,
    SearchComponent,
    VehicleDetailsComponent,
    RentStatusComponent,
    RentDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
