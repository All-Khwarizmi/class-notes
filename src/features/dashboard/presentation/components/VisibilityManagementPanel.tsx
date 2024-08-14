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
import { Switch } from "@/core/components/ui/switch";
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
          <Collapsible key={item.id} className="w-full h-full pt-4">
            <div className="flex justify-between items-center">
              <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2 mt-2">
                <div className="flex flex-col items-start ">
                  <h2>{item.name} </h2>
                  <h4 className="text-sm text-gray-400">{item.description}</h4>
                </div>
              </CollapsibleTrigger>
              <Switch
                checked={item.publish}
                onCheckedChange={() => {
                  toggleStateVisibility({
                    type: "classe",
                    typeId: item.id,
                    publish: !item.publish,
                  });
                }}
              />
            </div>
            <CollapsibleContent className="flex flex-col ml-4">
              {item.sequences.map((sequence) => {
                return (
                  <Collapsible key={sequence.id} className="w-full h-full">
                    <div className="flex justify-between items-center">
                      <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2 ">
                        <div className="flex flex-col items-start ">
                          <h2>{sequence.name} </h2>
                          <h4 className="text-sm text-gray-400">
                            {sequence.description}
                          </h4>
                        </div>
                      </CollapsibleTrigger>

                      <Switch
                        checked={sequence.publish}
                        onCheckedChange={() => {
                          toggleStateVisibility({
                            type: "sequence",
                            typeId: sequence.id,
                            publish: !sequence.publish,
                          });
                        }}
                      />
                    </div>
                    <CollapsibleContent className="flex flex-col gap-2 ml-4  ">
                      {sequence.courses.map((course) => (
                        <Collapsible key={course.id} className="w-full h-full ">
                          <div className="flex justify-between items-center">
                            <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2 ">
                              <div className="flex flex-col items-start ">
                                <h2>{course.name} </h2>
                                <h4 className="text-sm text-gray-400">
                                  {course.description}
                                </h4>
                              </div>
                            </CollapsibleTrigger>
                            <Switch
                              checked={course.publish}
                              onCheckedChange={() => {
                                toggleStateVisibility({
                                  type: "cours",
                                  typeId: course.id,
                                  publish: !course.publish,
                                });
                              }}
                            />
                          </div>
                          <CollapsibleContent className="flex flex-col gap-2 ml-4 ">
                            {course.complements.map((complement) => (
                              <div
                                key={complement.id}
                                className="flex justify-between items-center  cursor-pointer gap-2 pt-2"
                              >
                                <div>
                                  <h2>{complement.name} </h2>
                                  <h4 className="text-sm text-gray-400">
                                    {complement.description}
                                  </h4>
                                </div>
                                <Switch
                                  checked={complement.publish}
                                  onCheckedChange={() => {
                                    toggleStateVisibility({
                                      type: "complement",
                                      typeId: complement.id,
                                      publish: !complement.publish,
                                    });
                                  }}
                                />
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
