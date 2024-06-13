<template>
  <div>
    <h2>Login</h2>
    <div class="login__formContainer">
      <form @submit.prevent="login">
        <div>
          <label>
            Username
            <input v-model="user.username" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input v-model="user.password" type="password" />
          </label>
        </div>
        <TurnstileWidget
          :sitekey="cfSiteKey"
          theme="light"
          @turnstile-success="onTurnstileSuccess"
        />
        <button :disabled="!turnstilePassed">Login</button>
      </form>
      <p v-show="errorMessage">
        <span class="errorMessage"> Ungood. {{ errorMessage }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import TurnstileWidget from '../../../components/TurnstileWidget.vue';
export default {
  components: { TurnstileWidget },
  data() {
    return {
      cfSiteKey: "0x4AAAAAAAccukMGX0Hy0y2V", // Fetch the sitekey directly
      user: {
        username: undefined,
        password: undefined
      },
      errorMessage: "",
      turnstilePassed: false
    };
  },

  methods: {
    onTurnstileSuccess(token) {
      // call your login function with the token
      this.turnstilePassed = true;
      this.login(token);
    },
    async login(token) {
      try {
        let response = await this.$auth.loginWith("local", {
          data: { user: this.user }
        });

        this.$toasted.show(
          'You are now logged in.',
          {
            duration: 2000,
            type: 'success'
          }
          );

      } catch (error) {
        if ("error" in error.response.data)
          this.errorMessage = error.response.data.error.message;
      }
    }
  }
};
</script>
