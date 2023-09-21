import { render, screen } from "@testing-library/react";
import { MainNav } from "../main-nav";


describe("MainNav", () => {
  it("should render the Xeplin Bank link", () => {
    const { container } = render(<MainNav />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Xeplin Bank")).toBeDefined();
  });
});