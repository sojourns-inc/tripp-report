<template>
  <div class="description">
    <search-box />
    <p>
      <span class="bold"> Effect Index, </span> which is currently under construction, is a
      resource dedicated to establishing the field of formalised subjective effect documentation. It is the home
      of the <nuxt-link to="/effects/">
        Subjective Effect Index
      </nuxt-link> (SEI), which contains {{ effectCount }} effect
      descriptions that exist to serve as a comprehensive map of all potential experiences that can occur under the influence of any
      class of psychoactive compound, particularly hallucinogens.
    </p>

    <transition name="fade">
      <div
        v-show="hiddenIntro"
        class="hiddenIntro"
      >
        <p>
          The effects identified here are accompanied by detailed descriptions of how it feels to experience them.
          These are written in an objective and <nuxt-link to="/documentation-style-guide">
            consistent writing style
          </nuxt-link> based upon phenomenological observation
          and avoids the use of metaphor or analogy. The descriptions also strive to use language that is as simple and
          understandable as possible. This has been done with the hope that they will serve as a universal terminology that
          allows people to describe and discuss that which was previously considered ineffable.
        </p>
        <p>
          These effects are organised into categories based on the sense
          affected and their behaviour. Many of these are further broken down into levels, subcomponents, and variations in
          style, which can occur across different substances. Detailed <nuxt-link to="/replications">
            replications
          </nuxt-link> are included whenever possible to supplement
          the text descriptions in the form of images, audio clips, and animations.
        </p>
      </div>
    </transition>

    <div
      style="display: inline-block;"
      class="whiteButton"
      @click="toggleIntro"
    >
      read {{ hiddenIntro ? 'less' : 'more' }}
    </div>

    <nuxt-link
      style="display: inline-block; margin-left: 1em;"
      class="pageContent whiteButton"
      to="/about"
    >
      About Us
    </nuxt-link>
  </div>
</template>

<script>
import SearchBox from "./SearchBox";

export default {
components: {
  SearchBox
},
data() {
  return {
    hiddenIntro: false
  };
},
computed: {
  effectCount() {
    return this.$store.state.effects.list.length;
  }
},
methods: {
  toggleIntro() {
      this.hiddenIntro = !this.hiddenIntro;
    }
  }
};
</script>

<style scoped>
.description {
  margin-bottom: 30px;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}
</style>
