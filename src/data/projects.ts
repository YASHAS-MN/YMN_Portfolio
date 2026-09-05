export interface Project {
  id: string;
  title: string;
  filename: string;
  role: string;
  tagline: string;           // one-liner for collapsed card view
  description: string;
  bullets: string[];
  tags: string[];
  primaryTags: string[];     // 3 max — shown in collapsed view
  link: string;
}

export const projects: Project[] = [
  {
    id: "sentinel",
    title: "Sentinel",
    filename: "sentinel.ts",
    role: "Developer",
    tagline: "Continuous behavioral authentication via 37-dim telemetry + anomaly detection.",
    description:
      "A real-time behavioral authentication system — captures keystroke, mouse, and scroll telemetry, extracts a 37-dimensional feature vector, and detects anomalies live through a Flask API.",
    bullets: [
      "Isolation Forest + EMA-based trust smoothing driving adaptive Full/Step-Up/Restrict/Lock access policies",
      "Credentials secured with Argon2id",
    ],
    tags: ["Python", "Flask", "ML", "Security", "Anomaly Detection"],
    primaryTags: ["Python", "Flask", "Security"],
    link: "https://github.com/YASHAS-MN/Senitel",
  },
  {
    id: "snapfix",
    title: "SnapFix",
    filename: "snapfix.ts",
    role: "Lead Developer",
    tagline: "AI-powered civic reporting — Telegram bot routes issues to city departments automatically.",
    description:
      "A civic reporting platform where citizens report issues via a Telegram bot or dashboard, and AI automatically classifies, prioritizes, and routes them to the right department.",
    bullets: [
      "Dual-model AI pipeline (MobileNetV2 + TF-IDF/Logistic Regression) fused for classification",
      "REST APIs, PostgreSQL/PostGIS for geo-aware routing, full web dashboard",
    ],
    tags: ["Flask", "PostgreSQL", "PostGIS", "Computer Vision", "NLP", "Telegram API"],
    primaryTags: ["Flask", "Computer Vision", "PostgreSQL"],
    link: "https://github.com/YASHAS-MN/SnapFix",
  },
  {
    id: "nebulaverse",
    title: "NebulaVerse",
    filename: "nebulaverse.ts",
    role: "Team Lead",
    tagline: "Decentralized digital goods marketplace on a custom PoW blockchain.",
    description:
      "A decentralized marketplace for digital goods, built on a custom Proof-of-Work blockchain with cryptographic transaction integrity and sandboxed code execution.",
    bullets: [
      "Custom PoW blockchain, Flask gateway, transaction mempool, P2P miner discovery",
      "RSA wallet signing, SHA-256 integrity checks, Docker-isolated execution before validation",
    ],
    tags: ["Blockchain", "Next.js", "Cryptography", "Docker", "P2P"],
    primaryTags: ["Blockchain", "Cryptography", "Docker"],
    link: "https://github.com/YASHAS-MN/NebulaVerse",
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    filename: "golden-hour.ts",
    role: "Team Lead",
    tagline: "Emergency corridor routing via Ant Colony Optimization over live traffic graphs.",
    description:
      "A routing platform that dynamically clears emergency traffic corridors using Ant Colony Optimization over a live, congestion-weighted traffic graph.",
    bullets: [
      "ACO pathfinding accounting for distance, speed, congestion, pheromone state",
      "SUMO/TraCI integration for real-time traffic simulation, synced via Flask APIs",
    ],
    tags: ["Optimization", "Algorithms", "Simulation", "Flask", "SUMO"],
    primaryTags: ["Optimization", "Simulation", "Flask"],
    link: "https://github.com/YASHAS-MN/Golden-hour",
  },
  {
    id: "privwatch",
    title: "PrivWatch",
    filename: "privwatch.ts",
    role: "Lead Developer",
    tagline: "Privacy-first video anomaly detection — no raw footage retained, event-only persistence.",
    description:
      "A video anomaly-detection system designed around privacy by default — analyzes activity without retaining raw footage.",
    bullets: [
      "MobileNetV2 + LSTM for spatiotemporal classification (Normal / Fight / Collapse)",
      '"Sterile Room" architecture: bounded RAM buffers, short-lived inference workers, event-only persistence',
    ],
    tags: ["PyTorch", "Computer Vision", "Privacy Engineering"],
    primaryTags: ["PyTorch", "Computer Vision", "Privacy"],
    link: "https://github.com/YASHAS-MN/PrivWatch",
  },
];
