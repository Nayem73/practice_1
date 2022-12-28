import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-rent-status',
  templateUrl: './rent-status.component.html',
  styleUrls: ['./rent-status.component.css']
})
export class RentStatusComponent implements OnInit {

totalPrice: number = 0.00;
totalQuantity: number = 0;

  constructor(private rentService: RentService) { } //injected RentService

  ngOnInit(): void {
    this.updateRentStatus(); //call a helper method where we will subscribe for the
                                  //events in the RentService
  }

  updateRentStatus() {
    
    // subscribe to the Rent totalPrice
    this.rentService.totalPrice.subscribe(
      data => this.totalPrice = data
      // we will receive an event from the subscription => we will make the assignment
                                      // so the data comes in(this.totalPrice) = data
    );

    // subscribe to the Rent totalQuantity
    this.rentService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }

}
