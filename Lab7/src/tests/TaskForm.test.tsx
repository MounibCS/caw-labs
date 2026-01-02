import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "../components/TaskForm";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Plus: () => <div data-testid="plus-icon" />,
    Flag: () => <div data-testid="flag-icon" />,
    ArrowDown: () => <div data-testid="arrow-down-icon" />,
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
    ArrowUp: () => <div data-testid="arrow-up-icon" />,
}));

describe("TaskForm", () => {
    it("renders the collapsed state by default", () => {
        render(<TaskForm onAdd={() => { }} />);

        expect(screen.getByText("Launch New Assignment")).toBeInTheDocument();
    });

    it("expands when the button is clicked", async () => {
        render(<TaskForm onAdd={() => { }} />);

        const expandButton = screen.getByText("Launch New Assignment");
        await userEvent.click(expandButton);

        expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Detail the requirements and scope...")).toBeInTheDocument();
    });

    it("allows entering a title and description", async () => {
        render(<TaskForm onAdd={() => { }} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        const titleInput = screen.getByPlaceholderText("What needs to be done?");
        const descriptionInput = screen.getByPlaceholderText("Detail the requirements and scope...");

        await userEvent.type(titleInput, "New Task");
        await userEvent.type(descriptionInput, "Task description");

        expect(titleInput).toHaveValue("New Task");
        expect(descriptionInput).toHaveValue("Task description");
    });

    it("calls onAdd with correct values when form is submitted", async () => {
        const onAddMock = jest.fn();
        render(<TaskForm onAdd={onAddMock} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        const titleInput = screen.getByPlaceholderText("What needs to be done?");
        const descriptionInput = screen.getByPlaceholderText("Detail the requirements and scope...");

        await userEvent.type(titleInput, "New Task");
        await userEvent.type(descriptionInput, "Task description");

        const submitButton = screen.getByText("Initialize Task");
        await userEvent.click(submitButton);

        expect(onAddMock).toHaveBeenCalledWith("New Task", "Task description", "medium");
    });

    it("does not submit when title is empty", async () => {
        const onAddMock = jest.fn();
        render(<TaskForm onAdd={onAddMock} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        const submitButton = screen.getByText("Initialize Task");
        await userEvent.click(submitButton);

        expect(onAddMock).not.toHaveBeenCalled();
    });

    it("collapses when discard button is clicked", async () => {
        render(<TaskForm onAdd={() => { }} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();

        const discardButton = screen.getByText("Discard");
        await userEvent.click(discardButton);

        expect(screen.getByText("Launch New Assignment")).toBeInTheDocument();
        expect(screen.queryByPlaceholderText("What needs to be done?")).not.toBeInTheDocument();
    });

    it("renders priority selection buttons", async () => {
        render(<TaskForm onAdd={() => { }} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        expect(screen.getByText("Low")).toBeInTheDocument();
        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
    });

    it("allows selecting different priority levels", async () => {
        const onAddMock = jest.fn();
        render(<TaskForm onAdd={onAddMock} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        const titleInput = screen.getByPlaceholderText("What needs to be done?");
        await userEvent.type(titleInput, "High Priority Task");

        // Select high priority
        const highPriorityButton = screen.getByText("High");
        await userEvent.click(highPriorityButton);

        const submitButton = screen.getByText("Initialize Task");
        await userEvent.click(submitButton);

        expect(onAddMock).toHaveBeenCalledWith("High Priority Task", "", "high");
    });

    it("resets form after successful submission", async () => {
        const onAddMock = jest.fn();
        render(<TaskForm onAdd={onAddMock} />);

        // Expand the form
        await userEvent.click(screen.getByText("Launch New Assignment"));

        const titleInput = screen.getByPlaceholderText("What needs to be done?");
        await userEvent.type(titleInput, "Test Task");

        const submitButton = screen.getByText("Initialize Task");
        await userEvent.click(submitButton);

        // Form should collapse after submission
        expect(screen.getByText("Launch New Assignment")).toBeInTheDocument();
    });
});
