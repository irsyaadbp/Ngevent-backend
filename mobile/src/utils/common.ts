import {UserData} from '@ngevent/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_USER} from './constants';

import moment from 'moment';

export async function getUserData(): Promise<UserData> {
  const userData = await AsyncStorage.getItem(KEY_USER);
  return typeof userData === 'string' ? JSON.parse(userData) : null;
}

export function formatDate(date: string, format = 'DD MMMM YYYY'): string {
  return moment(date).format(format);
}
