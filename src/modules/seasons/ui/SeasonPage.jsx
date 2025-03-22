import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { seasons } from '@/modules/seasons/data/seasons';
import { recommendations } from '@/modules/recommendations/data/recommendations';
import RecommendationCard from '@/modules/recommendations/ui/RecommendationCard';
import * as Sentry from '@sentry/browser';

export default function SeasonPage() {
  const { seasonId } = useParams();
  const season = seasons.find(s => s.id === seasonId);
  
  // Redirect if the season is not found
  useEffect(() => {
    if (!season) {
      console.error(`Season with ID ${seasonId} not found`);
      Sentry.captureMessage(`Season with ID ${seasonId} not found`);
    }
  }, [season, seasonId]);

  if (!season) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Season Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The season you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    );
  }

  const seasonRecommendations = recommendations.filter(r => r.season === seasonId);

  return (
    <div>
      {/* Hero Section */}
      <section className={`py-16 ${season.bgColor}`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block py-1 px-3 rounded-full ${season.textColor} bg-white/80 text-sm font-medium mb-4`}>
                {season.months}
              </span>
              <h1 className={`text-4xl sm:text-5xl font-bold ${season.textColor} mb-6`}>
                {season.name} Shopping Guide
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                {season.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {season.featuredCategories.map((categoryId) => (
                  <Link 
                    key={categoryId}
                    to={`/category/${categoryId}`} 
                    className={`btn ${categoryId === 'wardrobe' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="PLACEHOLDER" 
                alt={`${season.name} season fashion and accessories`}
                data-image-request={`${season.name.toLowerCase()} season fashion collection with clothing and accessories in seasonal colors`}
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Season Information */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Weather Conditions</h2>
              <p className="text-gray-700 mb-6">{season.weatherConditions}</p>
              
              <h2 className="text-2xl font-bold mb-4">Key Seasonal Trends</h2>
              <ul className="space-y-2 mb-6">
                {season.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 ${season.accentColor} w-2 h-2 rounded-full flex-shrink-0`}></span>
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img 
                src="PLACEHOLDER" 
                alt={`${season.name} lifestyle image`}
                data-image-request={`${season.name.toLowerCase()} lifestyle scene showing the season's atmosphere and fashion`}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Season Recommendations */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{season.name} Recommendations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated recommendations to help you prepare for {season.name.toLowerCase()}.
            </p>
          </div>

          {seasonRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonRecommendations.map((recommendation, index) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No recommendations available for this season yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Next Season Preview */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">Plan Ahead</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {seasons
              .filter(s => s.id !== seasonId)
              .map((otherSeason) => (
                <Link 
                  key={otherSeason.id}
                  to={`/season/${otherSeason.id}`}
                  className="group"
                >
                  <div className={`p-6 rounded-xl ${otherSeason.bgColor} hover:shadow-md transition-shadow`}>
                    <h3 className={`text-xl font-bold mb-2 ${otherSeason.textColor}`}>{otherSeason.name}</h3>
                    <p className="text-gray-700 text-sm mb-4">{otherSeason.shortDescription}</p>
                    <span className={`inline-flex items-center text-sm font-medium ${otherSeason.textColor} group-hover:underline`}>
                      View {otherSeason.name} Guide
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
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}