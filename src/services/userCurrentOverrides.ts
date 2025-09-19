// In-memory overrides for user's current rituals state
// - removedCurrentIds: rituals the user removed from "current"
// - completedIds: rituals the user marked as completed
// - feedback: stores emoji feedback for completed rituals

type RitualFeedback = {
  emoji: string;
  timestamp: number;
};

class UserCurrentOverridesStore {
  private removedCurrentIds = new Set<string>();
  private completedIds = new Set<string>();
  private feedback = new Map<string, RitualFeedback>();

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

  markCompleted(id: string, emoji?: string) {
    this.completedIds.add(id);
    if (emoji) {
      this.feedback.set(id, {
        emoji,
        timestamp: Date.now(),
      });
    }
  }

  getFeedback(id: string): RitualFeedback | undefined {
    return this.feedback.get(id);
  }

  getAllCompleted(): { id: string; feedback?: RitualFeedback }[] {
    return Array.from(this.completedIds).map(id => ({
      id,
      feedback: this.feedback.get(id)
    }));
  }

  clearCompleted() {
    this.completedIds.clear();
    this.feedback.clear();
  }
}

export const userCurrentOverrides = new UserCurrentOverridesStore();
