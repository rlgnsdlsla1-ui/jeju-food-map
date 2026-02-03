import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  UserCredential,
  Auth
} from 'firebase/auth';
import { auth, db, googleProvider } from './firebase';
import { doc, setDoc, getDoc, serverTimestamp, Firestore } from 'firebase/firestore';

// Firebase가 초기화되었는지 확인
const checkFirebase = (): { auth: Auth; db: Firestore } => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase는 클라이언트 사이드에서만 사용할 수 있습니다.');
  }
  if (!auth || !db) {
    throw new Error('Firebase가 초기화되지 않았습니다. 환경 변수를 확인해주세요.');
  }
  return { auth, db };
};

// 회원가입
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { auth: authInstance, db: dbInstance } = checkFirebase();
    
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    
    const user = userCredential.user;
    
    // 프로필 이름 업데이트
    await updateProfile(user, {
      displayName: name,
    });
    
    // Firestore에 사용자 정보 저장
    await setDoc(doc(dbInstance, 'users', user.uid), {
      email: user.email,
      name: name,
      role: 'user', // 기본 역할: user (관리자는 Firebase Console에서 수동 변경)
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// 로그인
export const signIn = async (email: string, password: string) => {
  try {
    const { auth: authInstance } = checkFirebase();
    
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Google 로그인
export const signInWithGoogle = async () => {
  try {
    const { auth: authInstance, db: dbInstance } = checkFirebase();
    
    if (!googleProvider) {
      throw new Error('Google 로그인이 설정되지 않았습니다.');
    }
    
    const result = await signInWithPopup(authInstance, googleProvider);
    const user = result.user;
    
    // Firestore에 사용자 정보 저장 (이미 있으면 업데이트하지 않음)
    const userDocRef = doc(dbInstance, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        name: user.displayName || user.email?.split('@')[0] || '사용자',
        photoURL: user.photoURL || null,
        role: 'user', // 기본 역할: user
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // 기존 사용자 정보 업데이트 (role은 유지)
      await setDoc(userDocRef, {
        email: user.email,
        name: user.displayName || userDoc.data().name || user.email?.split('@')[0] || '사용자',
        photoURL: user.photoURL || userDoc.data().photoURL || null,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
    
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const { auth: authInstance } = checkFirebase();
    
    await signOut(authInstance);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// 현재 사용자 가져오기
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined' || !auth) {
    return null;
  }
  return auth.currentUser;
};

// 인증 상태 변경 감지
export const onAuthChange = (callback: (user: User | null) => void) => {
  if (typeof window === 'undefined' || !auth) {
    return () => {}; // 빈 unsubscribe 함수 반환
  }
  return onAuthStateChanged(auth, callback);
};

// 사용자 정보 가져오기 (Firestore)
export const getUserData = async (userId: string) => {
  try {
    const { db: dbInstance } = checkFirebase();
    
    const userDoc = await getDoc(doc(dbInstance, 'users', userId));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    }
    return { data: null, error: 'User not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

