export const Matrix = {
  fromArray: (arr: number[]): number[][] => arr.map((i) => [i]),

  getSize: (a: number[][]): [number, number] => [a[0].length, a.length],

  sum: (a: number[][], b: number[][]): number[][] =>
    a.map((row, i) => row.map((val, j) => val + b[i][j])),

  substract: (a: number[][], b: number[][]): number[][] =>
    a.map((row, i) => row.map((val, j) => val - b[i][j])),

  scale: (a: number[][], scalar: number): number[][] =>
    a.map((row) => row.map((val) => val * scalar)),

  transpose: (a: number[][]): number[][] =>
    a[0].map((_, j) => a.map((row) => row[j])),

  mul: <T = number[][]>(a: number[][], b: number[][]): T => {
    const [aCols, aRows] = Matrix.getSize(a);
    const [bCols, bRows] = Matrix.getSize(b);

    if (aCols !== bRows) {
      throw new Error("Matrix size mismatch: a.cols !== b.rows");
    }

    return Array.from({ length: aRows }, (_, i) =>
      Array.from({ length: bCols }, (_, j) =>
        a[i].reduce((sum, val, k) => sum + val * b[k][j], 0)
      )
    ) as T;
  },
};
