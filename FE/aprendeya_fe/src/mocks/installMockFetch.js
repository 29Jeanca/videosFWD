// Instala el backend simulado interceptando window.fetch — así ningún
// componente ni archivo de src/**/services/validate.js tiene que cambiar:
// siguen pidiendo "http://localhost:8000/..." como si el BE de Django
// estuviera corriendo, y en su lugar responde mockApi.js contra los datos
// de db.js. Ver src/mocks/README.md para el panorama completo.
import { handleMockRequest } from "./mockApi.js";
import { resetDb } from "./db.js";

// Ambos hosts aparecen en el código real (la mayoría de los servicios usa
// localhost, ProfilePage.jsx usa 127.0.0.1 para el endpoint de csrf).
const MOCK_HOSTS = ["localhost:8000", "127.0.0.1:8000"];

function isMockUrl(url) {
  return typeof url === "string" && MOCK_HOSTS.some((host) => url.includes(host));
}

let installed = false;

export function installMockFetch() {
  if (installed) return;
  installed = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    const url = typeof input === "string" ? input : input?.url ?? "";
    if (isMockUrl(url)) {
      return handleMockRequest(url, init);
    }
    return originalFetch(input, init);
  };

  // Utilidad de conveniencia para demos/soporte: reiniciar los datos
  // "quemados" a su estado de fábrica sin tener que abrir devtools a mano.
  // Uso desde la consola del navegador: __aprendeyaResetMockDb()
  window.__aprendeyaResetMockDb = () => {
    resetDb();
    console.info("[mock-api] Datos reiniciados a los valores de fábrica. Recargá la página.");
  };

  console.info(
    "[mock-api] 29AprendeYa corre con datos simulados (sin backend real). " +
      "Ver FE/aprendeya_fe/src/mocks/README.md. Para reiniciar los datos: __aprendeyaResetMockDb()"
  );
}
