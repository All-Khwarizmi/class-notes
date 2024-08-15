import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import { Switch } from "@/core/components/ui/switch";
import { Button } from "@/core/components/ui/button";

function VisibilityManagementCard() {
  return (
    <Card className="col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>Visibility Management</CardTitle>
        <CardDescription>
          Control the visibility of your application features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Sequences</div>
              <Switch checked onCheckedChange={(checked) => {}}>
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Classes</div>
              <Switch checked onCheckedChange={(checked) => {}}>
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Resources</div>
              <Switch checked onCheckedChange={(checked) => {}}>
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Spaces</div>
              <Switch checked onCheckedChange={(checked) => {}}>
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => {}}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default VisibilityManagementCard;
