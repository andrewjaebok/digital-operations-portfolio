import ProjectCategory, { type ProjectCard } from "../../components/ProjectCategory";

const description = "Independent projects in finance, consumer products, and mobile games.";
export const metadata = { title: "Personal Projects | Andrew", description };

const projects: ProjectCard[] = [
  {
    slug: "hearth",
    title: "LumaFi",
    summary: "A personal finance app that shows households what they can safely spend this month.",
    preview: { src: "/images/lumafi/dashboard-v21-1.webp", width: 1440, height: 960, layout: "top" },
  },
  {
    slug: "gogi-snacks",
    title: "Gogi Snacks",
    summary: "Packaging concepts and supplier samples for a Korean barbecue jerky chip.",
    preview: { src: "/images/personal-projects/gogi-packaging.webp", width: 1280, height: 853 },
  },
  {
    slug: "emberwake",
    title: "EmberWake",
    summary: "A playable mobile RPG prototype covering hero selection, combat, and rewards.",
    preview: { src: "/images/personal-projects/emberwake-home.webp", width: 598, height: 936, layout: "contain" },
  },
];

export default function CategoryPage() {
  return <ProjectCategory categoryId="personal-projects" description={description} projects={projects} />;
}
