<template>
  <div class="pageContent">
    <div v-if="profile.username">
      <h1>{{ profile.username }}</h1>
      <profile-image
        :filename="profile.profileImageFull"
        :username="profile.username"
      />
      <!-- eslint-disable-next-line -->
      <div v-if="profile.body" v-html="$md.render(profile.body)"
      />
      <div
        v-if="replications.length > 0"
        style="clear: both; margin-top: 2em;"
      >
        <hr>
        <h3>Replications</h3>
        <light-box
          :image-set="replications"
          base="/img/gallery/"
        />
      </div>
    </div>
    <div v-else>
      <h1>Profile not found</h1>
    </div>
  </div>
</template>

<script>
import ProfileImage from "@/components/profiles/ProfileImage.vue";
import LightBox from "@/components/gallery/LightBox.vue";

export default {
  components: {
    ProfileImage,
    LightBox
  },
  scrollToTop: true,
  async asyncData({ store, params, error }) {
    let username = params.username;

    let { profile } = await store.dispatch("profiles/getProfileByName", username);

    if (!profile) return;

    let { replications } = await store.dispatch(
      "replications/getReplicationsByArtist",
      username
    );

    return { profile, replications };
  },
  data() {
    return {
      profile: {},
      replications: []
    };
  },
  head() {
    return {
      title: this.profile.username,
      meta: [
        { name: 'description', hid: 'description', content: `Profile of Effect Index contributor ${this.profile.username}` },
        { name: 'og:title', hid: 'og:title', content: `Effect Index - ${this.profile.username}` },
        { name: 'og:description', hid: 'og:description', content: `Profile of Effect Index contributor ${this.profile.username}` },
        { name: 'og:image', hid: 'og:image', content: `/img/profiles/${this.profile.profileImageFull}` },
        { name: 'twitter:title', hid: 'twitter:title', content: `Effect Index - ${this.profile.username}` },
        { name: 'twitter:description', hid: 'twitter:description', content: `Profile of Effect Index contributor ${this.profile.username}` },
        { name: 'twitter:image', hid: 'twitter:image', content: `/img/profiles/${this.profile.profileImageFull}` },
      ]
    };
  }
};
</script>
