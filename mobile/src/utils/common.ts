import {UserData} from '@ngevent/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_USER} from './constants';

export async function getUserData(): Promise<UserData> {
  const userData = await AsyncStorage.getItem(KEY_USER);
  return typeof userData === 'string' ? JSON.parse(userData) : null;
}
