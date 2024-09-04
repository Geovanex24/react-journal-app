import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider(); // instancia del servicio
googleProvider.setCustomParameters({ prompt: "select_account" }); // permite seleccionar el usuario en caso de que haya múltiples cuentas de Google activas en el navegador.

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info

      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};
