import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrl: './menu-item-modal.component.css',
})
export class MenuItemModalComponent {
  subtotal: number = 7.5;
  quantity: number = 1;
  toppings: { name: string; price: number }[] = [];
  maxToppings: number = 4;

  onToppingChange(topping: string, price: number) {
    const index = this.toppings.findIndex((t) => t.name === topping);

    if (index === -1 && this.toppings.length < this.maxToppings) {
      this.toppings.push({ name: topping, price });
      this.subtotal += price;
    } else if (index > -1) {
      this.subtotal -= this.toppings[index].price;
      this.toppings.splice(index, 1);
    }
  }

  incrementQuantity() {
    this.quantity++;
    this.subtotal += 7.5; // assuming base price of $7.50
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.subtotal -= 7.5;
    }
  }

  addToOrder() {
    console.log('Item added to order with quantity:', this.quantity);
    console.log('Toppings:', this.toppings);
  }

  closeModal() {
    console.log('Modal closed');
  }
}
