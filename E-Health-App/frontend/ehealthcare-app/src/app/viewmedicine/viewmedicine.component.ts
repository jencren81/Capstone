import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine';
import { AddtocartService } from '../addtocart.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UserService } from '../viewcart/userService';
import { CartItem } from './cartitem';

@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.css']
})
export class ViewmedicineComponent implements OnInit {
  medicine: Array<Medicine> = [];
  // cart2: CartItem[] = [];
  //cart: Array<Medicine> = [];
  cart: CartItem[] = [];
  msg: string = '';
  selectedQuantities: { [key: number]: number } = {};


  constructor(
    public medicineService: MedicineService,
    private addtocartService: AddtocartService,
    private loginService: LoginService,
    public router: Router,
    private userService: UserService,
  
  ) {}

  ngOnInit(): void {
    this.medicineService.findAll().subscribe({
      next: (data: any) => {
        this.medicine = data;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('done');
      }
    });
  }

  searchByKeyword(searchKeyword: string) {
    if (searchKeyword) {
      this.medicineService.getAllMedicine(searchKeyword).subscribe({
        next: (data: any) => {
          this.medicine = data;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      this.medicineService.findAll().subscribe({
        next: (data: any) => {
          this.medicine = data;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  addToCart(medicine: Medicine) {
    const emailid = sessionStorage.getItem('emailid')
  
    const quantity = this.selectedQuantities[medicine.mid];

    if (emailid && quantity) {
      this.addtocartService.addToCart(emailid, medicine.mid, quantity).subscribe({
        next: (result: string) => {
            console.log("adding to: ", emailid)
            alert('Added to Cart!');
       
        },
        error: (error: any) => {
          console.error('Error adding medicine to cart:', error);
          alert('Failed to Add Item: ' + error.message); 
        }
      });
    }
  }



  viewCart() {
    this.router.navigate(['/viewcart']);
  }
}
