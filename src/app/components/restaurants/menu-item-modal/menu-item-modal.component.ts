import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserContextService } from '../../../services/user-context.service';
import { get } from 'http';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css'],
})
export class MenuItemModalComponent {
  @Input() item: any; // Receives the item from the parent component
  @Output() close = new EventEmitter<void>(); // Event to emit when closing the modal
  showcheck: boolean = false;
  subtotal: number = 0; // Assuming base price of $7.50
  quantity: number = 1;
  @Input() toppings: {
    name: string;
    price: number;
    checked: boolean;
    isPopular: boolean;
  }[] = [];
  maxToppings: number = 4;
  addedToppings: { name: string; price: number }[] = [];

  constructor(private usercontext: UserContextService) {}
  ngOnInit() {
    console.log('Item:', this.item);
    const data = this.usercontext.getMenuItemsOfRests();
    console.log('data:', data);
  }
  changeshowcheck(topping: any) {
    this.toppings.forEach((t) => {
      if (t.name === topping.name) t.checked = !t.checked;
    });
    this.showcheck = !this.showcheck;
    this.onToppingChange(topping.name, topping.price);
    console.log('showcheck:', this.showcheck);
  }
  onToppingChange(topping: string, price: any) {
    const index = this.addedToppings.findIndex((t) => t.name === topping);
    price = price.split('$')[1];
    if (index === -1 && this.addedToppings.length < this.maxToppings) {
      this.addedToppings.push({ name: topping, price });
      console.log('Added Toppings:', this.subtotal, price);
      this.subtotal += Number(price);
    } else if (index > -1) {
      this.subtotal -= Number(this.addedToppings[index].price);
      this.addedToppings.splice(index, 1);
    }
  }

  incrementQuantity() {
    this.quantity++;
    this.subtotal += this.item.price; // Assuming item's price
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.subtotal -= this.item.price; // Assuming item's price
    }
  }

  addToOrder() {
    console.log('Item added to order with quantity:', this.quantity);
    console.log('Toppings:', this.addedToppings);
    this.usercontext.setCartItems(this.addedToppings);
    console.log('Subtotal:', this.usercontext.getCartItems());
  }

  closeModal() {
    this.close.emit(); // Emit close event to the parent component
  }
}
