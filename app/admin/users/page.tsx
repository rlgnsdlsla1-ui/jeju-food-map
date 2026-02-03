'use client';

import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';

export default function AdminUsersPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">사용자 관리</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">사용자 관리 기능 개발 예정</p>
            <p className="text-sm text-gray-400">
              관리자 권한 부여는 Firebase Console에서 수동으로 진행하세요.<br/>
              자세한 내용은 ADMIN_SETUP_GUIDE.md를 참조하세요.
            </p>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}


