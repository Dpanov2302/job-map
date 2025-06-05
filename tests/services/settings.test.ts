// @ts-ignore
import { test, expect, beforeEach } from 'bun:test';
import '../../tests/setup';
import { settingsService } from '@/services/settings';

beforeEach(() => {
  localStorage.clear();
});

test('toggleTheme switches between light and dark', () => {
  expect(settingsService.getTheme()).toBe('light');
  const newTheme = settingsService.toggleTheme();
  expect(newTheme).toBe('dark');
  expect(settingsService.getTheme()).toBe('dark');
});
