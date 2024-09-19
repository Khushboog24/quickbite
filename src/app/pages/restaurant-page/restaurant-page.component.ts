// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserContextService } from '../../services/user-context.service';

import { Component, OnDestroy } from '@angular/core';
import { UserContextService } from '../../services/user-context.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
  selectedFilter: string = '';
  title: any;
  description: any;
  isCartTrue: boolean = false;
  cartItems: any = [];
  cartSubscription: Subscription | null = null; // Subscription to cart items
  restaurantData: any = [];
  constructor(
    private usercontext: UserContextService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantData = this.usercontext.getMenuItemsOfRests();
    console.log('restaurantData', this.restaurantData);
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'] || '';
      this.description = params['description']
        ? params['description'].split(',')
        : [];
    });

    console.log('items', this.restaurantData);

    // Subscribe to cart items changes and log them
    this.cartSubscription = this.usercontext.cartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        this.isCartTrue = cartItems.length > 0;
        console.log('Cart items have changed:', cartItems);
      }
    );

    console.log('Initial cart items:', this.usercontext.getCartItems());
  }
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  async openLoginModal() {
    // const modal = await this.modalController.create({
    //   component: SignupComponent,
    // });
    // return await modal.present();
  }
  selectFilter(filter: string) {
    this.selectedFilter = filter;
  }
}
