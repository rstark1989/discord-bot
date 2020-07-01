export interface pokemonInt {
  abilities: Array<object>;
  base_experience: number;
  forms: Array<object>;
  game_indices: Array<object>;
  height: number;
  held_items: Array<object>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<object>;
  name: string;
  order: number;
  species: { name: string; url: string };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  stats: Array<object>;
  types: Array<object>;
  weight: number;
}
