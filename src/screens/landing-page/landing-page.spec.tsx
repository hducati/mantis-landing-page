import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event';

import { LandingPage } from "./landing-page"

jest.mock('../../hooks/use-users/use-users', () => {
  return {
    useUsers: () => {
      return {
        users: [],
        createUser: jest.fn()
      }
    }
  }
})

describe('LandingPage', () => {
  it("should be render inputs correctly", () => {
    render(<LandingPage />)

    const firstName = screen.getByPlaceholderText(/enter your first name/i);
    const lastName = screen.getByPlaceholderText(/enter your last name/i);
    const email = screen.getByPlaceholderText(/enter email/i);
    const phoneNumber = screen.getByPlaceholderText(/enter your phone/i)
    const age = screen.getByRole("slider")
    const country = screen.getByRole("combobox")
    const olderCheckbox = screen.getByRole("checkbox")

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(olderCheckbox).toBeInTheDocument();
    expect(age).toBeInTheDocument();
    expect(country).toBeInTheDocument();
  });

  it("should not be able to submit form is input are incorrectly", () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(<LandingPage />)

    const firstNameInput = screen.getByPlaceholderText(/enter your first name/i);
    const button = screen.getByRole("button")

    userEvent.type(firstNameInput, "henrique")
    userEvent.click(button)

    expect(history.location.pathname).toBe('/')
  })

  it("should be able to submit when inputs are correct", async () => {
    const history: MemoryHistory = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router history={history}>
        <LandingPage />
      </Router>
    )

    const firstNameInput = screen.getByPlaceholderText(/enter your first name/i);
    const lastNameInput = screen.getByPlaceholderText(/enter your last name/i);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const phoneInput = screen.getByPlaceholderText(/enter your phone/i)
    const age = screen.getByRole("slider")
    const countryOption = screen.getByRole("option", { name: 'JP'})
    const olderCheckbox = screen.getByRole("checkbox")
    const button = screen.getByRole("button")

    userEvent.type(firstNameInput, "john")
    userEvent.type(lastNameInput, "doe")
    userEvent.type(emailInput, "johndoe@gmail.com")
    userEvent.type(phoneInput, "+55 (19) 97124-2842")
    fireEvent.change(age, { target: { value: 22 }})
    userEvent.click(countryOption)
    userEvent.click(olderCheckbox)

    userEvent.click(button)

    await waitFor(() => button)

    expect(history.location.pathname).toBe('/confirmation')
  })
})