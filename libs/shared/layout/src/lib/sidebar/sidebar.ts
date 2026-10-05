import { Component, signal, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidebarItem } from './sidebar-item.model';

@Component({
  selector: 'lib-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly items = input<SidebarItem[]>([]);
  readonly collapsed = signal(false);

  toggleSidebar(): void {
    this.collapsed.update(value => !value);
  }
}
