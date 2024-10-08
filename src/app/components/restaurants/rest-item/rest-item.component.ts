import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserContextService } from '../../../services/user-context.service';

@Component({
  selector: 'app-rest-item',
  templateUrl: './rest-item.component.html',
  styleUrls: ['./rest-item.component.css'],
})
export class RestItemComponent implements OnInit {
  @Input() item: any = [];
  @Input() menuItems: any = [];
  @Output() close = new EventEmitter<void>();
  isModalOpen = false;

  constructor(private usercontext: UserContextService) {}

  ngOnInit() {
    console.log('Item:', this.item);
    console.log('Menu Items:', this.menuItems);
  }
  openFoodModal() {
    this.isModalOpen = true; // Opens the modal
    console.log('Modal Open State:', this.isModalOpen);
  }

  closeModal(close: any) {
    this.item = close; // Receives the item from the parent component
    this.isModalOpen = false; // Closes the modal
  }

  // Increment quantity for a specific item
 // Increment quantity for a specific item
 incrementQuantity(): void {
  if (!this.item.quantity) {
    this.item.quantity = 1; // Initialize quantity to 1 if it doesn't exist
  } else {
    this.item.quantity++;
  }
  console.log('Increment Quantity before:', this.item.quantity);
  console.log('Increment Quantity:', this.item.quantity);
  this.updateCart(); // Update the cart immediately after incrementing
}
// Decrement quantity for a specific item (ensure it doesn't go below 1)
decrementQuantity(): void {

  this.usercontext.removeItemFromCart(this.item);
}
// Update the cart with the new item quantity
updateCart(): void {
  console.log('Updating cart with new quantity:', this.item);
  // Remove the property 'quantity' from this.item before adding/updating in the cart
  this.usercontext.addItemToCart( this.item ); // Add item with updated quantity to cart

  this.item = this.usercontext.getCartItems().filter((i) => {
    if (i.name === this.item.name && i.price === this.item.price) {
      return i;
    }
    // return i;
  })[0]; // Update the item with the new quantity
  console.log('Cart Items:', this.usercontext.getCartItems(), this.item);
  }
}
