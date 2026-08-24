// Router del backend simulado. Traduce cada endpoint que hoy pega a
// http://localhost:8000 (ver los archivos en src/**/services/validate.js)
// a una operación sobre la "base" en memoria/localStorage de db.js.
//
// La forma de cada respuesta imita a propósito la de los serializers de
// Django (ver BE/*/serializers.py) — mismos nombres de campo, mismos
// mensajes de error — para que ningún componente de la UI tenga que
// enterarse de que ya no hay un backend real detrás.
import { getDb, saveDb, nextId } from "./db.js";

// -----------------------------------------------------------------------
// Helpers de respuesta / request
// -----------------------------------------------------------------------
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function parseBody(init) {
  if (!init || !init.body) return {};
  if (typeof init.body !== "string") return {};
  try {
    return JSON.parse(init.body) || {};
  } catch {
    return {};
  }
}

// Pequeña latencia artificial: sin esto todo resuelve en el mismo tick y
// los estados de "Cargando..." de la UI nunca llegan a verse ni probarse.
function delay() {
  const ms = 90 + Math.random() * 160;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const NOT_AUTHENTICATED = { detail: "Authentication credentials were not provided." };

// -----------------------------------------------------------------------
// Helpers de dominio
// -----------------------------------------------------------------------
function findUser(db, id) {
  return db.users.find((u) => u.id === Number(id));
}
function findCategory(db, id) {
  return db.categories.find((c) => c.id === Number(id));
}
function findPost(db, id) {
  return db.posts.find((p) => p.id === Number(id));
}

function currentUser(db) {
  const id = db.session.userId;
  if (!id) return null;
  return findUser(db, id) || null;
}

/** UserSerializer, sin el campo password (write_only en el serializer real). */
function toUserDTO(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    profile_picture: user.profile_picture,
    role: user.role,
  };
}

function toPostDTO(db, post) {
  const user = findUser(db, post.user);
  const category = findCategory(db, post.category);
  return {
    id: post.id,
    user: post.user,
    user_name: user?.username ?? null,
    category: post.category,
    category_name: category?.name ?? null,
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    anonymous: post.anonymous,
    is_post: true,
  };
}

function toCommentDTO(db, comment) {
  const user = findUser(db, comment.user);
  const post = findPost(db, comment.post);
  return {
    id: comment.id,
    post: comment.post,
    user: comment.user,
    user_name: user?.username ?? null,
    content: comment.content,
    created_at: comment.created_at,
    anonymous: comment.anonymous,
    post_comment: post?.title ?? null,
    is_comment: true,
  };
}

function toLikeDTO(db, like) {
  const user = findUser(db, like.user);
  const post = findPost(db, like.post);
  return {
    id: like.id,
    post: like.post,
    user: like.user,
    created_at: like.created_at,
    user_name: user?.username ?? null,
    user_id: like.user,
    post_title: post?.title ?? null,
    is_like: true,
  };
}

function toSavedPostDTO(db, saved) {
  const user = findUser(db, saved.user);
  const post = findPost(db, saved.post);
  const postUser = post ? findUser(db, post.user) : null;
  const category = post ? findCategory(db, post.category) : null;
  return {
    id: saved.id,
    post: saved.post,
    user: saved.user,
    created_at: saved.created_at,
    user_name: user?.username ?? null,
    user_id: saved.user,
    post_title: post?.title ?? null,
    post_content: post?.content ?? null,
    post_category_name: category?.name ?? null,
    post_created_at: post?.created_at ?? null,
    post_user_name: postUser?.username ?? null,
    post_anonymous: post?.anonymous ?? false,
  };
}

function toUserEventDTO(userEvent) {
  return {
    id: userEvent.id,
    user: userEvent.user,
    title: userEvent.title,
    description: userEvent.description,
    date: userEvent.date,
    is_active: userEvent.is_active,
    color: userEvent.color,
    fecha_inicio: userEvent.fecha_inicio,
    fecha_fin: userEvent.fecha_fin,
    created_at: userEvent.created_at,
  };
}

function toEventDTO(event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    created_at: event.created_at,
    color: event.color,
    fecha_inicio: event.fecha_inicio,
    fecha_fin: event.fecha_fin,
  };
}

function nowIso() {
  return new Date().toISOString();
}

