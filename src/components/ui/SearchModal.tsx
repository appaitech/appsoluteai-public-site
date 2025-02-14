import { useHotkeys } from 'react-hotkeys-hook';
import { Command } from 'cmdk';

export function SearchModal() {
  const [open, setOpen] = useState(false);

  useHotkeys('cmd+k, ctrl+k', (e) => {
    e.preventDefault();
    setOpen(true);
  });

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      {/* Search implementation */}
    </Command.Dialog>
  );
} 