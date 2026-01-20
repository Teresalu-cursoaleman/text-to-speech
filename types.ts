
export enum Gender {
  MALE = 'Männlich',
  FEMALE = 'Weiblich'
}

export enum Style {
  A1_CLEAR = 'Klar (A1 Niveau)',
  CONVERSATIONAL = 'Konversationell'
}

export interface Voice {
  id: string;
  name: string;
  gender: Gender;
  style: Style;
  apiVoiceName: string;
}

export interface Accent {
  id: string;
  label: string;
  instruction: string;
}

export interface GenerationConfig {
  text: string;
  voice: Voice;
  accent: Accent;
  mode: 'single' | 'dialogue';
  voiceB?: Voice;
}
