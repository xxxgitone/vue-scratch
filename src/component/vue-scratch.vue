<template>
  <div class="vue-scratch" :style="{width: `${coverWidth}px`, height: `${coverHeight}px`}">
    <canvas
      :width="coverWidth"
      :height="coverHeight"
      class="vue-scratch-canvas"
      ref="canvas">
    </canvas>
    <div class="vue-scratch-content" v-if="coverLoaded">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coverWidth: {
      type: Number,
      default: 200
    },
    coverHeight: {
      type: Number,
      default: 100
    },
    coverBg: {
      type: String,
      default: '#ccc'
    },
    coverImg: {
      type: String
    },
    radius: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      canvas: null,
      ctx: null,
      isScratch: false,
      coverLoaded: false
    }
  },
  computed: {
    hasTouchEvent () {
      return 'ontouchstart' in window
    }
  },
  methods: {
    initCanvas () {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      if (this.coverImg) {
        const image = new Image()
        image.onload = () => {
          // 避免刮层下面的内容先出现
          this.coverLoaded = true
          this.ctx.drawImage(image, 0, 0, this.coverWidth, this.coverHeight)
        }
        image.crossOrigin = "Anonymous"
        image.src = this.coverImg
      } else {
        this.ctx.fillStyle = this.coverBg
        this.ctx.fillRect(0, 0, this.coverWidth, this.coverHeight)
        this.coverLoaded = true
      }
    },
    initEvents () {
      if (this.hasTouchEvent) {
        this.$refs.canvas.addEventListener('touchstart', this.handleMouseDown)
        this.$refs.canvas.addEventListener('touchmove', this.handleMouseMove)
        this.$refs.canvas.addEventListener('touchend', this.handleMouseUp)  
      } else {
        this.$refs.canvas.addEventListener('mousedown', this.handleMouseDown)
        this.$refs.canvas.addEventListener('mousemove', this.handleMouseMove)
        this.$refs.canvas.addEventListener('mouseup', this.handleMouseUp)  
      }
    },
    getElementLeftAndTop (ele) {
      let offsetX = ele.offsetLeft
      let offsetY = ele.offsetTop
      let current = ele.offsetParent

      while (current !== null) {
        offsetX += current.offsetLeft
        offsetY += current.offsetTop
        current = current.offsetParent
      }

      return {
        offsetX, 
        offsetY
      }
    },
    getMousePoints (e) {
      const { offsetX, offsetY } = this.getElementLeftAndTop(this.canvas)
      const pointX = (e.pageX || e.touches[0].clientX) - offsetX
      const pointY = (e.pageY || e.touches[0].clientY) - offsetY

      return {
        pointX,
        pointY
      }
    },
    handleMouseDown (e) {
      this.isScratch = true
    },
    handleMouseUp () {
      this.isScratch = false
    },
    handleMouseMove (e) {
      e.preventDefault()
      if (this.isScratch) {
        const { pointX, pointY } = this.getMousePoints(e)
        this.ctx.beginPath()
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.globalCompositeOperation = "destination-out"
        this.ctx.arc(pointX, pointY, this.radius, 0, 2 * Math.PI)
        this.ctx.fill()
      }
    }
  },
  mounted () {
    this.initEvents()
    this.initCanvas()
  },
}
</script>

<style>
.vue-scratch {
  position: relative;
  overflow: hidden;
}

.vue-scratch-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
}

.vue-scratch-content {
  height: 100%;
  width: 100%;
}
</style>
