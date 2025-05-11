import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CountryList from '../components/CountryList';
import CountryDetails from '../pages/CountryDetails';

describe('App Integration', () => {
  test('navigates from CountryList to CountryDetails and back', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:cca3" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for CountryList to load
    await waitFor(() => screen.getByText('United States'));
    const countryCard = screen.getByText('United States').closest('div');
    await userEvent.click(countryCard);

    // Check CountryDetails
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Region: Americas')).toBeInTheDocument();
    });

    // Click back button
    const backButton = screen.getByText('Back to Countries');
    await userEvent.click(backButton);

    // Verify back in CountryList
    await waitFor(() => {
      expect(screen.getByText('Explore Countries')).toBeInTheDocument();
    });
  });
});