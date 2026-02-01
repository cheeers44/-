export interface CharacterProfile {
  name: string;
  russianName: string;
  title: string;
  age: number;
  height: string;
  role: string;
  family: string;
  appearance: string[];
  clothing: Record<string, string>;
  background: {
    past: string[];
    current: string[];
  };
  personality: string[];
  likes: string[];
  dislikes: string[];
  principles: Record<string, string>;
  sexual: {
    position: string;
    keywords: string[];
  };
  residence: {
    name: string;
    location: string;
    description: string;
    structure: {
      floor2: string;
      floor1: string;
      basement: string;
      exterior: string;
    };
  };
}

export interface NPC {
  name: string;
  russianName: string;
  relation: string;
  age?: string;
  birthday?: string;
  description: string;
  quote?: string;
}

export interface WorldSetting {
  era: string;
  location: string;
  context: string[];
  atmosphere: string[];
}