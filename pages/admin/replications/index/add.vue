<template>
  <div class="pageContent">
    <hr>
    <replication-editor 
      @new-replication="submitReplication"
      @update-replication="submitReplication" 
    />
  </div>
</template>

<script>
import ReplicationEditor from "@/components/replications/ReplicationEditor";

export default {
  components: {
    ReplicationEditor
  },
  middleware: ["auth"],
  methods: {
    async submitReplication(replication) {
      try {
        const response = await this.$store.dispatch(
          "replications/submit",
          replication
        );
        this.$router.push("/admin/replications");
      } catch (error) {
        this.$toasted.show(
          'There was an error saving the replication. ',
          {
            duration: 2000,
            type: 'error'
          }
        );
      }
    }
  }
};
</script>