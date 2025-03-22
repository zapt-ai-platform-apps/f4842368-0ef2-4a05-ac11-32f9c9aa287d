import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { recommendations } from '@/modules/recommendations/data/recommendations';
import { seasons } from '@/modules/seasons/data/seasons';
import { categories } from '@/modules/categories/data/categories';
import * as Sentry from '@sentry/browser';

export default function RecommendationDetail() {
  const { recommendationId } = useParams();
  const navigate = useNavigate();
  const recommendation = recommendations.find(r => r.id === recommendationId);
  
  useEffect(() => {
    if (!recommendation) {
      console.error(`Recommendation with ID ${recommendationId} not found`);
      Sentry.captureMessage(`Recommendation with ID ${recommendationId} not found`);
    }
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [recommendation, recommendationId]);

  if (!recommendation) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Recommendation Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The shopping guide you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    );
  }

  const season = seasons.find(s => s.id === recommendation.season);
  const category = categories.find(c => c.id === recommendation.category);
  
  // Find related recommendations (same season or category, but not the current one)
  const relatedRecommendations = recommendations
    .filter(r => 
      r.id !== recommendationId && 
      (r.season === recommendation.season || r.category === recommendation.category)
    )
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className={`py-16 ${season.bgColor}`}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm text-gray-700 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link to={`/season/${season.id}`} className="text-sm text-gray-700 hover:text-primary">
                      {season.name}
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link to={`/category/${category.id}`} className="text-sm text-gray-700 hover:text-primary">
                      {category.name}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block py-1 px-2 rounded-full ${season.textColor} ${season.bgColor} text-xs font-medium`}>
                    {season.name}
                  </span>
                  <span className="inline-block py-1 px-2 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    {category.name}
                  </span>
                  {recommendation.featured && (
                    <span className="inline-block py-1 px-2 rounded-full bg-accent text-white text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {recommendation.title}
                </h1>
                <p className="text-lg text-gray-700">
                  {recommendation.description}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="PLACEHOLDER" 
                  alt={recommendation.image.alt}
                  data-image-request={recommendation.image.request}
                  className="w-full h-auto rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {recommendation.content.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                <p className="text-gray-700 mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className={`inline-block mr-3 mt-1.5 ${season.accentColor} w-2 h-2 rounded-full flex-shrink-0`}></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            {recommendation.tips && recommendation.tips.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 mt-12">
                <h3 className="text-xl font-bold mb-4">Pro Tips</h3>
                <ul className="space-y-3">
                  {recommendation.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-3 mt-1">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Season and Category Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-1/2">
              <Link 
                to={`/season/${season.id}`}
                className={`block p-6 rounded-xl ${season.bgColor} hover:shadow-md transition-shadow`}
              >
                <span className="text-sm text-gray-600">View Season</span>
                <h3 className={`text-xl font-bold mt-1 ${season.textColor}`}>{season.name} Season Guide</h3>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <Link 
                to={`/category/${category.id}`}
                className="block p-6 rounded-xl bg-white hover:shadow-md transition-shadow"
              >
                <span className="text-sm text-gray-600">View Category</span>
                <h3 className="text-xl font-bold mt-1 flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.name} Guide
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Recommendations */}
      {relatedRecommendations.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Related Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedRecommendations.map((relatedRecommendation) => {
                  const relatedSeason = seasons.find(s => s.id === relatedRecommendation.season);
                  const relatedCategory = categories.find(c => c.id === relatedRecommendation.category);
                  
                  return (
                    <Link 
                      key={relatedRecommendation.id}
                      to={`/recommendation/${relatedRecommendation.id}`} 
                      className="card block h-full group"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-block py-1 px-2 rounded-full ${relatedSeason.textColor} ${relatedSeason.bgColor} text-xs font-medium`}>
                            {relatedSeason.name}
                          </span>
                          <span className="inline-block py-1 px-2 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            {relatedCategory.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {relatedRecommendation.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {relatedRecommendation.shortDescription}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}