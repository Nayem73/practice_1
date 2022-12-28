import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RentItem } from '../common/rent-item';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  rentItems: RentItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  totalDays: Subject<number> = new Subject<number>();
  
  constructor() { }

  addToRent(theRentItem: RentItem) {

    // firstly, check if we already have the item in the Rent list
    let alreadyExistsInRent: boolean = false;
    let existingRentItem: RentItem;// = undefined; // = undefined don't work?
    // existingRentItem = current

    if (this.rentItems.length > 0) {
      // find the item in the Rent list based on the item id
      for (let tempRentItem of this.rentItems) {
        if (tempRentItem.id == theRentItem.id) {
          existingRentItem = tempRentItem;
          alreadyExistsInRent = true; // checked if we found it
          break;
        }
      }

      // check if we found it
    }

    if (alreadyExistsInRent) {
      // if alreadyExists then increment quantity
      existingRentItem.quantity++;
    }
    else {
      // if not then add the item to service array rentItems
      this.rentItems.push(theRentItem);
    }

    // now compute the total rent price & quantity
    // we will use a helper method for it
    this.computeRentTotals();

  }
  computeRentTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let totalDaysValue: number = 0;

    for (let currentRentItem of this.rentItems) {
      totalPriceValue += currentRentItem.quantity * currentRentItem.unitPrice * currentRentItem.days;
      totalQuantityValue += currentRentItem.quantity; /// made change: sum with days
      totalDaysValue += currentRentItem.days;
    }

    // now publish the new values for price & quantity .. & all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.totalDays.next(totalDaysValue);
    // this will publish events to all subscribers. subscribers are present in (rent-status.component.ts)
    // one event for totalPrice & one event for totalQuantity
    // .next method will publish/send the event to the subscribers


    // now a little helper method: log the rent list data just for debugging purpose
    this.logRentData(totalPriceValue, totalQuantityValue)
  }
  logRentData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the rent list');
    for (let tempRentItem of this.rentItems) {
      const subTotalPrice = tempRentItem.quantity * tempRentItem.unitPrice;
      console.log(`name: ${tempRentItem.name}, quantity=${tempRentItem.quantity}, unitPrice=${tempRentItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log(`------`);
  }

  decrementQuantity(theRentItem: RentItem) {
    theRentItem.quantity--;
    if (theRentItem.quantity === 0) {
      this.remove(theRentItem);
    }
    else {
      this.computeRentTotals();
    }
  }
  
  decrementDays(theRentItem: RentItem) {
    theRentItem.days--;
    if (theRentItem.days === 0) {
      this.remove(theRentItem);
    }
    else {
      this.computeRentTotals();
    }
  }
  incrementDays(theRentItem: RentItem) {
    theRentItem.days++;
    // if (theRentItem.days === 0) {
    //   this.remove(theRentItem);
    // }
    // else {
      this.computeRentTotals();
    // }
  }
  
  
  remove(theRentItem: RentItem) {
    
    // get the index of item in the array
    const itemIndex = this.rentItems.findIndex( tempRentItem => tempRentItem.id === theRentItem.id );

    //if found, remove the item from the array at the given index
    if (itemIndex > -1) { // if not found then index will be -1
      this.rentItems.splice(itemIndex, 1); // removing 1 element at given index
    
      this.computeRentTotals();
    }
  }

}
