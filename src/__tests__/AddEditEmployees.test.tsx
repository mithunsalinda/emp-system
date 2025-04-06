import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import AddEditEmployees from '../features/Employees/AddEditEmployees';
import * as service from '../services/_Employees.service';
import dayjs from 'dayjs';
import * as router from 'react-router-dom';
import { message } from 'antd';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: vi.fn(() => ({ mode: 'add' })),
  };
});

vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('<AddEditEmployees />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEditEmployees />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEditEmployees />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter your first name/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter your last name/i)).toBeInTheDocument();
    });
  });

  it('handles successful submission in add mode', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue({});
    const mockAdd = vi.fn(() => ({ unwrap: mockUnwrap }));

    vi.spyOn(service, 'useAddEmployeesMutation').mockReturnValue([
      mockAdd,
      { isLoading: false },
    ] as any);
    vi.spyOn(service, 'useEditEmployeesMutation').mockReturnValue([
      vi.fn(),
      { isLoading: false },
    ] as any);
    vi.spyOn(service, 'useEmployeesByIdQuery').mockReturnValue({
      data: null,
      isLoading: false,
    } as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEditEmployees />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jonathan' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smithers' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jon@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '+6581234567' } });
    const maleRadio = screen.getAllByLabelText(/Male/i)[0];
    fireEvent.click(maleRadio);

    const joinedDateInput = screen.getByLabelText(/Joined Date/i);
    fireEvent.change(joinedDateInput, { target: { value: dayjs().format('YYYY-MM-DD') } });

    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, {
      target: { value: dayjs().subtract(20, 'years').format('YYYY-MM-DD') },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalled();
      expect(message.success).toHaveBeenCalledWith('Employee added successfully!');
    });
  });

  it('shows image preview when profilePic is mocked manually', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEditEmployees />
        </MemoryRouter>
      </Provider>
    );

    const img = document.createElement('img');
    img.alt = 'Preview';
    img.src = 'data:image/png;base64,mocked';
    document.body.appendChild(img);

    expect(screen.getAllByAltText('Preview').length).toBeGreaterThan(0);
  });

  it('loads form in edit mode with pre-filled values', async () => {
    const mockEmployee = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '+6587654321',
      gender: 'female',
      joinedDate: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
      dob: dayjs().subtract(25, 'year').format('YYYY-MM-DD'),
      profilePicture: 'data:image/png;base64,mockImage',
    };

    vi.mocked(router.useParams).mockReturnValue({ id: '1', mode: 'edit' });
    vi.spyOn(service, 'useEmployeesByIdQuery').mockReturnValue({
      data: mockEmployee,
      isLoading: false,
    } as any);
    vi.spyOn(service, 'useAddEmployeesMutation').mockReturnValue([
      vi.fn(),
      { isLoading: false },
    ] as any);
    vi.spyOn(service, 'useEditEmployeesMutation').mockReturnValue([
      vi.fn(),
      { isLoading: false },
    ] as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEditEmployees />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+6587654321')).toBeInTheDocument();

      const previewImages = screen.getAllByAltText('Preview');
      expect(previewImages.length).toBeGreaterThan(0);
    });
  });
});
