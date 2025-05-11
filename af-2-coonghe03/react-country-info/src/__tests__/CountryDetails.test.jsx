import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryDetails from '../pages/CountryDetails';
import { renderWithRouter } from './utils';

describe('CountryDetails', () => {
  test('renders loading state initially', () => {
    renderWithRouter(<CountryDetails />, { route: '/country/USA' });
    expect(screen.getByRole('generic', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders country details after fetching', async () => {
    renderWithRouter(<CountryDetails />, { route: '/country/USA' });
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Region: Americas')).toBeInTheDocument();
      expect(screen.getByText('Capital: Washington, D.C.')).toBeInTheDocument();
      expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
      expect(screen.getByText('Languages: English')).toBeInTheDocument();
      expect(screen.getByText('Currency: US Dollar')).toBeInTheDocument();
    });
  });

  test('shows country not found for invalid cca3', async () => {
    renderWithRouter(<CountryDetails />, { route: '/country/INVALID' });
    await waitFor(() => {
      expect(screen.getByText('Country not found')).toBeInTheDocument();
    });
  });

  test('navigates back to country list on button click', async () => {
    renderWithRouter(<CountryDetails />, { route: '/country/USA' });
    await waitFor(() => screen.getByText('United States'));
    const backButton = screen.getByText('Back to Countries');
    await userEvent.click(backButton);
    // Mock navigation testing requires checking the navigate call
  });
});
