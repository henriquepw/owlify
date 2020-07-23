import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '@services/api';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Data {
  user: User;
  token: string;
}

interface SignInUserDTO {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  isLoading: boolean;
  signIn: (data: SignInUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Data>({} as Data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@Owlify:user',
        '@Owlidy:token',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setIsLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async (userData: SignInUserDTO) => {
    const response = await api.post<Data>('/sessions', userData);

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@Owlify:user', JSON.stringify(user)],
      ['@Owlidy:token', token],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    api.defaults.headers.authorization = null;
    await AsyncStorage.multiRemove(['@Owlify:user', '@Owlidy:token']);

    setData({} as Data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
