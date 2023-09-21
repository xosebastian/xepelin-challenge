import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AccountBalance } from "../features/account/account-balance";
import { create, update, clear } from "@/redux/features/account-slice";


describe("AccountBalance", () => {

  beforeEach(() => {
    store.dispatch(clear());
  });

  it("should render the account balance when the balance is defined", () => {
    const balance = 100.0;

    store.dispatch(create({
      id: "user-id"
    }));
 
    store.dispatch(update({
      balance
    }));

    const { container } = render(
      <Provider store={store}>
        <AccountBalance/>
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('balance').textContent).toEqual(`$ ${balance}`);
  });

  it("should render an error message when the balance is not defined", () => {
    

    

    const { container } = render(
      <Provider store={store}>
        <AccountBalance  />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('balance').textContent).toEqual(`$ 0`);
  });
});