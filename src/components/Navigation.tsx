import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Accueil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <button>
                <article className="py-2 px-4">Classes</article>
              </button>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <button>
                <article className="py-2 px-4">Planner</article>
              </button>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <button>
                <article className="py-2 px-4">AI</article>
              </button>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
