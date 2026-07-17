"use client";

import { useEffect, useState } from "react";

type ProgressSection = { id: string; label: string; icon: string };

export default function CaseProgress({ sections }: { sections: ProgressSection[] }) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id || "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 100);

      const marker = window.innerHeight * 0.32;
      let current = sections[0]?.id || "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) current = section.id;
      }
      setActiveId(current);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sections]);

  const activeSection = sections.find((section) => section.id === activeId) || sections[0];

  return (
    <aside className="case-progress" aria-label="Case study progress">
      <div className="case-progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <button type="button" className="case-progress-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span className="case-progress-orbit" aria-hidden="true"><i style={{ transform: `rotate(${progress * 3.6}deg)` }} /></span>
        <span><small>{Math.round(progress)}% complete</small><b>{activeSection?.icon} {activeSection?.label}</b></span>
        <em aria-hidden="true">{open ? "×" : "⌃"}</em>
      </button>
      {open && <nav className="case-progress-menu" aria-label="Jump to case study section">
        {sections.map((section) => <a key={section.id} className={section.id === activeId ? "active" : ""} href={`#${section.id}`} onClick={() => setOpen(false)}><span aria-hidden="true">{section.icon}</span>{section.label}</a>)}
      </nav>}
    </aside>
  );
}
