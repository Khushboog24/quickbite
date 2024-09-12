import { Component } from '@angular/core';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrl: './download-app.component.css',
})
export class DownloadAppComponent {
  downloadApp: boolean = true;
  data = [
    {
      img: 'https://assets.api.uizard.io/api/cdn/stream/e673eb3d-6d4c-43b8-b125-67ac786dfaf1.png',
      title: 'Order easily',
      description:
        'Get the most delicious bites delivered to your door with QuickBite. Our fastest delivery service carries a variety of cuisines from local restaurants.',
      btn: 'Download',
    },
  ];
  toggleDownloadApp() {
    console.log('hi');
    this.downloadApp = !this.downloadApp;
    console.log('HomeComponent: toggleDownloadApp', this.downloadApp);
  }
}
