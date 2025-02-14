export function Packages() {
  return (
    <section className="py-24 relative">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50 
                      dark:from-emerald-900/40 dark:via-emerald-800/20 dark:to-gray-900" />
      
      {/* Animated border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent 
                      opacity-50 dark:via-emerald-400" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent 
                      opacity-50 dark:via-emerald-400" />

      <div className="container mx-auto px-6 relative">
        {/* Package cards with enhanced styling */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl 
                                      border border-emerald-100 dark:border-emerald-800 p-6 shadow-lg 
                                      hover:shadow-xl transition duration-300">
              {/* Package content */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 