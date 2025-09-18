// Simple in-memory user selection store for demo purposes
// In production, persist in secure storage or backend

class UserSelectionsStore {
  private additionalCurrentRitualIds = new Set<string>();

  getAll(): string[] {
    return Array.from(this.additionalCurrentRitualIds);
  }

  addMany(ids: string[]) {
    ids.forEach(id => this.additionalCurrentRitualIds.add(id));
  }

  remove(id: string) {
    this.additionalCurrentRitualIds.delete(id);
  }

  clear() {
    this.additionalCurrentRitualIds.clear();
  }
}

export const userSelections = new UserSelectionsStore();
