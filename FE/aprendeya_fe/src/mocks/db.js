// "Base de datos" del modo mock — un único objeto persistido en localStorage.
// Ver src/mocks/README.md para el panorama completo.
//
// STORAGE_VERSION existe para poder cambiar la forma del seed (agregar una
// colección, renombrar un campo) sin que cada usuario con datos viejos en su
// navegador quede con un objeto a medio migrar: si la versión guardada no
// coincide, se re-siembra desde cero en vez de intentar mergear.
import { createSeedData } from "./seedData.js";

const STORAGE_KEY = "aprendeya_mock_db";
const STORAGE_VERSION = 1;

function persist(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: STORAGE_VERSION, db }));
  } catch (error) {
    // Cuota llena o localStorage inaccesible (modo privado estricto, etc.):
    // seguimos operando en memoria para esta sesión de pestaña.
    console.warn("[mock-api] No se pudo guardar en localStorage:", error);
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === STORAGE_VERSION && parsed.db) {
        return parsed.db;
      }
    }
  } catch (error) {
    console.warn("[mock-api] Datos locales corruptos, se reinicia con datos de ejemplo:", error);
  }
  const seeded = createSeedData();
  persist(seeded);
  return seeded;
}

let db = load();

/** Devuelve la base "viva" — mutarla y llamar saveDb() para persistir. */
export function getDb() {
  return db;
}

export function saveDb() {
  persist(db);
}

/** Vuelve a los datos de fábrica (útil desde la consola: ver README). */
export function resetDb() {
  db = createSeedData();
  persist(db);
  return db;
}

/** Simula un id autoincremental para `collectionName` (ver `_seq` en seedData.js). */
export function nextId(collectionName) {
  db._seq[collectionName] = (db._seq[collectionName] || 0) + 1;
  return db._seq[collectionName];
}
