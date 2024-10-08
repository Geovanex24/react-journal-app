import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

// cloudinary.config({
//   cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
//   api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
//   secure: true,
// });
cloudinary.config({
  cloud_name: "cursos-geo",
  api_key: 859392555734239,
  api_secret: "toiiUnq4Q1HD3MJc_MaV-CNls24",
  secure: true,
});

describe("Pruebas en fileUpload.js", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto1.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // console.log(url);
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const cloud_resp = await cloudinary.api.delete_resources([imageId]);
    // console.log(cloud_resp);
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto1.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
