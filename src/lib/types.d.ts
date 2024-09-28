type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};
export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactElement;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}
