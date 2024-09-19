import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from '../../../services/user-context.service';

@Component({
  selector: 'app-rest-card',
  templateUrl: './rest-card.component.html',
  styleUrl: './rest-card.component.scss',
})
export class RestCardComponent {
  @Input() imageUrl: string =
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw2fHxmb29kfGVufDF8fHx8MTYzOTE1MzMzOQ&ixlib=rb-1.2.1&q=80&w=1080';
  @Input() title: string = 'Bruncherie';
  @Input() description: string = 'Breakfast, lunch, desserts';
  @Input() deliveryprice: string = '$3.26';

  base_img: string = './assets/icons/';
  carIcon: string = this.base_img + 'car.svg';
  @Input() deliveryTime: string = '25-35min';
  @Input() rating: number = 3;
  menuData: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private usercontext: UserContextService
  ) {}

  getRatingStars(): string[] {
    // Generate an array of dollar signs
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < this.rating ? 'bold' : 'light');
    }
    return stars;
  }
  navigateToDetails(title: any) {
    console.log('hi');

    this.http
      .get('http://localhost:4000/api/menus/getRestaurantWithMenu', {
        params: { query: title },
      })
      .subscribe({
        next: (data: any) => {
          console.log('data', data);
          this.menuData = data;
          console.log('menuData', this.menuData, data);

          // Set the menu items and then navigate

          this.menuData.restaurants.forEach((element: any) => {
            if (element.title === title) {
              console.log('element', element);
              element.menuId.deliveryprice = this.deliveryprice;
              this.usercontext.setMenuItemsOfRests(element.menuId);
            }
          });
          // this.usercontext.setMenuItemsOfRests(this.menuData);

          // Navigate to the desired route after setting the menu data
          this.router.navigate(['/rest']).then(() => {
            // Update history state after navigation
            history.replaceState(
              { title: this.title, description: this.description },
              ''
            );
          });
        },
        error: (error) => {
          // Handle error if needed
          console.error('Error fetching data', error);
        },
        complete: () => {
          // Any final actions if needed
          console.log('HTTP request completed');
        },
      });
  }
}
