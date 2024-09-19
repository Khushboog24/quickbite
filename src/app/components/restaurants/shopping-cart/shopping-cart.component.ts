import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UserContextService } from '../../../services/user-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: any[] = [];
  deliveryFee: number = 3.26;
  cartSubscription: Subscription | null = null; // Subscription to cart items
  isCartVisible: boolean = false; // Whether the cart is visible or not

  constructor(private usercontext: UserContextService) {}

  ngOnInit() {
    // Subscribe to cartItems$ and update items when the data changes
    this.cartSubscription = this.usercontext.cartItems$.subscribe(
      (cartItems) => {
        // Ensure each item has a quantity property
        this.items = cartItems.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1, // Default quantity to 1 if not set
        }));
        console.log('Cart items have changed:', cartItems);
      }
    );

    // Initial load of cart items
    this.items = this.usercontext.getCartItems().map((item: any) => ({
      ...item,
      quantity: item.quantity || 1, // Ensure default quantity
    }));

    console.log('Initial cart items:', this.items);

    // Set cart visibility based on screen size
    this.checkScreenSize();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Calculate subtotal by summing up the price * quantity for each item
  get subtotal(): number {
    return this.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  // Calculate total by adding delivery fee to subtotal
  get total(): number {
    return this.subtotal + this.deliveryFee;
  }

  // Increment quantity for a specific item
  incrementQuantity(index: number): void {
    this.items[index].quantity++;
    this.updateCart();
  }

  // Decrement quantity for a specific item (ensure it doesn't go below 1)
  decrementQuantity(index: number): void {
    if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
      this.updateCart();
    } else {
      // Remove item if quantity is

      this.removeItem(index);
    }
  }
  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.updateCart();
  }
  // Update the cart with the new items list
  private updateCart(): void {
    this.usercontext.setCartItems(this.items);
  }

  toggleCart(status: any) {
    console.log('toggleCart', status); // Check what status is received
    this.isCartVisible = !this.isCartVisible; // Toggles visibility state
  }

  // Listen for window resize events to adjust cart visibility dynamically
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Check screen size and adjust cart visibility
  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      this.isCartVisible = false; // Minimize cart by default on mobile
    } else {
      this.isCartVisible = true; // Maximize cart on larger screens
    }
  }
}
