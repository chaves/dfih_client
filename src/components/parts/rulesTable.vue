<template>
  <v-data-table :headers="headers" :items="regles" class="elevation-1" hide-actions must-sort>
    <template slot="items" slot-scope="props">
      <td class="text-xs">{{ props.item.id }}</td>
      <td class="text-xs">
        <v-edit-dialog
          :return-value.sync="props.item.niveau"
          lazy
          @save="save({'id': props.item.id, 'niveau': props.item.niveau})"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.niveau }}
          <v-text-field slot="input" v-model="props.item.niveau" label="Edit" single-line></v-text-field>
        </v-edit-dialog>
      </td>

      <td class="text-xs">
        <v-edit-dialog
          :return-value.sync="props.item.montant"
          lazy
          @save="save({'id': props.item.id, 'montant': props.item.montant})"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.montant }}
          <v-text-field slot="input" v-model="props.item.montant" label="Edit" single-line></v-text-field>
        </v-edit-dialog>
      </td>

      <td class="text-xs">
        <v-edit-dialog
          :return-value.sync="props.item.unite"
          lazy
          @save="save({'id': props.item.id, 'unite': props.item.unite})"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.unite }}
          <v-text-field slot="input" v-model="props.item.unite" label="Edit" single-line></v-text-field>
        </v-edit-dialog>
      </td>

      <td class="text-xs">
        <v-edit-dialog
          :return-value.sync="props.item.cible"
          lazy
          @save="save({'id': props.item.id, 'cible': props.item.cible})"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.cible }}
          <v-text-field slot="input" v-model="props.item.cible" label="Edit" single-line counter></v-text-field>
        </v-edit-dialog>
      </td>

      <edit-flags :regle="props.item"/>

      <td class="text-xs">
        <v-edit-dialog
          :return-value.sync="props.item.ordre"
          lazy
          @save="save({'id': props.item.id, 'ordre': props.item.ordre})"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.order_regle }}
          <v-text-field slot="input" v-model="props.item.order_regle" label="Edit" single-line counter></v-text-field>
        </v-edit-dialog>
      </td>

      <td class="text-xs">
        <v-btn flat icon color="red" @click="del(props.item.id, props.index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import editFlags from "../forms/editFlagsForm";

export default {
  props: ["regles"],
  data: () => ({
    headers: [
      { text: "id", sortable: false, value: "id" },
      { text: "Niveau", sortable: false, value: "name" },
      { text: "Montant", sortable: false, value: "montant" },
      { text: "Unité", sortable: false, value: "unite" },
      { text: "Cible", sortable: false, value: "cible" },
      { text: "Flags", sortable: false, value: "flags" },
      { text: "Ordre", sortable: true, value: "ordre" },
      { text: "Supprimer", sortable: false, value: "supprimer" }
    ],
    snack: false,
    snackColor: "",
    snackText: "",
    pagination: {},
    dialog: false,
    regleEdited: {}
  }),
  components: {
    "edit-flags": editFlags
  },
  methods: {
    save(val) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      window.axios
        .post("regles/updateItem", val)
        .then()
        .catch();
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      this.dialog = false;
    },
    del(id, index) {
      window.axios
        .post("regles/" + id)
        .then()
        .catch();
      this.$delete(this.regles, index);
    }
  }
};
</script>

<style>
</style>
