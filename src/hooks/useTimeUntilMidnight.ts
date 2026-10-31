import { useEffect, useState } from 'react';

function remaining(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const total = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

/** Temps restant avant la remise à zéro du défi du jour, en hh:mm:ss. */
export function useTimeUntilMidnight(): string {
  const [value, setValue] = useState(remaining);

  useEffect(() => {
    const id = window.setInterval(() => setValue(remaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return value;
}
