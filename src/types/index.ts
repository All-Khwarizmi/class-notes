export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactElement;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}
