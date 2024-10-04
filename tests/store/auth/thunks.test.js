import {
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
} from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers"); // mock de todos los providers... signInWithGoogle...

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  test("debe de invocar el checkingCredentials", async () => {
    // En esta prueba verificamos que el dispatch se haya sido llamado con este valor "checkingCredentials"
    // No es necesario evaluar "checkingCredentials", porque ya lo hicimos en el Slice.

    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData); // ya es un mock, por la línea del principio. Gracias a ello podemos simular su uso

    //thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Error al iniciar sesión Google",
    };

    await signInWithGoogle.mockResolvedValue(loginData);

    //thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        uid: demoUser.uid,
        displayName: demoUser.displayName,
        email: demoUser.email,
        photoURL: demoUser.photoURL,
      })
    );
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Error al iniciar sesión con email y password",
    };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });
});
