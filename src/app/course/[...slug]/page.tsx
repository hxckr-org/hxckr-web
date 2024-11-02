import { mdxComponents } from "@/app/components/mdxComponents"
import { allCourses } from "contentlayer/generated"
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  const courses = allCourses.map((course) => ({
    // use slugAsParams to follow the pattern `/course/simple-multisig-wallet/instructions`
    // slug: course.slugAsParams,
    slug: course.sourceAsParams,
  }))
  return courses
}

export default function CoursePage({ params }: { params: { slug: string[] } }) {
  const stringSlug = params.slug.join("/")
  const course = allCourses.find((course) => course._raw.sourceFileDir === stringSlug)
  console.log(course?.title)

  if (!course) notFound()

  const MDXContent = useMDXComponent(course?.body.code)

  return (
    <div>
      <h1>Course Page</h1>
      <MDXContent components={mdxComponents} />
    </div>
  )
}