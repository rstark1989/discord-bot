export interface DndSpellInt {
  _id: string;
  index: string;
  name: string;
  desc: Array<string>;
  higher_level: Array<string>;
  range: string;
  components: Array<string>;
  material: string;
  ritual: string;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: Record<string, unknown>;
  classes: Array<Record<string, unknown>>;
  subclasses: Array<Record<string, unknown>>;
  url: string;
  error?: string;
}
