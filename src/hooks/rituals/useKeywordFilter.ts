import { useRitualFilterStore } from '@/src/store/useRitualFilterStore';

export const useKeywordFilter = () => {
  const { keyword, setKeyword, clearKeyword } = useRitualFilterStore();

  return {
    keyword,
    setKeyword,
    clearKeyword,
    hasKeyword: keyword.trim().length > 0,
  };
};
