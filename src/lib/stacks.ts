export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  label: string;
  key: string;
  color: 'primary' | 'secondary' | 'accent' | 'destructive';
  items: TechItem[];
}

export interface GeneratedStack {
  frontend: TechItem;
  backend: TechItem;
  database: TechItem;
}

export interface TeamStack {
  teamNumber: number;
  stack: GeneratedStack;
}

export const defaultPools: TechCategory[] = [
  {
    label: 'Frontend',
    key: 'frontend',
    color: 'primary',
    items: [
      { name: 'HTML + CSS + JavaScript', icon: '🌐' },
      { name: 'React', icon: '⚛️' },
      { name: 'Vue', icon: '💚' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Bootstrap', icon: '�' },
      { name: 'Tailwind CSS', icon: '🌊' },
    ],
  },
  {
    label: 'Backend',
    key: 'backend',
    color: 'secondary',
    items: [
      { name: 'Node.js + Express', icon: '🟢' },
      { name: 'Django', icon: '🐍' },
      { name: 'Flask', icon: '🧪' },
      { name: 'Spring Boot', icon: '🍃' },
      { name: 'PHP', icon: '�' },
      { name: 'ASP.NET', icon: '�' },
    ],
  },
  {
    label: 'Database',
    key: 'database',
    color: 'accent',
    items: [
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Firebase', icon: '�' },
      { name: 'SQLite', icon: '📦' },
      { name: 'Supabase', icon: '⚡' },
    ],
  },
];

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateStack(pools: TechCategory[]): GeneratedStack {
  const frontend = pools.find(p => p.key === 'frontend')!;
  const backend = pools.find(p => p.key === 'backend')!;
  const database = pools.find(p => p.key === 'database')!;

  return {
    frontend: pickRandom(frontend.items),
    backend: pickRandom(backend.items),
    database: pickRandom(database.items),
  };
}

export function generateUniqueStacks(pools: TechCategory[], count: number): TeamStack[] {
  const stacks: TeamStack[] = [];
  const usedCombos = new Set<string>();
  const maxAttempts = count * 20;
  let attempts = 0;

  while (stacks.length < count && attempts < maxAttempts) {
    const stack = generateStack(pools);
    const key = `${stack.frontend.name}-${stack.backend.name}-${stack.database.name}`;
    if (!usedCombos.has(key)) {
      usedCombos.add(key);
      stacks.push({ teamNumber: stacks.length + 1, stack });
    }
    attempts++;
  }

  // Fill remaining if we ran out of unique combos
  while (stacks.length < count) {
    stacks.push({ teamNumber: stacks.length + 1, stack: generateStack(pools) });
  }

  return stacks;
}

export function stackToString(stack: GeneratedStack): string {
  return `Frontend: ${stack.frontend.name}\nBackend: ${stack.backend.name}\nDatabase: ${stack.database.name}`;
}
