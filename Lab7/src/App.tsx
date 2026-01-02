import { useState } from "react";
import {
  DndContext,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import type { Task, Status, Priority } from "./types/kanban";
import { Column } from "./components/Column";
import { TaskForm } from "./components/TaskForm";
import { TaskCard } from "./components/TaskCard";
import { createPortal } from "react-dom";
import { Kanban, Layout } from "lucide-react";

const COLUMNS: Status[] = ["To Do", "In Progress", "Done"];

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Lab 7",
      description: "Implement Kanban board with drag and drop",
      status: "To Do",
      priority: "high",
      createdAt: Date.now(),
    },
    {
      id: "2",
      title: "Review React patterns",
      description: "Check state management and component architecture",
      status: "In Progress",
      priority: "medium",
      createdAt: Date.now(),
    },
    {
      id: "3",
      title: "Setup Vite project",
      description: "Initial project scaffolding with Tailwind",
      status: "Done",
      priority: "low",
      createdAt: Date.now(),
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const addTask = (title: string, description: string, priority: Priority = "medium") => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "To Do",
      priority,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a Task over a Column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].status = overId as Status;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Kanban className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Quantum Board
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">
                Strategic Task Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-secondary/50 border border-white/5 px-4 py-1.5 rounded-full items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Layout className="h-3.5 w-3.5" />
              Workspace / Lab 7
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-violet-500 border border-white/20 shadow-lg shadow-primary/20" />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 md:p-8 relative">
        <div className="max-w-xl mx-auto mb-10">
          <TaskForm onAdd={addTask} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start overflow-x-auto pb-12 snap-x">
            {COLUMNS.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
              />
            ))}
          </div>

          {createPortal(
            <DragOverlay dropAnimation={null}>
              {activeTask ? (
                <div className="rotate-3 scale-105 transition-transform">
                  <TaskCard task={activeTask} onDelete={() => { }} />
                </div>
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </main>

      <footer className="max-w-[1600px] mx-auto px-6 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted-foreground/30 uppercase tracking-widest">
        <span>Built for CAW 2026</span>
        <span>&copy; All rights reserved</span>
      </footer>
    </div>
  );
}

export default App;
