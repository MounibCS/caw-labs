import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task, Priority } from "../types/kanban";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../lib/utils";
import { GripVertical, Trash2, Edit2, ArrowUp, ArrowRight, ArrowDown, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
    onEdit?: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
}

const PRIORITY_CONFIG: Record<Priority, { icon: typeof ArrowUp; color: string; bg: string; label: string }> = {
    low: { icon: ArrowDown, color: "text-blue-400", bg: "bg-blue-500/10", label: "Low" },
    medium: { icon: ArrowRight, color: "text-amber-400", bg: "bg-amber-500/10", label: "Medium" },
    high: { icon: ArrowUp, color: "text-rose-400", bg: "bg-rose-500/10", label: "High" },
};

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const priorityConfig = PRIORITY_CONFIG[task.priority];
    const PriorityIcon = priorityConfig.icon;

    const handleSaveEdit = () => {
        if (onEdit && editTitle.trim()) {
            onEdit(task.id, { title: editTitle, description: editDescription });
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditTitle(task.title);
        setEditDescription(task.description);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Card
                ref={setNodeRef}
                style={style}
                className="bg-card/80 backdrop-blur-sm border-primary/30 shadow-lg ring-2 ring-primary/20"
            >
                <CardContent className="p-4 space-y-3">
                    <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="h-9 text-sm font-semibold bg-white/5 border-white/10"
                        placeholder="Task title"
                        autoFocus
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 min-h-[60px]"
                        placeholder="Description (optional)"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="h-7 px-2 text-muted-foreground"
                        >
                            <X className="h-3.5 w-3.5 mr-1" />
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-7 px-3"
                        >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2",
                isDragging && "opacity-50 ring-2 ring-primary border-primary shadow-xl"
            )}
        >
            <CardHeader className="p-4 pb-1.5 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2.5 truncate">
                    <button
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-primary transition-colors shrink-0"
                        aria-label="Drag task"
                    >
                        <GripVertical className="h-3.5 w-3.5" />
                    </button>
                    <CardTitle className="text-[13px] font-semibold leading-none truncate">
                        {task.title}
                    </CardTitle>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    {onEdit && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground/30 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                            onClick={() => setIsEditing(true)}
                            aria-label="Edit task"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                        onClick={() => onDelete(task.id)}
                        aria-label="Delete task"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-1">
                {task.description && (
                    <p className="text-[12px] text-muted-foreground/80 leading-relaxed line-clamp-3">
                        {task.description}
                    </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight",
                            priorityConfig.bg,
                            priorityConfig.color
                        )}>
                            <PriorityIcon className="h-3 w-3" />
                            {priorityConfig.label}
                        </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground/40 italic">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
