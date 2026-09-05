export interface SkillGroup {
  category: string;
  importAlias: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    importAlias: "languages",
    skills: ["C++", "C", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Backend / Web",
    importAlias: "backend",
    skills: ["Flask", "REST APIs", "React", "Next.js", "PostgreSQL", "SQLite", "SQLAlchemy"],
  },
  {
    category: "AI / ML",
    importAlias: "ai_ml",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas"],
  },
  {
    category: "Systems",
    importAlias: "systems",
    skills: ["Git", "GitHub", "SUMO", "TraCI", "Docker"],
  },
  {
    category: "Core CS",
    importAlias: "core_cs",
    skills: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Blockchain Technology",
    ],
  },
];
