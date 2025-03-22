import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/modules/categories/data/categories';
import { recommendations } from '@/modules/recommendations/data/recommendations';
import { seasons } from '@/modules/seasons/data/seasons';
import RecommendationCard from '@/modules/recommendations/ui/RecommendationCard';
import * as Sentry from '@sentry/browser';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);

  // Redirect if the category is not found
  useEffect(() => {
    if (!category) {
      console.error(`Category with ID ${categoryId} not found`);
      Sentry.captureMessage(`Category with ID ${categoryId} not found`);
    }
  }, [category, categoryId]);

  if (!category) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Category Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    );
  }

  const categoryRecommendations = recommendations.filter(r => r.category === categoryId);

  // Group recommendations by season
  const recommendationsBySeasonMap = {};
  categoryRecommendations.forEach(recommendation => {
    if (!recommendationsBySeasonMap[recommendation.season]) {
      recommendationsBySeasonMap[recommendation.season] = [];
    }
    recommendationsBySeasonMap[recommendation.season].push(recommendation);
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-5xl mb-6">
              {category.icon}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {category.name}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {category.detailedDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Seasonal Recommendations */}
      {Object.keys(recommendationsBySeasonMap).map((seasonId) => {
        const season = seasons.find(s => s.id === seasonId);
        const seasonalRecommendations = recommendationsBySeasonMap[seasonId];
        
        return (
          <section key={seasonId} className={`py-16 ${season.bgColor}`}>
            <div className="container-custom">
              <div className="mb-12">
                <h2 className={`text-3xl font-bold mb-4 ${season.textColor}`}>{season.name} {category.name}</h2>
                <p className="text-gray-700 max-w-2xl">
                  Recommendations for {category.name.toLowerCase()} during the {season.name.toLowerCase()} season.
                </p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seasonalRecommendations.map((recommendation, index) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <RecommendationCard recommendation={recommendation} />
                  </motion.div>
                ))}
              </div>
  
              <div className="mt-8 text-center">
                <Link 
                  to={`/season/${seasonId}`} 
                  className={`inline-flex items-center font-medium ${season.textColor} hover:underline`}
                >
                  View all {season.name} recommendations
                  <svg
                    className="w-4 h-4 ml-1"
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
              </div>
            </div>
          </section>
        );
      })}

      {/* Other Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Other Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more shopping recommendations across different categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories
              .filter(c => c.id !== categoryId)
              .map((otherCategory, index) => (
                <motion.div
                  key={otherCategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card p-6 flex flex-col h-full"
                >
                  <div className="mb-4">
                    <span className="inline-block p-3 rounded-full bg-primary/10 text-primary">
                      {otherCategory.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{otherCategory.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{otherCategory.description}</p>
                  <Link 
                    to={`/category/${otherCategory.id}`} 
                    className="text-primary font-medium inline-flex items-center group"
                  >
                    Explore {otherCategory.name}
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
    </div>
  );
}