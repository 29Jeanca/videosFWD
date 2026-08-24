# Backend simulado (modo mock)

Para poder hacer un deploy de **solo FE** — sin depender de que `BE/` esté
corriendo en ningún lado — esta carpeta simula el backend de Django
completo del lado del cliente, con datos "quemados" que persisten en
`localStorage`.

No usa `json-server` como proceso aparte: eso implicaría igualmente correr
y desplegar un servidor Node junto al FE, que es justo lo que se quería
evitar. En su lugar, `installMockFetch.js` intercepta `window.fetch` y
responde con el mismo formato que el backend real, sin que ningún
componente ni archivo de `src/**/services/validate.js` tenga que cambiar
una sola línea — siguen pidiendo `http://localhost:8000/...` como si el BE
estuviera ahí.

## Cómo está armado

- **`seedData.js`** — el dataset inicial: los mismos 5 usuarios, 6 cursos,
  5 categorías, 6 temas de comunidad, comentarios, likes y eventos que ya
  existían en `BE/seed_data.sql` / `BE/CREDENCIALES_DEV.md`. Se puede
  iniciar sesión con las mismas cuentas de siempre (ver esa tabla).
- **`db.js`** — persiste ese dataset en `localStorage` bajo la clave
  `aprendeya_mock_db`. Cada visitante tiene su propia copia en su
  navegador: lo que crea, edita o borra (temas, comentarios, eventos
  propios, likes, guardados, datos de perfil) sobrevive a un refresh pero
  vive solo en esa máquina.
- **`mockApi.js`** — el "router": traduce cada endpoint (método + ruta) a
  una operación sobre esa base, devolviendo la misma forma de datos que los
  serializers de Django (`BE/*/serializers.py`) — mismos nombres de campo,
  mismos códigos de estado y mensajes de error donde tenía sentido
  replicarlos.
- **`installMockFetch.js`** — el interceptor de `fetch` que conecta todo.

## Cómo se activa

Desde `src/main.jsx`, controlado por una variable de entorno:

```
VITE_USE_MOCK_API=true   # (default si no se define) — usa el mock
VITE_USE_MOCK_API=false  # pega al backend real en localhost:8000
```

Ver `.env.example` en la raíz del proyecto FE.

## Reiniciar los datos

Los cambios quedan en el `localStorage` del navegador. Para volver todo a
los valores de fábrica sin borrar el sitio a mano: abrir la consola del
navegador en la app y correr:

```js
__aprendeyaResetMockDb()
```

(y recargar la página). También se puede lograr borrando la clave
`aprendeya_mock_db` de localStorage directamente.

## Qué NO cubre

- Subida de imágenes (Cloudinary) — el FE hoy no tiene ninguna pantalla que
  suba archivos, así que no había nada que simular ahí.
- `AnswerComment` (respuestas anidadas a un comentario) — el FE actual no
  llama ningún endpoint de eso, así que no está enrutado.
- No hay autenticación real ni seguridad: las contraseñas se guardan en
  texto plano en el propio `localStorage` del navegador. Es un mock para
  demos/deploy de FE, no un sustituto de seguridad del backend real.
