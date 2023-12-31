<template>
  <div class="pageContent">
    <Icon
      filename="sitemap.svg"
      class="categoryIcon"
    />
    <h1> Subjective Effect Index </h1>
    <description />
    <tabs
      :tabs="['All', 'Sensory', 'Cognitive', 'Physical']"
      :active-tab="activeTab"
      @selectTab="selectTab"
    >
      <tab
        slot="All"
        style="padding-top: 1em;"
      >
        <column>
          <category
            icon="eye.svg"
            title="Visual Effects"
            page="/categories/visual-effects"
          >
            <actions
              :effects="filterEffectsByTag('visual', 'amplification')"
              title="Amplifications"
              page="/categories/visual-amplifications"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'suppression')"
              title="Suppressions"
              page="/categories/visual-suppressions"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'distortion')"
              title="Distortions"
              page="/categories/visual-distortions"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'geometric')"
              title="Geometric Patterns"
              page="/categories/geometric-patterns"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'hallucinatory state')"
              title="Hallucinatory States"
              page="/categories/hallucinatory-states"
            />
          </category>

          <category
            icon="volume-up.svg"
            title="Auditory Effects"
            page="/categories/auditory-effects"
          >
            <actions :effects="filterEffectsByTag('auditory')" />
          </category>

          <category
            icon="hand-paper.svg"
            title="Tactile Effects"
            page="/categories/tactile-effects"
          >
            <actions :effects="filterEffectsByTag('tactile')" />
          </category>

          <category
            icon="utensils.svg"
            title="Smell &amp; Taste Effects"
            page="/categories/smell-and-taste-effects"
          >
            <actions
              :effects="filterEffectsByTag('gustatory')"
              title="Gustatory Effects"
            />
            <actions
              :effects="filterEffectsByTag('olfactory')"
              title="Olfactory Effects"
            />
          </category>

          <category
            icon="cogs.svg"
            title="Multisensory Effects"
            page="/categories/multisensory-effects"
          >
            <actions
              :effects="filterEffectsByTag('multisensory')"
            />
          </category>
        </column>

        <column>
          <category
            icon="user.svg"
            title="Cognitive Effects"
            page="/categories/cognitive-effects"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'amplification')"
              page="/categories/cognitive-amplifications"
              title="Amplifications"
            />
            <actions
              :effects="filterEffectsByTag('cognitive', 'suppression')"
              page="/categories/cognitive-suppressions"
              title="Suppressions"
            />
            <actions
              :effects="filterEffectsByTag('cognitive', 'novel')"
              page="/categories/novel-cognitive-states"
              title="Novel States"
            />
            <actions
              :effects="filterEffectsByTag('cognitive', 'psychological state')"
              page="/categories/psychological-states"
              title="Psychological States"
            />
            <actions
              :effects="filterEffectsByTag('cognitive', 'transpersonal state')"
              page="/categories/transpersonal-states"
              title="Transpersonal States"
            />
          </category>
        </column>

        <column>
          <category
            icon="heart-rate.svg"
            title="Physical Effects"
            page="/categories/physical-effects"
          >
            <actions
              :effects="filterEffectsByTag('physical', 'amplification')"
              page="/categories/physical-amplifications"
              title="Amplifications"
            />
            <actions
              :effects="filterEffectsByTag('physical', 'suppression')"
              page="/categories/physical-suppressions"
              title="Suppressions"
            />
            <actions
              :effects="filterEffectsByTag('physical', 'alteration')"
              page="/categories/physical-alterations"
              title="Alterations"
            />
            <actions
              :effects="filterEffectsByTag('uncomfortable', 'bodily')"
              page="/categories/uncomfortable-bodily-effects"
              title="Uncomfortable bodily effects"
            />
            <actions
              :effects="filterEffectsByTag('uncomfortable', 'cardiovascular')"
              page="/categories/cardiovascular-effects"
              title="Cardiovascular"
            />
            <actions
              :effects="filterEffectsByTag('uncomfortable', 'neurological')"
              page="/categories/neurological-effects"
              title="Neurological"
            />
          </category>
        </column>
      </tab>

      <tab slot="Sensory">
        <blob>
          <p>
            <b> Sensory effects </b> are subjective effects that directly alter a person's senses. These can include any combination of sight, sound, touch, taste, and smell.
          </p>
        </blob>
        <column>
          <category
            icon="eye.svg"
            title="Visual Effects"
            page="/categories/visual-effects"
          >
            <actions
              :effects="filterEffectsByTag('visual', 'amplification')"
              title="Amplifications"
              page="/categories/visual-amplifications"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'suppression')"
              title="Suppressions"
              page="/categories/visual-suppressions"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'distortion')"
              title="Distortions"
              page="/categories/visual-distortions"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'geometric')"
              title="Geometric Patterns"
              page="/categories/geometric-patterns"
            />
            <actions
              :effects="filterEffectsByTag('visual', 'hallucinatory state')"
              title="Hallucinatory States"
              page="/categories/hallucinatory-states"
            />
          </category>
        </column>

        <column>
          <category
            icon="volume-up.svg"
            title="Auditory Effects"
            page="/categories/auditory-effects"
          >
            <actions :effects="filterEffectsByTag('auditory')" />
          </category>

          <category
            icon="hand-paper.svg"
            title="Tactile Effects"
            page="/categories/tactile-effects"
          >
            <actions :effects="filterEffectsByTag('tactile')" />
          </category>

          <category
            icon="utensils.svg"
            title="Smell &amp; Taste Effects"
            page="/categories/smell-and-taste-effects"
          >
            <actions
              :effects="filterEffectsByTag('gustatory')"
              title="Gustatory Effects"
            />
            <actions
              :effects="filterEffectsByTag('olfactory')"
              title="Olfactory Effects"
            />
          </category>
        </column>

        <column>
          <category
            icon="cogs.svg"
            title="Multisensory Effects"
            page="/categories/multisensory-effects"
          >
            <actions
              :effects="filterEffectsByTag('multisensory')"
            />
          </category>
        </column>
      </tab>

      <tab slot="Cognitive">
        <blob>
          <p>
            <b> Cognitive effects </b> are subjective effects that directly alter or introduce new content to an element of a person's cognition.
          </p>
        </blob>

        <column>
          <category
            icon="arrow-up.svg"
            title="Amplifications"
            page="/categories/cognitive-amplifications"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'amplification')"
            />
          </category>
          <category
            icon="arrow-down.svg"
            title="Suppressions"
            page="/categories/cognitive-suppressions"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'suppression')"
            />
          </category>
        </column>
        <column>
          <category
            icon="lightbulb.svg"
            title="Novel States"
            page="/categories/novel-cognitive-states"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'novel')"
            />
          </category>
          <category
            icon="psychological.svg"
            title="Psychological States"
            page="/categories/psychological-states"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'psychological state')"
            />
          </category>
        </column>
        <column>
          <category
            icon="infinity.svg"
            title="Transpersonal States"
            page="/categories/transpersonal-effects"
          >
            <actions
              :effects="filterEffectsByTag('cognitive', 'transpersonal state')"
            />
          </category>
        </column>
      </tab>

      <tab slot="Physical">
        <blob>
          <p>
            <b> Physical effects </b> are subjective effects that directly affect part of a person's physical body.
          </p>
        </blob>
        <column>
          <category
            icon="arrow-up.svg"
            title="Amplifications"
            page="/categories/physical-amplifications"
          >
            <actions :effects="filterEffectsByTag('physical', 'amplification')" />
          </category>

          <category
            icon="arrow-down.svg"
            title="Suppressions"
            page="/categories/physical-suppressions"
          >
            <actions :effects="filterEffectsByTag('physical', 'suppression')" />
          </category>

          <category
            icon="cogs.svg"
            title="Alterations"
            page="/categories/physical-alterations"
          >
            <actions
              :effects="filterEffectsByTag('physical', 'alteration')"
            />
          </category>
        </column>

        <column>
          <category
            icon="child.svg"
            title="Uncomfortable bodily effects"
            page="/categories/uncomfortable-bodily-effects"
          >
            <actions
              :effects="filterEffectsByTag('physical', 'bodily')"
            />
          </category>
        </column>
        <column>
          <category
            icon="brain.svg"
            title="Neurological"
            page="/categories/neurological-effects"
          >
            <actions :effects="filterEffectsByTag('physical', 'neurological')" />
          </category>

          <category
            icon="heart.svg"
            title="Cardiovascular"
            page="/categories/cardiovascular-effects"
          >
            <actions :effects="filterEffectsByTag('physical', 'cardiovascular')" />
          </category>
        </column>
      </tab>
    </tabs>
  </div>
</template>

<script>
import Tabs from "@/components/effects/index/Tabs";
import Tab from "@/components/effects/index/Tab";
import Category from "@/components/effects/index/Category";
import Column from "@/components/effects/index/Column";
import Actions from "@/components/effects/index/Actions";
import Description from "@/components/effects/index/Description";
import Blob from "@/components/effects/index/Blob";
import Icon from "@/components/Icon";

export default {
  components: {
    Tabs,
    Tab,
    Category,
    Actions,
    Column,
    Description,
    Blob,
    Icon
  },
  data() {
    return {
      activeTab: this.$route.query.type
    };
  },
  async fetch ({ store }) {
    await store.dispatch("effects/get");
  },
  head() {
    return {
      title: "Subjective Effect Index"
    };
  },
  computed: {
    effects() {
      return this.$store.state.effects.list;
    },
  },
  watchQuery: ['type'],
  methods: {
    filterEffectsByTag(...tags) {
      return this.effects.filter(effect =>
        tags.every(tag => effect.tags.indexOf(tag) > -1)
      );
    },
    selectTab(name) {
      this.activeTab = name;
    }
  },
};
</script>
