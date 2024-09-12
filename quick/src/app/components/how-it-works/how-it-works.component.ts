import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {
  howItWorks: boolean = true;
  data: any = [
    {
      title: 'Step 1',
      img: "https://assets.api.uizard.io/api/cdn/stream/f6a8cb56-e0e8-498f-9eee-fed4b6f8b682.png",
      description: 'Enter your location. Type in your address or pin your location by enabling location services.'
    },
    {
      title: 'Step 2',
      img: "https://assets.api.uizard.io/api/cdn/stream/5f37769c-8965-4b45-b0a6-a8b4b184b84a.png",
      description: 'Now select a restaurant and a meal item. You\'re one step closer to the perfect QuickBite.'
    },
    {
      title: 'Step 3',
      img: "https://assets.api.uizard.io/api/cdn/stream/dd65eac6-19ac-4570-833a-2feaa7d4ff7e.png",
      description: 'Settle your payment. Then, sit back and relax as we make your food ready!'
    }
  ]
  toggleHowItWorks() {
    this.howItWorks = !this.howItWorks;
    console.log('HomeComponent: toggleHowItWorks', this.howItWorks);
  }
}
