import { fileUpload } from "../../src/helpers/fileUpload";

describe("Pruebas en fileUpload.js", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto1.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto1.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
