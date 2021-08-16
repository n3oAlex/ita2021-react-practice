import { Counter } from "./Counter";
import { Provider } from "react-redux";
import { store } from "./store";

export const ReduxCounter = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};
