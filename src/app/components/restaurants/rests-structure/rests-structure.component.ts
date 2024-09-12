import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rests-structure',
  templateUrl: './rests-structure.component.html',
  styleUrl: './rests-structure.component.scss',
})
export class RestsStructureComponent {
  @Input() restInfo: any = [];

  expandedSection: string | null = null;
  // Toggles the section based on the heading
  toggleSection(heading: string) {
    if (this.expandedSection === heading) {
      this.expandedSection = null; // Collapse the section if already expanded
    } else {
      this.expandedSection = heading; // Expand the clicked section
    }
  }

  // Check if the current section is expanded
  isSectionExpanded(heading: string): boolean {
    return this.expandedSection === heading;
  }
  ngOnInit() {
    console.log('restInfo', this.restInfo);
  }
}
