import { test, expect, beforeEach } from 'bun:test';
import '../../tests/setup';
import { authService } from '@/services/auth';

beforeEach(() => {
  localStorage.clear();
});

test('setAuthData stores token and user', () => {
  const user = authService.setAuthData('test@mail.com', 'pass', 'Test');
  expect(localStorage.getItem('authToken')).toBeDefined();
  const stored = JSON.parse(localStorage.getItem('user')!);
  expect(stored).toEqual(user);
});

test('getAuthData returns stored data', () => {
  const user = authService.setAuthData('test2@mail.com', 'pass', 'User');
  const auth = authService.getAuthData();
  expect(auth).not.toBeNull();
  expect(auth!.user).toEqual(user);
});

test('clearAuthData removes data', () => {
  authService.setAuthData('a@b.c', 'pass');
  authService.clearAuthData();
  expect(authService.getAuthData()).toBeNull();
});

test('isAuthenticated reflects token presence', () => {
  expect(authService.isAuthenticated()).toBe(false);
  authService.setAuthData('a@b.c', 'pass');
  expect(authService.isAuthenticated()).toBe(true);
});
