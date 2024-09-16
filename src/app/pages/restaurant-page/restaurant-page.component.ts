// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserContextService } from '../../services/user-context.service';

import { Component, OnDestroy } from '@angular/core';
import { UserContextService } from '../../services/user-context.service';
import { Subscription } from 'rxjs';

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
  restaurantData = [
    {
      heading: 'Sandwiches',
      data: [
        {
          title: 'Artichoke Sandwich',
          description: 'Artichoke, spinach, cheddar and mushrooms.',
          price: 7.5,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/2e888537-5147-45b5-b2d4-18b8bbecc269.png',
        },
        {
          title: 'Egg Sandwich',
          description:
            'Tomato, mozzarella topped with fried egg and fresh chives.',
          price: 5.7,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/236c4ae7-2bff-46aa-ae2f-55841db56473.png',
        },
        {
          title: 'Chili Chicken',
          description: 'Chicken, rocket and chili peppers with mayonnaise.',
          price: 7.3,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/1d954525-4aa2-42f9-b0cd-fc01d3d65f0d.png',
        },
        {
          title: 'Turkey Sandwich',
          description: 'Turkey, mozzarella, tomato and pesto.',
          price: 7.9,
          popular: true,
          image:
            'https://images.unsplash.com/photo-1481070414801-51fd732d7184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw0fHx0dXJrZXklMjBzYW5kd2ljaHxlbnwxfHx8fDE2MzkxNTMwMDg&ixlib=rb-1.2.1&q=80&w=1080',
        },
      ],
    },
    {
      heading: 'Desserts',
      data: [
        {
          title: 'Strawberry Cheesecake',
          description: 'Topped with fresh strawberries and mint.',
          price: 4.5,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/57f78a69-f90d-4d78-b04d-629b9bf10973.png',
        },
        {
          title: 'Lemon Mousse',
          description: 'Topped with fresh oranges and berries.',
          price: 4.0,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/c1082a62-f7f7-41e7-99fd-38f6d6643db1.jpg',
        },
        {
          title: 'Homemade Granola',
          description: 'Granola, greek yogurt topped with fresh peaches.',
          price: 4.3,
          popular: true,
          image:
            'https://assets.api.uizard.io/api/cdn/stream/c7986aed-535e-445a-a230-eb5b65870997.png',
        },
      ],
    },
  ];
  constructor(private usercontext: UserContextService) {}

  ngOnInit() {
    const state = history.state as { title?: string; description?: any };
    this.title = state.title;
    this.description = state.description.split(',');
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
  // sandwiches = [
  //   {
  //     title: 'Artichoke Sandwich',
  //     description: 'Artichoke, spinach, cheddar and mushrooms.',
  //     price: 7.5,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/2e888537-5147-45b5-b2d4-18b8bbecc269.png',
  //   },
  //   {
  //     title: 'Egg Sandwich',
  //     description: 'Tomato, mozzarella topped with fried egg and fresh chives.',
  //     price: 5.7,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/236c4ae7-2bff-46aa-ae2f-55841db56473.png',
  //   },
  //   {
  //     title: 'Chili Chicken',
  //     description: 'Chicken, rocket and chili peppers with mayonnaise.',
  //     price: 7.3,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/1d954525-4aa2-42f9-b0cd-fc01d3d65f0d.png',
  //   },
  //   {
  //     title: 'Turkey Sandwich',
  //     description: 'Turkey, mozzarella, tomato and pesto.',
  //     price: 7.9,
  //     popular: true,
  //     image:
  //       'https://images.unsplash.com/photo-1481070414801-51fd732d7184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw0fHx0dXJrZXklMjBzYW5kd2ljaHxlbnwxfHx8fDE2MzkxNTMwMDg&ixlib=rb-1.2.1&q=80&w=1080',
  //   },
  // ];

  // desserts = [
  //   {
  //     title: 'Strawberry Cheesecake',
  //     description: 'Topped with fresh strawberries and mint.',
  //     price: 4.5,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/57f78a69-f90d-4d78-b04d-629b9bf10973.png',
  //   },
  //   {
  //     title: 'Lemon Mousse',
  //     description: 'Topped with fresh oranges and berries.',
  //     price: 4.0,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/c1082a62-f7f7-41e7-99fd-38f6d6643db1.jpg',
  //   },
  //   {
  //     title: 'Homemade Granola',
  //     description: 'Granola, greek yogurt topped with fresh peaches.',
  //     price: 4.3,
  //     popular: true,
  //     image:
  //       'https://assets.api.uizard.io/api/cdn/stream/c7986aed-535e-445a-a230-eb5b65870997.png',
  //   },
  // ];

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
