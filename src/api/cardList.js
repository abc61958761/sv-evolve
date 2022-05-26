import appserver from "./appserve";
const API_URL = "/cards";

const cardList = {
    async getCardList(params) {
        return await appserver.get(`${API_URL}/`, {params})
    }
};

export default cardList;
