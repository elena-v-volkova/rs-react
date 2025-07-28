import { screen } from '@testing-library/react';
import { setup } from '../../test-utils/test-utils';

import { vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function NoError() {
  return <div>No errors</div>;
}

function Err(): never {
  throw new Error('crash');
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('shows child when no error', () => {
    setup(
      <ErrorBoundary>
        <NoError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/No errors/i)).toBeInTheDocument();
  });

  test('shows message when crash', () => {
    setup(
      <ErrorBoundary>
        <Err />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Fallback ui/i)).toBeInTheDocument();
  });
});
