import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Plan lekcji ${process.env.NEXT_PUBLIC_SCHOOL_SHORT}`,
    short_name: `Plan lekcji ${process.env.NEXT_PUBLIC_SCHOOL_SHORT}`,
    description:
      `W prosty sposób sprawdź plan zajęć i zastępstwa dla różnych klas, nauczycieli oraz sal w ${process.env.NEXT_PUBLIC_SCHOOL_NAME_ACCUSATIVE}.`,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#EF0933",
    theme_color: "#EF0933",
    icons: [
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
