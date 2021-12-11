import React, { useState } from 'react';
import { useLocalStorage } from 'hooks';
import { setInterceptors, setAuthHeader } from 'utils/axios';
import api from 'utils/api';

const LoginContext = React.createContext({
  user: null,
  pagesLoading: false,
  currencies: [],
  tabs: [],
  sections: [],
  getSections: async () => {},
  login: async (email: string, password: string) => {},
  register: async (firstName: string, lastName: string, email: string, password: string) => {},
  logout: () => {}
});
export { LoginContext };

const LoginContextContainer = (props: any) => {
  /* eslint-disable-next-line */
  const [accessToken, setAccessToken] = useLocalStorage('access-token', undefined, (token: string | null) => setAuthHeader(`Barear ${token}`));
  const [user, setUser] = useLocalStorage('user', undefined);
  const [currencies, setCurrencies] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  /**
   * @return An error object or `undefined` if suceed
   */

  const getSections = async (): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.getSections('Home');
      if (result.success) {
        setSections(result.data.sections);
        setTabs(result.data.tabs);
        setCurrencies(result.data.currencies);
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const loginUser = async (email: string, password: string): Promise<any> => {
    if (!email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.loginUser({ email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const registerUser = async (firstName: string, lastName: string, email: string, password: string): Promise<any> => {
    if (!firstName || !lastName || !email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.registerUser({ firstName, lastName, email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const logoutUser = () => {
    setUser(undefined);
    setAccessToken(undefined);
  }

  setInterceptors(logoutUser);

  return (
    <LoginContext.Provider
      value={{
        user,
        pagesLoading,
        tabs,
        sections,
        currencies,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
        getSections,
      }}
    >
      { props.children }
    </LoginContext.Provider>
  )
}

export default LoginContextContainer;
