import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { AuthForm } from '../features/Auth/AuthForm';
import * as service from '../services/_AuthForm.service';
import * as slice from '../features/Auth/AuthForm.slice';
import '@testing-library/jest-dom';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockedDispatch,
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('AuthForm', () => {
  it('renders the form inputs and button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/please input your email/i)).toBeInTheDocument();
      expect(screen.getByText(/please input your password/i)).toBeInTheDocument();
    });
  });

  it('logs in successfully with valid credentials', async () => {
    const mockTrigger = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue([{ email: 'admin@example.com', role: 'admin' }]),
    });

    vi.spyOn(service, 'useLazyLoginQuery').mockReturnValue([
      mockTrigger,
      { isLoading: false },
    ] as any);
    const spyLoginSuccess = vi.spyOn(slice, 'loginSuccess');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'password123',
      });
      expect(spyLoginSuccess).toHaveBeenCalledWith({ email: 'admin@example.com', role: 'admin' });
      expect(mockedDispatch).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows console error when login returns empty result', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockTrigger = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue([]),
    });

    vi.spyOn(service, 'useLazyLoginQuery').mockReturnValue([
      mockTrigger,
      { isLoading: false },
    ] as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'notfound@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Invalid credentials');
      expect(mockedNavigate).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('shows console error when API throws error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockTrigger = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockRejectedValue(new Error('Server error')),
    });

    vi.spyOn(service, 'useLazyLoginQuery').mockReturnValue([
      mockTrigger,
      { isLoading: false },
    ] as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'error@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'errorpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login failed:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
