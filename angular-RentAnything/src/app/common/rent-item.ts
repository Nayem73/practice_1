import { Vehicle } from "./vehicle";

export class RentItem {
    
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;
    days: number;

    constructor(vehicle: Vehicle) {
        this.id = vehicle.id;
        this.name = vehicle.name;
        this.imageUrl = vehicle.imageUrl;
        this.unitPrice = vehicle.unitPrice;

        this.quantity = 1;
        this.days = 1;
    }
}
