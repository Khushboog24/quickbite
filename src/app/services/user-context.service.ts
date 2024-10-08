import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Array of cart items
  cartItems$ = this.cartItemsSubject.asObservable(); // Expose it as an observable
  private restaurantData: any = [];
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
    const itemHasTopping = item.toppings && item.toppings.length > 0;

    const existingItemIndex = currentItems.findIndex(
      (cartItem) => {
        const cartItemHasTopping = cartItem.toppings && cartItem.toppings.length > 0;
        if(itemHasTopping && cartItemHasTopping) {
          return cartItem.name === item.name && cartItem.price === item.price && JSON.stringify(cartItem.toppings) === JSON.stringify(item.toppings);
        }
        return cartItem.name === item.name && cartItem.price === item.price}
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

  removeItemFromCart(item: any) {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(
      (cartItem) => cartItem.name === item.name && cartItem.price === item.price
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity =
        (updatedItems[existingItemIndex].quantity || 1) - 1;
      if (updatedItems[existingItemIndex].quantity === 0) {
        updatedItems.splice(existingItemIndex, 1);
      }
      this.cartItemsSubject.next(updatedItems);
    }
  }
  setRestaurant(restaurant: any) {
    this.restaurantData = restaurant;
  }

  getRestaurant() {
    return this.restaurantData;
  }

  setMenuItemsOfRests(items: any) {
    this.restaurantData.menuItems = items;
    console.log('Menu Items:', this.restaurantData.menuItems, items);
  }

  getMenuItemsOfRests() {
    return this.restaurantData.menuItems;
  }
}
