<template>
  <div class="pageContent">
    <div v-if="person">
      <captioned-image
        v-show="person.profile_image"
        float="right"
        rounding="10px"
        :src="'/' + person.profile_image"
      />
      <h1> {{ person.full_name || person.alias }} </h1>
      <vcode
        v-if="person.bio && person.bio.parsed"
        :body="person.bio.parsed"
      />
    </div>
  </div>
</template>

<script>
import vcode from "@/components/vcode/vcode";
import CaptionedImage from "@/components/CaptionedImage";

export default {
  components: {
    vcode,
    CaptionedImage
  },
  data() {
    return {
      person: undefined
    };
  },
  async fetch() {
    try {
      const profile_url = this.$route.params.url;
      const { person } = await this.$axios.$get(`/api/persons/${profile_url}`);
      this.person = person;
    } catch (error) {
      console.log(error);
    }
  },
  head() {
    return {
      title: "People" // Ideally, the page title would be updated to `profile.full_name` after, but for some reason this is called after fetch, which overrides the page title change
    };
  }

};
</script>
