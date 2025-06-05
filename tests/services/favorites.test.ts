import { test, expect, beforeEach } from 'bun:test';
import '../../tests/setup';
import { favoritesService } from '@/services/favorites';

beforeEach(() => {
  localStorage.clear();
});

test('toggleFavorite adds and removes ids', () => {
  expect(favoritesService.getFavorites()).toEqual([]);
  const added = favoritesService.toggleFavorite('1');
  expect(added).toBe(true);
  expect(favoritesService.getFavorites()).toEqual(['1']);
  const removed = favoritesService.toggleFavorite('1');
  expect(removed).toBe(false);
  expect(favoritesService.getFavorites()).toEqual([]);
});
