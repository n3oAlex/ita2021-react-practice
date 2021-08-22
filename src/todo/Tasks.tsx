import { Task, TaskType } from "./Task";

export const Tasks = (props: {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  filterFunc: (task: TaskType) => boolean;
}) => {
  return (
    <>
      {props.tasks
        .sort((t1, t2) => {
          return t2.createdAt - t1.createdAt;
        })
        .sort((t1, t2) => {
          return t1.completed === t2.completed ? 0 : t1.completed ? 1 : -1;
        })
        .map((task) => {
          if (props.filterFunc(task))
            return (
              <Task
                key={task.id}
                task={task}
                deleteTask={props.deleteTask}
                toggleTask={props.toggleTask}
              />
            );
        })}
    </>
  );
};
