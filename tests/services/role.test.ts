import { test, expect, beforeEach } from 'bun:test';
import '../../tests/setup';
import { roleService } from '@/services/role';

beforeEach(() => {
  localStorage.clear();
});

test('default role is candidate', () => {
  expect(roleService.getRole()).toBe('candidate');
});

test('setRole saves role and updates user', () => {
  localStorage.setItem('user', JSON.stringify({ id:'1', name:'n', email:'e', role:'candidate' }));
  roleService.setRole('employer');
  expect(localStorage.getItem('role')).toBe('employer');
  const user = JSON.parse(localStorage.getItem('user')!);
  expect(user.role).toBe('employer');
});
