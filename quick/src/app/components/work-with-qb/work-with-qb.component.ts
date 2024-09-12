import { Component } from '@angular/core';

@Component({
  selector: 'app-work-with-qb',
  templateUrl: './work-with-qb.component.html',
  styleUrl: './work-with-qb.component.css'
})
export class WorkWithQbComponent {

  workWithQuickBite: boolean = true;
  data: any = [
    {
      id: 1,
      title: "As a rider",
      img: "https://assets.api.uizard.io/api/cdn/stream/37e9b725-e9ad-467f-bd0e-66840f6b9ded.png",
      description: "Earn money by delivering food from restaurants. All you need are the skills and a bike.",
      btn:"Ride with us"
    },
    {
      id: 2,
      title: "As a partner",
      img: "https://assets.api.uizard.io/api/cdn/stream/81350b5b-cb11-496a-9662-d5b0d7eee41b.png",
      description: "QuickBite helps restaurants grow with online ordering, loyalty programs, and more.",
      btn: "Partner with us"
    },
    {
      id: 3,
      title: "As a colleague",
      img: "https://assets.api.uizard.io/api/cdn/stream/71644c0a-e068-4aca-8308-59827b23ba3f.png",
      description: "Be part of a team that’s building a top-notch delivery service.",
      btn: "Work with us"
    }
  ]
  toggleWorkWithQuickBite() {
    this.workWithQuickBite = !this.workWithQuickBite;
    console.log('HomeComponent: toggleWorkWithQuickBbite', this.workWithQuickBite);
  }
}
