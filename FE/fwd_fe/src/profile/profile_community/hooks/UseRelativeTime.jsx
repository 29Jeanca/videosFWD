import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);

export function useRelativeTime(dateString) {
  const [relative, setRelative] = useState("");

  useEffect(() => {
    if (!dateString) return;

    // 1️⃣ Normalizar: "2025-11-13 03:54:04.206870" → "2025-11-13T03:54:04.206"
    const iso = dateString
      .replace(" ", "T")
      .replace(/\.\d+$/, ""); // quitar microsegundos extra

    // 2️⃣ Función para actualizar texto relativo
    const update = () => {
      setRelative(dayjs(iso).locale("es").fromNow());
    };

    update(); // primera actualización inmediata

    // 3️⃣ Recalcular automáticamente cada minuto
    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return relative;
}
