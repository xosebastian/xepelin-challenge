import { render, screen } from "@testing-library/react";

import { AccountForm } from "../features/account/account-form";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("AccountForm", () => {
  it("should render the form fields", () => {
    const { container } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText("Name")).toBeDefined();
    expect(screen.getByLabelText("Number")).toBeDefined();
    expect(screen.getByLabelText("Balance")).toBeDefined();
    expect(screen.getByRole("button", { name: "Create" })).toBeDefined();
  });
});
