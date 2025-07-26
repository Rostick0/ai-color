<script setup lang="ts">
import { Matrix } from '@/libs/math/matrix'
import { onMounted } from 'vue'

onMounted(() => {
  const sigmoid = (x: number) => {
    return 1 / (1 + Math.E ** (-x))
  }

  const activate = (matrix: number[][]) => {
    return matrix.map(i => i.map(j => sigmoid(j)))
  }

  const derActivate = (matrix: number[][]) => {
    return matrix.map(i => i.map(j => sigmoid(j) * (1 - sigmoid(j))))
  }

  const alpha = 0.01

  const inputs = [
    [1, 1],
    [2, 3],
    [-2, -5],
    [2, 3],
    [-9, -4],
    [2, 8],
    [-3, -5],
  ].map(i => [i])

  const outputs = [
    [1],
    [1],
    [0],
    [1],
    [0],
    [1],
    [0],
  ].map(i => [i])

  let W_0 = [
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
  ]
  let W_1 = [
    [-45.775231475539144],
    [49.332078048614385],
  ]

  const feedForward = (inputs: number[][], weights: number[][]) => {
    const result = Matrix.mul(inputs, weights)

    return result
  }

  const h1 = feedForward([
    [1, -4]
  ], W_0)
  const t = activate(h1)

  const h2 = feedForward(t, W_1)
  const y = activate(h2)

  console.log(y[0][0]);
  

  // for (let j = 0; j < 100; j++) {

  //   let ERROR = 0

  //   for (let i = 0; i < 10000; i++) {
  //     inputs.forEach((_, idx) => {

  //       const X: number[][] = inputs[idx]
  //       const O: number[][] = outputs[idx]

  //       const h1 = feedForward(X, W_0)
  //       const t = activate(h1)

  //       const h2 = feedForward(t, W_1)
  //       const y = activate(h2)

  //       const e = y[0][0] - O[0][0]

  //       const E = e ** 2
  //       ERROR = E

  //       const dE_de = 2 * e
  //       const de_dy = 1
  //       const dy_dh2 = derActivate(h2)

  //       const de_dh2 = Matrix.scale(dy_dh2, dE_de * de_dy)
  //       const dh2_dw1 = t

  //       const dE_dw1 = Matrix.transpose(Matrix.mul(de_dh2, dh2_dw1))

  //       W_1 = Matrix.substract(W_1, Matrix.scale(dE_dw1, alpha))
  //     })
  //   }

  //   console.log(ERROR);
  // }

})

</script>

<template>
  <main>
  </main>
</template>
