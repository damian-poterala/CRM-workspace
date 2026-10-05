import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

import { SidebarItem } from '../sidebar/sidebar-item.model';

@Component({
  selector: 'lib-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    Navbar,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  readonly sidebarItems = input<SidebarItem[]>([]);
}
