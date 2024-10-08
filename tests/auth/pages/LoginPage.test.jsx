import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

// para saber si se hizo clic, con que argumentos.... se llama aquí afuera
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en <LoginPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar el componente correctamente", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    // screen.debug();

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("boton de google debe de llamar el startGoogleSignIn", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "geovanni@google.com";
    const password = "123456";

    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    // expect(mockStartLoginWithEmailPassword).toHaveBeenCalledTimes(1);
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
