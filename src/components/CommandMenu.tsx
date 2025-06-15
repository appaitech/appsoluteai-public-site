import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Calculator, FileText } from 'lucide-react';

export function CommandMenu() {
  const [open, setOpen] = useState(false);

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

  // Toggle for showing Calculator in command menu
  const showCalculatorCommand = false;

  const pages = [
    {
      heading: 'Pages',
      items: [
        {
          name: 'Home',
          icon: Home,
          href: '/',
        },
        // Only show Calculator if toggle is true
        ...(showCalculatorCommand ? [{
          name: 'Calculator',
          icon: Calculator,
          href: '/calculator',
        }] : []),
        {
          name: 'PRD Form',
          icon: FileText,
          href: '/prd',
        },
        // ... other items
      ],
    },
    // ... other sections
  ];

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-50 bg-black/50"
        >
          <div className="fixed inset-10 max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <Command.Input 
              placeholder="Type a command or search..."
              className="w-full px-4 py-3 border-b outline-none"
            />
            <Command.List className="p-2">
              <Command.Group heading="Navigation">
                <Command.Item onSelect={() => { window.location.href = '#about'; setOpen(false); }}>
                  About
                </Command.Item>
                <Command.Item onSelect={() => { window.location.href = '#services'; setOpen(false); }}>
                  Services
                </Command.Item>
                <Command.Item onSelect={() => { window.location.href = '#packages'; setOpen(false); }}>
                  Packages
                </Command.Item>
                <Command.Item onSelect={() => { window.location.href = '#contact'; setOpen(false); }}>
                  Contact
                </Command.Item>
              </Command.Group>
              <Command.Group heading="Actions">
                <Command.Item onSelect={() => { document.location.href = 'mailto:contact@appsoluteai.dev'; }}>
                  Contact Support
                </Command.Item>
                {/* Only show Get Started if Calculator is enabled */}
                {showCalculatorCommand && (
                  <Command.Item onSelect={() => { window.location.href = '/calculator'; setOpen(false); }}>
                    Get Started
                  </Command.Item>
                )}
              </Command.Group>
            </Command.List>
          </div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
} 