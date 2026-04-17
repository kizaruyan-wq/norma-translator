/**
 * Simple in-memory store for translation history.
 * Keeps the last 50 entries. Replace with Firestore when you add Firebase.
 */

const store = [];
const MAX = 50;

function save(entry) {
  store.unshift(entry); // newest first
  if (store.length > MAX) store.pop();
}

function getAll() {
  return store.slice(0, 20);
}

function remove(id) {
  const idx = store.findIndex((e) => e.id === id);
  if (idx !== -1) store.splice(idx, 1);
}

module.exports = { save, getAll, remove };