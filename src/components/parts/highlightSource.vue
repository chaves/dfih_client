<template>
  <span v-html="highlight(id, source, updated_at, regles)"></span>
</template>

<script>
export default {
  props: ["id", "source", "updated_at", "regles"],
  methods: {
    highlight: function(id, source, updated_at, regles) {
      const levels = { 1: "one", 2: "two", 3: "three", 4: "four" };
      if (regles) {
        regles.map(function(value) {
          source = source.replace(
            new RegExp("(" + value.montant + "\\D*" + value.cible + ")", "i"),
            match => {
              return (
                '<span class="level-' +
                levels[value.niveau] +
                '">' +
                match +
                "</span>"
              );
            }
          );
        });
      }
      if (updated_at) {
        return updated_at + " - <strong>[" + id + "]</strong> " + source;
      } else {
        return "<strong>[" + id + "]</strong> " + source;
      }
    }
  }
};
</script>

<style>
</style>
