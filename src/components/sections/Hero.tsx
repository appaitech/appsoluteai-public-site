// Create a new Hero component for better organization
export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 
                    dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-900">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat rotate-12 scale-150" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/2 -left-12 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl animate-float delay-150" />
      </div>

      <div className="container mx-auto px-6 py-32 relative">
        {/* Hero content */}
      </div>
    </div>
  );
} 