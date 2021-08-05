import { ResetIcon } from "./Icons";
import styled from "styled-components";

const ButtonReset = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  align-self: center;
  transition: 300ms linear;
  margin-inline: 1rem;
  :hover {
    cursor: pointer;
    transform: rotate(-180deg);
  }
  :active {
    cursor: default;
    transform: rotate(-360deg);
  }
`;

export const Reset = ({ reset }: { reset: () => void }) => (
  <ButtonReset
    onClick={() => {
      reset();
    }}
  >
    <ResetIcon />
  </ButtonReset>
);
