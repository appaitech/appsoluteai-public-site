export function Services() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-emerald-50 to-white 
                        dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-50 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 dark:bg-emerald-800/30 
                        rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 dark:bg-teal-800/30 
                        rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Services content */}
      </div>
    </section>
  );
} 