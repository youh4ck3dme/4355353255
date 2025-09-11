'use client';
import { tasks as initialTasks } from '@/lib/data';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const statusColumns = {
  backlog: 'Backlog',
  todo: 'To-Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

type Status = keyof typeof statusColumns;

export function TaskBoard() {
  const [tasks, setTasks] = React.useState(initialTasks);

  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status as Status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as Record<Status, typeof initialTasks>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(Object.keys(statusColumns) as Status[]).map((status) => (
        <div key={status} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
             <h2 className="font-semibold text-lg">{statusColumns[status]}</h2>
             <Button variant="ghost" size="sm"><PlusCircle className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-col gap-4">
            {(tasksByStatus[status] || []).map((task) => (
              <Card key={task.id} className="bg-card">
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                  <div>
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                  </div>
                  <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
