<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs4>
            <v-select v-model="niveau" :items="niveaux_labels" label="Niveau" required></v-select>
          </v-flex>

          <v-flex xs4>
            <v-text-field v-model="montant" label="Montant" required></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-text-field v-model="unite" label="Unité" required></v-text-field>
          </v-flex>

          <v-flex xs8>
            <v-text-field v-model="cible" label="Cible" required></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-select v-model="ordre" :items="ordre_labels" label="Ordre" required></v-select>
          </v-flex>
          <v-btn @click="submit">save</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <highlight-source :source="source" :regles="regles" :id="source_id"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import highlightSource from "../parts/highlightSource";
export default {
  data: () => ({
    niveau: null,
    ordre: null,
    montant: "",
    unite: "%",
    cible: "",
    niveaux_labels: [1, 2, 3, 4, 5, 6, 6, 8, 9, 10],
    ordre_labels: [1, 2, 3, 4, 5, 6, 6, 8, 9, 10, 11, 12, 13, 14, 15]
  }),
  props: ["source", "regles", "source_id"],
  components: {
    "highlight-source": highlightSource
  },
  methods: {
    submit() {
      const formData = {
        source_id: this.source_id,
        niveau: this.niveau,
        ordre: this.ordre,
        montant: this.montant,
        unite: this.unite,
        cible: this.cible,

        cible_si_independant: "",
        exception: "",
        min: "",
        max: ""
      };
      this.regles.push(formData);

      window.axios
        .post("regles", formData)
        .then()
        .catch();

      this.niveau = null;
      this.ordre = null;
      this.montant = "";
      this.unite = "%";
      this.cible = "";
    }
  },
  computed: {
    // un accesseur (getter) calculé
    current_order: function() {
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>

<style>
</style>
