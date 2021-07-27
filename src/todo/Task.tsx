import { Component } from "react";
import styled from "styled-components";

const DivStyledTask = styled.div<{ completed: boolean }>`
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2em;
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #114068;
  border-radius: 10px;
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  & > svg {
    height: 2em;
  }
`;

type Props = {
  task: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    completedAt: number | null;
  };
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

export class Task extends Component<Props, {}> {
  render() {
    return (
      <DivStyledTask completed={this.props.task.completed}>
        <h2>{this.props.task.text}</h2>
        <div>
          <Button
            onClick={() => {
              this.props.toggleTask(this.props.task.id);
            }}
          >
            <TickIcon />
          </Button>
          <Button
            onClick={() => {
              this.props.deleteTask(this.props.task.id);
            }}
          >
            <TrashIcon />
          </Button>
        </div>
      </DivStyledTask>
    );
  }
}

const TickIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const TrashIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);
