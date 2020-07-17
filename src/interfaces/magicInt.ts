export interface magicInt {
  cards: Array<{
    name: string;
    manaCost: string;
    cmc: number;
    colors: Array<string>;
    colorIdentity: Array<string>;
    type: string;
    supertypes: Array<unknown>;
    types: Array<string>;
    subtypes: Array<string>;
    rarity: string;
    set: string;
    setName: string;
    text: string;
    flavor: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    layout: string;
    multiverseid: number;
    imageUrl: string;
    rulings: Array<Record<string, unknown>>;
    foreignNames: Array<Record<string, unknown>>;
    printings: Array<string>;
    originalText: string;
    originalType: string;
    legalities: Array<Record<string, unknown>>;
    id: string;
  }>;
}
