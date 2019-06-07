<template>
  <div id="questions-list">
    <v-layout>
      <v-flex md6 class="mx-auto">
        <v-toolbar flat height="72">
          <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Pertanyaan</v-toolbar-title>
          <v-spacer/>
          <v-btn icon dark flat class="prim-1-text" to="/app/questions/add">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider/>
        <v-list>
          <template v-for="item in items">
            <v-list-tile :key="`question-li-it-${item.id}`" avatar>
              <v-list-tile-avatar>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-avatar tile size="32" color="primary" v-on="on">
                      <span class="title white--text">{{ item.profileTarget }}</span>
                    </v-avatar>
                  </template>
                  <span>Profile Target: {{item.profileTarget}}</span>
                </v-tooltip>

              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-layout row justify-space-between align-center class="ma-0 pa-0">
                  <div>
                    <span class="grey--text text--darken-3">{{ item.type }}</span>
                    <span> / {{ item.isCf ? 'CF' : 'SF' }}</span>
                    <span class="body-1 grey--text">--- {{ item.base.created }}</span>
                  </div>

                  <!-- Vuetify add v-menu to dom event though it's not displayed.
                      And it breaks the layout. So we should wrap it into div.
                   -->
                  <div>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <font-awesome-icon v-on="on" icon="ellipsis-h"></font-awesome-icon>
                      </template>
                      <v-list dense>
                        <v-list-tile :to="`/app/questions/${item.id}`">
                          <v-list-tile-sub-title>Edit</v-list-tile-sub-title>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-sub-title>Hapus</v-list-tile-sub-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </div>
                </v-layout>
                <v-list-tile-sub-title class="body-2 grey--text text--darken-4">
                  {{ item.text }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="`question-li-div-${item.id}`" class="my-4"/>
          </template>
        </v-list>
        <!-- <v-timeline dense clipped>
          <v-timeline-item
            class="mb-4"
            hide-dot
          >
            <span>TODAY</span>
          </v-timeline-item>

          <v-timeline-item
            class="mb-3"
            color="grey"
            icon-color="grey lighten-2"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7>This order was archived.</v-flex>
              <v-flex xs5 text-xs-right>15:26 EDT</v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            class="mb-3"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7>
                <v-chip
                  class="white--text ml-0"
                  color="purple"
                  label
                  small
                >
                  APP
                </v-chip>
                Digital Downloads fulfilled 1 item.
              </v-flex>
              <v-flex xs5 text-xs-right>15:25 EDT</v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            class="mb-3"
            color="grey"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7>
                Order confirmation email was sent to John Leider (john@vuetifyjs.com).
              </v-flex>
              <v-flex xs5 text-xs-right>15:25 EDT</v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            class="mb-3"
            hide-dot
          >
            <v-btn
              class="mx-0"
              color="white"
            >
              Resend Email
            </v-btn>
          </v-timeline-item>

          <v-timeline-item
            class="mb-3"
            color="grey"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7>
                A $15.00 USD payment was processed on PayPal Express Checkout
              </v-flex>
              <v-flex xs5 text-xs-right>15:25 EDT</v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="grey"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7>
                John Leider placed this order on Online Store (checkout #1937432132572).
              </v-flex>
              <v-flex xs5 text-xs-right>15:25 EDT</v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Actions from '@/store/actions'

export default {
  name: 'QuestionsList',
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),

  computed: {
    timeline () {
      return this.events.slice().reverse()
    },
    ...mapState({
      'items': 'questions'
    })
  },

  methods: {
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })

      this.input = null
    },
    ...mapActions({
      'loadItems': Actions.QUESTIONS_LOAD_ITEMS
    })
  },
  
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">

#questions-list {
  .v-list__tile--avatar {
    height: auto;
  }

  .v-list__tile__title, .v-list__tile__sub-title {
    white-space: normal;
    overflow: initial;
  }

  .v-list__tile__content {
    .layout.row {
      flex-grow: 1;
      width: 100%;
    }
  }
}
</style>
