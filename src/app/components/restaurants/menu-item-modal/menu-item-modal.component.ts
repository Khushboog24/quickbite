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
  subtotal: number = 0;
  quantity: number = 1;
  @Input() toppings: {
    name: string;
    price: number;
    checked: boolean;
    isPopular: boolean;
  }[] = [];
  maxToppings: number = 4;
  addedToppings: { name: string; price: number, checked: boolean }[] = [];

  constructor(private usercontext: UserContextService) {}
  ngOnInit() {
    console.log('Item:', this.item);
    this.subtotal = (Number)(this.item.price);
    const data = this.usercontext.getMenuItemsOfRests();
    console.log('data:', data);
  }
  changeshowcheck(topping: any) {
    this.toppings.forEach((t) => {
      if (t.name === topping.name) t.checked = !t.checked;
    });
    this.showcheck = !this.showcheck;
    this.onToppingChange(topping.name, (Number)(topping.price));
    console.log('showcheck:', this.showcheck);
  }
  onToppingChange(topping: string, price: any) {
    const index = this.addedToppings.findIndex((t) => t.name === topping);
    console.log(price);
    if (index === -1 && this.addedToppings.length < this.maxToppings) {
      this.addedToppings.push({ name: topping, price, checked: true });
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
    let obj = {
      ...this.item,
      quantity: this.quantity,
      toppings: this.addedToppings,
      price: this.subtotal
    };
    this.usercontext.addItemToCart(obj);
    console.log('Subtotal:', this.usercontext.getCartItems());
    this.closeModal();
  }

  closeModal(event?:any) {
    console.log('close');
    this.close.emit(this.item); // Emit close event to the parent component
  }
  ngOnDestroy() {
    console.log('destroy');
    this.showcheck = false;
    this.subtotal = 0;
    this.addedToppings = [];
    this.toppings.forEach((t) => {
      t.checked = false;
    });
  }
}
