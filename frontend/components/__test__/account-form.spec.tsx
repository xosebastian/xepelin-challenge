import { render, screen, fireEvent, act } from '@testing-library/react';
import { AccountForm } from '../features/account/account-form';


describe('AccountForm', () => {
  let onSubmitMock = jest.fn();

  beforeEach(() => {
    render(<AccountForm onSubmit={onSubmitMock} />);
  });

  it("should render the Xeplin Bank link", () => {
    const { container } = render(<AccountForm onSubmit={onSubmitMock} />);
    expect(container).toMatchSnapshot();
  });

  it('should render account name input', () => {
    expect(screen.getByTestId('accountName')).toBeDefined();
  });

  it('should render account number input', () => {
    expect(screen.getByTestId('accountNumber')).toBeDefined();
  });

  it('should render balance input', () => {
    expect(screen.getByTestId('balance')).toBeDefined();
  });

  it('should render create button', () => {
    expect(screen.getByRole('button', { name: 'Create' })).toBeDefined();
  });

  it('should call onSubmit when the form is submitted', async () => {
    await act(async () => {
      fireEvent.change(screen.getByTestId('accountName'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByTestId('accountNumber'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('balance'), { target: { value: 100 } });
      fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
