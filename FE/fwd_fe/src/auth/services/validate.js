const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:8000/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await response.json();
  return data; 
};
export { loginUser };

const checkEmail = async (email) => {
  const response = await fetch("http://localhost:8000/users/check-email/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Error al verificar el correo");
  }

  const data = await response.json();
  return data;
}
export { checkEmail };

const sendRecoverCode = async (email,code) => {
  const response = await fetch("http://localhost:8000/users/send-recover-code/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,code }),
  });
  if (!response.ok) {
    throw new Error("Error al enviar el código de recuperación");
  }
  const data = await response.json();
  return data;
}
export { sendRecoverCode };

const resetPassword = async (email, code, newPassword) => {
  const response = await fetch("http://localhost:8000/users/recover-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code, new_password: newPassword }),
  });
  if (!response.ok) {
    throw new Error("Error al restablecer la contraseña");
  }
  const data = await response.json();
  return data;
} 
export { resetPassword };

