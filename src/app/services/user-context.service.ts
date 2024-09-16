import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Array of cart items
  cartItems$ = this.cartItemsSubject.asObservable(); // Expose it as an observable

  // Get the current value of cart items
  getCartItems() {
    return this.cartItemsSubject.value;
  }

  // Set the cart items
  setCartItems(items: any[]) {
    this.cartItemsSubject.next(items);
  }

  // Add or update item in the cart
  addItemToCart(item: any) {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(
      (cartItem) => cartItem.title === item.title
    );

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity =
        (updatedItems[existingItemIndex].quantity || 1) + 1;
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Add new item with quantity set to 1
      const newItem = { ...item, quantity: 1 };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }
  }
}
