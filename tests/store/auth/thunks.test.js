import { signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  test("debe de invocar el checkingCredentials", async () => {
    // En esta prueba verificamos que el dispatch se haya sido llamado con este valor "checkingCredentials"
    // No es necesario evaluar "checkingCredentials", porque ya lo hicimos en el Slice.

    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
