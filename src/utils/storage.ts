import store from 'storejs';

export function set(key: string, val: any) {
  store.set(key, val);
}

export function get(key: string) {
  return store.get(key);
}

export function remove(key: string) {
  return store.remove(key);
}

export function clear() {
  return store.clear();
}

export function hasToken() {
  return store.has('token');
}

export function getToken() {
  return get('token');
}
