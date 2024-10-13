
export function useLocalStorage() {

  const setItem = (name, value) => {
    return localStorage.setItem(name, JSON.stringify(value))
  }

  const getItem = (name) => {
    return JSON.parse(localStorage.getItem(name));
  }

  return { setItem, getItem }
}