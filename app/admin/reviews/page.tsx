'use client';

import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';

export default function AdminReviewsPage() {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/admin"
            className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
          >
            ← 관리자 대시보드
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">리뷰 관리</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">리뷰 관리 기능 개발 예정</p>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}


