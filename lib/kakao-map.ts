declare global {
  interface Window {
    kakao: any;
  }
}

export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };
    script.onerror = () => {
      reject(new Error('카카오맵 스크립트를 불러오는데 실패했습니다.'));
    };
    document.head.appendChild(script);
  });
};

export const getJejuBounds = () => {
  return {
    sw: new window.kakao.maps.LatLng(33.0, 126.0),
    ne: new window.kakao.maps.LatLng(33.6, 126.9),
  };
};

export const getJejuCenter = () => {
  return new window.kakao.maps.LatLng(33.4, 126.5);
};


