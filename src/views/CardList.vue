<template>
    <v-btn
        class="filter_btn fab"
        
        @click="openEditCardDialog"
    >
        <v-icon>mdi-cards-outline</v-icon>
        <span> {{evolveCount+unevolvedCount}}/50</span>
    </v-btn>
    <v-row class="mb-4 align-center">
        <v-col cols="8" class="pa-2">
            <v-select 
                v-model="cardVersion"
                :items="items" 
                item-text="title"
                item-value="value" 
                @update:modelValue="seletedCardVersion(cardVersion)"
                class="card_version_select" 
                hide-details 
                density="compact" 
                variant="outlined"></v-select>
        </v-col>
        <v-col cols="4" class="pa-2">
            <v-btn @click="fileterDialog = true" size="small" class="filter_dialog_btn">
                <v-icon>
                    mdi-pencil
                </v-icon>
                <span>進階搜尋</span>
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col v-for="(card, index) in cardList" :key="card.id" cols="6" sm="4" md="3" class="pa-2 mb-2">
            <v-card v-if="index < cardList.length - 1"  style="background: #011E33; color: #B0E0E6" elevation="0">
                <v-img
                @click="getCardDetail(card)"
                :src="require(`../assets/SV/創世的黎明/${card.code}.png`)"
                class="mb-2 card_image"
                ></v-img>
                <div class="mb-2" :class="`text-${model}`" style="font-weight: 600" v-text="card.name"></div>
                <div class="d-flex justify-space-around align-center">
                    <v-btn
                        icon="mdi-plus"
                        size="x-small"
                        class="count_btn"
                        @click="addCard(card)"
                    ></v-btn>
                    {{card.count}}
                    <v-btn
                        icon="mdi-minus"
                        size="x-small"
                        class="count_btn"
                        @click="reduceCard(card)"
                    ></v-btn>
                </div>
            </v-card>
            <v-card v-intersect="onIntersect" v-else style="background: #011E33; color: #B0E0E6" elevation="0">
                <v-img
                @click="getCardDetail(card)"
                :src="require(`../assets/SV/創世的黎明/${card.code}.png`)"
                class="mb-2 card_image"
                ></v-img>
                <div class="mb-2" :class="`text-${model}`" v-text="card.name"></div>
                <div class="d-flex justify-space-around align-center">
                    <v-btn
                        icon="mdi-plus"
                        size="x-small"
                        class="count_btn"
                        @click="addCard(card)"
                    ></v-btn>
                    {{card.count}}
                    <v-btn
                        icon="mdi-minus"
                        size="x-small"
                        class="count_btn"
                        @click="reduceCard(card)"
                    ></v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
    
    <v-dialog 
        v-model="dialog"
        :fullscreen="$vuetify.display.mobile"
    >
        <v-card class="default_dialog">
            <v-btn
                class="card_detail_close"
                icon
                dark
                @click="closeDialog"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="detail_card d-flex pa-4"  style="flex:1">
                <div class="detail_card_left">
                    <v-img
                    class="detail_image card_image"
                    :src="require(`../assets/SV/創世的黎明/${cardDetail.code}.png`)"
                    ></v-img>
                </div>
                <div class="detail_card_right d-flex flex-column pt-2" style="flex:1">
                    <div class="mb-2" style="text-align: center">名稱：{{cardDetail.chinese_name}}</div>
                    <div class="mb-2" style="text-align: center">類型：{{cardDetail.profession}}</div>
                    <div class="card_detail_describe mb-4" v-html="cardDetail.describe"></div>
                    <div class="d-flex align-center" style="justify-content:space-evenly">
                        <v-btn
                            icon="mdi-plus"
                            size="x-small"
                            class="count_btn"
                            @click="addCard(cardDetail)"
                        ></v-btn>
                        {{cardDetail.count}}
                        <v-btn
                            icon="mdi-minus"
                            size="x-small"
                            class="count_btn"
                            @click="reduceCard(cardDetail)"
                        ></v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog 
        v-model="fileterDialog"
        :fullscreen="$vuetify.display.mobile"
    >
        <v-card class="default_dialog">
            <v-card-text style="color: #B0E0E6;">
                <div class="mb-4">進階搜尋</div>
                <v-text-field style="color: #B0E0E6;" class="mb-4" hide-details label="卡片編碼" variant="outlined" density="compact" v-model="cardCode"></v-text-field>
                <v-text-field class="mb-4" hide-details label="中文名稱" variant="outlined" density="compact" v-model="cardName"></v-text-field>
                <v-select v-model="cardVersion"
                    :items="items" 
                    item-text="title"
                    item-value="value" class="mb-4" hide-details label="選擇彈數" density="compact" variant="outlined"></v-select>
                <div class="mb-2 ">費用</div>
                <v-chip @click="clickConsumption(consumption)"  class="mr-2 mb-1 chip" v-for="(consumption, index) of consumptions" :key="index" :class=[consumption.color]>{{consumption.name}}</v-chip>
                <div class="mb-2 mt-4">職業</div>
                <v-chip @click="clickProfession(profession)" class="mr-2 mb-1 chip" :class=[profession.color] v-for="(profession, index) of professions" :key="index">{{profession.name}}</v-chip>
                <div class="mb-2 mt-4">稀有度</div>
                <v-chip @click="clickLevel(level)" class="mr-2 mb-1 chip" v-for="(level, index) of levels" :key="index" :class=[level.color]>{{level.name}}</v-chip>
            </v-card-text>
            <v-card-actions class="d-flex flex-row justify-center" style="background: #011E33; color: #B0E0E6">
                <v-btn
                style="flex:1"
                variant="text"
                @click="resetFileter"
                >重置選項</v-btn>
                <v-btn
                style="flex:1"
                @click="selectCardList"
                >搜尋</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="editCardDialog"
        :fullscreen="$vuetify.display.mobile"
    >
        <v-card class="default_dialog" id="editCreateList">
            <div>
                <v-row class="ma-0 flex-grow-0">
                    <v-card style="box-shadow: 0px 0px 4px 2px #b0e0e6; height: 76px; flex: 1; background: #011E33; color: #B0E0E6" class="ma-4 d-flex justify-space-between pr-2 pl-2 pt-1 pb-1">
                        <div class="d-flex pr-1" style="justify-content: space-around; flex: 1;">
                            <div class="d-flex flex-column" style="font-size: 10px" v-for="(count, index) of editBarChart.countList" :key="index">
                                <div v-if="index != 11" class="d-flex justify-center">{{index}}</div>
                                <div v-else class="d-flex justify-center"> E </div>
                                <div style="border:1px solid #B0E0E6; flex: 1; background: #011E33; min-width: 14px" class="d-flex flex-column justify-end">
                                    <div style="background: #B0E0E6;" :style="{ height: `${count/40*100}%` }"></div>
                                </div>
                                <div class="d-flex justify-center">{{count}}</div>
                            </div>
                        </div>
                        <div :class="`text-${model}`" class="d-flex flex-column justify-center">
                            <div style="color: #FF8181">從者 {{editBarChart.follower}}</div>
                            <div style="color: #FF7AFA">法術 {{editBarChart.spell}}</div>
                            <div style="color: #4DFF9F">護符 {{editBarChart.amulet}}</div>
                        </div>
                    </v-card>
                </v-row>
                <v-row class="ma-0 justify-space-between pr-4 pl-4 align-center">
                    <div style="color: #B0E0E6"><span class="mr-10"><span style="font-weight: bold;">卡排列表</span> {{unevolvedCount}} / 40</span> <span style="font-weight: bold;">EVOLVE</span> <span>{{evolveCount}} / 10</span></div>
                    <div>
                        <v-btn @click="viewType = 'dashboard'" icon size="x-small" class="mr-1" elevation="0" style="background: #011E33; color: #B0E0E6;">
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-btn>
                        <v-btn @click="viewType = 'list'" icon size="x-small" elevation="0" style="background: #011E33; color: #B0E0E6;">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                    </div>
                </v-row>
            </div>
            <v-row class="ma-0 pb-1" style="overflow: auto;" :class="[viewType == 'dashboard' ? '' : 'view_list']">
                <v-col v-for="(card) in editCardList.unevolved" :key="card.id" sm="4" md="3" :cols="cols" class="pb-0">
                    <div style="background: #011E33; color: #B0E0E6" elevation="0" :class="testClass">
                        <v-img
                        v-if="viewType == 'dashboard'" 
                        :src="require(`../assets/SV/創世的黎明/${card.code}.png`)"
                        class="mb-2 card_image"
                        ></v-img>
                        <div>
                            <div class="mb-2" :class="`text-${model}`" style="font-weight: 600" v-text="card.name"></div>
                            <div v-if="viewType == 'list'"  class="mb-2" :class="`text-${model}`" style="font-weight: 600" >
                                <span v-text="card.code"></span>
                                <span class="ml-4">{{card.chinese_name}}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-space-around align-center card_btn">
                            <v-btn
                                icon="mdi-plus"
                                size="x-small"
                                class="count_btn"
                                @click="addCard(card)"
                            ></v-btn>
                            {{card.count}}
                            <v-btn
                                icon="mdi-minus"
                                size="x-small"
                                class="count_btn"
                                @click="reduceCard(card)"
                            ></v-btn>
                        </div>
                    </div>
                </v-col> 
                
                <v-col v-for="(card) in editCardList.evolve" :key="card.id" sm="4" md="3" :cols="cols" class="pb-0">
                    <div style="background: #011E33; color: #B0E0E6" elevation="0" :class="testClass">
                        <v-img
                        v-if="viewType == 'dashboard'" 
                        :src="require(`../assets/SV/創世的黎明/${card.code}.png`)"
                        class="mb-2 card_image"
                        ></v-img>
                        <div>
                            <div class="mb-2" :class="`text-${model}`" style="font-weight: 600" v-text="card.name"></div>
                            <div v-if="viewType == 'list'"  class="mb-2" :class="`text-${model}`" style="font-weight: 600" >
                                <span v-text="card.code"></span>
                                <span class="ml-4">{{card.chinese_name}}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-space-around align-center card_btn">
                            <v-btn
                                icon="mdi-plus"
                                size="x-small"
                                class="count_btn"
                                @click="addCard(card)"
                            ></v-btn>
                            {{card.count}}
                            <v-btn
                                icon="mdi-minus"
                                size="x-small"
                                class="count_btn"
                                @click="reduceCard(card)"
                            ></v-btn>
                        </div>
                    </div>
                </v-col> 
            </v-row>
            <v-card-actions class="d-flex flex-row justify-center">
                <v-btn @click="createPng" variant="outlined" >
                    輸出圖片
                </v-btn>
                <v-btn @click="createPDF" variant="outlined" >
                    輸出 PDF
                </v-btn>
                <v-btn
                style="flex:1"
                @click="editCardDialog = false"
                variant="outlined"
                >完成</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-card v-if="exportCardDialog && downloadType=='download_pdf'" style="overflow: hidden" class="default_dialog">
        <div id="exportPDF" :class="downloadType">
            <div v-for="(card, index) of pdfCardList" :key="index" :class="[{ pdfMarginBottom: (index+1)%9 == 0 }, {pdfMarginTop: ((index+1)%9 == 1) || ((index+1)%9 == 2) || ((index+1)%9 == 3)}]">
                <img :src="require(`../assets/SV/創世的黎明/${card.code}.png`)"  />
            </div>
        </div>
    </v-card>

    <v-card v-if="exportCardDialog && downloadType=='download_image'" style="overflow: hidden" class="default_dialog">
        <div id="exportImage" :class="downloadType">
            <div class="d-flex flex-wrap">
                <template v-for="(card) of editCardList.unevolved" :key="card.id">
                    <div v-for="(item, index) of card.count" :key="index">
                        <img :src="require(`../assets/SV/創世的黎明/${card.code}.png`)" />
                        <h2 v-if="downloadType == 'download_image'" style="color: black; font-size: 60px; text-align: center;">{{card.code}}</h2>
                    </div>
                </template>
            </div>

            <div style="color: black; font-size: 100px;">進化牌組</div>
            <div class="d-flex flex-wrap">
                <template v-for="(card) of editCardList.evolve" :key="card.id">
                    <div v-for="(item, index) of card.count" :key="index">
                        <img :src="require(`../assets/SV/創世的黎明/${card.code}.png`)" />
                        <h2 v-if="downloadType == 'download_image'" style="color: black; font-size: 60px; text-align: center;">{{card.code}}</h2>
                    </div>
                </template>
            </div>
        </div>
    </v-card>

    <!-- <v-dialog v-model="exportCardDialog">
            <v-card v-if="exportCardDialog && downloadType=='download_image'" class="default_dialog">
                <div id="exportImage" :class="downloadType">
                    <div class="d-flex flex-wrap">
                        <template v-for="(card) of editCardList.unevolved" :key="card.id" class="d-flex">
                            <div v-for="(item, index) of card.count" :key="index" >
                                <img :src="require(`../assets/SV/創世的黎明/${card.code}.png`)" />
                                <h2 v-if="downloadType == 'download_image'" style="color: black; font-size: 60px; text-align: center;">{{card.code}}</h2>
                            </div>
                        </template>
                    </div>

                    <div>進化牌組</div>
                    <div class="d-flex flex-wrap">
                        <template v-for="(card) of editCardList.evolve" :key="card.id" class="d-flex">
                            <div v-for="(item, index) of card.count" :key="index" >
                                <img :src="require(`../assets/SV/創世的黎明/${card.code}.png`)" />
                                <h2 v-if="downloadType == 'download_image'" style="color: black; font-size: 60px; text-align: center;">{{card.code}}</h2>
                            </div>
                        </template>
                    </div>
                </div>
            </v-card>
    </v-dialog> -->
