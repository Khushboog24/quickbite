import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rest-item',
  templateUrl: './rest-item.component.html',
  styleUrl: './rest-item.component.css',
})
export class RestItemComponent {
  @Input() item: any = [];
  isModalOpen = false; // This will control whether the modal is visible or not

  openFoodModal() {
    this.isModalOpen = true; // Set this to true when the "+" button is clicked
  }

  closeModal() {
    this.isModalOpen = false; // Set this to false when the modal should close
  }
}
