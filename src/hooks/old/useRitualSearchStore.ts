import type { SelectedTagState } from '@/src/hooks/useRitualTags';
import type { Ritual, RitualFilter } from '@/src/models/rituals';
import { ritualService } from '@/src/services/ritualService';
import { useSyncExternalStore } from 'react';

// Simple in-memory store with subscribe capability
interface RitualSearchState {
  selected: SelectedTagState;
  chips: string[];
  filter?: RitualFilter;
  rituals: Ritual[];
  page: number;
  size: number;
  last: boolean;
  isLoading: boolean;
  error: Error | null;
}

const defaultSelected: SelectedTagState = {
  loveTypes: [],
  ritualModes: [],
  timeTaken: [],
  relationalNeeds: [],
  ritualTones: [],
};

const state: RitualSearchState = {
  selected: defaultSelected,
  chips: [],
  filter: undefined,
  rituals: [],
  page: 0,
  size: 20,
  last: false,
  isLoading: false,
  error: null,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function set<K extends keyof RitualSearchState>(key: K, value: RitualSearchState[K]) {
  patch({ [key]: value } as Partial<RitualSearchState>);
}

function patch(p: Partial<RitualSearchState>) {
  Object.assign(state, p);
  emit();
}

async function runSearch(reset = true) {
  if (state.isLoading) return;
  patch({ isLoading: true, error: null });
  try {
    const res = await ritualService.search({ page: 0, size: state.size }, state.filter);
    patch({
      rituals: res.items,
      page: res.page + 1,
      last: res.last,
    });
  } catch (e: any) {
    set('error', e);
  } finally {
    set('isLoading', false);
  }
}

async function loadNextPage() {
  if (state.isLoading || state.last) return;
  set('isLoading', true);
  try {
    const res = await ritualService.search({ page: state.page, size: state.size }, state.filter);
    patch({
      rituals: [...state.rituals, ...res.items],
      page: res.page + 1,
      last: res.last,
    });
  } catch (e: any) {
    set('error', e);
  } finally {
    set('isLoading', false);
  }
}

function setSelection(params: { selected: SelectedTagState; chips: string[]; filter?: RitualFilter }) {
  patch({
    selected: params.selected,
    chips: params.chips,
    filter: params.filter,
    rituals: [],
    page: 0,
    last: false,
    error: null,
  });
}

function clear() {
  patch({
    selected: defaultSelected,
    chips: [],
    filter: undefined,
    rituals: [],
    page: 0,
    last: false,
    error: null,
  });
}

export function useRitualSearchStore() {
  const snapshot = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state
  );

  return {
    state: snapshot,
    actions: {
      setSelection,
      runSearch,
      loadNextPage,
      clear,
      setPageSize: (size: number) => set('size', size),
    },
  } as const;
}
