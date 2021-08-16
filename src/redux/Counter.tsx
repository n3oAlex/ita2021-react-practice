import {
  decrement,
  divide,
  increment,
  pow,
  powSelf,
  sqrt,
} from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import styled from "styled-components";

const DivCounterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
`;

const H1CounterValue = styled.h1`
  align-self: center;
`;

const counterSelector = (state) => state.counter.value;

export const Counter = () => {
  const count = useAppSelector(counterSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <H1CounterValue>{count}</H1CounterValue>
      <DivCounterButtons>
        <Button onClick={() => dispatch(increment(1))}>x + 1</Button>
        <Button onClick={() => dispatch(increment(2))}>x + 2</Button>
        <Button onClick={() => dispatch(pow(2))}>
          x<sup>2</sup>
        </Button>
        <Button onClick={() => dispatch(powSelf())}>
          x<sup>x</sup>
        </Button>
        <Button onClick={() => dispatch(decrement(1))}>x - 1</Button>
        <Button onClick={() => dispatch(decrement(2))}>x - 2</Button>
        <Button onClick={() => dispatch(divide(2))}>x / 2</Button>
        <Button onClick={() => dispatch(sqrt())}>√x</Button>
      </DivCounterButtons>
    </>
  );
};
