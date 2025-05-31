declare module 'lowlight' {
  const lowlight: {
    registerLanguage: (lang: string, def: any) => void;
  };
  export default lowlight;
}
