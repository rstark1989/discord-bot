export interface dndclassInt {
  _id: string;
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: Array<proficientChoices>;
  proficiencies: Array<proficient>;
  saving_throws: Array<Record<string, unknown>>;
  starting_equipment: Record<string, unknown>;
  class_levels: Record<string, unknown>;
  subclasses: Array<Record<string, unknown>>;
  spellcasting: Record<string, unknown>;
  error?: string;
}

interface proficient {
  name: string;
  url: string;
}

interface proficientChoices {
  choose: number;
  type: string;
  from: Array<proficientFrom>;
}

interface proficientFrom {
  url: string;
  name: string;
}
