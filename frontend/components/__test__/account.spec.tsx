import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "@/redux/store"; // ajusta esta importación según tu estructura de archivos
import { Account } from "../features/account/account";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Account Component", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("should render AccountForm when accountId is not defined", () => {
    const { container } = render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/Create Account/i)).toBeDefined();
  });

  it("should render error message when axios post fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Something went wrong"));

    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId('accountName'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByTestId('accountNumber'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('balance'), { target: { value: 100 } });
      fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    });


    await waitFor(() => {
      expect(screen.getByText(/Ups!/i)).toBeDefined();
      expect(screen.getByText(/Something went wrong/i)).toBeDefined();
    });
  });

  it("should render account information when accountId is defined", async () => {
    const mockResponse = { data: { accountId: "1234" } };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId('accountName'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByTestId('accountNumber'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('balance'), { target: { value: 100 } });
      fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    });

    await waitFor(() => {
      expect(screen.getByText(/My Account/i)).toBeDefined();
      expect(screen.getByText(/id: 1234/i)).toBeDefined();
    });
  });



});
