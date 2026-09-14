// Every photograph, the petal and the song live in Cloudinary, in the
// `leisthercristine` folder of the dopunn7eb cloud — not in public/. That
// keeps ~130 MB of media out of the Vercel deployment. A file uploaded to that
// folder through the Media Library is addressed by its bare filename here.
const BASE = "https://res.cloudinary.com/dopunn7eb";
const FOLDER = "leisthercristine";

export function cloudinary(
  file: string,
  transform = "",
  type: "image" | "video" = "image"
): string {
  return `${BASE}/${type}/upload/${transform && `${transform}/`}${FOLDER}/${file}`;
}
