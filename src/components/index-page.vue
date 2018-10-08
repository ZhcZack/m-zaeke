<template>
    <div class="main clearfix">
        <template v-if="loading">
            <loading></loading>
        </template>
        <template v-else>
            <div class="banner-area">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
                        <img :src=slide.img alt="">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <ul>
                <template v-for="article of articles">
                    <template v-if="article.type === 1">
                        <zaeke-article :article="article" show-user="true" :key="article.id">
                        </zaeke-article>
                    </template>
                    <template v-else>
                        <quicknew :article="article" :key="article.id"></quicknew>
                    </template>
                </template>
            </ul>
            <div class="tc pointer loadmore" v-if="loadmore" @click.prevent="loadMore">加载更多……</div>
            <div class="tc pointer nomore" v-if="nomore">没有更多了～</div>
        </template>
    </div>
</template>

<script>
    import { index }               from '@/service/index-page'
    import ZaekeArticle            from '@/components/global/zaeke-article.vue'
    import Quicknew                from '@/components/global/quicknew.vue'
    import Loading                 from '@/components/global/loading'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { indexSlides }         from '../service/index-page'

    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'index-page',
        components: { Loading, Quicknew, ZaekeArticle, swiper, swiperSlide },
        data() {
            return {
                skipnum: 0,
                length: 10,
                pages: 0,
                articlesPerPage: 10,
                articles: [],
                loadmore: false,
                nomore: false,
                none: false,
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    autoplay: true,
                    loop: true
                },
                swiperSlides: []
            }
        },
        methods: {
            loadMore() {
                if (this.nomore) {
                    return
                }
                this.getArticles(this.pages * this.articlesPerPage, this.articlesPerPage)
            },
            getArticles(skipnum = 0, length = 10) {
                index(skipnum, length).then(articles => {
                    if (articles) {
                        for (let article of articles) {
                            this.articles.push(article)
                        }
                        this.pages += 1
                        this.toggleMoreNomoreNone()
                    } else {
                        this.none = true
                    }
                })
            },
            toggleMoreNomoreNone() {
                const count = this.articles.length
                if (count === 0) {
                    this.none = true
                    this.loadmore = false
                    this.nomore = false
                } else if (count < this.pages * this.articlesPerPage) {
                    this.none = false
                    this.loadmore = false
                    this.nomore = true
                } else {
                    this.loadmore = true
                    this.nomore = false
                }
            }
        },
        computed: {
            loading() {
                return this.articles.length === 0
            }
        },
        mounted() {
            indexSlides().then(slides => {
                window.console.log(slides)
                if (slides) {
                    for (const slide of slides) {
                        this.swiperSlides.push(slide)
                    }
                }
            })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit('headerSlideUp')
                vm.getArticles()
            })
        }
    }
</script>

<style scoped>
    .loadmore,
    .nomore {
        color: #767676;
        font-size: 0.875rem;
        height: 3.75rem;
        line-height: 3.75rem;
        background-color: #fff;
        margin-bottom: 3rem;
    }

    .banner-area {
        margin-bottom: 0.625rem;
    }

    .swiper-slide img {
        width: 100%;
    }

    .swiper-pagination {
        bottom: 10px;
        left: 0;
        width: 100%;
    }
</style>