// -----------------------------------------------------------------------
// Handlers — USUARIOS
// -----------------------------------------------------------------------
function handleLogin(db, body) {
  const { email, password } = body;
  if (!email || !password) {
    return jsonResponse({ message: "Email y contraseña son requeridos." }, 400);
  }
  const user = db.users.find((u) => u.email === email);
  if (!user) {
    return jsonResponse({ message: "No existe una cuenta con ese correo." }, 404);
  }
  if (user.password !== password) {
    return jsonResponse({ message: "Credenciales inválidas." }, 401);
  }
  db.session.userId = user.id;
  saveDb();
  return jsonResponse({
    message: "Login exitoso",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
}

function handleCheckEmail(db, body) {
  const { email } = body;
  if (!email) return jsonResponse({ message: "Email es requerido." }, 400);
  const exists = db.users.some((u) => u.email === email);
  if (exists) {
    return jsonResponse({ message: "El correo de recuperación ya fue enviado." }, 200);
  }
  return jsonResponse({ message: "El correo no está registrado." }, 404);
}

function handleSendRecoverCode(db, body) {
  const { email, code } = body;
  if (!email) return jsonResponse({ message: "Email es requerido." }, 400);
  const user = db.users.find((u) => u.email === email);
  if (!user) return jsonResponse({ message: "No existe una cuenta con ese correo." }, 404);
  db.recoverCodes.push({
    id: nextId("recoverCodes") || db.recoverCodes.length + 1,
    user: user.id,
    code: String(code),
    created_at: nowIso(),
  });
  saveDb();
  return jsonResponse({ message: "Código de recuperación enviado." });
}

function handleRecoverPassword(db, body) {
  const { email, code, new_password: newPassword } = body;
  if (!email || !code || !newPassword) {
    return jsonResponse(
      { message: "Email, código y nueva contraseña son requeridos." },
      400
    );
  }
  const user = db.users.find((u) => u.email === email);
  if (!user) return jsonResponse({ message: "No existe una cuenta con ese correo." }, 404);

  const recoverCode = db.recoverCodes.find(
    (rc) => rc.user === user.id && rc.code === String(code)
  );
  if (!recoverCode) {
    return jsonResponse({ message: "Código de recuperación inválido." }, 400);
  }

  user.password = newPassword;
  db.recoverCodes = db.recoverCodes.filter((rc) => rc.id !== recoverCode.id);
  saveDb();
  return jsonResponse({ message: "Contraseña recuperada exitosamente." });
}

function handleGetMe(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  return jsonResponse(toUserDTO(user));
}

function handlePatchMe(db, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);

  const { username, email, first_name, last_name, password, profile_picture } = body;
  if (username) user.username = username;
  if (email) user.email = email;
  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (profile_picture) user.profile_picture = profile_picture;
  if (password) user.password = password;

  saveDb();
  return jsonResponse({ message: "User profile updated successfully." });
}

function handleCsrf() {
  return jsonResponse({ csrfToken: "mock-csrf-token" });
}

function handleLogout(db) {
  db.session.userId = null;
  saveDb();
  return jsonResponse({ message: "Sesión cerrada correctamente" });
}

// -----------------------------------------------------------------------
// Handlers — COMUNIDAD (posts)
// -----------------------------------------------------------------------
function handleListPosts(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  return jsonResponse(db.posts.map((p) => toPostDTO(db, p)));
}

function handleCreatePost(db, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);

  const { title, content, category, anonymous } = body;
  if (!title || !content || !category) {
    return jsonResponse({ error: "Faltan campos obligatorios" }, 400);
  }
  const post = {
    id: nextId("posts"),
    user: user.id,
    category: Number(category),
    title,
    content,
    created_at: nowIso(),
    anonymous: Boolean(anonymous),
  };
  db.posts.push(post);
  saveDb();
  return jsonResponse(toPostDTO(db, post), 201);
}

function handleGetPostById(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const post = findPost(db, postId);
  if (!post) return jsonResponse({ error: "Post no encontrado" }, 404);
  return jsonResponse(toPostDTO(db, post));
}

