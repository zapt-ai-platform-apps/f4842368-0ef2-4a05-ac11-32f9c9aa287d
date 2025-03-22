import React from 'react';
import { Link } from 'react-router-dom';
import { seasons } from '@/modules/seasons/data/seasons';
import { categories } from '@/modules/categories/data/categories';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Seasonal Shopping Guide</h3>
            <p className="text-gray-600 mb-4">
              Your comprehensive guide to shopping seasonally with confidence and style.
            </p>
            <div className="flex items-center">
              <img src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxMHx8c2Vhc29uYWwlMjBzaG9wcGluZyUyMGNvbGxlY3Rpb24lMjB3aXRoJTIwY2xvdGhpbmclMjBhbmQlMjBjb3NtZXRpY3MlMjBvcmdhbml6ZWQlMjBieSUyMHNlYXNvbiUyQyUyMGZsYXQlMjBsYXklMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NDI2NjA5MTR8MA&ixlib=rb-4.0.3&q=80&w=1080" 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seasons Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Season</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated recommendations for each season to stay stylish and prepared year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season, index) => (
              <motion.div
                key={season.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/season/${season.id}`} className="card block h-full group">
                  <div className="relative overflow-hidden">
                    <img 
                      src="PLACEHOLDER" 
                      alt={`${season.name} essentials`} 
                      data-image-request={`${season.name.toLowerCase()} landscape with matching clothing and accessories`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{season.name}</h3>
                      <p className="text-white/80 text-sm">{season.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find recommendations by category to enhance your style and routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="inline-block p-3 rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                <Link 
                  to={`/category/${category.id}`} 
                  className="text-primary font-medium inline-flex items-center group"
                >
                  Explore {category.name}
                  <svg
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recommendations */}
      <FeaturedRecommendations />
    </div>
  );
}