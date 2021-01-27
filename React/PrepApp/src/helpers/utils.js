export function getExt(filename) {
  const comps = filename.indexOf('.') > -1 ? filename.split('.') : [''];
  return comps.pop();
}

export function splitPathComponents(path) {
  if (!path) return [];
  const tmpComps = !path || path === '/' ? [''] : path.split('/');
  const compsMax = tmpComps.length - 1;
  let base = '';

  return tmpComps.map((comp, index) => {
    base += base === '/' ? `${comp}` : `/${comp}`;
    return {
      name: index === 0 ? '/' : comp,
      path: base,
      isLast: index === compsMax,
    };
  });
}
