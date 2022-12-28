import { Component, OnInit } from '@angular/core';
import { VehicleCategory } from 'src/app/common/vehicle-category';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-category-menu',
  templateUrl: './vehicle-category-menu.component.html',
  styleUrls: ['./vehicle-category-menu.component.css']
})
export class VehicleCategoryMenuComponent implements OnInit {

  vehicleCategories: VehicleCategory[];
  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.listVehicleCategories();
  }
  listVehicleCategories() {
    this.vehicleService.getVehicleCategories().subscribe(
      data => {
        console.log('Vehicle Categories=' + JSON.stringify(data));
        this.vehicleCategories = data;
      }
    );
  }

}
