export const apiService = {
  // Note: The following methods will be updated when we implement ritual packs from the backend
  async getRitualPacks(): Promise<any[]> {
    console.log('Fetching ritual packs from backend...');
    // TODO: Implement actual API call when backend is ready
    return [];
  },

  async getRitualPackById(id: string): Promise<any | undefined> {
    console.log(`Fetching ritual pack with id: ${id}...`);
    // TODO: Implement actual API call when backend is ready
    return undefined;
  },
};