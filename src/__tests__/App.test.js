import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
describe('Portfolio Elements', () => {
  test("displays a top-level heading with the text `Hi, I'm _______`", () => {
    render(<App />);
    const topLevelHeading = screen.getByRole("heading", {
      name: /hi, i'm/i,
      exact: false,
      level: 1,
    });
    expect(topLevelHeading).toBeInTheDocument();
  });

  test("displays an image of yourself", () => {
    render(<App />);
    const image = screen.getByAltText("My profile pic");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
  });

  test("displays second-level heading with the text `About Me`", () => {
    render(<App />);
    const secondLevelHeading = screen.getByRole("heading", {
      name: /about me/i,
      level: 2,
    });
    expect(secondLevelHeading).toBeInTheDocument();
  });

  test("displays a paragraph for your biography", () => {
    render(<App />);
    const bio = screen.getByText(/lorem ipsum/i);
    expect(bio).toBeInTheDocument();
  });

  test("displays the correct links", () => {
    render(<App />);
    const githubLink = screen.getByRole("link", {
      name: /github/i,
    });
    const linkedinLink = screen.getByRole("link", {
      name: /linkedin/i,
    });
    expect(githubLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://github.com")
    );
    expect(linkedinLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://linkedin.com")
    );
  });
});


describe('Newsletter Form', () => {
 
  test("the form includes text inputs for name and email address", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("the form includes three checkboxes to select areas of interest", () => {
    render(<App />);
    const webDevCheckbox = screen.getByRole('checkbox', { name: /web development/i });
    const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
    const marketingCheckbox = screen.getByRole('checkbox', { name: /marketing/i });
    expect(webDevCheckbox).toBeInTheDocument();
    expect(designCheckbox).toBeInTheDocument();
    expect(marketingCheckbox).toBeInTheDocument();
  });

  test("the checkboxes are initially unchecked", () => {
    render(<App />);
    const webDevCheckbox = screen.getByRole('checkbox', { name: /web development/i });
    const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
    const marketingCheckbox = screen.getByRole('checkbox', { name: /marketing/i });
    expect(webDevCheckbox).not.toBeChecked();
    expect(designCheckbox).not.toBeChecked();
    expect(marketingCheckbox).not.toBeChecked();
  });

  test("the page shows information the user types into the name and email address form fields", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    userEvent.type(emailInput, 'john.doe@example.com');
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test("checked status of checkboxes changes when user clicks them", () => {
    render(<App />);
    const webDevCheckbox = screen.getByRole('checkbox', { name: /web development/i });
    const designCheckbox = screen.getByRole('checkbox', { name: /design/i });

    userEvent.click(webDevCheckbox);
    expect(webDevCheckbox).toBeChecked();

    userEvent.click(designCheckbox);
    expect(designCheckbox).toBeChecked();
    expect(webDevCheckbox).toBeChecked(); 

    userEvent.click(webDevCheckbox);
    expect(webDevCheckbox).not.toBeChecked();
    expect(designCheckbox).toBeChecked(); 
  });

  test("a message is displayed when the user clicks the Submit button", async () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    userEvent.type(nameInput, 'Test User');
    userEvent.type(emailInput, 'test@example.com');
    userEvent.click(submitButton);

    
    expect(screen.getByText(/thank you for signing up/i)).toBeInTheDocument();
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
  });
});