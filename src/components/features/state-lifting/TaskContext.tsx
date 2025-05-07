import React, {
  useState,
  useCallback,
  type ReactNode,
  useContext,
  createContext,
} from "react";
import { produce } from "immer";

// Define the shape of a single task (matching original TaskManager)
// Exporting it so other components can use the same type definition
export interface Task {
  id: number;
  text: string;
  done: boolean;
  metadata: {
    createdAt: number;
    priority: "high" | "medium" | "low"; // Use literal types for priority
  };
}

// Initial tasks data (matching original TaskManager)
const initialTasks: Task[] = [
  {
    id: 0,
    text: "Visit Kafka Museum",
    done: true,
    metadata: { createdAt: Date.now() - 86400000, priority: "medium" },
  },
  {
    id: 1,
    text: "Watch a puppet show",
    done: false,
    metadata: { createdAt: Date.now() - 3700000, priority: "low" },
  },
  {
    id: 2,
    text: "Lennon Wall pic",
    done: false,
    metadata: { createdAt: Date.now(), priority: "high" },
  },
];

// Define the shape of the context value
interface TaskContextValue {
  tasks: Task[];
  addTask: (text: string) => void;
  changeTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  setPriority: (taskId: number, priority: Task["metadata"]["priority"]) => void;
}

/**
 * @const TaskContext
 * Context for managing tasks state.
 * Initialized with undefined to ensure provider usage.
 */
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// ID generator
let nextId = 3; // Start after initial tasks

/**
 * Provides the TaskContext to its children.
 * Manages the tasks state and provides functions to modify tasks.
 *
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The TaskProvider component.
 */
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks); // Use initial tasks

  /**
   * Adds a new task to the list.
   * @param {string} text - The text of the task to add.
   */
  const addTask = useCallback((text: string) => {
    setTasks(
      produce((draft: Task[]) => {
        draft.push({
          id: nextId++,
          text,
          done: false,
          metadata: { createdAt: Date.now(), priority: "medium" }, // Default metadata
        });
      }),
    );
  }, []);

  /**
   * Updates an existing task.
   * @param {Task} updatedTask - The task object with updated values.
   */
  const changeTask = useCallback((updatedTask: Task) => {
    setTasks(
      produce((draft: Task[]) => {
        const index = draft.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          draft[index] = updatedTask;
        }
      }),
    );
  }, []);

  /**
   * Deletes a task by its ID.
   * @param {number} taskId - The ID of the task to delete.
   */
  const deleteTask = useCallback((taskId: number) => {
    setTasks(
      produce((draft: Task[]) => {
        const index = draft.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      }),
    );
  }, []);

  /**
   * Sets the priority for a specific task.
   * @param {number} taskId - The ID of the task to update.
   * @param {Task['metadata']['priority']} priority - The new priority value.
   */
  const setPriority = useCallback(
    (taskId: number, priority: Task["metadata"]["priority"]) => {
      setTasks(
        produce((draft: Task[]) => {
          const task = draft.find((t) => t.id === taskId);
          if (task) {
            task.metadata.priority = priority;
          }
        }),
      );
    },
    [],
  );

  // Value provided by the context
  const value: TaskContextValue = {
    tasks,
    addTask,
    changeTask,
    deleteTask,
    setPriority,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// --- Custom Hooks (using standard useContext) ---

/** Hook to get the tasks array */
export const useTasks = (): Task[] => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context.tasks;
};

/** Hook to get the addTask function */
export const useAddTask = (): ((text: string) => void) => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAddTask must be used within a TaskProvider");
  }
  return context.addTask;
};

/** Hook to get the changeTask function */
export const useChangeTask = (): ((task: Task) => void) => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useChangeTask must be used within a TaskProvider");
  }
  return context.changeTask;
};

/** Hook to get the deleteTask function */
export const useDeleteTask = (): ((taskId: number) => void) => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useDeleteTask must be used within a TaskProvider");
  }
  return context.deleteTask;
};

/** Hook to get the setPriority function */
export const useSetPriority = (): ((
  taskId: number,
  priority: Task["metadata"]["priority"],
) => void) => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useSetPriority must be used within a TaskProvider");
  }
  return context.setPriority;
};

// Remove TaskItemProps export, it belongs in TaskItem.tsx
// export interface TaskItemProps {
//   task: Task;
// }
