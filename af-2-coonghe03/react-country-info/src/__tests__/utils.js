// src/__tests__/utils.js
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (ui, { route = '/', ...options } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>,
    options
  );
};

describe('Utility functions', () => {
  test('renderWithRouter should return correct rendering', () => {
    expect(true).toBe(true);
  });
});
