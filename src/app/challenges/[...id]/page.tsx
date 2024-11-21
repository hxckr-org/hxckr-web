import React from "react";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { DashboardLayout } from "@/app/components/layout/dashboard";
import NestedChallanges from "@/app/components/sections/nested-challenges";
import { allDocuments } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import { mdxComponents } from "@/app/components/mdxComponents";

export default async function page({ params }: { params: { id: string[] } }) {
  const slug = params.id;
  console.log({ slug });

  const data = {};

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const extractPageData = () => {
    const courses = allDocuments;

    // Find the correct base slug by matching the title
    const titleToMatch = slug[0].replaceAll("-", " ");

    const baseSlug = courses.find(
      (doc) =>
        doc.title.toLowerCase().replace(/-|\s/g, "") ===
        titleToMatch.toLowerCase().replace(/-|\s/g, "")
    )?.slugAsParams[0];

    console.log("Found base slug:", baseSlug);

    if (!baseSlug) {
      return { baseChallenge: [], modulesChallenges: [], title: slug[0] };
    }

    // Get the base challenge (without modules)
    const baseChallenge = courses.filter(
      (doc) => doc.slugAsParams.length === 2 && doc.slugAsParams[0] === baseSlug
    );

    // Get all module challenges
    const modulesChallenges = courses.filter(
      (doc) =>
        doc.slugAsParams.length === 3 &&
        doc.slugAsParams[0] === baseSlug &&
        doc.action
    );

    return {
      baseChallenge: baseChallenge.length > 0 ? [baseChallenge[0]] : [],
      modulesChallenges,
      title: slug[0],
    };
  };

  const { baseChallenge, modulesChallenges, title } = extractPageData();
  // console.log({ baseChallenge, modulesChallenges });
  console.log(baseChallenge[0]?.body.raw);

  return (
    <DashboardLayout session={session}>
      <NestedChallanges
        data={data}
        title={title}
        challengeModules={modulesChallenges}
        challenge={baseChallenge[0]!}
      />
    </DashboardLayout>
  );
}
