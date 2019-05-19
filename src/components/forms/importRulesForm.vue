<template>
  <v-layout row wrap>
    <v-flex xs3>
      <v-text-field v-model="import_id" label="Numéro de source à importer" required></v-text-field>
    </v-flex>
    <v-flex xs8>
      <v-btn color="primary" @click="submit">Importer des règles</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    import_id: null
  }),
  props: ["regles", "source_id"],
  methods: {
    submit() {
      const formData = {
        source_id: this.source_id,
        import_id: this.import_id
      };

      let parent = this;

      window.axios
        .post("sources/import", formData)
        .then(function(response) {
          Object.getOwnPropertyNames(parent.regles).forEach(function() {
            parent.regles.pop();
          });
          Object.keys(response.data).forEach(function(key) {
            parent.regles.push(response.data[key]);
          });
        })
        .catch();
    }
  }
};
</script>

<style>
</style>
