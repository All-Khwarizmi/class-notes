import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/core/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/core/components/ui/tooltip";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { flatVisibilityType } from "@/features/classe/domain/visibility-schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import { toggleVisibility } from "@/features/classe/domain/visibility-schema";
const visibility = {
  _creationTime: 1717962138879.966,
  _id: "q17da5pw1n2ec0n0n0c78521796tpr9a",
  classe: [
    {
      id: "j570eeh1dj3qbbtnmv3n9th6bd6pn446",
      publish: true,
      name: "Class A",
      description: "A primary class covering basic subjects.",
    },
    {
      id: "px76gwcdvd2ftf27bzwwj4arzd6ts22f",
      publish: false,
      name: "Class B",
      description: "A secondary class with advanced curriculum.",
    },
  ],
  complement: [
    {
      classe: true,
      classeId: "j570eeh1dj3qbbtnmv3n9th6bd6pn446",
      cours: true,
      coursId: "p175nbf8qzvm8s38sazxztr7d96trw5y",
      id: "pn7by3xr40kcvterczarbj39456trt8g",
      publish: true,
      sequence: true,
      sequenceId: "px76gwcdvd2ftf27bzwwj4arzd6ts22f",
      name: "Complement 1",
      description: "Additional materials for Class A.",
    },
  ],
  cours: [
    {
      classe: true,
      classeId: "j570eeh1dj3qbbtnmv3n9th6bd6pn446",
      id: "p175nbf8qzvm8s38sazxztr7d96trw5y",
      publish: true,
      sequence: true,
      sequenceId: "px76gwcdvd2ftf27bzwwj4arzd6ts22f",
      name: "Course 1",
      description: "Fundamentals of mathematics.",
    },
  ],
  sequences: [
    {
      classe: true,
      classeId: "j570eeh1dj3qbbtnmv3n9th6bd6pn446",
      id: "px76gwcdvd2ftf27bzwwj4arzd6ts22f",
      publish: true,
      name: "Sequence 1",
      description: "A series of courses for Class A.",
    },
  ],
  userId: "jd77rtjw8e4nvybmwbj9aydb396pm2a7",
};

export default function VisibilityManagementComponent() {
  const [visibilityState, setVisibilityState] = React.useState(() =>
    flatVisibilityType(visibility)
  );
  const renderBadge = (publish: boolean) => (
    <TooltipProvider>
      <Badge
        className={
          publish ? "bg-green-500 text-green-50" : "bg-red-500 text-red-50"
        }
      >
        {publish ? "Visible" : "Hidden"}
      </Badge>
      <Tooltip>
        <TooltipTrigger>
          <Button className="p-1">
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {publish
            ? "This entity and all its descendants are visible."
            : "This entity and all its descendants are hidden."}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  const toggleStateVisibility = (args: {
    type: "classe" | "sequence" | "cours" | "complement";
    typeId: string;
    publish: boolean;
  }) => {
    setVisibilityState(
      toggleVisibility(visibilityState, {
        type: args.type,
        typeId: args.typeId,
        publish: args.publish,
      })
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visibility Management</CardTitle>
        <CardDescription>
          Control the visibility of your educational content hierarchically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {visibilityState.classes.map((item) => (
          <Collapsible key={item.id} className="w-full h-full">
            <div className="flex justify-between items-center">
              <CollapsibleTrigger className="flex  w-full justify-between items-center p-4 cursor-pointer gap-2 mt-2">
                <div className="flex flex-col items-start ">
                  <h2>{item.name} </h2>
                  <h4 className="text-sm text-gray-400">{item.description}</h4>
                </div>
              </CollapsibleTrigger>
              <Button
                onClick={() => {
                  toggleStateVisibility({
                    type: "classe",
                    typeId: item.id,
                    publish: !item.publish,
                  });
                }}
              >
                {item.publish ? "Visible" : "Hidden"}
              </Button>
            </div>
            <CollapsibleContent className="flex flex-col gap-2 ml-8">
              {item.sequences.map((sequence) => {
                return (
                  <Collapsible key={sequence.id} className="w-full h-full">
                    <div className="flex justify-between items-center">
                      <CollapsibleTrigger className="flex  w-full justify-between items-center p-4 cursor-pointer gap-2 ">
                        <div className="flex flex-col items-start ">
                          <h2>{sequence.name} </h2>
                          <h4 className="text-sm text-gray-400">
                            {sequence.description}
                          </h4>
                        </div>
                      </CollapsibleTrigger>
                      <Button
                        onClick={() => {
                          toggleStateVisibility({
                            type: "sequence",
                            typeId: sequence.id,
                            publish: !sequence.publish,
                          });
                        }}
                      >
                        {sequence.publish === true ? "Visible" : "Hidden"}
                      </Button>
                    </div>
                    <CollapsibleContent className="flex flex-col gap-2 ml-8 ">
                      {sequence.courses.map((course) => (
                        <Collapsible key={course.id} className="w-full h-full ">
                          <div className="flex justify-between items-center">
                            <CollapsibleTrigger className="flex  w-full justify-between items-center p-4 cursor-pointer gap-2 ">
                              <div className="flex flex-col items-start ">
                                <h2>{course.name} </h2>
                                <h4 className="text-sm text-gray-400">
                                  {course.description}
                                </h4>
                              </div>
                            </CollapsibleTrigger>
                            <Button
                              onClick={() => {
                                toggleStateVisibility({
                                  type: "cours",
                                  typeId: course.id,
                                  publish: !course.publish,
                                });
                              }}
                            >
                              {course.publish === true ? "Visible" : "Hidden"}
                            </Button>
                          </div>
                          <CollapsibleContent className="flex flex-col gap-2 ml-8 ">
                            {course.complements.map((complement) => (
                              <div
                                key={complement.id}
                                className="flex  w-full justify-between items-center p-4 cursor-pointer gap-2 "
                              >
                                <div>
                                  <h2>{complement.name} </h2>
                                  <h4 className="text-sm text-gray-400">
                                    {complement.description}
                                  </h4>
                                </div>
                                <Button
                                  onClick={() => {
                                    toggleStateVisibility({
                                      type: "complement",
                                      typeId: complement.id,
                                      publish: !complement.publish,
                                    });
                                  }}
                                >
                                  {complement.publish === true
                                    ? "Visible"
                                    : "Hidden"}
                                </Button>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
