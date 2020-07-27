import Vue from 'vue'
import {sleep} from '@/lib/util';
import {catJson} from '@/jsonresponse';

const state = {
    categories: []
};
const getters = {
    getCategories: state => {
        return state.categories;
    },
    getCategory: (state, getters) => (paramkey) => {
        if (getters.getCategories) {
            let found = getters.getCategories.find(el => {
                return el.key == paramkey
            });
            if (found) {
                return found;
            } else {
                return null;
            }
        }

        return null;
    }
};

const mutations = {
    setCategories: (state, payload) => {
        state.categories = payload;
    },
    setCategory: (context, payload) => {
        Vue.set(state.categories, payload.key, payload);
    }
};

const actions = {
    fetchCategories: (context, payload) => {
        return sleep(3000).then( () => {
            context.commit('setCategories', catJson);
        }).catch(err=> {
            throw new Error(error);
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
