<template>
  <div class="pageContent">
    <h1> Sign Up </h1>

    <div class="register__formContainer">
      <form @submit.prevent="register">
        <div>  
          <label> Username </label> 
          <input v-model="user.username">
        </div>
        <div>  
          <label> Email </label> 
          <input v-model="user.email">
        </div>
        <div>
          <label>Password</label>
          <input
            v-model="user.password"
            type="password"
            @input="checkPasswordStrength"
          >
          <div
            v-if="passwordStrengthMessage"
            class="password-strength"
          >
            {{ passwordStrengthMessage }}
          </div>
        </div>
        <div>
          <label> Invite Code </label> 
          <input 
            v-model="user.inviteCode"
          >
        </div>
        <button> Register </button>
        <button @click="clear">
          Clear
        </button>
        <p v-show="errorMessage">
          <span class="errorMessage"> Uh oh. {{ errorMessage }} </span>
        </p>
        <p v-show="success">
          <span class="success"> Success! </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        inviteCode: this.$route.params.inviteCode || "",
      },
      success: false,
      errorMessage: "",
      passwordStrengthMessage: "",
    };
  },
  methods: {
    async register() {
      this.success = false;
      this.errorMessage = "";

      try {
        let newUser = await this.$store.dispatch("admin/register", this.user);
        if (newUser) {
          this.success = true;

          // Store the email in localStorage
          localStorage.setItem('unverifiedEmail', this.user.email);
          localStorage.setItem('unverifiedOtpSentDate', new Date().toISOString());

          // Redirect to the verification page
          this.$router.push("/user/verify");
        }

        this.$toasted.show(
          'Registration successful. Please verify your email to access additional site functionality.',
          {
            duration: 2000,
            type: 'success'
          }
        );

      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    checkPasswordStrength() {
      const password = this.user.password;
      let strength = 0;

      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/)) strength += 1;
      if (password.match(/[A-Z]/)) strength += 1;
      if (password.match(/[0-9]/)) strength += 1;
      if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

      switch (strength) {
        case 1:
        case 2:
          this.passwordStrengthMessage = 'Weak Password';
          break;
        case 3:
        case 4:
          this.passwordStrengthMessage = 'Moderate Password';
          break;
        case 5:
          this.passwordStrengthMessage = 'Strong Password';
          break;
        default:
          this.passwordStrengthMessage = '';
      }
    },
    clear() {
      this.user.username = "";
      this.user.password = "";
      this.success = false;
      this.errorMessage = "";
    }
  }
};
</script>

<style>
</style>