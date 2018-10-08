import store from '../store'
import { log } from '../lib/lib'

let slides = []

export function topicSlides() {
    if (slides.length > 0) {
        return new Promise.resolve(slides)
    }
    return fetch(`${store.state.globalIp}/main/special_list?skipnum=0&length=1`)
        .then(response => response.json())
        .then(result => {
            if (result.code === 1) {
                return result.data.list.ad
            } else {
                return null
            }
        }).catch(error => log(error))
}
