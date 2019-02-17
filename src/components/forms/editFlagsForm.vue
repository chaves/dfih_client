<template>
  <td class="text-xs">
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <div slot="activator">{{ flags }}</div>
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs4>
                <v-switch
                  :label="`Chiffre indep. des bénéfices`"
                  v-model="regle.flag_chiffre_independant_des_benefs"
                ></v-switch>
              </v-flex>

              <v-flex xs8>
                <v-text-field v-model="regle.cible_si_independant" label="Cible si independant"></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field v-model="regle.exception" label="Exception"></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field v-model="regle.min" label="Min"></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field v-model="regle.max" label="Max"></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-switch :label="`Optionel`" v-model="regle.flag_optionel"></v-switch>
              </v-flex>

              <v-flex xs3>
                <v-switch :label="`Cible multiple`" v-model="regle.flag_cible_multiple"></v-switch>
              </v-flex>

              <v-flex xs3>
                <v-switch :label="`Délégation`" v-model="regle.flag_delegation"></v-switch>
              </v-flex>

              <v-flex xs3>
                <v-switch :label="`Illisible`" v-model="regle.flag_illisible"></v-switch>
              </v-flex>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close()">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="submit()">Save</v-btn>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    flags: []
  }),
  props: ["regle"],
  mounted() {
    this.viewFlags(this.regle);
  },
  methods: {
    submit() {
      window.axios
        .post("regles/updateItem", this.regle)
        .then()
        .catch();
      this.viewFlags(this.regle);
      this.dialog = false;
    },
    viewFlags: function(regle) {
      this.flags = [];
      if (regle.flag_chiffre_independant_des_benefs) {
        this.flags.push("chiffre_independant_des_benefs");
      }
      if (regle.cible_si_independant.length > 0) {
        this.flags.push("cible:" + regle.cible_si_independant);
      }
      if (regle.exception.length > 0) {
        this.flags.push("exception:" + regle.exception);
      }
      if (regle.min.length > 0) {
        this.flags.push("min:" + regle.min);
      }
      if (regle.max.length > 0) {
        this.flags.push("max:" + regle.max);
      }
      if (regle.flag_optionel) {
        this.flags.push("optionel");
      }
      if (regle.flag_cible_multiple) {
        this.flags.push("cible_multiple");
      }
      if (regle.flag_delegation) {
        this.flags.push("delegation");
      }
      if (regle.flag_illisible) {
        this.flags.push("illisible");
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
