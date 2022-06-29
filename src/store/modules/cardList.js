import cardListAPI from "../../api/cardList";

const cardList = {
    state: {
        cardList: [],
        editCardList: {
            evolve: {},
            unevolved: {}
        },
        unevolvedCount: 0,
        evolveCount: 0,
        editBarChart: {
            "follower": 0,
            "spell": 0,
            "amulet": 0,
            countList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    mutations: {
        UPDATE_CARD_LIST(state, payload) {
            state.cardList.push(...payload);
        },
        INIT_CARD_LIST(state, payload) {
            state.cardList = payload;
        },
        ADD_EVOLVE(state, payload) {
            state.editCardList.evolve[payload.code] = payload;
        },
        ADD_UNEVOLVED(state, payload) {
            state.editCardList.unevolved[payload.code] = payload;
        },
        REMOVE_EVOLVE(state, payload) {
            delete state.editCardList.evolve[payload.code]
        },
        REMOVE_UNEVOLVED(state, payload) {
            delete state.editCardList.unevolved[payload.code]
        },
        ADD_EVOLVE_COUNT(state) {
            state.evolveCount ++
        },
        ADD_UNEVOLVED_COUNT(state) {
            state.unevolvedCount ++
        },
        REDUCE_UNEVOLVED_COUNT(state) {
            state.unevolvedCount --
        },
        REDUCE_EVOLVE_COUNT(state) {
            state.evolveCount --
        },
        ADD_EDIT_BAR_CHART(state, payload) {
            state.editBarChart.countList[payload.listIndex] ++
            state.editBarChart[payload.type] ++
        },
        REDUCE_EDIT_BAR_CHART(state, payload) {
            state.editBarChart.countList[payload.listIndex] --
            state.editBarChart[payload.type] --
        }
    },
    actions: {
        async getCardList({ commit, state }, params) {
            const response = await cardListAPI.getCardList(params);
            const res = response.data.data.map(data => {
                let existedCard = null
                if (data.consumption == 'EVOLVE') {
                    existedCard = state.editCardList.evolve[data.code]
                } else {
                    existedCard = state.editCardList.unevolved[data.code]
                }
                let count = 0;
                if (existedCard != null) {
                    count = existedCard.count
                }
                
                return {
                    ...data,
                    count
                }
            })
            commit("UPDATE_CARD_LIST", res);
            return res;
        },
        async initCardList({ commit, state }, params) {
            const response = await cardListAPI.getCardList(params);
            const res = response.data.data.map(data => {
                let existedCard = null
                if (data.consumption == 'EVOLVE') {
                    existedCard = state.editCardList.evolve[data.code]
                } else {
                    existedCard = state.editCardList.unevolved[data.code]
                }
                let count = 0;
                if (existedCard != null) {
                    count = existedCard.count
                }
                
                return {
                    ...data,
                    count
                }
            })

            commit("INIT_CARD_LIST", res);
            return res;
        },
        addEvolveCard({ commit }, params) {
            commit("ADD_EVOLVE", params);
        },
        addUnEvolvedCard({ commit }, params) {
            commit("ADD_UNEVOLVED", params);
        },
        removeEvolveCard({ commit }, params) {
            commit("REMOVE_EVOLVE", params);
        },
        removeUnEvolvedCard({ commit }, params) {
            commit("REMOVE_UNEVOLVED", params);
        },
        addUnevolvedCount({ commit }) {
            commit("ADD_UNEVOLVED_COUNT")
        },
        addEvolveCount({ commit }) {
            commit("ADD_EVOLVE_COUNT")
        },
        reduceUnevolvedCount({ commit }) {
            commit("REDUCE_UNEVOLVED_COUNT")
        },
        reduceEvolveCount({ commit }) {
            commit("REDUCE_EVOLVE_COUNT")
        },
        addEditBarChart({ commit }, card) {
            const consumption = parseInt(card.consumption);
            let listIndex = 0
            if (isNaN(consumption)) {
                listIndex = 11;
            }
            else if (consumption >= 10) {
                listIndex = 10;
            } else {
                listIndex = consumption;
            }

            commit("ADD_EDIT_BAR_CHART", {
                listIndex, type: card.type
            })
        },
        reduceEditBarChart({ commit }, card) {
            const consumption = parseInt(card.consumption);
            let listIndex = 0
            if (isNaN(consumption)) {
                listIndex = 11;
            }
            else if (consumption >= 10) {
                listIndex = 10;
            } else {
                listIndex = consumption;
            }

            commit("REDUCE_EDIT_BAR_CHART", {
                listIndex, type: card.type
            })
        }
    },
    getters: {
        getCardList(state) {
            return state.cardList;
        },
        getEditCardList(state) {
            return state.editCardList;
        },
        getEvolveCount(state) {
            return state.evolveCount;
        },
        getUnevolvedCount(state) {
            return state.unevolvedCount;
        },
        getEditBarChart(state) {
            return state.editBarChart;
        }
    }
}

export default cardList;