</template>
<script>
import { mapGetters } from "vuex";
// import domtoimage from "dom-to-image-more";
import html2canvas from "html2canvas";
// import {google} from "googleapis";
import canvasToImage from 'canvas-to-image';
import { jsPDF } from "jspdf";

export default {
    data: () => {
        return {
            cardVersion: "BP02",
            dialog: false,
            fileterDialog: false,
            editCardDialog: false,
            cardDetail: null,
            type: {
                "follower": "從者",
                "spell": "法術",
                "amulet": "護符"
            },
            limit: 30,
            offset: 0,
            professions: null,
            levels: null,
            consumptions: null,
            viewType: "dashboard",
            cols: 6,
            testClass: [],
            selectedProfessions: [],
            selectedLevels: [],
            selectedConsumptions: [],
            items: [
                { title: 'BP02 - 黑銀的巴哈姆特', value: "BP02" },
                { title: 'BP01 - 創世的黎明', value: "BP01" },
                { title: 'SD01 - 妖精', value: "SD01" },
                { title: 'SD02 - 皇家', value: "SD02" },
                { title: 'SD03 - 巫師', value: "SD03" },
                { title: 'SD04 - 龍族', value: "SD04" },
                { title: 'SD05 - 夢魘', value: "SD05" },
                { title: 'SD06 - 主教', value: "SD06" }
            ],
            cardCode: null,
            cardName: null,
            testhtml: null,
            exportCardDialog: false,
            downloadType: null,
            pdfCardList: []
        }
    },
    methods: {
        getCardDetail(card) {
            this.dialog = true;
            this.cardDetail = card
        },
        closeDialog() {
            this.dialog = false;
        },
        closeFilterDialog() {
            this.fileterDialog = false;
        },
        addCard(card) {
            card.count ++;
            if (card.consumption === 'EVOLVE') {
                this.$store.dispatch('addEvolveCount');
                this.$store.dispatch('addEvolveCard', card);

            } else {
                this.$store.dispatch('addUnevolvedCount');
                this.$store.dispatch('addUnEvolvedCard', card);
            }
            
            this.$store.dispatch('addEditBarChart', card);
        },
        reduceCard(card) {
            if (card.count > 0) { 
                card.count --;
                if (card.consumption === 'EVOLVE') {
                    this.$store.dispatch('addEvolveCard', card);
                    this.$store.dispatch('reduceEvolveCount');
                } else {
                    this.$store.dispatch('addUnEvolvedCard', card);
                    this.$store.dispatch('reduceUnevolvedCount');
                }

                this.$store.dispatch('reduceEditBarChart', card);
            } 
            if (card.count == 0) {
                if (card.consumption === 'E') {
                    this.$store.dispatch('removeEvolveCard', card);
                } else {
                    this.$store.dispatch('removeUnEvolvedCard', card);
                }
            }
        },
        async onIntersect (entries, observer) {
            if (entries) {
                this.offset = this.offset + this.limit;
                await this.queryCardList("getCardList");
            }
        },
        openEditCardDialog() {
            this.editCardDialog = true;

        },
        clickProfession(profession) {
            if (profession.color) {
                profession.color = null
                this.selectedProfessions.splice(this.selectedProfessions.indexOf(profession.name), 1)
            } else {
                this.selectedProfessions.push(profession.name)
                profession.color = "selected"
            }
        },
        clickLevel(level) {
            if (level.color) {
                level.color = null
                this.selectedLevels.splice(this.selectedLevels.indexOf(level.name), 1)
            } else {
                level.color = "selected"
                this.selectedLevels.push(level.name)
            }
        },
        clickConsumption(consumption) {
            const name = consumption.name == 'E' ? 'EVOLVE' : consumption.name;
            if (consumption.color) {
                consumption.color = null
                this.selectedConsumptions.splice(this.selectedConsumptions.indexOf(name), 1)
            } else {
                consumption.color = "selected"
                this.selectedConsumptions.push(name)
            }
        },
        createPng() {
            this.exportCardDialog = true;
            this.downloadType = 'download_image'
            setTimeout(this.downloadImage, 100)
        },
        downloadImage() {
            const cardList = document.getElementById('exportImage');
            html2canvas(cardList).then(function(canvas) {
                canvasToImage(canvas, {
                    name: 'sve-dingdong-dingdong',
                    type: 'png',
                    // quality: 0.7
                });
            });
        },
        createPDF() {
            this.exportCardDialog = true;
            this.downloadType = 'download_pdf'
            this.pdfCardList = []
            for(const [key,value] of Object.entries(this.editCardList.unevolved)) {
                for(let i = 0; i<value.count; i++) {
                    this.pdfCardList.push(value)
                }
            }
            for(const [key,value] of Object.entries(this.editCardList.evolve)) {
                for(let i = 0; i<value.count; i++) {
                    this.pdfCardList.push(value)
                }
            }
            setTimeout(this.downloadPDF, 100)
            
        },
        downloadPDF() {
            const cardList = document.getElementById('exportPDF');

            html2canvas(cardList).then(function(canvas) {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;

                var pageHeight = contentWidth / 592.28 * 841.89;
                var leftHeight = contentHeight;

                var imgWidth = 595.28;
                var imgHeight = 592.28/contentWidth * contentHeight;
                let position = 0;
                const pageData = canvas.toDataURL('image/jpeg', 1.0);
                //方向預設豎直，尺寸ponits，格式a4[595.28,841.89]
                const pdf = new jsPDF('', 'pt', 'a4');
                //addImage後兩個引數控制新增圖片的尺寸，此處將頁面高度按照a4紙寬高比列進行壓縮

                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight  );
                } else {
                    while(leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight )
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免新增空白頁
                        if(leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                pdf.save('sve-dingdong-dingdong.pdf');
            });
        },
        async selectCardList() {
            this.offset = 0;
            await this.queryCardList("initCardList");

            // this.resetFileter();
            this.fileterDialog = false;
        },
        async seletedCardVersion() {
            this.offset = 0;
            await this.queryCardList("initCardList");
        },
        async queryCardList(type) {
            await this.$store.dispatch(type, {
                offset: this.offset, 
                limit: this.limit,
                consumptions: this.selectedConsumptions.toString(),
                levels: this.selectedLevels.toString(),
                professions: this.selectedProfessions.toString(),
                version: this.cardVersion,
                code: this.cardCode,
                chinese_name: this.cardName
            });
        },
        resetFileter() {
            this.professions = this.init().professions;
            this.levels = this.init().levels;
            this.consumptions = this.init().consumptions;
            this.offset = 0;

            this.selectedConsumptions = [];
            this.selectedLevels = [];
            this.selectedProfessions = [];
        },
        init() {
            this.cardCode = null
            this.cardName = null
            const professions = [
                { color: null, name: "妖精" }, 
                { color: null, name: "皇家" }, 
                { color: null, name: "巫師" }, 
                { color: null, name: "龍族" }, 
                { color: null, name: "夢魘" }, 
                { color: null, name: "主教" }, 
                { color: null, name: "中立" }
            ]
            const levels = [
                { color: null, name: "UR" }, 
                { color: null, name: "LG" }, 
                { color: null, name: "GR" }, 
                { color: null, name: "BR" }, 
                { color: null, name: "Token" }
            ]

            const consumptions = []
            for(let i=1; i<=10; i ++) {
                consumptions.push({ color: null, name: i })
            }
            consumptions.push({ color: null, name: "E" })

            return { professions, levels, consumptions }
        }

    },
    watch: {
        viewType(newValue) {
            if (newValue == "dashboard") {
                this.cols = 6;
                this.testClass = []
            } else {
                this.cols = 12;
                const test = ["d-flex", "justify-space-between"]
                this.testClass.push(...test)
            }
            
        }
    },
    computed: {
      ...mapGetters({
        cardList: "getCardList",
        editCardList: "getEditCardList",
        evolveCount: "getEvolveCount",
        unevolvedCount: "getUnevolvedCount",
        editBarChart: "getEditBarChart"
      }),
      model() {
        if(this.$vuetify.display.mobile) {
            return "caption"
        }
        return "body-1"
      }
    },
    async mounted() {
        this.professions = this.init().professions;
        this.levels = this.init().levels;
        this.consumptions = this.init().consumptions;
        await this.$store.dispatch('initCardList', { version: this.cardVersion, offset: this.offset, limit: this.limit });
        // console.log(google)
        // this.$gapi.isSignedIn().then(result => {
        //     console.log(result ? 'Signed in' : 'Signed out')
        // })
        // this.$gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
        //     console.log({ currentUser, gapi, hasGrantedScopes })
        // })
    }
}
</script>
<style lang="scss" scoped>
.pdfMarginBottom {
    margin-bottom: 77.9pt;
}
.pdfMarginTop {
    margin-top: 20pt;
}
.filter_btn {
    position: fixed;
    z-index: 5;
    top: 100px;
    left: 0;
    border-radius: 0 100px 100px 0;
    width: 80px; 
    height: 40px;
    min-width: 80px; 
    background: linear-gradient(99.27deg, #4E928E 11.47%, #063235 46.88%, #05A3A3 79.41%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-left: none;
    box-shadow: 0px 0px 1px rgba(255, 255, 255, 0.71), 0px 0px 10px #B0E0E6;
    
    i {
        margin-right: 4px;
    }
}
.default_dialog {
    background: #011E33; 
    color: #B0E0E6;
    height: calc(100vh - 60px);
    width: calc(100vw / 2);
}
.card_detail.v-card {
    display: flex;
    flex-direction: column;
    background: #011E33;
    color: #B0E0E6;
    font-size: 16px;
    border: 1px solid #B0E0E6;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.71), 0px 0px 10px #B0E0E6;
    border-radius: 16px;
    height: calc(100vh - 60px);
    width: calc(100vw - 40px);
}
.card_detail_describe {
    flex: 1;
    border-radius: 4px;
    border: 1px solid #B0E0E6;
    padding: 8px;
    font-size: 12px;
}
.card_detail_close {
    position: fixed;
    right: 8px;
    top: 8px;
    background: #011E33;
    color: #B0E0E6;

}
.chip {
    background: #011E33;
    color: #B0E0E6;
    border: 2px solid #B0E0E6;
    font-size: bold!important;
}
.selected {
    background: #B0E0E6;
    color: #011E33;
    box-shadow: 0px 0px 4px 2px #b0e0e6 !important;
}
.count_btn {
    background: #011E33;
    color: #B0E0E6;
    font-weight: 900;
    touch-action: manipulation;
    box-shadow: 0px 0px 4px 2px #b0e0e6 !important;
}
.view_list {
    align-content: baseline;

    .card_btn {
        width: 120px;
    }
}
.detail_image {
    margin: 20px 52px 12px 52px;
    max-height: calc(100vh - 80px);
}
.card_image {
    box-shadow: 0px 0px 4px 2px #b0e0e6;
    border-radius: 16px;
}
.filter_dialog_btn {
    background: #011E33;
    border: 1px solid #FFFFFF;
    height: 40px;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.71), 0px 0px 10px #B0E0E6;
    border-radius: 4px;
    color: #FFFFFF;
    width: 100%
}
.download_image{
    display: flex; 
    // z-index: -1; 
    // position: absolute;
    transform: scale(0.2);
    width: 5800px; 
    flex-wrap: wrap; 
    padding: 60px; 
    min-height: 5000px; 
    align-content: flex-start;
    flex-direction: column;
    > div {
        margin-left: 2px;
    }
    img {
        width: 550px;
    }
}
.download_pdf {
    display: flex; 
    z-index: -1; 
    position: absolute;
    flex-wrap: wrap; 
    align-content: flex-start;
    width: 595.28pt;
    > div {
        height: 249.4488189pt;
    }
    img {
        width: 63mm;
        height: 249.4488189pt;
    }
}
@media screen and (min-width: 601px) {
    .detail_card {
        flex-direction: row;

        .detail_card_left {
            display: flex;
            width: 50%;
            align-items: center;
        }
        .detail_card_right {
            justify-content: center;
        }
        .card_detail_describe {
            max-height: 300px;
            font-size: 14px;
        }
    }
}

@media screen and (max-width: 600px) {
    .card_image {
        border-radius: 8px;
    }
    .detail_card {
        flex-direction: column;
    }
}


</style>
<style lang="scss">
.v-input.card_version_select > .v-input__control .v-field {
    .v-field__outline div{
        border: none!important;

        &::after {
            border: none!important;
        }
    }
    height: 40px;

    background: #011E33;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.71), 0px 0px 10px #B0E0E6;
    border-radius: 4px;
    color: #FFFFFF;

}
</style>