import { useState, useEffect } from 'react';

export const useHydropower = (debit, head, efisiensi) => {
  const [dayaWatt, setDayaWatt] = useState(0);
  const [kategori, setKategori] = useState('-');

  useEffect(() => {
    const rho = 1000;
    const g = 9.81;
    const q = parseFloat(debit) || 0;
    const h = parseFloat(head) || 0;
    const eta = (parseFloat(efisiensi) || 0) / 100;

    const p = rho * g * q * h * eta;
    setDayaWatt(p);

    if (p === 0) setKategori('Tidak Ada Daya');
    else if (p < 5000) setKategori('Pico Hydro (< 5 kW)');
    else if (p < 100000) setKategori('Micro Hydro (< 100 kW)');
    else if (p < 1000000) setKategori('Mini Hydro (< 1 MW)');
    else setKategori('Small/Large Hydro (> 1 MW)');
  }, [debit, head, efisiensi]);

  return { dayaWatt, kategori };
};