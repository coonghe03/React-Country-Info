import '@testing-library/jest-dom';
import { server } from '../__mocks__/server';
import ResizeObserver from 'resize-observer-polyfill';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


global.ResizeObserver = ResizeObserver;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.mock('react-router-dom');
