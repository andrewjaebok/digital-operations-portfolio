import ProjectCategory, { type ProjectCard } from "../../components/ProjectCategory";

const description = "Customer experiences, from friction to launch.";
export const metadata = { title: "Digital Operations | Andrew", description };

const projects: ProjectCard[] = [
  {
    slug: "customer-portal-redesign",
    title: "Regional Utility Customer Portal",
    summary: "Finding the right location took 10–15 seconds in a retrospective test, down from 30–60 seconds.",
    preview: { src: "/images/utility-portal/portal-after.png", width: 1212, height: 896, layout: "top" },
  },
  {
    slug: "prescription-pad-ordering-portal",
    title: "Prescription Pad Ordering",
    summary: "Four recurring types of support questions dropped to zero in the two months after launch.",
    preview: { src: "/images/rx-pad-portal/order-after.png", width: 1224, height: 827, layout: "top" },
  },
  {
    slug: "university-logo-directory",
    title: "University Logo Directory",
    summary: "A searchable prototype helps staff find logos by familiar names and confirm the full organization path.",
    preview: { src: "/images/university-logo-directory/redesigned-directory.jpg", width: 1200, height: 1012, layout: "top" },
  },
];

export default function CategoryPage() {
  return <ProjectCategory categoryId="product-operations" description={description} projects={projects} />;
}
