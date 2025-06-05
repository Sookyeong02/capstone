declare module 'lowlight' {
  const lowlight: {
    registerLanguage: (lang: string, def: any) => void;
  };
  export default lowlight;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType = any> {
    setFontSize: (size: string) => ReturnType
    unsetFontSize: () => ReturnType
  }
}
