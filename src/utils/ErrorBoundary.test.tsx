import { render, screen } from '@testing-library/react';
import { setup } from '../test-utils/test-utils';
import ErrorBoundary from './ErrorBoundary';
import App from '../App';
import userEvent from '@testing-library/user-event';

function NoError() {
  return <div>No errors</div>;
}

function Err(): never {
  throw new Error('crash');
}

describe('ErrorBoundary', () => {
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
