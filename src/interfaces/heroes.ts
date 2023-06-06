export interface IHeroData {
  id: string;
  name: string;
  universe: number;
  details: {
    fullName: string;
    birthday: Date;
    homeland: string;
    height: number;
    weight: number;
  };
}
