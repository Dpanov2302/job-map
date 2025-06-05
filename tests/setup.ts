const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
(globalThis as any).localStorage = localStorageMock;

(globalThis as any).document = {
  documentElement: {
    classList: {
      add: () => {},
      remove: () => {}
    }
  }
};
