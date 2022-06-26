import cardListAPI from "../../api/cardList";

const cardList = {
    state: {
        cardList: [],
        editCardList: []
    },
    mutations: {
        UPDATE_CARD_LIST(state, payload) {
            state.cardList.push(...payload);
        },
        INIT_CARD_LIST(state, payload) {
            state.cardList = payload;
        }
    },
    actions: {
        async getCardList({ commit }, params) {
            const response = await cardListAPI.getCardList(params);
            const res = response.data.data.map(data => {
                return {
                    ...data,
                    count: 0
                }
            })
            commit("UPDATE_CARD_LIST", res);
            return res;
        },
        async initCardList({ commit }, params) {
            const response = await cardListAPI.getCardList(params);
            const res = response.data.data.map(data => {
                return {
                    ...data,
                    count: 0
                }
            })

            commit("INIT_CARD_LIST", res);
            return res;
        }
    },
    getters: {
        getCardList(state) {
            return state.cardList;
        }
    }
}

export default cardList;