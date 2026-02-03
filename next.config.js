/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 빌드 시 ESLint 오류를 무시 (경고만 표시)
    ignoreDuringBuilds: false,
  },
  typescript: {
    // 빌드 시 TypeScript 오류가 있어도 빌드 계속 진행
    ignoreBuildErrors: false,
  },
  // 이미지 최적화 설정
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig


