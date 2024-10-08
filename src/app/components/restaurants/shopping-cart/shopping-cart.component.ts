import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { UserContextService } from '../../../services/user-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @Input() deliveryFee: number = 3.26;
  items: any[] = [];
  cartSubscription: Subscription | null = null; // Subscription to cart items
  isCartVisible: boolean = false; // Whether the cart is visible or not
  isOverflowing: boolean | null = false;  // Flag to track overflow
  scrollTEnd: boolean = true;
  subtotalValue: number = 0;  // Mutable subtotal

  constructor(private usercontext: UserContextService) {}

  ngOnInit() {
    // Subscribe to cartItems$ and update items when the data changes
    this.cartSubscription = this.usercontext.cartItems$.subscribe(
      (cartItems) => {
        // Ensure each item has a quantity property
        this.items = cartItems.map((item: any) => ({
          ...item,
          price: Number(item.price), // Convert price to number
          quantity: item.quantity || 1, // Default quantity to 1 if not set
        }));
        this.updateSubtotal(); // Recalculate subtotal when cart items change
        console.log('Cart items have changed:', cartItems);
        this.checkOverflow();
      }
    );

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

  // Recalculate subtotal by summing up the price * quantity for each item
  private updateSubtotal(): void {
    this.subtotalValue = this.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  }

  // Calculate total by adding delivery fee to subtotal
  get total(): number {
    console.log('subtotal', this.subtotalValue, 'deliveryFee', this.deliveryFee);
    return (Number)(this.subtotalValue) + (Number)(this.deliveryFee);
  }

  // Increment quantity for a specific item
  incrementQuantity(index: number): void {
    this.items[index].quantity++;
    this.updateSubtotal();  // Update subtotal when quantity changes
    this.updateCart();
  }

  // Decrement quantity for a specific item
  decrementQuantity(index: number): void {
    this.usercontext.removeItemFromCart(this.items[index]);
    this.updateSubtotal();  // Update subtotal after removing an item
  }

  showcheck: boolean = false;

  // Handle topping check and adjust subtotal accordingly
  public changeshowcheck(itemName: any, topping: any) {
    console.log('this.items:', this.items);

    this.items?.forEach((item) => {
      if (item.name === itemName) {
        item.toppings?.forEach((t: any) => {
          if (t.name === topping.name) {
            t.checked = !t.checked;
            console.log(t, t.checked);

            // Adjust the item's price and the subtotal based on topping state
            if (t.checked) {
              item.price += t.price;  // Add topping price to the item's price
              this.subtotalValue += t.price;  // Add topping price to the subtotal
            } else {
              item.price -= t.price;  // Subtract topping price from the item's price
              this.subtotalValue -= t.price;  // Subtract topping price from the subtotal
            }
            console.log('Updated item price:', item.price);
            console.log('Updated subtotal:', this.subtotalValue);
          }
        });
      }
    });

    this.showcheck = !this.showcheck;  // Toggle showcheck status
    this.updateCart();  // Update the cart to persist changes
  }


  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.updateSubtotal();  // Update subtotal after removing an item
    this.updateCart();
  }

  // Update the cart with the new items list
  private updateCart(): void {
    this.usercontext.setCartItems(this.items);
  }

  toggleCart(status: any) {
    this.isCartVisible = !this.isCartVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isCartVisible = screenWidth > 768; // Minimize cart on mobile
  }

  private checkOverflow(): void {
    const element: HTMLElement | null = document.querySelector(".cart-items");
    this.isOverflowing = element && element.offsetHeight >= 284;
    console.log('isOverflowing:', this.isOverflowing);
  }

  scrollToEnd(pos: any) {
    const element: HTMLElement | null = document.querySelector(".cart-items");
    if (element) {
      element.scrollTo(0, pos === "end" ? element.scrollHeight : 0);
      this.scrollTEnd = pos !== "end";
    }
  }
}
