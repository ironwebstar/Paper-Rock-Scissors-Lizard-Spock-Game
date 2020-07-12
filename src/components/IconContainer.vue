<template>
  <div class="icon__wrapper-out" :style="iconWrapperStyle">
    <div class="icon__wrapper-in flex justify-content-center" :style="iconInnerWrapperStyle">
      <b-img :src="imgSrc" fluid :alt="`${name} Icon`" :style="iconImgStyle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconContainer',

  props: {
    color1: {
      type: String,
      required: true,
    },
    color2: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 140,
    },
  },

  computed: {
    iconWrapperStyle() {
      return {
        background: `linear-gradient(to bottom, ${this.color1}, ${this.color2})`,
        width: `${this.size}px`,
        height: `${this.size}px`,
        padding: `${this.size / 8}px`,
      };
    },

    iconInnerWrapperStyle() {
      const width = (this.size * 6) / 8;
      return {
        width: `${width}px`,
        height: `${width}px`,
      };
    },

    iconImgStyle() {
      return {
        width: `${(this.size * 2.5) / 8}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  &__wrapper {
    &-out {
      border-radius: 100%;
      cursor: pointer;
      box-shadow: inset 0 -15px 20px -10px #352d2d;
    }
    &-in {
      background: white;
      border-radius: 100%;
      display: flex;
      align-items: center;
      box-shadow: inset 1px 24px 29px -26px #3d3838;
    }
  }
}
</style>>
