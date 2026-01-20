
import { Voice, Gender, Style, Accent } from './types';

export const VOICES: Voice[] = [
  // Female Voices (10)
  { id: 'f1', name: 'Lena', gender: Gender.FEMALE, style: Style.A1_CLEAR, apiVoiceName: 'Kore' },
  { id: 'f2', name: 'Sophie', gender: Gender.FEMALE, style: Style.A1_CLEAR, apiVoiceName: 'Kore' },
  { id: 'f3', name: 'Marie', gender: Gender.FEMALE, style: Style.A1_CLEAR, apiVoiceName: 'Kore' },
  { id: 'f4', name: 'Emma', gender: Gender.FEMALE, style: Style.A1_CLEAR, apiVoiceName: 'Kore' },
  { id: 'f5', name: 'Hanna', gender: Gender.FEMALE, style: Style.A1_CLEAR, apiVoiceName: 'Kore' },
  { id: 'f6', name: 'Julia', gender: Gender.FEMALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Kore' },
  { id: 'f7', name: 'Sarah', gender: Gender.FEMALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Kore' },
  { id: 'f8', name: 'Laura', gender: Gender.FEMALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Kore' },
  { id: 'f9', name: 'Anna', gender: Gender.FEMALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Kore' },
  { id: 'f10', name: 'Clara', gender: Gender.FEMALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Kore' },
  
  // Male Voices (10)
  { id: 'm1', name: 'Lukas', gender: Gender.MALE, style: Style.A1_CLEAR, apiVoiceName: 'Puck' },
  { id: 'm2', name: 'Maximilian', gender: Gender.MALE, style: Style.A1_CLEAR, apiVoiceName: 'Puck' },
  { id: 'm3', name: 'Felix', gender: Gender.MALE, style: Style.A1_CLEAR, apiVoiceName: 'Puck' },
  { id: 'm4', name: 'Jakob', gender: Gender.MALE, style: Style.A1_CLEAR, apiVoiceName: 'Puck' },
  { id: 'm5', name: 'Paul', gender: Gender.MALE, style: Style.A1_CLEAR, apiVoiceName: 'Puck' },
  { id: 'm6', name: 'David', gender: Gender.MALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Puck' },
  { id: 'm7', name: 'Simon', gender: Gender.MALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Puck' },
  { id: 'm8', name: 'Tim', gender: Gender.MALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Puck' },
  { id: 'm9', name: 'Moritz', gender: Gender.MALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Puck' },
  { id: 'm10', name: 'Jonas', gender: Gender.MALE, style: Style.CONVERSATIONAL, apiVoiceName: 'Puck' },
];

export const ACCENTS: Accent[] = [
  { id: 'de', label: 'Deutsch (Deutschland)', instruction: 'Sprechen Sie mit einem klaren Standard-Deutschen Akzent.' },
  { id: 'at', label: 'Österreichisch', instruction: 'Sprechen Sie mit einem charmanten österreichischen Akzent.' },
  { id: 'ch', label: 'Schweizerisch', instruction: 'Sprechen Sie mit einem sanften schweizerischen Akzent.' },
];
