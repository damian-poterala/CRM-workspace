import { SidebarItem } from 'layout';

export const adminMenu: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
  },
  {
    label: 'Użytkownicy',
    icon: 'pi pi-users',
    route: '/users',
  },
  {
    label: 'Pliki',
    icon: 'pi pi-file',
    route: '/files',
  },
  {
    label: 'Zadania',
    icon: 'pi pi-check-square',
    route: '/tasks',
  },
  {
    label: 'Słowniki',
    icon: 'pi pi-book',
    route: '/dictionaries',
  },
];