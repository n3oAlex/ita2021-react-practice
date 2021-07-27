import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Task } from "./Task";
import React, { Component } from "react";
import styled from "styled-components";

//#region Styled components
const NavLinkStyled = styled(NavLink)`
  color: #114068;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2em;
  &.active {
    color: #1d6fb1;
  }
`;

const DivTaskFilters = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DivTaskList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  overflow: auto;
  padding-right: 15px;
`;

const DivAppContainer = styled.div`
  width: 30em;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  & > svg {
    height: 3em;
  }
`;

const InputAddTaskInput = styled.input`
  height: 2em;
  margin: 0;
  width: 100%;
  font-size: 150%;
  color: #114068;
  background: transparent;
  border-radius: 10px;
  border: 2px solid #114068;
  padding: 0 15px;
`;

const DivAddTaskBox = styled.div`
  display: flex;
  margin-bottom: 2em;
`;
//#endregion

//#region types
type TaskType = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
};

type State = { tasks: TaskType[] };
//#endregion
export default class TodoApp extends Component<{}, State> {
  InputAddTaskInput: any;

  constructor(props) {
    super(props);
    this.state = {
      tasks: this.getFromStorage(),
    };
    this.InputAddTaskInput = React.createRef();
  }

  componentDidMount() {
    document.title = "React showcase - Todo App";
    this.InputAddTaskInput.current.focus();
  }

  componentDidUpdate() {
    this.saveToStorage();
  }

  addTask = () => {
    if (this.InputAddTaskInput.current.value === "") {
      this.InputAddTaskInput.current.focus();
      return;
    }
    const d = new Date();
    const newTask: TaskType = {
      id: Math.random().toString(36).replace("0.", ""),
      text: this.InputAddTaskInput.current.value,
      completed: false,
      createdAt: d.getTime(),
      completedAt: null,
    };
    this.setState((p) => {
      return {
        tasks: [...p.tasks, newTask],
      };
    });
    this.InputAddTaskInput.current.value = "";
    this.InputAddTaskInput.current.focus();
  };

  toggleTask = (id: string) => {
    const d = new Date();
    this.setState((p) => {
      return {
        tasks: p.tasks.map((task) => {
          if (task.id === id) {
            return task.completed
              ? { ...task, completed: false, completedAt: null }
              : { ...task, completed: true, completedAt: d.getTime() };
          }
          return task;
        }),
      };
    });
  };

  deleteTask = (id: string) => {
    this.setState((p) => {
      return { tasks: p.tasks.filter((task) => task.id !== id) };
    });
  };

  saveToStorage = () => {
    localStorage.setItem("todoApp", JSON.stringify(this.state.tasks));
  };

  getFromStorage = () => {
    const data = localStorage.getItem("todoApp");
    return data
      ? JSON.parse(data)
      : [
          {
            id: "yay69420",
            text: "Add new task ↑",
            completed: false,
            createdAt: 42,
            completedAt: null,
          },
        ];
  };

  handleAddKey = (e) => {
    if (e.key === "Enter") this.addTask();
  };

  render() {
    return (
      <Router>
        <DivAppContainer>
          <DivAddTaskBox>
            <InputAddTaskInput
              ref={this.InputAddTaskInput}
              onKeyPress={this.handleAddKey}
              type="text"
            />
            <Button onClick={this.addTask}>
              <TickIcon />
            </Button>
          </DivAddTaskBox>
          <DivTaskFilters>
            <NavLinkStyled to="/todo/all">All</NavLinkStyled>
            <NavLinkStyled to="/todo/active">Active</NavLinkStyled>
            <NavLinkStyled to="/todo/completed">Completed</NavLinkStyled>
          </DivTaskFilters>
          <DivTaskList>
            <Switch>
              <Redirect exact from="/todo" to="/todo/all" />
              <Route exact path="/todo/all">
                <Tasks
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                  toggleTask={this.toggleTask}
                  filterFunc={() => {
                    return true;
                  }}
                />
              </Route>
              <Route exact path="/todo/active">
                <Tasks
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                  toggleTask={this.toggleTask}
                  filterFunc={(task) => {
                    return !task.completed;
                  }}
                />
              </Route>
              <Route exact path="/todo/completed">
                <Tasks
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                  toggleTask={this.toggleTask}
                  filterFunc={(task) => {
                    return task.completed;
                  }}
                />
              </Route>
            </Switch>
          </DivTaskList>
        </DivAppContainer>
      </Router>
    );
  }
}

const Tasks = (props: {
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

const TickIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
