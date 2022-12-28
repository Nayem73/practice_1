import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentItem } from 'src/app/common/rent-item';
import { Vehicle } from 'src/app/common/vehicle';
import { RentService } from 'src/app/services/rent.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

vehicle: Vehicle = new Vehicle();

  constructor(private vehicleService: VehicleService,
              private rentService: RentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleVehicleDetails();
    })
  }
  handleVehicleDetails() {
    // here we will get the "id" param string & convert it to a number
    const theVehicleId: number = +this.route.snapshot.paramMap.get('id');

    this.vehicleService.getVehicle(theVehicleId).subscribe(
      data => {
        this.vehicle = data;
      }
    )
  }

  addToRent() {

    console.log(`Adding to Rent: ${this.vehicle.name}, ${this.vehicle.unitPrice}`);
    const theRentItem = new RentItem(this.vehicle);
    this.rentService.addToRent(theRentItem);
  }
}
