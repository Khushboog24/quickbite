import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  getRatingStars(): string[] {
    // Generate an array of dollar signs
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < this.rating ? 'bold' : 'light');
    }
    return stars;
  }
  navigateToDetails() {
    console.log('hi');
    this.router.navigate(['/rest']).then(() => {
      history.replaceState(
        { title: this.title, description: this.description },
        ''
      ); // Use replaceState to set state without adding a new history entry
    });
  }
}
