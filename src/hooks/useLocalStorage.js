import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
	const saveToStorage = async (key, value) => {
		try {
			const makeString = JSON.stringify(value);
			await AsyncStorage.setItem(key, makeString);
			return value;
		} catch (e) {
			// saving error
			return new Error("Error saving to storage");
		}
	};

	const getFromStorage = async (key) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// error reading value
		}
	};

	const removeFromStorage = async (key) => {
		try {
			await AsyncStorage.removeItem(key);
			return { response: "removed." };
		} catch (e) {
			// error reading value
		}
	};

	return {
		getFromStorage,
		saveToStorage,
		removeFromStorage,
	};
};

export default useLocalStorage;
