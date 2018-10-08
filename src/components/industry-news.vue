<template>
    <!--行业看点-->
    <div class="main clearfix">
        <template v-if="loading">
            <loading></loading>
        </template>
        <template v-else>
            <ul>
                <template v-for="article of articles">
                    <quicknew :article="article" :key="article.id"></quicknew>
                </template>
            </ul>
            <div class="tc pointer loadmore" v-if="more" @click.prevent="loadmore">加载更多……</div>
            <div class="tc pointer nomore" v-if="nomore">没有更多了～</div>
        </template>
    </div>
</template>

<script>
    import Quicknew from '@/components/global/quicknew'
    import { industryNews } from '@/service/industry-news'
    import Loading from '@/components/global/loading'

    export default {
        name: 'industry-news',
        components: { Loading, Quicknew },
        data() {
            return {
                skipnum: 0,
                length: 10,
                articles: [],
                more: false,
                nomore: false
            }
        },
        methods: {
            loadmore() {
                this.skipnum += 10
                this.getArticles(this.skipnum)
            },
            getArticles(skipnum, length = 10) {
                industryNews(this.skipnum, length).then(articles => {
                    if (articles) {
                        this.more = true
                        if (articles.length < this.length) {
                            this.more = false
                            this.nomore = true
                        }
                        for (let article of articles) {
                            this.articles.push(article)
                        }
                    }
                })
            }
        },
        computed: {
            loading() {
                return this.articles.length === 0
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit('headerSlideUp')
                vm.getArticles(vm.skipnum)
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
</style>