import { trimProtocol, isRootUrl } from '@/core/components/constants/base-url';
import { it, expect, describe, vi } from 'vitest';

const BASE_URL = 'https://example.com';
const BASE_DEV_URL = 'http://localhost:3000';

describe('Protocol Utils', () => {
  it('should trim protocol from URL', () => {
    expect(trimProtocol(BASE_URL)).toBe('example.com');
    expect(trimProtocol(BASE_DEV_URL)).toBe('localhost:3000');
  });

  it('should check if URL is root', () => {
    expect(isRootUrl('example.com', trimProtocol(BASE_URL))).toBe(true);
    expect(isRootUrl('localhost:3000', trimProtocol(BASE_DEV_URL))).toBe(true);
    expect(isRootUrl('example.com/users', trimProtocol(BASE_URL))).toBe(false);
    expect(isRootUrl('localhost:3000/users', trimProtocol(BASE_DEV_URL))).toBe(
      false
    );
    expect(
      isRootUrl('localhost:3000?user=true', trimProtocol(BASE_DEV_URL))
    ).toBe(false);
  });
});
