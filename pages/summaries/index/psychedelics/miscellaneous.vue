<template>
  <div class="pageContent effectCategories">
    <div>
      <Icon
        filename="cogs.svg"
        class="categoryIcon"
      />
      <h1> Miscellaneous Effects of Psychedelics </h1>
      <div class="categoryDescription">
        <p> This article breaks down the subjective miscellaneous effects of the psychedelic experience into simple and easy to understand descriptions with accompanying image replications. This is done without resorting to metaphor, analogy, or personal trip reports. </p>
        <p> These descriptions are not specific to any particular substance but are applicable to the effects which commonly occur in various forms under the influence of almost any psychedelic compound. This includes, but is not limited to, both classical and research chemical psychedelics, such as: </p>
        <p style="font-style: italic;">
          LSD, Psilocybin mushrooms, DMT, Ayahuasca, Mescaline, 5-MeO-MiPT, 2C-B, LSA, AL-LAD, ALD-52, 1P-LSD, 2C-B-Fly, 2C-C, 2C-D, 2C-E, 2C-P, 4-AcO-DMT, 4-HO-MET, 4-HO-MiPT, 5-MeO-DMT, DPT, and DOC.
        </p>
        <p> The article begins with a description of the simpler effects and works its way up towards more complex experiences as it progresses. Individual effects are also summarized with a link to their full article. </p>
      </div>
    </div>
    <hr>

    <div class="effectsContainer">
      <h3 class="titleContainer">
        Auditory Effects
        <Icon
          filename="volume-up.svg"
          class="actionIcon"
        />
      </h3>

      <p class="actionDescription">
        <b> Auditory effects </b> are any subjective effect which directly alters a person's sense of hearing.
      </p>

      <long-summary
        v-for="(effect, i) in filterEffectsByTag('psychedelic', 'miscellaneous', 'auditory')"
        :key="effect._id"
        :index="i"
        :effect="effect"
      />
    </div>


    <div class="effectsContainer">
      <h3 class="titleContainer">
        Tactile Effects
        <Icon
          filename="hand-paper.svg"
          class="actionIcon"
        />
      </h3>

      <p class="actionDescription">
        <b> Tactile effects </b> are any subjective effect which directly alters a person's sense of touch.
      </p>

      <long-summary
        v-for="(effect, i) in filterEffectsByTag('psychedelic', 'miscellaneous', 'tactile')"
        :key="effect._id"
        :index="i"
        :effect="effect"
      />
    </div>



    <div class="effectsContainer">
      <h3 class="titleContainer">
        Multisensory Effects
        <Icon
          filename="cogs.svg"
          class="actionIcon"
        />
      </h3>

      <p class="actionDescription">
        <b> Multisensory effects </b> are any subjective effect which directly alters two or more senses simultaneously. <br> <br>
        Although some hallucinatory effects may affect multiple senses at one time they are usually
        not categorized as 'multisensory effects' unless they do so consistently.
        For example, while experiences with autonomous entities may sometimes have a tactile component to them, more often
        than not they are primarily a visual experience and are therefore classified as such.
      </p>

      <long-summary
        v-for="(effect, i) in filterEffectsByTag('psychedelic', 'miscellaneous', 'multisensory')"
        :key="effect._id"
        :index="i"
        :effect="effect"
      />
    </div>

    <div class="effectsContainer">
      <h3 class="titleContainer">
        Physical Effects
        <Icon
          filename="heart-rate.svg"
          class="actionIcon"
        />
      </h3>

      <p class="actionDescription">
        <b> Physical effects </b> are any subjective effect which directly affects an aspect of a person's physical body.
        <br> <br>
        Although many uncomfortable physical effects also technically fit into this definition, they are excluded from this category of
        effects as they have their own defining qualities which standard physical effects do not.
      </p>

      <long-summary
        v-for="(effect, i) in filterEffectsByTag('psychedelic', 'miscellaneous', 'physical').filter((effect) => !effect.tags.includes('uncomfortable'))"
        :key="effect._id"
        :index="i"
        :effect="effect"
      />
    </div>

    <div class="effectsContainer">
      <h3 class="titleContainer">
        Uncomfortable Effects
        <Icon
          filename="frown.svg"
          class="actionIcon"
        />
      </h3>

      <p class="actionDescription">
        An <b> uncomfortable physical effect </b> is any
        substance-induced alteration of a person's physical state which is unpleasant, undesirable,
        painful, or otherwise a source of distress. In most cases they indicate a temporary part
        of a substance's interaction with the body. However, in certain contexts, they can also
        indicate the need for attention or even medical treatment if they become dangerously severe.
      </p>

      <long-summary
        v-for="(effect, i) in filterEffectsByTag('psychedelic', 'miscellaneous', 'uncomfortable')"
        :key="effect._id"
        :index="i"
        :effect="effect"
      />
    </div>

    <h3> See Also </h3>
    <ul>
      <li>
        <nuxt-link to="/summaries/psychedelics/cognitive">
          Cognitive Psychedelic Effects
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/summaries/psychedelics/visual">
          Visual Psychedelic Effects
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import LongSummary from "@/components/effects/LongSummary";
import Icon from '@/components/Icon';

export default {
  components: {
    LongSummary,
    Icon
  },
  scrollToTop: true,
  data () {
    return {
      linkedEffect: this.$route.query.e
    };
  },
  head() {
    return {
      title: "Miscellaneous Psychedelic Effects"
    };
  },
  computed: {
    effects() {
      return this.$store.state.effects.list;
    }
  },
  watchQuery: ['e'],
  mounted() {
    if (this.linkedEffect) {
      this.$scrollTo(`#${this.linkedEffect}`);
    }
  },
  methods: {
    filterEffectsByTag(...tags) {
      return this.effects.filter(effect =>
        tags.every(tag => effect.tags.indexOf(tag) > -1)
      );
    }
  }
};
</script>
