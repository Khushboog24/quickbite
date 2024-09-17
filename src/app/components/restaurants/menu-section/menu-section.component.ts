import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.scss',
})
export class MenuSectionComponent {
  @Input() items: any = [];
  expandedSections: Set<string> = new Set(); // Use a Set to track expanded sections

  constructor() {}
  ngOnInit() {
    console.log('items', this.items);
    this.items.forEach((item: any) => {
      this.expandedSections.add(item.heading); // Add all sections to the expanded set
    });
  }
  toggleSection(heading: string) {
    if (this.expandedSections.has(heading)) {
      this.expandedSections.delete(heading); // Remove section if it's already expanded
    } else {
      this.expandedSections.add(heading); // Add section to the expanded set
    }
  }

  isSectionExpanded(heading: string): boolean {
    return this.expandedSections.has(heading);
  }
}
