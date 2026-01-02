import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/kanban";

// Mock dnd-kit since it depends on browser APIs not fully available in jsdom
jest.mock("@dnd-kit/sortable", () => ({
    useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: jest.fn(),
        transform: null,
        transition: null,
        isDragging: false,
    }),
}));

jest.mock("@dnd-kit/utilities", () => ({
    CSS: {
        Translate: {
            toString: jest.fn(),
        },
    },
}));

const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    status: "To Do",
    priority: "medium",
    createdAt: Date.now(),
};

describe("TaskCard", () => {
    it("renders task details correctly", () => {
        render(<TaskCard task={mockTask} onDelete={() => { }} />);

        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("calls onDelete when delete button is clicked", async () => {
        const onDeleteMock = jest.fn();
        render(<TaskCard task={mockTask} onDelete={onDeleteMock} />);

        const deleteButton = screen.getByLabelText("Delete task");
        await userEvent.click(deleteButton);
        expect(onDeleteMock).toHaveBeenCalledWith("1");
    });
});
