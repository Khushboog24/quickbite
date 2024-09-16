import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserContextService } from '../../../services/user-context.service';

@Component({
  selector: 'app-rest-item',
  templateUrl: './rest-item.component.html',
  styleUrl: './rest-item.component.css',
})
export class RestItemComponent {
  @Input() item: any = [];
  @Output() setCartTrue: EventEmitter<any> = new EventEmitter(); // This will emit the event to the parent component
  isModalOpen = false; // This will control whether the modal is visible or not

  constructor(private usercontext: UserContextService) {}
  openFoodModal() {
    this.isModalOpen = true; // Set this to true when the "+" button is clicked
  }

  closeModal() {
    this.isModalOpen = false; // Set this to false when the modal should close
  }
  cartTrue() {
    console.log('hi');
    this.usercontext.addItemToCart(this.item);
  }
}
