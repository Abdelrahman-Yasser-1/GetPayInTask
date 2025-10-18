import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const storeData = (key: string, value: unknown) => {
  storage.set(key, JSON.stringify(value));
};

export const getData = (key: string) => {
  const data = storage.getString(key);
  let parsedValue = data;
  if (data) {
    try {
      parsedValue = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  }
  return parsedValue;
};

export const removeData = (key: string) => {
  storage.delete(key);
};

export const clearStorage = () => {
  storage.clearAll();
};

export const getAllKeys = () => storage.getAllKeys();

export const checkKeyExists = (key: string) => storage.contains(key);
