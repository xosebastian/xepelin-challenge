import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { Deposit } from "../deposit";
import { create } from "@/redux/features/account-slice";

describe("Deposit", () => {
  beforeEach(() => {
    store.dispatch({
      type: "account/reset",
    });
  });

  it("should render a message when accountId is not defined", () => {
    const { container } = render(
      <Provider store={store}>
        <Deposit />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Desposit to account")).toBeDefined();
  });

  it("should render the DepositForm when accountId is defined", () => {
    store.dispatch(
      create({
        id: "user-id",
      })
    );

    const { container } = render(
      <Provider store={store}>
        <Deposit />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.queryByText("Desposit to account")).toBeNull();
  });
});
