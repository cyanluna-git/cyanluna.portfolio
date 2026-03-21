"use client";

import { useEffect, useState } from "react";

export type PrivateNavSection = {
  id: string;
  label: string;
};

export default function PrivateSideNav({
  sections,
}: {
  sections: PrivateNavSection[];
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden xl:block fixed left-[calc(50%-480px-160px)] top-1/3 w-36 print:hidden">
      <ul className="space-y-1.5">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block text-xs py-1 px-2 rounded transition-colors ${
                active === section.id
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
