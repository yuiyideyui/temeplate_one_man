// 自动给 plane 注入 theme
export function addThemeToPlane<
  T extends Record<string, Record<string, { plane: Record<string, string> }>>,
>(obj: T) {
  const result: any = {}
  for (const themeName in obj) {
    result[themeName] = {}
    for (const pageName in obj[themeName]) {
      result[themeName][pageName] = {
        ...obj[themeName][pageName],
        plane: {
          ...obj[themeName][pageName].plane,
          theme: themeName,
        },
      }
    }
  }
  return result as {
    [K in keyof T]: {
      [P in keyof T[K]]: T[K][P] & { plane: T[K][P]['plane'] & { theme: K } }
    }
  }
}
