import "./DemoLaunchLink.css";

const icons = {
  preview: "⊞",
  world: "◇",
  play: "▶",
};

type DemoLaunchLinkProps = {
  href: string;
  label: string;
  description: string;
  kind: keyof typeof icons;
  newTab?: boolean;
};

export default function DemoLaunchLink({ href, label, description, kind, newTab }: DemoLaunchLinkProps) {
  return (
    <a
      className={`demo-launch demo-launch--${kind}`}
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener" : undefined}
    >
      <span className="demo-launch-icon" aria-hidden="true">{icons[kind]}</span>
      <span className="demo-launch-copy">
        <strong>{label}</strong>
        <span>{description}</span>
      </span>
    </a>
  );
}
