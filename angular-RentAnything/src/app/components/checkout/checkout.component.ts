import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({ //there will be a collection of group here in customer
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      Address: this.formBuilder.group({
        Division: [''],
        District: [''],
        street: [''],
        zipCode: ['']
      }),

      bKash: this.formBuilder.group({
        bKashNumber: ['']
      })

    });
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

}
