import { router } from 'expo-router';
import { create } from 'zustand';

import { type LoginFormType } from '@/components/login-form';
import { type SignUpFormType } from '@/components/sign-up-form';
import { showErrorMessage } from '@/ui/utils';

import { createSelectors } from '../utils';
import {
  loginWithPassword,
  refreshAuthToken,
  signUpWithPassword,
} from './firebase-auth';
import { AuthType, type TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

type Login =
  | { data: Omit<LoginFormType, 'name'>; type: AuthType.PASSWORD }
  | { data: null; type: Omit<AuthType, 'PASSWORD'> };

type SignUp =
  | { data: Omit<SignUpFormType, 'name'>; type: AuthType.PASSWORD }
  | { data: null; type: Omit<AuthType, 'PASSWORD'> };

export enum AuthStatusEnum {
  IDLE = 'IDLE',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
  LOADING = 'LOADING',
}
interface AuthState {
  token: TokenType | null;
  status: AuthStatusEnum;
  login: (values: Login) => void;
  signUp: (data: SignUp) => void;
  logout: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: AuthStatusEnum.IDLE,
  token: null,
  login: async ({ data, type }) => {
    set({ status: AuthStatusEnum.LOADING });
    let token: string | null = null;
    if (data) {
      token = await loginWithPassword(data.email, data.password);
    }

    if (type === AuthType.GOOGLE) {
      // Login with Google
    }

    if (type === AuthType.APPLE) {
      // Login with Apple
    }

    if (type === AuthType.MAGIC) {
      // Login with Magic link
    }

    if (!token) {
      throw new Error('Login was unsuccessful');
    }

    setToken(token);
    set({ status: AuthStatusEnum.LOGIN, token });
    router.replace('/');
  },
  signUp: async ({ data, type }) => {
    try {
      let token: string | null = null;
      if (data) {
        token = await signUpWithPassword(data.email, data.password);
      }

      if (type === AuthType.GOOGLE) {
        // Login with Google
      }

      if (type === AuthType.APPLE) {
        // Login with Apple
      }

      if (type === AuthType.MAGIC) {
        // Login with Magic link
      }

      if (!token) {
        throw new Error('Login was unsuccessful');
      }

      setToken(token);
      set({ status: AuthStatusEnum.LOGIN, token });
      router.replace('/');
    } catch (error) {
      console.log(error);
      showErrorMessage(`${error}`);
    }
  },
  logout: () => {
    removeToken();
    set({ status: AuthStatusEnum.LOGOUT, token: null });
  },
  hydrate: async () => {
    try {
      const userToken = getToken();
      if (userToken === null) {
        get().logout();
        return;
      }
      const token = await refreshAuthToken();

      setToken(userToken);
      set({ status: AuthStatusEnum.LOGIN, token });

      router.replace('/');
    } catch (e) {
      console.log(e);
      get().logout();
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const logout = () => _useAuth.getState().logout();
export const login = (values: Login) => _useAuth.getState().login(values);
export const hydrateAuth = () => _useAuth.getState().hydrate();
