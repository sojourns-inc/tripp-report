import Vuex from 'vuex'
import effects from '@/data/effects.json';
import navigation from '@/data/navigation.json';
import gallery from '@/data/gallery.json';

const createStore = () => {
  return new Vuex.Store({
    state: {
      navbar_pullout: false,
      effects,
      navigation,
      gallery
    },
    mutations: {
      toggle_navbar (state) {
        state.navbar_pullout = !state.navbar_pullout
      }
    }
  })
}

export default createStore