import { TaskBoard } from "@/components/tasks/task-board";

export default function TasksPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <p className="text-muted-foreground mb-6">Organize your project tasks. This board is offline-ready.</p>
            <TaskBoard />
        </div>
    )
}
