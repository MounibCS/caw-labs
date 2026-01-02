import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Flag, ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import type { Priority } from "../types/kanban";
import { cn } from "../lib/utils";

interface TaskFormProps {
    onAdd: (title: string, description: string, priority: Priority) => void;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; icon: typeof ArrowUp; color: string }[] = [
    { value: "low", label: "Low", icon: ArrowDown, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { value: "medium", label: "Medium", icon: ArrowRight, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { value: "high", label: "High", icon: ArrowUp, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
];

export function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title, description, priority);
        setTitle("");
        setDescription("");
        setPriority("medium");
        setIsExpanded(false);
    };

    return (
        <div className="w-full">
            {!isExpanded ? (
                <Button
                    onClick={() => setIsExpanded(true)}
                    className="w-full h-14 gap-3 border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 rounded-2xl transition-all group"
                    variant="outline"
                >
                    <div className="p-1.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold tracking-tight text-primary/80">Launch New Assignment</span>
                </Button>
            ) : (
                <Card className="glass-card border-primary/20 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/5 animate-in slide-in-from-top-2 duration-300">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 ml-1">
                                    Task Title
                                </label>
                                <Input
                                    id="task-title-input"
                                    placeholder="What needs to be done?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                                    className="h-12 bg-white/5 border-white/5 focus:bg-white/10 transition-all rounded-xl font-semibold text-base placeholder:text-muted-foreground/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 ml-1">
                                    Technical Description
                                </label>
                                <textarea
                                    id="task-description-input"
                                    placeholder="Detail the requirements and scope..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="flex min-h-[120px] w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus:bg-white/10 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 ml-1 flex items-center gap-1.5">
                                    <Flag className="h-3 w-3" />
                                    Priority Level
                                </label>
                                <div className="flex gap-2">
                                    {PRIORITY_OPTIONS.map((option) => {
                                        const Icon = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setPriority(option.value)}
                                                className={cn(
                                                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border transition-all duration-200 text-sm font-semibold",
                                                    priority === option.value
                                                        ? option.color + " ring-2 ring-offset-2 ring-offset-background"
                                                        : "border-white/10 text-muted-foreground hover:border-white/20 hover:bg-white/5"
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsExpanded(false)}
                                    className="rounded-xl font-bold uppercase tracking-wider text-xs px-6"
                                >
                                    Discard
                                </Button>
                                <Button
                                    type="submit"
                                    className="rounded-xl font-bold uppercase tracking-wider text-xs px-8 shadow-lg shadow-primary/20"
                                >
                                    Initialize Task
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
