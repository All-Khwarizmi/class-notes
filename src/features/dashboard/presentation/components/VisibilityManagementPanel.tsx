import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/core/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/components/ui/collapsible";
import { Switch } from "@/core/components/ui/switch";
import { BookOpen, BookText, Building, CheckSquare, List } from "lucide-react";
import { useVisibilityLogic } from "../../application/adapters/services/useVisibilityLogic";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import LoaderPage from "@/core/components/layout/LoaderPage";

export default function VisibilityManagementComponent(props: {
  userId: string;
}) {
  const { visibilityState, isLoading, isError, error, toggleStateVisibility } =
    useVisibilityLogic({
      userId: props.userId,
    });

  if (isLoading) {
    return <LoaderPage />;
  } else if (isError && error) {
    return (
      <ErrorDialog
        message={error.message}
        description="An error occurred while fetching visibility data."
      />
    );
  } else if (visibilityState) {
    return (
      <Card className="w-full pb-4">
        <CardHeader>
          <CardTitle>Visibility Management</CardTitle>
          <CardDescription>
            Control the visibility of your educational content hierarchically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {visibilityState.classes.map((item) => (
            <Collapsible key={item.id} className="w-full h-full ">
              <div className="flex justify-between items-center">
                <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2 ">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start ">
                      <h2 className="flex gap-2 items-center">
                        <Building size={16} className="text-blue-500 inline" />
                        <span> {item.name}</span>
                      </h2>
                      <h4 className="text-sm text-gray-400">
                        {item.description}
                      </h4>
                    </div>
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
                {item.sequences.map((sequence) => (
                  <Collapsible key={sequence.id} className="w-full h-full">
                    <div className="flex justify-between items-center">
                      <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2 ">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-start ">
                            <h2 className="flex gap-2 items-center">
                              <BookText
                                size={16}
                                className="text-green-500 inline"
                              />
                              <span> {sequence.name}</span>
                            </h2>
                            <h4 className="text-sm text-gray-400">
                              {sequence.description}
                            </h4>
                          </div>
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
                    <CollapsibleContent className="flex flex-col gap-2 ml-4">
                      {sequence.courses.map((course) => (
                        <Collapsible key={course.id} className="w-full h-full">
                          <div className="flex justify-between items-center">
                            <CollapsibleTrigger className="flex  w-full justify-between items-center pt-2 cursor-pointer gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col items-start ">
                                  <h2 className="flex gap-2 items-center">
                                    <BookOpen
                                      size={16}
                                      className="text-orange-500 inline mr-1"
                                    />
                                    <span>{course.name}</span>
                                  </h2>
                                  <h4 className="text-sm text-gray-400">
                                    {course.description}
                                  </h4>
                                </div>
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
                          <CollapsibleContent className="flex flex-col gap-2 ml-4">
                            {course.complements.map((complement) => (
                              <div
                                key={complement.id}
                                className="flex justify-between items-center cursor-pointer gap-2 pt-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div>
                                    <h2 className="flex gap-2 items-center">
                                      <CheckSquare
                                        size={16}
                                        className="text-red-500 inline mr-1"
                                      />
                                      <span>{complement.name}</span>
                                    </h2>
                                    <h4 className="text-sm text-gray-400">
                                      {complement.description}
                                    </h4>
                                  </div>
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
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    );
  }
}
