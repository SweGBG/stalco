// Kugghjulsbana centrerad i (0,0). z = antal kuggar, r = delningsradie.
export function gearPath(z: number, r: number, depth: number, hole = 0) {
  const rRoot = r - depth * 0.55;
  const rTip = r + depth * 0.45;
  const step = (Math.PI * 2) / z;
  const p = (rad: number, a: number) => `${(Math.cos(a) * rad).toFixed(2)} ${(Math.sin(a) * rad).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < z; i++) {
    const a = i * step - Math.PI / 2;
    const r1 = a - step * 0.3, t1 = a - step * 0.17, t2 = a + step * 0.17, r2 = a + step * 0.3;
    d += `${i === 0 ? "M" : "L"}${p(rRoot, r1)} L${p(rTip, t1)} L${p(rTip, t2)} L${p(rRoot, r2)} `;
    d += `A${rRoot} ${rRoot} 0 0 1 ${p(rRoot, a + step - step * 0.3)} `;
  }
  d += "Z";
  if (hole > 0) d += ` M${hole} 0 A${hole} ${hole} 0 1 0 ${-hole} 0 A${hole} ${hole} 0 1 0 ${hole} 0 Z`;
  return d;
}
