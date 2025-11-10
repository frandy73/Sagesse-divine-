
import { Intention } from '../types';

export const translations = {
  fr: {
    title: 'Sagesse Divine',
    placeholder: 'Posez votre question ici...',
    send: 'Envoyer',
    quickActions: {
      moreVerses: 'Plus de versets',
      prayer: 'Prière',
      actionPlan: 'Plan d’action 7 jours',
      share: 'Partager',
    },
    intentions: {
      [Intention.PASTORAL]: 'Pastoral',
      [Intention.BIBLIQUE]: 'Biblique',
      [Intention.EMOTIONNEL]: 'Émotionnel',
      [Intention.ETHIQUE]: 'Éthique',
      [Intention.RELATIONS]: 'Relations',
      [Intention.PRIERE]: 'Prière',
    },
    welcomeMessage: "Paix et bienvenue ! Je suis Sagesse Divine, votre compagnon spirituel. Comment puis-je vous éclairer aujourd'hui ? Vous pouvez me poser une question ou choisir un thème ci-dessous pour commencer.",
    typing: "Sagesse Divine écrit...",
  },
  ht: {
    title: 'Sajès Divin',
    placeholder: 'Poze kesyon ou isit la...',
    send: 'Voye',
    quickActions: {
      moreVerses: 'Plis vèsè',
      prayer: 'Laprèsèv',
      actionPlan: 'Plan aksyon 7 jou',
      share: 'Pataje',
    },
    intentions: {
      [Intention.PASTORAL]: 'Pastoral',
      [Intention.BIBLIQUE]: 'Biblik',
      [Intention.EMOTIONNEL]: 'Emosyonèl',
      [Intention.ETHIQUE]: 'Etik',
      [Intention.RELATIONS]: 'Relasyon',
      [Intention.PRIERE]: 'Laprèsèv',
    },
    welcomeMessage: "Lapè avèk ou! Mwen se Sajès Divin, konpayon espirityèl ou. Kòman mwen ka ede w jodi a? Ou ka poze yon kesyon oswa chwazi yon tèm anba a pou kòmanse.",
    typing: "Sajès Divin ap ekri...",
  },
};