function handlePostsByCategory(db, categoryId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const posts = db.posts
    .filter((p) => p.category === Number(categoryId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(posts.map((p) => toPostDTO(db, p)));
}

function handlePostsByTitle(db, titleQuery) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const needle = decodeURIComponent(titleQuery).toLowerCase();
  const posts = db.posts
    .filter((p) => p.title.toLowerCase().includes(needle))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(posts.map((p) => toPostDTO(db, p)));
}

function handlePostsByUser(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse({ error: "Usuario no autenticado" }, 401);
  const posts = db.posts
    .filter((p) => p.user === user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(posts.map((p) => toPostDTO(db, p)));
}

function handleEditPost(db, postId, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const post = db.posts.find((p) => p.id === Number(postId) && p.user === user.id);
  if (!post) return jsonResponse({ error: "Post no encontrado o no autorizado" }, 404);

  const { title, content, category, anonymous } = body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (category) post.category = Number(category);
  post.anonymous = anonymous !== undefined ? Boolean(anonymous) : post.anonymous;

  saveDb();
  return jsonResponse(toPostDTO(db, post));
}

function handleDeletePost(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const id = Number(postId);
  const post = db.posts.find((p) => p.id === id && p.user === user.id);
  if (!post) return jsonResponse({ error: "Post no encontrado o no autorizado" }, 404);

  // on_delete=CASCADE en el modelo real: al borrar el post se van con él
  // sus comentarios, likes y guardados.
  db.posts = db.posts.filter((p) => p.id !== id);
  db.comments = db.comments.filter((c) => c.post !== id);
  db.likes = db.likes.filter((l) => l.post !== id);
  db.savedPosts = db.savedPosts.filter((s) => s.post !== id);

  saveDb();
  return jsonResponse({ message: "Post eliminado correctamente" });
}

// -----------------------------------------------------------------------
// Handlers — COMUNIDAD (categorías)
// -----------------------------------------------------------------------
function handleListCategories(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const categories = [...db.categories].sort((a, b) => a.name.localeCompare(b.name));
  return jsonResponse(categories);
}

// -----------------------------------------------------------------------
// Handlers — COMUNIDAD (comentarios)
// -----------------------------------------------------------------------
function handleCreateComment(db, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);

  const { post_id: postId, content } = body;
  if (!postId || !content) {
    return jsonResponse({ error: "Faltan campos obligatorios" }, 400);
  }
  const comment = {
    id: nextId("comments"),
    post: Number(postId),
    user: user.id,
    content,
    created_at: nowIso(),
    anonymous: false,
    thumbs_up: 0,
  };
  db.comments.push(comment);
  saveDb();
  return jsonResponse(toCommentDTO(db, comment), 201);
}

function handleCommentsByPost(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const comments = db.comments.filter((c) => c.post === Number(postId));
  return jsonResponse(comments.map((c) => toCommentDTO(db, c)));
}

function handleCommentsByUser(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse({ error: "Usuario no autenticado" }, 401);
  const comments = db.comments
    .filter((c) => c.user === user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(comments.map((c) => toCommentDTO(db, c)));
}

function handleEditComment(db, commentId, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const comment = db.comments.find((c) => c.id === Number(commentId) && c.user === user.id);
  if (!comment) {
    return jsonResponse({ error: "Comentario no encontrado o no autorizado" }, 404);
  }
  const { content } = body;
  if (!content) return jsonResponse({ error: "El contenido no puede estar vacío" }, 400);

  comment.content = content;
  saveDb();
  return jsonResponse(toCommentDTO(db, comment));
}

function handleDeleteComment(db, commentId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const id = Number(commentId);
  const comment = db.comments.find((c) => c.id === id && c.user === user.id);
  if (!comment) {
    return jsonResponse({ error: "Comentario no encontrado o no autorizado" }, 404);
  }
  db.comments = db.comments.filter((c) => c.id !== id);
  db.answerComments = db.answerComments.filter((a) => a.comment !== id);
  saveDb();
  return jsonResponse({ message: "Comentario eliminado correctamente" });
}

// -----------------------------------------------------------------------
// Handlers — COMUNIDAD (likes)
// -----------------------------------------------------------------------
function handleLikeUnlike(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const id = Number(postId);
  const existing = db.likes.find((l) => l.post === id && l.user === user.id);
  if (existing) {
    db.likes = db.likes.filter((l) => l.id !== existing.id);
    saveDb();
    return jsonResponse({ message: "Post unliked" });
  }
  db.likes.push({ id: nextId("likes"), post: id, user: user.id, created_at: nowIso() });
  saveDb();
  return jsonResponse({ message: "Post liked" });
}

function handleLikesByPost(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const likes = db.likes.filter((l) => l.post === Number(postId));
  return jsonResponse(likes.map((l) => toLikeDTO(db, l)));
}

function handleLikesByUser(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse({ error: "Usuario no autenticado" }, 401);
  const likes = db.likes
    .filter((l) => l.user === user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(likes.map((l) => toLikeDTO(db, l)));
}

function handleAllLikes(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  return jsonResponse(db.likes.map((l) => toLikeDTO(db, l)));
}

// -----------------------------------------------------------------------
// Handlers — COMUNIDAD (guardados)
// -----------------------------------------------------------------------
function handleSaveUnsave(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const id = Number(postId);
  const post = findPost(db, id);
  if (!post) return jsonResponse({ error: "Post no encontrado" }, 404);

  const existing = db.savedPosts.find((s) => s.post === id && s.user === user.id);
  if (existing) {
    db.savedPosts = db.savedPosts.filter((s) => s.id !== existing.id);
    saveDb();
    return jsonResponse({ message: "Post unsaved", saved: false });
  }
  db.savedPosts.push({
    id: nextId("savedPosts"),
    post: id,
    user: user.id,
    created_at: nowIso(),
  });
  saveDb();
  return jsonResponse({ message: "Post saved", saved: true });
}

function handleSavedByPost(db, postId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const saved = db.savedPosts.filter((s) => s.post === Number(postId));
  return jsonResponse(saved.map((s) => toSavedPostDTO(db, s)));
}

function handleSavedPostsByUser(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const saved = db.savedPosts
    .filter((s) => s.user === user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return jsonResponse(saved.map((s) => toSavedPostDTO(db, s)));
}

// -----------------------------------------------------------------------
// Handlers — EVENTOS
// -----------------------------------------------------------------------
function handleAllEvents(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const mine = db.userEvents.filter((e) => e.user === user.id).map(toUserEventDTO);
  const global = db.events.map(toEventDTO);
  return jsonResponse([...mine, ...global]);
}

function handleCreateUserEvent(db, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const { title, description, date, color } = body;
  const event = {
    id: nextId("userEvents"),
    user: user.id,
    title,
    description,
    date,
    is_active: true,
    color,
    fecha_inicio: null,
    fecha_fin: null,
    created_at: nowIso(),
  };
  db.userEvents.push(event);
  saveDb();
  return jsonResponse(toUserEventDTO(event), 201);
}

function handleListUserEvents(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const events = db.userEvents.filter((e) => e.user === user.id);
  return jsonResponse(events.map(toUserEventDTO));
}

function handlePatchUserEvent(db, eventId, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const event = db.userEvents.find((e) => e.id === Number(eventId) && e.user === user.id);
  if (!event) return jsonResponse({ error: "Evento no encontrado o no autorizado" }, 404);

  for (const field of ["title", "description", "date", "color", "fecha_inicio", "fecha_fin"]) {
    if (field in body) event[field] = body[field];
  }
  saveDb();
  return jsonResponse(toUserEventDTO(event));
}

function handleDeleteUserEvent(db, eventId) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  const id = Number(eventId);
  const event = db.userEvents.find((e) => e.id === id && e.user === user.id);
  if (!event) return jsonResponse({ error: "Evento no encontrado o no autorizado" }, 404);

  db.userEvents = db.userEvents.filter((e) => e.id !== id);
  saveDb();
  return jsonResponse({ message: "Evento eliminado correctamente" });
}

function handleListOrCreateGlobalEvents(db, method, body) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  if (method === "POST") {
    const { title, description, date, color, fecha_inicio, fecha_fin } = body;
    const event = {
      id: nextId("events"),
      title,
      description,
      date,
      created_at: nowIso(),
      color: color || "#FFFFFF",
      fecha_inicio: fecha_inicio ?? null,
      fecha_fin: fecha_fin ?? null,
    };
    db.events.push(event);
    saveDb();
    return jsonResponse(toEventDTO(event), 201);
  }
  return jsonResponse(db.events.map(toEventDTO));
}

// -----------------------------------------------------------------------
// Handlers — CURSOS
// -----------------------------------------------------------------------
function handleListCourses(db) {
  const user = currentUser(db);
  if (!user) return jsonResponse(NOT_AUTHENTICATED, 401);
  return jsonResponse(db.courses);
}

// -----------------------------------------------------------------------
// Router
// -----------------------------------------------------------------------
// Cada entrada: [método, regex de pathname, handler(db, ...matches, body)]
const ROUTES = [
  ["POST", /^\/users\/login\/$/, (db, _m, body) => handleLogin(db, body)],
  ["POST", /^\/users\/check-email\/$/, (db, _m, body) => handleCheckEmail(db, body)],
  ["POST", /^\/users\/send-recover-code\/$/, (db, _m, body) => handleSendRecoverCode(db, body)],
  ["POST", /^\/users\/recover-password\/$/, (db, _m, body) => handleRecoverPassword(db, body)],
  ["GET", /^\/users\/me\/$/, (db) => handleGetMe(db)],
  ["PATCH", /^\/users\/me\/update\/$/, (db, _m, body) => handlePatchMe(db, body)],
  ["GET", /^\/users\/csrf\/$/, () => handleCsrf()],
  ["POST", /^\/users\/logout\/$/, (db) => handleLogout(db)],

  ["GET", /^\/community\/posts\/$/, (db) => handleListPosts(db)],
  ["POST", /^\/community\/create-post\/$/, (db, _m, body) => handleCreatePost(db, body)],
  ["GET", /^\/community\/post\/(\d+)\/$/, (db, m) => handleGetPostById(db, m[1])],
  ["GET", /^\/community\/posts-by-category\/(\d+)\/$/, (db, m) => handlePostsByCategory(db, m[1])],
  ["GET", /^\/community\/posts-by-title\/([^/]+)\/$/, (db, m) => handlePostsByTitle(db, m[1])],
  ["GET", /^\/community\/posts-by-user\/$/, (db) => handlePostsByUser(db)],
  ["PATCH", /^\/community\/edit-post\/(\d+)\/$/, (db, m, body) => handleEditPost(db, m[1], body)],
  ["DELETE", /^\/community\/delete-post\/(\d+)\/$/, (db, m) => handleDeletePost(db, m[1])],

  ["GET", /^\/community\/create-category\/$/, (db) => handleListCategories(db)],

  ["POST", /^\/community\/comment-post\/$/, (db, _m, body) => handleCreateComment(db, body)],
  ["GET", /^\/community\/post-comments\/(\d+)\/$/, (db, m) => handleCommentsByPost(db, m[1])],
  ["GET", /^\/community\/comments-by-user\/$/, (db) => handleCommentsByUser(db)],
  ["PATCH", /^\/community\/edit-comment\/(\d+)\/$/, (db, m, body) => handleEditComment(db, m[1], body)],
  ["DELETE", /^\/community\/delete-comment\/(\d+)\/$/, (db, m) => handleDeleteComment(db, m[1])],

  ["POST", /^\/community\/like-unlike-post\/(\d+)\/$/, (db, m) => handleLikeUnlike(db, m[1])],
  ["GET", /^\/community\/likes-by-post\/(\d+)\/$/, (db, m) => handleLikesByPost(db, m[1])],
  ["GET", /^\/community\/likes-by-user\/$/, (db) => handleLikesByUser(db)],
  ["GET", /^\/community\/all-likes\/$/, (db) => handleAllLikes(db)],

  ["POST", /^\/community\/save-unsave-post\/(\d+)\/$/, (db, m) => handleSaveUnsave(db, m[1])],
  ["GET", /^\/community\/saved-by-post\/(\d+)\/$/, (db, m) => handleSavedByPost(db, m[1])],
  ["GET", /^\/community\/saved-posts-by-user\/$/, (db) => handleSavedPostsByUser(db)],

  ["GET", /^\/events\/all-events\/$/, (db) => handleAllEvents(db)],
  ["POST", /^\/events\/user-events\/$/, (db, _m, body) => handleCreateUserEvent(db, body)],
  ["GET", /^\/events\/user-events\/$/, (db) => handleListUserEvents(db)],
  ["PATCH", /^\/events\/user-events\/(\d+)\/$/, (db, m, body) => handlePatchUserEvent(db, m[1], body)],
  ["DELETE", /^\/events\/user-events\/(\d+)\/$/, (db, m) => handleDeleteUserEvent(db, m[1])],
  [
    "GET",
    /^\/events\/create-event\/$/,
    (db, _m, body, method) => handleListOrCreateGlobalEvents(db, method, body),
  ],
  [
    "POST",
    /^\/events\/create-event\/$/,
    (db, _m, body, method) => handleListOrCreateGlobalEvents(db, method, body),
  ],

  ["GET", /^\/courses\/create-course\/$/, (db) => handleListCourses(db)],
];

export async function handleMockRequest(url, init = {}) {
  await delay();

  const method = (init.method || "GET").toUpperCase();
  const body = parseBody(init);
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url;
  }

  for (const [routeMethod, pattern, handler] of ROUTES) {
    if (routeMethod !== method) continue;
    const match = pattern.exec(pathname);
    if (match) {
      const db = getDb();
      return handler(db, match, body, method);
    }
  }

  console.warn(`[mock-api] Sin ruta simulada para ${method} ${pathname} — revisar src/mocks/mockApi.js`);
  return jsonResponse({ detail: "Not found (mock)" }, 404);
}
