import { NavItem } from "@/lib/types";
import { NavItems } from "@/core/components/constants/side-nav";
import { isRight } from "fp-ts/lib/Either";
import ClassIcon from "@/core/components/icons/ClassIcon";
import { useEffect, useState } from "react";
import { classeRepository } from "@/features/classe/application/repository/classe-repository";
import { userRepositry } from "@/features/user/application/repository/user-repository";
export default function useNavItems() {
  const { user } = userRepositry.useGetUser();
  const { classes: eitherClasses } = classeRepository.useGetClasses({
    id: user?._id || "",
  })();
  const [navItems, setNavItems] = useState<NavItem[] | null>(null);
  useEffect(() => {
    if (eitherClasses) {
      //! TODO: refactor this. -Now we are using the Either monad to handle the error by filtering the invalid values. But we should do something about the fault classes if any
      const classes = eitherClasses.filter((c) => isRight(c.values));
      const classesWithChildren = NavItems?.map((item) => {
        if (item.title === "Classes") {
          const children: NavItem[] = [];
          classes.forEach((c) => {
            //~ Should be valid classe at this point but typescript does not get it unless we check it again. I think that for this to work it has to be checked and used in a block scope
            if (isRight(c.values)) {
              const classEntity = c.values.right;
              const child: NavItem = {
                title: classEntity.name,
                href: `/classes/class/${classEntity.id}`,
                icon: <ClassIcon />,
                color: "text-orange-500",
              };
              children.push(child);
            }
          });
          return {
            ...item,
            isChidren: true,
            children,
          };
        }
        return item;
      });
      setNavItems(classesWithChildren);
    }
  }, [eitherClasses]);

  return {
    navItems,
  };
}
