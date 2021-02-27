import * as React from 'react';
import {UserData} from '@ngevent/api/auth';

export interface UserContextData {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserContext = React.createContext<UserContextData>({
  user: {} as UserData,
  setUser: () => {},
});

export const useUserContext = () => React.useContext(UserContext);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<UserData>({} as UserData);
  const dataUser = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );
  return (
    <UserContext.Provider value={dataUser}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
