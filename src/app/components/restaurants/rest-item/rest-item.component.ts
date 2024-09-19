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

  closeModal() {
    this.isModalOpen = false; // Closes the modal
  }

  cartTrue() {
    this.usercontext.addItemToCart(this.item); // Adds the item to the cart
  }
}
