
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { VOICES, ACCENTS } from './constants';
import { Voice, Accent, Gender, Style } from './types';
import { GeminiTTSService } from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<'single' | 'dialogue'>('single');
  const [text, setText] = useState<string>('Hallo! Wie geht es dir heute?');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(VOICES[0].id);
  const [selectedVoiceBId, setSelectedVoiceBId] = useState<string>(VOICES[10].id); // Default to a male voice for variety
  const [selectedAccentId, setSelectedAccentId] = useState<string>(ACCENTS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ttsService = useMemo(() => new GeminiTTSService(), []);

  // Update default text when mode changes
  useEffect(() => {
    if (mode === 'dialogue') {
      setText('Sprecher A: Hallo, wie geht es dir?\nSprecher B: Mir geht es sehr gut, danke der Nachfrage! Und dir?');
    } else {
      setText('Hallo! Wie geht es dir heute?');
    }
  }, [mode]);

  const selectedVoice = useMemo(() => 
    VOICES.find(v => v.id === selectedVoiceId) || VOICES[0], 
  [selectedVoiceId]);

  const selectedVoiceB = useMemo(() => 
    VOICES.find(v => v.id === selectedVoiceBId) || VOICES[10], 
  [selectedVoiceBId]);

  const selectedAccent = useMemo(() => 
    ACCENTS.find(a => a.id === selectedAccentId) || ACCENTS[0], 
  [selectedAccentId]);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      setError('Bitte geben Sie einen Text ein.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await ttsService.generateSpeech({
        text,
        voice: selectedVoice,
        accent: selectedAccent,
        mode,
        voiceB: mode === 'dialogue' ? selectedVoiceB : undefined
      });
    } catch (err: any) {
      setError('Fehler: Die Sprachgenerierung ist fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  }, [text, selectedVoice, selectedVoiceB, selectedAccent, mode, ttsService]);

  const VoiceOptions = ({ id, onChange, label }: { id: string, onChange: (val: string) => void, label: string }) => (
    <section>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <select
        className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
        value={id}
        onChange={(e) => onChange(e.target.value)}
      >
        <optgroup label="Frauenstimmen">
          {VOICES.filter(v => v.gender === Gender.FEMALE).map(voice => (
            <option key={voice.id} value={voice.id}>
              {voice.name} ({voice.style === Style.A1_CLEAR ? 'Klar' : 'Konv.'})
            </option>
          ))}
        </optgroup>
        <optgroup label="Männerstimmen">
          {VOICES.filter(v => v.gender === Gender.MALE).map(voice => (
            <option key={voice.id} value={voice.id}>
              {voice.name} ({voice.style === Style.A1_CLEAR ? 'Klar' : 'Konv.'})
            </option>
          ))}
        </optgroup>
      </select>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Header */}
        <header className="bg-indigo-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Deutsch-Sprachgenerator Pro</h1>
          <p className="text-indigo-100 opacity-90">Individuelle Stimmen & Dialoge mit KI</p>
        </header>

        {/* Mode Toggle */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setMode('single')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'single' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Einzelstimme
          </button>
          <button 
            onClick={() => setMode('dialogue')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'dialogue' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Dialog (2 Personen)
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Text Input Section */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">
                {mode === 'single' ? 'Text zum Vorlesen' : 'Dialogtext'}
              </label>
              {mode === 'dialogue' && (
                <span className="text-[10px] uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">
                  Format: Sprecher A: ... / Sprecher B: ...
                </span>
              )}
            </div>
            <textarea
              className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800 font-medium"
              placeholder={mode === 'single' ? "Geben Sie hier den deutschen Text ein..." : "Sprecher A: Hallo!\nSprecher B: Guten Tag!"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </section>

          {/* Accent Selector (Common for both modes) */}
          <section>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Regionaler Akzent
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ACCENTS.map(accent => (
                <button
                  key={accent.id}
                  onClick={() => setSelectedAccentId(accent.id)}
                  className={`py-2 px-3 text-xs rounded-md border font-medium transition-all ${
                    selectedAccentId === accent.id 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {accent.label.split(' (')[0]}
                </button>
              ))}
            </div>
          </section>

          {/* Voice Selectors Grid */}
          <div className={`grid gap-6 ${mode === 'dialogue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            <VoiceOptions 
              label={mode === 'single' ? "Stimme auswählen" : "Stimme A (Sprecher A)"}
              id={selectedVoiceId}
              onChange={setSelectedVoiceId}
            />
            {mode === 'dialogue' && (
              <VoiceOptions 
                label="Stimme B (Sprecher B)"
                id={selectedVoiceBId}
                onChange={setSelectedVoiceBId}
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded shadow-sm text-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center ${
              isLoading 
                ? 'bg-slate-400 cursor-not-allowed text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generiere Audio...
              </>
            ) : (
              <>{mode === 'single' ? 'Sprache generieren' : 'Dialog generieren'}</>
            )}
          </button>
        </div>

        {/* Footer info */}
        <footer className="bg-slate-50 p-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <p>© 2024 Deutsch-Sprachgenerator Pro • Unterstützt durch Gemini 2.5 Multi-Speaker API</p>
        </footer>
      </div>

      {/* Info Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 font-bold text-sm">1</div>
          <h3 className="font-bold text-slate-800 mb-1 text-sm">Modus wählen</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Einzelne Sätze oder interaktive Dialoge zwischen zwei Personen.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 font-bold text-sm">2</div>
          <h3 className="font-bold text-slate-800 mb-1 text-sm">Niveau einstellen</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Klar artikulierte Stimmen (A1) für Lerner oder natürliche Konversation.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 font-bold text-sm">3</div>
          <h3 className="font-bold text-slate-800 mb-1 text-sm">Akzente</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Hören Sie den feinen Unterschied zwischen Deutschland, Österreich und der Schweiz.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
