import { render } from '@testing-library/react';
import {
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  type Location,
} from 'react-router';
import { useEffect, type ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

export const renderWithRouter = (
  ui: ReactNode,
  options?: { path?: string }
) => {
  const locationRef = { current: undefined as Location | undefined };
  const user = userEvent.setup();

  const LocationTracker = () => {
    const location = useLocation();
    useEffect(() => {
      locationRef.current = location;
    }, [location]);
    return null;
  };

  const Wrapper = () => (
    <MemoryRouter initialEntries={[options?.path ?? '/']}>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <LocationTracker />
              {ui}
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  const result = render(<Wrapper />);
  return {
    ...result,
    location: () => locationRef.current,
    user,
  };
};
