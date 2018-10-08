import { formatArticleInfomation, log } from '@/lib/lib'
import store                            from '@/store'

let slides = []

export function index(skipnum = 0, length = 10) {
    return fetch(`${store.state.globalIp}/main/index?skipnum=${skipnum}&length=${length}`)
        .then(response => response.json()).then(json => {
            if (json.code === 1) {
                let list = json.data.article_list
                list = list.map(l => formatArticleInfomation(l))
                slides = json.data.ad
                return list
            } else {
                return null
            }
        })
        .catch(error => log(error))
}

export function indexSlides() {
    if (slides.length > 0) {
        return slides
    }
    return fetch(`${store.state.globalIp}/main/index?skipnum=0&length=10`)
        .then(response => response.json())
        .then(json => {
            if (json.code === 1) {
                return json.data.ad
            } else {
                return null
            }
        }).catch(error => log(error))
}