<script setup lang="ts">
import { onMounted } from 'vue';

interface IContext {
    drawSquare(info: {
        position: { x: number, y: number }
        color: string
        size: number
    }): void
}

class PlateGameObject {

    position: { x: number, y: number }
    width: number
    height: number
    fragmentSize: number

    constructor({
        position = { x: 0, y: 0 },
        width = 200,
        height = 200,
        fragmentSize = 10
    }: {
        position?: { x: number, y: number },
        width?: number,
        height?: number,
        fragmentSize?: number
    }) {
        this.position = position
        this.width = width
        this.height = height
        this.fragmentSize = fragmentSize
    }

    draw = (context: IContext) => {

        const cols = this.width / this.fragmentSize
        const rows = this.height / this.fragmentSize
        const fragmentSize = this.fragmentSize



        for (let y = -rows / 2; y <= rows / 2; y++) {
            for (let x = -cols / 2; x <= cols / 2; x++) {

                context.drawSquare({
                    position: { x: Math.round(x * fragmentSize) - fragmentSize / 2, y: Math.round(y * fragmentSize) + fragmentSize / 2 },
                    size: fragmentSize,
                    color: 'black'
                })
            }

        }
    }
}

onMounted(() => {

    const canvas = document.querySelector('canvas')!

    const context = canvas.getContext('2d')!

    const [WIDTH, HEIGHT] = [canvas.width, canvas.height]

    const plate = new PlateGameObject({
        fragmentSize: 100,
        height: 900,
        width: 900,
        position: { x: 0, y: 0 }
    })

    const loop = () => {

        plate.draw({
            drawSquare({
                color,
                position,
                size
            }) {
                context?.beginPath()
                context.fillStyle = color
                context?.fillRect(
                    position.x + WIDTH / 2,
                    -position.y + HEIGHT / 2,
                    size, size
                )
            }
        })

        requestAnimationFrame(loop)
    }

    loop()

})

</script>

<template>
    <canvas
        width="900"
        height="900"
    />
</template>
<style>
#app {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

canvas {
    border: 1px solid black;
}
</style>
