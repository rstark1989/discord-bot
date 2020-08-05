export interface DndClassInt {
  _id: string;
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: Array<ProficientChoices>;
  proficiencies: Array<Proficient>;
  saving_throws: Array<Record<string, unknown>>;
  starting_equipment: Record<string, unknown>;
  class_levels: Record<string, unknown>;
  subclasses: Array<Record<string, unknown>>;
  spellcasting: Record<string, unknown>;
  url: string;
  error?: string;
}

interface Proficient {
  name: string;
  url: string;
}

interface ProficientChoices {
  choose: number;
  type: string;
  from: Array<ProficientFrom>;
}

interface ProficientFrom {
  url: string;
  name: string;
}
