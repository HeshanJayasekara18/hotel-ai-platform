import fs from 'fs';

let path = 'M0,0 L0,15 ';
let maxW = 1200;
let step = 3;
let y = 15;

// Generate organic rugged edge using random walk
for (let x = 0; x <= maxW; x += step) {
  // random displacement
  y += (Math.random() - 0.5) * 8;
  
  // occasional big tear
  if (Math.random() < 0.05) {
    y += (Math.random() - 0.5) * 20;
  }

  // boundaries
  if (y < 5) y = 5 + Math.random() * 5;
  if (y > 55) y = 55 - Math.random() * 5;

  path += `L${x},${Math.round(y)} `;
}

path += `L1200,15 L1200,0 Z`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" preserveAspectRatio="none"><path fill="black" d="${path}"/></svg>`;
fs.writeFileSync('torn.svg', svg);
