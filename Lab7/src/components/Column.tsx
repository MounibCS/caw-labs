import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Status, Task } from "../types/kanban";
import { TaskCard } from "./TaskCard";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import { Plus, ListChecks, Clock, CheckCircle } from "lucide-react";

interface ColumnProps {
    status: Status;
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onEditTask?: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
}

const STATUS_CONFIG: Record<Status, { icon: typeof ListChecks; color: string; gradient: string }> = {
    "To Do": { icon: ListChecks, color: "text-blue-400", gradient: "column-gradient-todo" },
    "In Progress": { icon: Clock, color: "text-amber-400", gradient: "column-gradient-progress" },
    "Done": { icon: CheckCircle, color: "text-emerald-400", gradient: "column-gradient-done" },
};

export function Column({ status, tasks, onDeleteTask, onEditTask }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
        data: {
            type: "Column",
            status,
        },
    });

    const config = STATUS_CONFIG[status];
    const StatusIcon = config.icon;

    return (
        <div className="flex flex-col gap-4 min-w-[320px] w-full max-w-[400px] flex-1 group/column">
            <div className="flex items-center justify-between px-3 py-1">
                <div className="flex items-center gap-3">
                    <StatusIcon className={cn("h-4 w-4", config.color)} />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80">
                        {status}
                    </h2>
                    <span className={cn(
                        "text-xs font-bold backdrop-blur-sm px-2.5 py-0.5 rounded-full transition-all",
                        tasks.length > 0
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-secondary/50 text-secondary-foreground border border-white/5"
                    )}>
                        {tasks.length}
                    </span>
                </div>
            </div>

            <Card className={cn(
                "glass-card border-dashed border-2 flex-1 min-h-[600px] relative overflow-hidden transition-all duration-300",
                config.gradient,
                isOver && "border-primary/50 bg-primary/5 scale-[1.02]"
            )}>
                <CardContent
                    ref={setNodeRef}
                    className="p-4 flex flex-col gap-4 h-full relative z-10"
                >
                    <SortableContext
                        items={tasks.map((t) => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={onDeleteTask}
                                onEdit={onEditTask}
                            />
                        ))}
                    </SortableContext>

                    {tasks.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/40 text-sm gap-2 animate-pulse">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                                <Plus className="h-5 w-5 opacity-20" />
                            </div>
                            <p className="italic font-medium">Drop tasks here</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
