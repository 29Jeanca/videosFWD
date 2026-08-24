import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);

export function useRelativeTime(dateString) {
  const [relative, setRelative] = useState("");

  useEffect(() => {
    if (!dateString) return;

    const iso = dateString
      .replace(" ", "T")
      .replace(/\.\d+$/, ""); 

    const update = () => {
      setRelative(dayjs(iso).locale("es").fromNow());
    };

    update(); 

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return relative;
}
