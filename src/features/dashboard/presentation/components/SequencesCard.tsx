import React from 'react'
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/core/components/ui/table";
import { Badge } from "@/core/components/ui/badge";

function SequencesCard() {
  return (
    <Card className="col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>Sequences</CardTitle>
        <CardDescription>
          View and manage your educational sequences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Introduction to Programming</div>
                <div className="text-sm text-muted-foreground">
                  Beginner level sequence
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>12</TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="outline">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="icon" variant="outline" className="ml-2">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Advanced Data Structures</div>
                <div className="text-sm text-muted-foreground">
                  Graduate level sequence
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>8</TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="outline">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="icon" variant="outline" className="ml-2">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Foundations of Algorithms</div>
                <div className="text-sm text-muted-foreground">
                  Intermediate level sequence
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
              <TableCell>10</TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="outline">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="icon" variant="outline" className="ml-2">
                  <div className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SequencesCard