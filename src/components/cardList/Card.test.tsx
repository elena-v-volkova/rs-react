import { screen } from '@testing-library/dom';
import { charactersMock } from '../../test-utils/mockData';
import Card from './Card';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Card renders successfully', () => {
  render(<Card character={charactersMock[0]} />);
  expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
});
