import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/modules/core/ui/Layout';
import HomePage from '@/modules/core/ui/HomePage';
import SeasonPage from '@/modules/seasons/ui/SeasonPage';
import CategoryPage from '@/modules/categories/ui/CategoryPage';
import RecommendationDetail from '@/modules/recommendations/ui/RecommendationDetail';
import NotFoundPage from '@/modules/core/ui/NotFoundPage';
import ZaptBadge from '@/modules/core/ui/ZaptBadge';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="season/:seasonId" element={<SeasonPage />} />
            <Route path="category/:categoryId" element={<CategoryPage />} />
            <Route path="recommendation/:recommendationId" element={<RecommendationDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ZaptBadge />
      </div>
    </BrowserRouter>
  );
}