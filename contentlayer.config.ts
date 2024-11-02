import { defineDocumentType, ComputedFields, defineNestedType } from "contentlayer2/source-files";
import { makeSource } from "contentlayer2/source-files";

import { writeFileSync } from "fs";
import path from "path";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from "pliny/mdx-plugins/index.js";

const Author = defineNestedType(() => ({
  name: "author",
  fields: {
    name: { type: "string" },
    avatar: { type: "string" },
  },
}));

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

export const Course = defineDocumentType(() => ({
  name: "Course",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "string", required: true },
    lastmod: { type: "string", required: true },
    author: { type: "nested", of: Author, required: true },
    draft: { type: "boolean", required: true },
    category: { type: "string", required: true },
    courseType: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    languages: { type: "string", required: true },
    difficulty: { type: "enum", required: true, options: difficultyLevels },
    timeEstimate: { type: "number", required: true },
    prerequisites: { type: "list", of: { type: "string" } },
    framework: { type: "string", required: true },
    starterCode: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/courses/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "list",
      resolve: (doc) => doc._raw.flattenedPath.split("/"),
    },
    sourceAsParams: {
      type: "list",
      resolve: (doc) => doc._raw.sourceFileDir.split("/"),
    },
  },
}));

export default makeSource({
  contentDirPath: path.join(process.cwd(), "public", "courses"),
  documentTypes: [Course],
  contentDirExclude: [
    ".github",
    ".gitignore",
    "LICENSE.md",
    "README.md",
    "STYLE.md",
    ".json",
  ],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
  },
});
