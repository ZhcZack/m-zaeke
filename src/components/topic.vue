<template>
    <div class="main">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide of swiperSlides" :key="slide.id">
                <img :src="slide.img" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="special-list">
            <ul>

            </ul>
            <div class="tc more" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
            <div class="tc nomore" v-if="nomore">没有更多了～</div>
            <div class="tc none" v-if="none">还没有专题～</div>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { topicSlides } from '../service/topic'

    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'topic',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop: true,
                    autoplay: true
                },
                swiperSlides: [],
                more: false,
                nomore: false,
                none: false
            }
        },
        mounted() {
            topicSlides().then(slides => {
                window.console.log(slides)
                if (slides) {
                    for (const slide of slides) {
                        this.swiperSlides.push(slide)
                    }
                }
            })
        },
        methods: {
            loadMore() {

            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit('headerSlideUp')
            })
        }
    }
</script>

<style scoped>
    .swiper-container {
        padding-bottom: 2.25rem;
    }
    .swiper-slide img {
        width: 100%;
        display: block;
        max-height: 20.125rem;
    }

    .swiper-pagination {
        width: 100%;
        left: 0;
        bottom: 1.125rem;
    }

    .more {
        height: 3.75rem;
        line-height: 3.75rem;
        background-color: #fff;
        margin-bottom: 3rem;
        color: #00e676;
    }
    .nomore {
        height: 3.75rem;
        line-height: 3.75rem;
        margin-bottom: 3rem;
        color: #a6a6a6;
    }
    .none {
        color: #a6a6a6;
        letter-spacing: 0.71px;
        height: 15rem;
        line-height: 15rem;
        background-color: #fff;
    }
</style>