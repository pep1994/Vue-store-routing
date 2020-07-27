import Vue from 'vue'
import {sleep} from '@/lib/util';
import {postJson_1, postJson_2, postJson_3} from '@/jsonresponse';

const state = {
    posts: []
};

const getters = {
    getPosts: state => {
        return state.posts;
    },
    getPost: (state, getters) => (paramkey) => {
        if (getters.getPosts) {
            let found = getters.getPosts.find(el => {
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
    setPosts: (state, payload) => {
        state.posts = payload;
    },
    setPost: (context, payload) => {
        Vue.set(state.posts, payload.key, payload);
    }
};

const actions = {
    fetchPosts: (context, payload) => {
        return sleep(600).then( () => {
            if (payload.cat == 1) {
                context.commit('setPosts', postJson_1);
            } else if (payload.cat == 2) {
                context.commit('setPosts', postJson_2);
            } else if (payload.cat == 3) {
                context.commit('setPosts', postJson_3);
            } else {
                context.commit('setPosts', postJson_1);
            }
        }).catch(error=> {
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
