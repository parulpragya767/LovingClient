// In-memory overrides for user's current rituals state
// - removedCurrentIds: rituals the user removed from "current"
// - completedIds: rituals the user marked as completed (for visual state only)

class UserCurrentOverridesStore {
  private removedCurrentIds = new Set<string>();
  private completedIds = new Set<string>();

  isRemoved(id: string): boolean {
    return this.removedCurrentIds.has(id);
  }

  removeFromCurrent(id: string) {
    this.removedCurrentIds.add(id);
  }

  getAllRemoved(): string[] {
    return Array.from(this.removedCurrentIds);
  }

  clearRemoved() {
    this.removedCurrentIds.clear();
  }

  isCompleted(id: string): boolean {
    return this.completedIds.has(id);
  }

  markCompleted(id: string) {
    this.completedIds.add(id);
  }

  clearCompleted() {
    this.completedIds.clear();
  }
}

export const userCurrentOverrides = new UserCurrentOverridesStore();
