import React from 'react';
import { screen } from '@testing-library/react';
import { setup } from '../../test-utils/test-utils';
import Search from './Search';
import App from '../../App';
import * as api from '../../api/api';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { apiResponseMock } from '../../test-utils/mockData';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Search input tests', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('input appears with value', () => {
    setup(<Search value="hello" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search by name/i);
    expect(input).toHaveValue('hello');
  });

  test('input changes after typing', async () => {
    function Wrapper() {
      const [val, setVal] = React.useState('');
      return <Search value={val} onChange={setVal} />;
    }

    const { user } = setup(<Wrapper />);
    const input = screen.getByPlaceholderText(/search by name/i);
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  test('onChange', async () => {
    function WithSpy({ fn }: { fn: (v: string) => void }) {
      const [val, setVal] = React.useState('');
      return (
        <Search
          value={val}
          onChange={(v) => {
            setVal(v);
            fn(v);
          }}
        />
      );
    }

    const spy = vi.fn();
    const { user } = setup(<WithSpy fn={spy} />);
    const input = screen.getByPlaceholderText(/search by name/i);
    await user.type(input, 'abc');

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls).toEqual([['a'], ['ab'], ['abc']]);
  });

  test('gets value from localStorage in main app', () => {
    localStorage.setItem('searchValue', 'stored');
    setup(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/search by name/i);
    expect(input).toHaveValue('stored');
  });

  test('trims and saves to localStorage after click', async () => {
    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/search by name/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, '  something new  ');
    await user.click(button);

    expect(localStorage.getItem('searchValue')).toBe('something new');
  });

  test('search triggers fetch and displays results', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue(apiResponseMock);

    const { user } = setup(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/search by name/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'rick');
    await user.click(button);

    expect(await screen.findByText(/rick Sanchez/i)).toBeInTheDocument();
  });
});
