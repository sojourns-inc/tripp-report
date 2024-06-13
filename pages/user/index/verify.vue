<template>
  <div>
    <h1>Verify Your Email</h1>
    <div v-if="showOtpInput">
      <input
        v-model="otp"
        placeholder="Enter code"
      >
      <button @click="verifyOtp">
        Verify
      </button>
      <button @click="resendOtp">
        Resend Code
      </button>
    </div>
    <div v-else>
      <input
        v-model="email"
        placeholder="Enter your email"
      >
      <button @click="sendCode">
        Send Code
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: "",
      email: "",
      showOtpInput: false,
    };
  },
  mounted() {
    const unverifiedEmail = localStorage.getItem("unverifiedEmail");
    const unverifiedOtpSentDate = localStorage.getItem("unverifiedOtpSentDate");

    if (unverifiedEmail && unverifiedOtpSentDate) {
      this.email = unverifiedEmail;
      this.showOtpInput = true;
    }
  },
  methods: {
    async sendCode() {
      if (!this.validateEmail(this.email)) {
        this.$toasted.show("Please enter a valid email address.", { type: "error" });
        return;
      }

      try {
        const payload = { email: this.email };
        await this.$axios.post("/api/otps/sendCode", payload);
        localStorage.setItem("unverifiedEmail", this.email);
        localStorage.setItem("unverifiedOtpSentDate", new Date().toISOString());
        this.showOtpInput = true;
        this.$toasted.show("OTP sent to your email.", { type: "success" });
      } catch (error) {
        this.$toasted.show(error.message || "Error sending OTP.", { type: "error" });
      }
    },
    async verifyOtp() {
      try {
        // Construct the payload
        const payload = {
          email: this.email,
          otp: this.otp,
        };

        // Send the payload to the backend for verification
        const response = await this.$axios.post("/api/otps/verifyCode", payload);

        // Handle the response
        if (response.data.success) {
          // OTP verification successful
          this.$toasted.show("Email verified successfully!", {
            type: "success",
          });
          // Redirect to login or another appropriate page
          this.$router.push("/user/login");
        } else {
          // OTP verification failed
          this.$toasted.show(response.data.message, { type: "error" });
        }
      } catch (error) {
        // Handle any errors
        this.$toasted.show(
          error.message || "An error occurred during verification.",
          { type: "error" }
        );
      }
    },
    async resendOtp() {
      try {
        const payload = { email: this.email };
        await this.$axios.post("/api/otps/resendCode", payload);
        localStorage.setItem("unverifiedOtpSentDate", new Date().toISOString());
        this.$toasted.show("OTP resent to your email.", { type: "success" });
      } catch (error) {
        this.$toasted.show(error.message || "Error resending OTP.", { type: "error" });
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    }
  },
};
</script>
