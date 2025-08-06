// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value); 
};

export const getItem = async (key: string): Promise<string | null> => {
  return await AsyncStorage.getItem(key);
};

export const deleteItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};