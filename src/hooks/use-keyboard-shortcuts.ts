import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts: { [key: string]: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const hasCtrlOrCmd = event.ctrlKey || event.metaKey;

      Object.entries(shortcuts).forEach(([shortcut, action]) => {
        const [modifier, targetKey] = shortcut.toLowerCase().split('+');
        if (
          ((modifier === 'ctrl' && hasCtrlOrCmd) || modifier === key) &&
          (targetKey ? targetKey === key : true)
        ) {
          event.preventDefault();
          action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
} 