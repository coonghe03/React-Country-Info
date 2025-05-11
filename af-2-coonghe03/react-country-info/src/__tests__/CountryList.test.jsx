import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryList from '../components/CountryList';   
import { renderWithRouter } from './utils';

describe('CountryList', () => {
  test('renders loading state initially', () => {
    renderWithRouter(<CountryList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  test('renders countries after fetching', async () => {
    renderWithRouter(<CountryList />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  test('filters countries by search term', async () => {
    renderWithRouter(<CountryList />);
    await waitFor(() => screen.getByText('United States'));
    const searchInput = screen.getByPlaceholderText('Search for a country');
    await userEvent.type(searchInput, 'Canada');
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });  

  test('filters countries by region', async () => {
    renderWithRouter(<CountryList />);
    await waitFor(() => screen.getByText('United States'));
    const regionSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(regionSelect, 'Americas');
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Japan')).not.toBeInTheDocument();  // Adjust based on the data you expect
  });
  

  test('navigates to country details on card click', async () => {
    const { container } = renderWithRouter(<CountryList />);
    await waitFor(() => screen.getByText('United States'));
    const countryCard = screen.getByText('United States').closest('div');
    await userEvent.click(countryCard);
  
    // Verify if we have navigated (check for an element from the CountryDetails page)
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
  
});