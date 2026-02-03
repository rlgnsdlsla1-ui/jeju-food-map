'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { onAuthChange, getCurrentUser, logout as firebaseLogout } from '@/lib/firebase-auth';
import { User } from '@/lib/types';
import SearchBar from './SearchBar';
import { isAdmin } from '@/lib/admin';
import type { User as FirebaseUser } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;

    // Firebase가 설정되지 않은 경우에도 메뉴 표시
    try {
      // 인증 상태 변경 감지
      unsubscribe = onAuthChange(async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || undefined,
            name: firebaseUser.displayName || undefined,
          });
          // 관리자 권한 확인
          const adminStatus = await isAdmin(firebaseUser.uid);
          setUserIsAdmin(adminStatus);
        } else {
          setUser(null);
          setUserIsAdmin(false);
        }
        setLoading(false);
      });

      // 초기 사용자 확인
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.uid,
            email: currentUser.email || undefined,
            name: currentUser.displayName || undefined,
          });
        }
      } catch (e) {
        // Firebase가 없으면 무시
      }
    } catch (error) {
      // Firebase가 설정되지 않은 경우에도 메뉴 표시
      console.warn('Firebase가 설정되지 않았습니다:', error);
    }
    
    // 로딩 상태 해제 (Firebase가 없어도 메뉴는 표시)
    // 약간의 지연을 두어 초기 렌더링 후 상태 업데이트
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      clearTimeout(timer);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await firebaseLogout();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 whitespace-nowrap">
            제주도 푸드맵
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center max-w-md">
            <SearchBar />
          </nav>
          
          <div className="flex items-center gap-2 md:gap-6">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
              aria-label="검색"
            >
              🔍
            </button>
            
            <Link href="/" className="hidden md:block text-gray-700 hover:text-blue-600 whitespace-nowrap">
              맛집
            </Link>
            <Link href="/plan" className="hidden md:block text-gray-700 hover:text-blue-600 whitespace-nowrap">
              여행 계획
            </Link>
            
            {loading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-700">{user.name || '사용자'}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {userIsAdmin && (
                        <>
                          <Link
                            href="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 transition-colors font-semibold"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>관리자 페이지</span>
                          </Link>
                          <div className="border-t border-gray-200 my-1"></div>
                        </>
                      )}
                      <Link
                        href="/favorites"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>즐겨찾기</span>
                      </Link>
                      <Link
                        href="/plan"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span>여행 계획</span>
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>로그아웃</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 md:px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors"
                  title="로그인"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>로그인</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base whitespace-nowrap transition-colors shadow-sm"
                  title="회원가입"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>회원가입</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {showMobileSearch && (
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
}

