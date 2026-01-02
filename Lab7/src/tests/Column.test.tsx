import { render, screen } from "@testing-library/react";
import { Column } from "../components/Column";
import type { Task } from "../types/kanban";

// Mock dnd-kit
jest.mock("@dnd-kit/core", () => ({
    useDroppable: () => ({
        setNodeRef: jest.fn(),
    }),
}));

jest.mock("@dnd-kit/sortable", () => ({
    SortableContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: jest.fn(),
        transform: null,
        transition: null,
        isDragging: false,
    }),
    verticalListSortingStrategy: {},
}));

jest.mock("@dnd-kit/utilities", () => ({
    CSS: {
        Translate: {
            toString: jest.fn(),
        },
    },
}));

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Task 1",
        description: "Desc 1",
        status: "To Do",
        priority: "medium",
        createdAt: Date.now(),
    },
    {
        id: "2",
        title: "Task 2",
        description: "Desc 2",
        status: "To Do",
        priority: "high",
        createdAt: Date.now(),
    },
];

describe("Column", () => {
    it("renders the status and task count", () => {
        render(<Column status="To Do" tasks={mockTasks} onDeleteTask={() => { }} />);

        expect(screen.getByText("To Do")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders all tasks in the column", () => {
        render(<Column status="To Do" tasks={mockTasks} onDeleteTask={() => { }} />);

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("renders empty state when no tasks", () => {
        render(<Column status="To Do" tasks={[]} onDeleteTask={() => { }} />);

        expect(screen.getByText("Drop tasks here")).toBeInTheDocument();
    });
});
