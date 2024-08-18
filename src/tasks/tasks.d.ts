import { z } from 'zod';
import {
  createTaskSchema,
  // findTasksSchema,
  selectTaskSchema,
  updateTaskSchema,
} from './tasks.schema';

export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type SelectTask = z.infer<typeof selectTaskSchema>;

// export type FindTasksQuery = z.infer<typeof findTasksSchema>;

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
