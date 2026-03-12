import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default async function Icon() {
  const imagePath = path.join(process.cwd(), "public", "profile.png");
  const imageBuffer = await readFile(imagePath);
  const imageBase64 = imageBuffer.toString("base64");
  const imageSrc = `data:image/png;base64,${imageBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={imageSrc}
          alt="Moeid Heidari"
          width={64}
          height={64}
          style={{
            borderRadius: "9999px",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
