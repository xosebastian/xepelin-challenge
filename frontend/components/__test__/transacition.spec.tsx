import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Transactions } from "../features/transactions/transactions";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { create, clear } from "@/redux/features/account-slice";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Transactions component", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
    store.dispatch(clear());
  });

  it("renders the account operations section", () => {
    store.dispatch(
      create({
        id: "user-id",
      })
    );

    const { container } = render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    const accountOperations = screen.getByText("Account Operations");
    expect(accountOperations).toBeDefined();
  });

  it("shows a success toast when transaction is successful", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { balance: 100 },
    });

    store.dispatch(
      create({
        id: "user-id",
      })
    );

    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );
    const balanceInput = screen.getByTestId("balance");
    const submitButton = screen.getByRole("button", { name: "Execute" });
    await act(async () => {
      await userEvent.type(balanceInput, "100");
      fireEvent.click(submitButton);
    });

    const balance = store.getState().account.balance;

    expect(balance).toEqual(100);
  });

  it("shows an error message when transaction fails", async () => {
    store.dispatch(
      create({
        id: "user-id",
      })
    );

    mockedAxios.post.mockRejectedValueOnce({
        message: "Insufficient funds",
    });
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );
    const balanceInput = screen.getByTestId("balance");
    const submitButton = screen.getByRole("button", { name: "Execute" });
    await act(async () => {
      await userEvent.type(balanceInput, "100");
      fireEvent.click(submitButton);
    });
    expect(screen.getByText("Insufficient funds")).toBeDefined();
  });

  it("shows a generic error message when transaction fails with no error message", async () => {
    store.dispatch(
      create({
        id: "user-id",
      })
    );
    mockedAxios.post.mockRejectedValueOnce({});
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );
    const balanceInput = screen.getByTestId("balance");
    const submitButton = screen.getByRole("button", { name: "Execute" });
    await act(async () => {
      await userEvent.type(balanceInput, "100");
      fireEvent.click(submitButton);
    });
    expect(screen.getByText("Something went wrong")).toBeDefined();
  });
});
