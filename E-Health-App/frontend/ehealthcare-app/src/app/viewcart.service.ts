import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './viewmedicine/cartitem';
import { Viewcart } from './viewcart';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ViewcartService {
  baseUrl:string="http://localhost:9090/cart";

  constructor(private http: HttpClient) { }
 
  
  
  getCartItems(emailid: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/${emailid}`).pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          return data;
        } else {
         
          return [data];
        }
      })
    );
  }
   updateCartItemQuantity(cartItemId: number, newQuantity: number): Observable<CartItem> {
     return this.http.put<CartItem>(`${this.baseUrl}/${cartItemId}`, { quantity: newQuantity });
   }
   deleteCartItem(cartItemId: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${cartItemId}`);
   }
}


