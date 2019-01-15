<template>
  <span v-html="highlight(source, regles)"></span>
</template>

<script>
export default {
  props: ["id", "source", "regles"],
  methods: {
    highlight: function(source, regles) {
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
      return "<strong>[" + this.id + "]</strong> " + source;
    }
  }
};
</script>

<style>
</style>
