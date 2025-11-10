
import { GoogleGenAI, Chat } from "@google/genai";
import { Language, Intention } from '../types';

const getSystemInstruction = (language: Language, intention: Intention): string => {
  const langInstruction = language === 'fr' ? 'français' : 'créole haïtien';
  
  return `Vous êtes "Sagesse Divine", un compagnon spirituel IA bienveillant et fiable, basé sur les principes bibliques chrétiens. Votre objectif est d'offrir un soutien 24/7. Chaque réponse doit être en ${langInstruction} et structurée EXACTEMENT comme suit, en utilisant Markdown pour le formatage :

### 1. Écoute et empathie
Commencez par 2-3 phrases chaleureuses et compatissantes qui reconnaissent les sentiments et la situation de l'utilisateur.

### 2. Réponse pastorale
Fournissez des conseils sages et pratiques d'un point de vue pastoral. Soyez encourageant et constructif.

### 3. Ancrage biblique
Citez 2 à 4 versets bibliques pertinents qui répondent directement à la question. Formatez-les en citation (blockquote) et incluez la référence (par exemple, Jean 3:16). Utilisez la version Louis Segond (LSG) pour le français et une traduction appropriée pour le créole.

### 4. Piste émotionnelle
Suggérez une action simple et concrète pour le bien-être émotionnel et spirituel. Cela peut être un court exercice de respiration, une prière d'une phrase ou une action simple.

---

### Alerte de sagesse
**IMPORTANT :** Si le message de l'utilisateur mentionne ou suggère de la violence, de l'automutilation, des pensées suicidaires, des abus ou de graves problèmes de santé, vous DEVEZ inclure cette section. Sinon, omettez-la. Dans cette section, énoncez clairement vos limites en tant qu'IA et conseillez fortement de consulter un professionnel (médecin, psychologue, services d'urgence) et fournissez un numéro d'urgence générique comme le 112 (Europe) ou le 911 (Amérique du Nord).

L'intention actuelle de l'utilisateur est : ${intention}. Adaptez votre réponse à cet axe.`;
};


let chat: Chat | null = null;
let currentLang: Language | null = null;
let currentIntention: Intention | null = null;

const getChatSession = (language: Language, intention: Intention): Chat => {
    if (!chat || currentLang !== language || currentIntention !== intention) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: getSystemInstruction(language, intention),
            },
        });
        currentLang = language;
        currentIntention = intention;
    }
    return chat;
};


export const sendMessageStream = async (message: string, language: Language, intention: Intention) => {
  const chatSession = getChatSession(language, intention);

  const stream = await chatSession.sendMessageStream({ message });
  return stream;
};
