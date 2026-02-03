import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

// 사용자 역할 타입
export type UserRole = 'admin' | 'user';

export interface UserData {
  email?: string;
  name?: string;
  role: UserRole;
  createdAt?: any;
  updatedAt?: any;
}

// 사용자가 관리자인지 확인
export const isAdmin = async (userId: string): Promise<boolean> => {
  if (!db) return false;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return false;
    
    const userData = userDoc.data() as UserData;
    return userData.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// 현재 사용자의 역할 가져오기
export const getUserRole = async (userId: string): Promise<UserRole> => {
  if (!db) return 'user';
  
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return 'user';
    
    const userData = userDoc.data() as UserData;
    return userData.role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
};

// 관리자 이메일 목록 (초기 관리자 설정용)
// Firebase Console에서 수동으로 role을 변경하는 것을 권장하지만,
// 최초 설정을 위해 이메일로 확인 가능
export const ADMIN_EMAILS = [
  // 여기에 관리자 이메일 추가
  // 'your-email@gmail.com',
];

// 이메일로 관리자 확인 (최초 설정용)
export const isAdminByEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};


