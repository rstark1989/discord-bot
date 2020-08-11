export interface HabiticaInt {
  success: boolean;
  data: HabiticaDataInt;
}

interface HabiticaDataInt {
  auth: {
    local: {
      username: string;
    };
    timestamps: {
      loggedin: string;
      created: string;
      updated: string;
    };
  };
  achievements: {
    streak: number;
    perfect: number;
  };
  profile: {
    name: string;
    imageURL: string;
  };
  stats: {
    hp: number;
    mp: number;
    exp: number;
    gp: number;
    lvl: number;
    class: string;
    str: number;
    con: number;
    int: number;
    per: number;
    toNextLevel: number;
    maxHealth: number;
    maxMP: number;
  };
}
