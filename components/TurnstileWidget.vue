<template>
    <div ref="turnstileContainer"></div>
  </template>
  
  <script>
  export default {
    props: {
      sitekey: String,
      theme: String,
    },
    mounted() {
      // Load the Turnstile script if not already loaded
      if (!window.turnstile) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = this.renderTurnstile;
        document.head.appendChild(script);
      } else {
        this.renderTurnstile();
      }
    },
    methods: {
      renderTurnstile() {
        window.turnstile.render(this.$refs.turnstileContainer, {
          sitekey: this.sitekey,
          theme: this.theme,
          callback: this.onTurnstileSuccess,
        });
      },
      onTurnstileSuccess(token) {
        this.$emit('turnstile-success', token); 
      },
    },
  };
  </script>
  