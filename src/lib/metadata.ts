import type { JSX } from "react";

export type StringNumber = `${number}`;
export type StringBoolean = `${boolean}`;

export type ExtractUnionStrict<T, U extends T> = Extract<T, U>;
export type ExcludeUnionStrict<T, U extends T> = Exclude<T, U>;

type Meta = JSX.IntrinsicElements["meta"];

type ViewportWidthHeightValues =
  | StringNumber
  | "device-width"
  | "device-height";

interface Viewport {
  width?: ViewportWidthHeightValues;
  height?: ViewportWidthHeightValues;
  "initial-scale"?: StringNumber;
  "minimum-scale"?: StringNumber;
  "maximum-scale"?: StringNumber;
  "user-scalable"?: "yes" | "no" | "1" | "0";
  "viewport-fit"?: "auto" | "contain" | "cover";
  [key: string]: unknown;
}

interface Metadata {
  charSet?: "utf-8";
  title?: string;
  description?: string;
  viewport?: Viewport;
  author?: string;
  robots?: string;
  keywords?: string;
}

export function createMetadata(metadata: Metadata): Meta[] {
  const meta: Meta[] = [];

  if (metadata.charSet) {
    meta.push({ charSet: metadata.charSet });
  }

  if (metadata.title) {
    meta.push({ title: metadata.title });
  }

  if (metadata.viewport) {
    const viewport = Object.entries(metadata.viewport)
      .map(([key, value]) => `${key}=${value}`)
      .join(", ");

    meta.push({ name: "viewport", content: viewport });
  }

  addMetaTag("name", "description", metadata.description);
  addMetaTag("name", "author", metadata.author);
  addMetaTag("name", "robots", metadata.robots);
  addMetaTag("name", "keywords", metadata.keywords);

  addMetaTag("property", "og:title", metadata.title);
  addMetaTag("property", "og:description", metadata.description);
  addMetaTag("name", "twitter:title", metadata.title);
  addMetaTag("name", "twitter:description", metadata.description);

  function addMetaTag(
    keyType: "name" | "property",
    keyName: string,
    content?: string
  ) {
    if (typeof content === "string" && content?.trim() !== "") {
      meta.push({ [keyType]: keyName, content });
    }
  }

  return meta;
}
