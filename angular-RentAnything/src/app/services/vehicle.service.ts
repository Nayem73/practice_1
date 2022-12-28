import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from '../common/vehicle';
import { VehicleCategory } from '../common/vehicle-category';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = 'http://localhost:8080/api/vehicles'
  
  private categoryUrl = 'http://localhost:8080/api/vehicle-category'

  constructor(private httpClient: HttpClient) { }

  getVehicle(theVehicleId: number): Observable<Vehicle> {
    
    // need to build the url based on the vehicle id
    const vehicleUrl = `${this.baseUrl}/${theVehicleId}`;
    return this.httpClient.get<Vehicle>(vehicleUrl);
  }

  getVehicleListPaginate(thePage: number, 
                        thePageSize: number, 
                        theCategoryId: number): Observable<GetResponseVehicles> {

    // need to build the URL based on category id, page & page size (like in the json url)
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseVehicles>(searchUrl);
  }
  
  getVehicleList(theCategoryId: number): Observable<Vehicle[]> {
    
    // ToDo: need to build URL based on category id ... have to come back to this!
    // Doing it now!

    // need to build the URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getVehicles(searchUrl);
  }

  searchVehicles(theKeyword: string): Observable<Vehicle[]> {
    
    // need to build the URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getVehicles(searchUrl);
  }

  searchVehiclesPaginate(thePage: number, 
                        thePageSize: number, 
                        theKeyword: number): Observable<GetResponseVehicles> {

    // need to build the URL based on category id, page & page size (like in the json url)
    // update: now build the URL based on keyword instead of category id
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseVehicles>(searchUrl);
  }

  private getVehicles(searchUrl: string): Observable<Vehicle[]> {
    return this.httpClient.get<GetResponseVehicles>(searchUrl).pipe(
      map(response => response._embedded.vehicles)
    );
  }

  getVehicleCategories(): Observable<VehicleCategory[]> {
    return this.httpClient.get<GetResponseVehicleCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.vehicleCategory)
    );
  }
}

interface GetResponseVehicles {
  _embedded: {
    vehicles: Vehicle[];
  },
  page: {
    size: number, // size of the page
    totalElements: number, // all the elements in the database
    totalPages: number, // total pages needed to show all of them
    number: number // no. of elements to show in a page
  }
}

interface GetResponseVehicleCategory {
  _embedded: {
    vehicleCategory: VehicleCategory[];
  }
}