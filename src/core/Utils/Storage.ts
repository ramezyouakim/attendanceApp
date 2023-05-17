import AsyncStorage from '@react-native-async-storage/async-storage'

// Read data from AsyncStorage
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (!data || Object.keys(data)?.length === 0) return null

    return JSON.parse(data);
  } catch (error) {
    console.log("getData ", error);
  }
};

// Write data to AsyncStorage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("storeData ", error);
  }
};

// Update data in AsyncStorage
export const updateData = async (key, value) => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (!data || Object.keys(data)?.length === 0) return null

    const parsedData = JSON.parse(data);
    const updatedData = {
      ...parsedData,
      ...value,
    };
    await AsyncStorage.setItem(key, JSON.stringify(updatedData));
  } catch (error) {
    console.log("updateData ", error);
  }
};

// Delete data from AsyncStorage
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("deleteData ", error);

  }
};
