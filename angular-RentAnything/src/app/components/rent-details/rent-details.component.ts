import { Component, OnInit } from '@angular/core';
import { RentItem } from 'src/app/common/rent-item';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {

rentItems: RentItem[] = [];
totalPrice: number = 0;
totalQuantity: number = 0;
totalDays: number = 0;

  constructor(private rentService: RentService) { } // injected RentService

  ngOnInit(): void {
    this.listRentDetails();
  }


  listRentDetails() {
    
    // get a handle to the rent items
    this.rentItems = this.rentService.rentItems;

    // subscribe to the rent totalPrice
    this.rentService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the rent totalQuantity
    this.rentService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.rentService.totalDays.subscribe(
      data => this.totalDays = data
    );

    // compute rent total price and quantity
    this.rentService.computeRentTotals();
  }

  incrementQuantity(theRentItem: RentItem) {
    this.rentService.addToRent(theRentItem);
  }

  decrementQuantity(theRentItem: RentItem) {
    this.rentService.decrementQuantity(theRentItem);
  }

  incrementDays(theRentItem: RentItem) {
    this.rentService.incrementDays(theRentItem);
  }
  decrementDays(theRentItem: RentItem) {
    this.rentService.decrementDays(theRentItem);
  }

  remove(theRentItem: RentItem) {
    this.rentService.remove(theRentItem);
  }

}
