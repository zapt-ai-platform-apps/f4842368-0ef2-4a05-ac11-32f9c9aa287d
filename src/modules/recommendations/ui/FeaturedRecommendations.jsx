import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { recommendations } from '@/modules/recommendations/data/recommendations';
import RecommendationCard from './RecommendationCard';

export default function FeaturedRecommendations() {
  const featuredRecommendations = recommendations.filter(r => r.featured).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Shopping Guides</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our top recommendations to help you shop with confidence for every season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecommendations.map((recommendation, index) => (
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

        <div className="mt-10 text-center">
          <Link to="/season/spring" className="btn btn-outline">
            View All Recommendations
          </Link>
        </div>
      </div>
    </section>
  );
}