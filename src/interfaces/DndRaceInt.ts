export interface DndRaceInt {
  _id: string;
  index: string;
  name: string;
  speed: number;
  ability_bonuses: Array<Ability>;
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: Array<Record<string, unknown>>;
  starting_proficiency_options: Array<Record<string, unknown>>;
  languages: Array<Languages>;
  language_desc: string;
  traits: Array<Record<string, unknown>>;
  subraces: Array<Record<string, unknown>>;
  url: string;
  error?: string;
}

interface Ability {
  name: string;
  url: string;
  bonus: number;
}

interface Languages {
  url: string;
  name: string;
}
