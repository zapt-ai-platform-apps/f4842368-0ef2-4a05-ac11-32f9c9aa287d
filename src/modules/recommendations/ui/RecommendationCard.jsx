import React from 'react';
import { Link } from 'react-router-dom';
import { seasons } from '@/modules/seasons/data/seasons';
import { categories } from '@/modules/categories/data/categories';

export default function RecommendationCard({ recommendation }) {
  const season = seasons.find(s => s.id === recommendation.season);
  const category = categories.find(c => c.id === recommendation.category);
  
  return (
    <Link to={`/recommendation/${recommendation.id}`} className="card block h-full group">
      <div className="relative overflow-hidden">
        <img 
          src="PLACEHOLDER" 
          alt={recommendation.image.alt}
          data-image-request={recommendation.image.request}
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {recommendation.featured && (
          <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block py-1 px-2 rounded-full ${season.textColor} ${season.bgColor} text-xs font-medium`}>
            {season.name}
          </span>
          <span className="inline-block py-1 px-2 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            {category.name}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {recommendation.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {recommendation.shortDescription}
        </p>
        <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
          Read More
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
  );
}