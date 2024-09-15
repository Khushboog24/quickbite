import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.css',
})
export class MenuSectionComponent {
  @Input() items: any = [];
  @Input() title: string = '';
}
