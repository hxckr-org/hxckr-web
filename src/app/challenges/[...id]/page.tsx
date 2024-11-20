import React from "react";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { DashboardLayout } from "@/app/components/layout/dashboard";
import NestedChallanges from "@/app/components/sections/nested-challenges";
import { allDocuments } from "contentlayer/generated";

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
    const sluggify = (str: string) => str.toLowerCase().replaceAll(" ", "-");

    const challenge = courses.find((doc) => sluggify(doc.title) === slug[0]);
    const challengeSlugs = challenge?.slugAsParams;

    const challengeModules = courses.filter((doc) => doc.slugAsParams.includes(challengeSlugs[0]) && doc.slugAsParams.length > 2);

    return {
      challenge,
      challengeModules,
    };
  };

  const { challenge, challengeModules } = extractPageData();

  return (
    <DashboardLayout session={session}>
      <NestedChallanges data={data} title={slug[0]} challengeModules={challengeModules} challenge={challenge!} />
    </DashboardLayout>
  );
}
