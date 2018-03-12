// Getting Data Back from LS
export function getLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState == null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
}

// Setting Data at LS
export function saveLocalStorage(state, key) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log('Some Problem With Local Storage Writing');
  }
}