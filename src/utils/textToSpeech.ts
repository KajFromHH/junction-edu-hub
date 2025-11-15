// Text-to-Speech utility for accessibility
// Uses browser's built-in Web Speech API

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakText = (text: string, lang: string = 'fi-FI') => {
  // Stop any currently speaking text
  stopSpeaking();

  if ('speechSynthesis' in window) {
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = lang; // Finnish language
    currentUtterance.rate = 0.9; // Slightly slower for better comprehension
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;
    
    window.speechSynthesis.speak(currentUtterance);
  } else {
    console.warn('Text-to-speech not supported in this browser');
    alert('Text-to-speech ei ole tuettu tässä selaimessa / Text-to-speech not supported');
  }
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeaking = (): boolean => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
