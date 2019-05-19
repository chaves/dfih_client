<template>
  <v-layout row>
    <v-flex xs3>
      <v-card tile flat color="#dee8f9">
        <v-card-text>
          <strong>ID Source</strong>
          : {{source_id}}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs3>
      <v-card tile flat color="#dee8f9">
        <v-card-text>
          <strong>Date</strong>
          : {{infodate}}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs3>
      <v-card tile flat color="#dee8f9">
        <v-card-text color="#fff">
          <strong>Corporation</strong>
          : {{corporation}}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs3>
      <v-card tile flat class="text-md-center">
        <v-btn v-if="valide" flat icon color="green" @click="dialog = true">
          <v-icon>done_all</v-icon>&nbsp;Valider
        </v-btn>
        <v-btn v-else flat icon color="red" @click="dialog = true">
          <v-icon>restore</v-icon>&nbsp;Dévalider
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-actions>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">Fermer.</v-btn>
              <v-btn
                v-if="valide"
                color="green darken-1"
                flat="flat"
                @click="validate()"
              >Je confirme</v-btn>
              <v-btn v-else color="green darken-1" flat="flat" @click="un_validate()">Je confirme</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["source_id", "corporation", "infodate", "valide"],
  methods: {
    validate: function() {
      window.axios
        .post("validate", { source_id: this.source_id })
        .then((this.dialog = false))
        .catch();

      this.$emit("validated", this.source_id);
    },
    un_validate: function() {
      window.axios
        .post("un_validate", { source_id: this.source_id })
        .then((this.dialog = false))
        .catch();

      this.$emit("un_validated", this.source_id);
    }
  }
};
</script>

<style>
</style>
