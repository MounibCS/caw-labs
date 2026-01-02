export type Status = "To Do" | "In Progress" | "Done";

export type Priority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: number;
}
