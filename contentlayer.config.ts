import { defineDocumentType, defineNestedType } from "contentlayer2/source-files";
import { makeSource } from "contentlayer2/source-files";

import path from "path";

// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { remarkExtractFrontmatter, remarkCodeTitles, remarkImgToJsx } from "pliny/mdx-plugins/index.js";

const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string" },
    avatar: { type: "string" },
  },
}));

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export type DifficultyLevel = (typeof difficultyLevels)[number];

export const Course = defineDocumentType(() => ({
  name: "Course",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    date: { type: "string" },
    action: { type: "string" },
    lastmod: { type: "string" },
    author: { type: "nested", of: Author },
    draft: { type: "boolean" },
    category: { type: "string" },
    courseType: { type: "string" },
    tags: { type: "list", of: { type: "string" } },
    languages: { type: "list", of: { type: "string" } },
    difficulty: { type: "enum", options: difficultyLevels },
    timeEstimate: { type: "number" },
    prerequisites: { type: "list", of: { type: "string" } },
    starterCode: { type: "string" },
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
  contentDirExclude: [".github", ".gitignore", "LICENSE.md", "README.md", "STYLE.md", ".json"],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkExtractFrontmatter, remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx],
  },
});
