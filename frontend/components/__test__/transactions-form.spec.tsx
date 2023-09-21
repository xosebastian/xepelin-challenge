import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransactionsForm } from "../features/transactions/transactions-form";

describe("TransactionsForm", () => {
  it("should render the form with the correct fields", () => {
    const onSubmit = jest.fn();
    const { container } = render(<TransactionsForm onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
    expect(screen.findAllByLabelText("Operation Type")).toBeDefined();
    expect(screen.getAllByTestId("balance")).toBeDefined();
  });

  it("should submit the form with the correct values", async () => {
    const onSubmit = jest.fn();
    render(<TransactionsForm onSubmit={onSubmit} />);

    const balanceInput = screen.getByTestId("balance");
    const submitButton = screen.getByRole("button", { name: "Execute" });
    await act(async () => {
      await userEvent.type(balanceInput, "100");
      fireEvent.click(submitButton);
    });

    expect(onSubmit).toBeCalled();
  });
});
