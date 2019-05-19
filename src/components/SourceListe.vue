<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-tabs fixed-tabs>
          <v-tabs-slider></v-tabs-slider>

          <v-tab :href="'#tab1'" :key="1" @click="url = 'sources'">Répartitions à valider</v-tab>
          <v-tab :href="'#tab2'" :key="2" @click="url = 'valides'">Répartitions validées</v-tab>

          <v-tabs-items>
            <v-tab-item :value="'tab1'" :key="1">
              <v-expansion-panel popout v-model="panel">
                <v-expansion-panel-content v-for="(source, id) in sources" :key="id">
                  <div slot="header">
                    <highlight-source
                      :id="source.id"
                      :source="source.texte"
                      :regles="source.regles"
                    />
                  </div>

                  <valid-source
                    @validated="validated(id)"
                    :source_id="source.id"
                    :corporation="source.corporation"
                    :infodate="source.infodate"
                    :valide="true"
                  />

                  <rules-table :regles="source.regles"/>

                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout row wrap>
                          <v-flex xs2>
                            <v-btn color="primary" @click="addRegle = ! addRegle" small>
                              <v-icon dark left>add</v-icon>Ajouter une règle
                            </v-btn>
                          </v-flex>
                          <v-flex xs10>
                            <import-rules :regles="source.regles" :source_id="source.id"/>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-card>

                  <add-rule
                    v-if="addRegle"
                    :source="source.texte"
                    :regles="source.regles"
                    :source_id="source.id"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-tab-item>

            <v-tab-item :value="'tab2'" :key="2">
              <v-expansion-panel inset>
                <v-expansion-panel-content v-for="(source, id) in sources" :key="id">
                  <div slot="header">
                    <highlight-source
                      :id="source.id"
                      :source="source.texte"
                      :updated_at="source.updated_at"
                      :regles="source.regles"
                    />
                  </div>

                  <valid-source
                    @un_validated="un_validated(id)"
                    :source_id="source.id"
                    :valide="false"
                  />

                  <rules-table :regles="source.regles"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>

    <pagination-sources :pagination="pagination" :page="page" @newPage="page = $event"/>
  </v-container>
</template>

<script>
// import { highlightMixin } from "../mixins/highlight.js";

import highlightSource from "./parts/highlightSource";
import rulesTable from "./parts/rulesTable";
import validSource from "./parts/validSource";
import paginationSources from "./parts/paginationSources";
import addRule from "./forms/addRuleForm";
import importRules from "./forms/importRulesForm";

export default {
  data: () => ({
    url: "sources",
    sources: [],
    regles: [],
    pagination: {},
    page: 1,
    panel: [],
    hidden: [],
    addRegle: false,
    importRules: false
  }),

  mounted() {
    this.getAjax();
  },
  methods: {
    getData: function(data) {
      let pagination = {
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url
      };
      this.pagination = pagination;
      this.sources = data.data;
    },
    getAjax: function() {
      window.axios
        .get(this.url + "?page=" + this.page)
        .then(response => this.getData(response.data));
    },
    validated: function(id) {
      this.$delete(this.sources, id);
      this.panel = 1000; // un nombre suffisament grand pour que tous les items soient cachés
    },
    un_validated: function(id) {
      this.$delete(this.sources, id);
      this.panel = 1000; // un nombre suffisament grand pour que tous les items soient cachés
    }
  },
  watch: {
    page: function() {
      this.getAjax();
    },
    url: function() {
      this.getAjax();
    }
  },
  components: {
    "highlight-source": highlightSource,
    "valid-source": validSource,
    "rules-table": rulesTable,
    "add-rule": addRule,
    "import-rules": importRules,
    "pagination-sources": paginationSources
  }
};
</script>

<style>
</style>
