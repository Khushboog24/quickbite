import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../../components/signup/signup.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  howItWorks: boolean = true;
  workWithQuickBite: boolean = true;
  isPage1: boolean = true;
  restInfo: any = [];
  selectedFilter: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get('http://localhost:4000/api/restaurants/getData')
      .subscribe((data: any) => {
        console.log('data', data);
        this.restInfo = data.data;
      });
    console.log('restInfo', this.restInfo);
    this.isPage1 = !this.isPage1;
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
  }
  async openLoginModal() {
    // const modal = await this.modalController.create({
    //   component: SignupComponent,
    // });
    // return await modal.present();
  }

  toggleHowItWorks() {
    this.howItWorks = !this.howItWorks;
    console.log('HomeComponent: toggleHowItWorks', this.howItWorks);
  }

  toggleWorkWithQuickBite() {
    this.workWithQuickBite = !this.workWithQuickBite;
    console.log(
      'HomeComponent: toggleWorkWithQuickBbite',
      this.workWithQuickBite
    );
  }
}
