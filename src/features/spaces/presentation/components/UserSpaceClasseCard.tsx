import { Button } from "@/core/components/ui/button";
import { ClassType } from "@/features/classe/domain/class-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function UserSpaceClasseCard(props: { classe: ClassType; userId: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-950 dark:text-gray-200 border ",
        `hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out shadow-slate-800 dark:border-gray-800 dark:hover:shadow-slate-900 dark:hover:border-gray-900`
      )}
    >
      <img
        src={
          props.classe.imageUrl ?? "/images/mos-design-jzFbbG2WXv0-unsplash.jpg"
        }
        alt="Card 1"
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold ">{props.classe.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {props.classe.description}
        </p>
        <Button variant="outline" className="w-full">
          <Link
            href={`/spaces/classes/${props.classe.id}?user=${props.userId}`}
          >
            View Classe
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default UserSpaceClasseCard;
