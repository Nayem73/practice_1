import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentItem } from 'src/app/common/rent-item';
import { Vehicle } from 'src/app/common/vehicle';
import { RentService } from 'src/app/services/rent.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  // templateUrl: './vehicle-list.component.html',
  // templateUrl: './vehicle-list-table.component.html',
  templateUrl: './vehicle-list-grid.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string;
  
  constructor(private vehicleService: VehicleService,
              private rentService: RentService,    // injected here in the constructor
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listVehicles();
    });
  }

  listVehicles() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchVehicles();
    }
    else {
      this.handleListVehicles();
    }
  }

  handleSearchVehicles() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    
    // if we have a different keyword than previous then set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    
    // now search for vehicles using that given keyword in searchbox
    this.vehicleService.searchVehicles(theKeyword).subscribe( // here code did not update for search pagination *************
      data => {
        this.vehicles = data;
      }
    )
  }

  handleListVehicles() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string & convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // if category id not available then default it to category id 1
      this.currentCategoryId = 1;
    }

    //
    // check if we have a different category than the previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category than the previous
    // thne set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    
    
    // now get the vehicles for the given category id
    this.vehicleService.getVehicleListPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());                                           
  }

  processResult() {
    return data => {
      this.vehicles = data._embedded.vehicles;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listVehicles();
  }

  addToRent(theVehicle: Vehicle) {
    console.log(`Rent now!: ${theVehicle.name}, ${theVehicle.unitPrice}`);
    //TODO .. do the real work
    const theRentItem = new RentItem(theVehicle); // constructor call
    this.rentService.addToRent(theRentItem); //need to inject rentService in the constructor for
                        // this.rentService to work
  }

}
