"use client";

import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { phases, skills, resources } from "@/data/learningData";
import { useLocalStorage } from "@/lib/useLocalStorage";



export default function HomePage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme =
    theme === "system" ? systemTheme || "system" : theme || "system";

  const [skillProgress, setSkillProgress, hydrated] = useLocalStorage(
    "ps-roadmap-skill-progress",
    {}
  );

  const [phaseOpen, setPhaseOpen] = useLocalStorage(
    "ps-roadmap-phase-open",
    {}
  );

  const [selectedCategory, setSelectedCategory] = useState("all");

  const totalSkills = skills.length;
  const completedSkills = useMemo(
    () => skills.filter((s) => skillProgress[s.id]).length,
    [skillProgress]
  );
  const overallCompletion =
    totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

  const toggleSkill = (id) => {
    setSkillProgress((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const togglePhaseOpen = (id) => {
    setPhaseOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filterSkillsByCategory = (skill) => {
    if (selectedCategory === "all") return true;
    return skill.category === selectedCategory;
  };

  const categoryLabel = {
    all: "All",
    sql: "SQL",
    aws: "AWS / Cloud",
    scripting: "Scripting",
    observability: "Observability / APIs",
    soft: "Soft Skills",
  };

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">Loading your roadmap…</p>
      </main>
    );
  }

  return (
<main className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Production Support / Cloud Ops Roadmap
          </h1>
<p className="text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
            From Service Desk at Taco Bell to Production Support / Cloud Ops
            engineer. Track your progress, phase by phase, and use this as your
            personal launchpad.
          </p>



    {/* Theme toggle */}
    {mounted && (
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          Theme:{" "}
          {theme === "system"
            ? `System (${currentTheme || "detecting..."})`
            : currentTheme === "dark"
            ? "Dark"
            : "Light"}
        </span>
        <button
          onClick={() => {
            // cycle: system → light → dark → system
            if (theme === "system") {
              setTheme("light");
            } else if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("system");
            }
          }}
          className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === "system"
            ? "Use Light"
            : theme === "light"
            ? "Use Dark"
            : "Use System"}
        </button>
      </div>
    )}

          {/* Progress */}
          <section className="mt-4">
            <div className="flex justify-between items-center mb-2 text-sm text-slate-300">
              <span>Overall skill completion</span>
              <span>
                {completedSkills}/{totalSkills} skills • {overallCompletion}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-300 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
          </section>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Roadmap Phases */}
          <section className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Roadmap</h2>
            {phases.map((phase) => {
              const phaseSkills = skills.filter((s) =>
                phase.skillIds.includes(s.id)
              );
              const completedInPhase = phaseSkills.filter(
                (s) => skillProgress[s.id]
              ).length;
              const phaseCompletion =
                phaseSkills.length === 0
                  ? 0
                  : Math.round(
                      (completedInPhase / phaseSkills.length) * 100
                    );

              const isOpen = phaseOpen[phase.id] ?? true;

              return (
                <article
                  key={phase.id}
className="border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-xl p-4 shadow-md"
                >
                  <button
                    className="w-full flex justify-between items-center text-left"
                    onClick={() => togglePhaseOpen(phase.id)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{phase.title}</h3>
                      <p className="text-xs text-slate-400">
                        {phase.timeframe} • {phase.goal}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-400">
                        {completedInPhase}/{phaseSkills.length} skills
                      </span>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${phaseCompletion}%` }}
                          />
                        </div>
                        <span>{phaseCompletion}%</span>
                      </div>
                      <span className="text-slate-400 text-xs">
                        {isOpen ? "Collapse" : "Expand"}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm text-slate-300">
                        {phase.description}
                      </p>

                      {/* Phase skills list */}
                      {phaseSkills.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Skills in this phase
                          </p>
                          <ul className="space-y-1">
                            {phaseSkills.map((skill) => (
                              <li
                                key={skill.id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500"
                                    checked={!!skillProgress[skill.id]}
                                    onChange={() => toggleSkill(skill.id)}
                                  />
                                  <span>{skill.label}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Resources */}
                      {phase.resourceIds.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            Suggested resources
                          </p>
                          <ul className="space-y-1 text-sm">
                            {phase.resourceIds.map((resId) => {
                              const res = resources.find(
                                (r) => r.id === resId
                              );
                              if (!res) return null;
                              return (
                                <li key={res.id}>
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline text-emerald-400 hover:text-emerald-300"
                                  >
                                    {res.title}
                                  </a>{" "}
                                  <span className="text-xs text-slate-400">
                                    ({res.type})
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          {/* Skills Checklist */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold">Skills Checklist</h2>
              <button
                className="text-xs text-slate-400 hover:text-emerald-400"
                onClick={() => {
                  const all = {};
                  skills.forEach((s) => {
                    all[s.id] = false;
                  });
                  setSkillProgress(all);
                }}
              >
                Reset all
              </button>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 text-xs">
              {["all", "sql", "aws", "scripting", "observability", "soft"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full border ${
                      selectedCategory === cat
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {categoryLabel[cat]}
                  </button>
                )
              )}
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2">
              {skills.filter(filterSkillsByCategory).map((skill) => (
                <div
                  key={skill.id}
className="flex items-center justify-between rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/70 px-3 py-2 shadow-sm"
                >
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500"
                      checked={!!skillProgress[skill.id]}
                      onChange={() => toggleSkill(skill.id)}
                    />
                    <span>{skill.label}</span>
                  </label>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    {categoryLabel[skill.category]}
                  </span>
                </div>
              ))}
            </div>

            {/* Resources quick list */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h3 className="text-sm font-semibold">Resource Library</h3>
              <ul className="space-y-1 text-xs text-slate-300">
                {resources.map((res) => (
                  <li key={res.id}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-emerald-400 hover:text-emerald-300"
                    >
                      {res.title}
                    </a>{" "}
                    <span className="text-slate-500">({res.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <footer className="pt-4 border-t border-slate-900 text-xs text-slate-500">
          <p>
            This roadmap is tailored around Production Support / Cloud Ops roles
            like Taco Bell&apos;s Menu Middleware Production Support Analyst —
            but the skills are transferable to cloud &amp; platform roles
            anywhere.
          </p>
        </footer>
      </div>
    </main>
  );
}
