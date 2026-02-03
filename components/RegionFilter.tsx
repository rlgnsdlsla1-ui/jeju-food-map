'use client';

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const JEJU_REGIONS = [
  '전체',
  '제주시',
  '애월읍',
  '조천읍',
  '구좌읍',
  '성산읍',
  '표선면',
  '남원읍',
  '서귀포시',
  '안덕면',
  '대정읍',
  '한경면',
  '한림읍',
];

export default function RegionFilter({ selectedRegion, onRegionChange }: RegionFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        지역 선택
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {JEJU_REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedRegion === region
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}

