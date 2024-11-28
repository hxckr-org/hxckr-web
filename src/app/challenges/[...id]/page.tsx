import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/app/components/layout/dashboard";
import NestedChallenges from "@/app/components/sections/nested-challenges";
import { allDocuments } from "contentlayer/generated";

export default async function page({ params }: { params: { id: string[] } }) {
  const slug = params.id;

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const extractPageData = () => {
    const courses = allDocuments;
    const sluggify = (str: string) => str.toLowerCase().replaceAll(" ", "-");

    // Get the base challenge (without modules)
    const baseChallenge = courses.filter((doc) => sluggify(doc.url) === `/${slug.join("/")}`);
    const challengeSlugs = baseChallenge[0]?.slugAsParams;

    if (!baseChallenge) {
      return { baseChallenge: [], modulesChallenges: [], title: slug[0] };
    }

    // Get all module challenges
    const modulesChallenges = courses.filter((doc) => doc.slugAsParams.includes(challengeSlugs?.[0] || "") && doc.slugAsParams.length > 2);

    return {
      baseChallenge: baseChallenge.length > 0 ? [baseChallenge[0]] : [],
      modulesChallenges,
      title: slug[0],
    };
  };

  const { baseChallenge, modulesChallenges } = extractPageData();

  return (
    <DashboardLayout session={session}>
      <NestedChallenges challengeModules={modulesChallenges} challenge={baseChallenge[0]!} />
    </DashboardLayout>
  );
}
