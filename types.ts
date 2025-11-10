
export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  quickActions?: boolean;
}

export type Language = 'fr' | 'ht';
export type Theme = 'light' | 'dark';

export enum Intention {
  PASTORAL = 'Pastoral',
  BIBLIQUE = 'Biblique',
  EMOTIONNEL = 'Émotionnel/Soin',
  ETHIQUE = 'Éthique Chrétienne',
  RELATIONS = 'Relations & Famille',
  PRIERE = 'Prière',
}
