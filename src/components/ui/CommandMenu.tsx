import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Tag, User } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useHotkeys('cmd+k, ctrl+k', (e) => {
    e.preventDefault();
    setOpen(true);
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          
          <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl 
                       bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="border-b border-gray-200 dark:border-gray-700">
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Search articles, tags, authors..."
                className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 
                          bg-transparent border-none outline-none placeholder:text-gray-400"
              />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto p-2">
              <Command.Empty className="p-4 text-sm text-gray-500">
                No results found.
              </Command.Empty>

              <Command.Group heading="Articles">
                <Command.Item className="p-2 flex items-center space-x-2 rounded hover:bg-gray-100 
                                      dark:hover:bg-gray-800 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  <span>Article Title</span>
                </Command.Item>
                {/* More items */}
              </Command.Group>

              <Command.Group heading="Tags">
                <Command.Item className="p-2 flex items-center space-x-2 rounded hover:bg-gray-100 
                                      dark:hover:bg-gray-800 cursor-pointer">
                  <Tag className="w-4 h-4" />
                  <span>Tag Name</span>
                </Command.Item>
                {/* More items */}
              </Command.Group>

              <Command.Group heading="Authors">
                <Command.Item className="p-2 flex items-center space-x-2 rounded hover:bg-gray-100 
                                      dark:hover:bg-gray-800 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>Author Name</span>
                </Command.Item>
                {/* More items */}
              </Command.Group>
            </Command.List>
          </Command.Dialog>
        </div>
      )}
    </AnimatePresence>
  );
} 