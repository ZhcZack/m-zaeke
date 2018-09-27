<template>
  <li class="live-item">
    <template v-if="isOutsideLink">
      <a :href="articleLink" class="live-item-title" target="_blank">{{title}}</a>
    </template>
    <template v-else>
      <router-link to="/" class="live-item-title">{{title}}</router-link>
    </template>
    <p class="live-item-duringtime">
      <span>活动时间：</span>{{startTime}}-{{endTime}}
    </p>
    <template v-if="isOutsideLink">
      <a :href="articleLink" class="live-item-link" target="_blank">进入活动</a>
    </template>
    <template v-else>
      <router-link to="/" class="live-item-link">进入活动</router-link>
    </template>
    <div class="live-status" :class="status">{{statusText}}</div>
  </li>
</template>

<script>
  import { formatTime } from '@/lib/lib'

  export default {
    name: 'activity-live',
    props: ['live'],
    computed: {
      isOutsideLink() {
        return this.live.skip_url && this.skip_url !== ''
      },
      articleLink() {
        return this.live.skip_url
      },
      title() {
        return this.live.title
      },
      startTime() {
        return formatTime(this.live.start_time * 1000)
      },
      endTime() {
        return formatTime(this.live.end_time * 1000)
      },
      status() {
        let now = new Date().getTime()
        let result = ''
        if (now < this.live.start_time) {
          result = 'preheating'
        } else if (now >= this.live.start_time && now < this.live.end_time) {
          result = 'running'
        } else {
          result = 'finish'
        }
        return result
      },
      statusText() {
        let status = this.status
        let text = ''
        if (status === 'preheating') {
          text = '预热中'
        } else if (status === 'running') {
          text = '进行中'
        } else {
          text = '已结束'
        }
        return text
      }
    }
  }
</script>

<style scoped>
  .live-item {
    list-style-type: none;
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(212, 212, 212, 0.20);
    box-sizing: border-box;
    position: relative;
    padding: 1rem 1.875rem;
    margin-bottom: 1.625rem;
    border-radius: 0.375rem;
    overflow: hidden;
  }

  .live-item-title {
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 0.3125rem;
    color: #333;
    text-decoration: none;
  }

  .live-item-duringtime {
    font-size: 0.875rem;
    color: #10cc70;
    letter-spacing: 0.24px;
    line-height: 1.125rem;
  }

  .live-item-duringtime span {
    color: #a6a6a6;
  }

  .live-item-link {
    position: initial;
    display: inline-block;
    margin-top: 0.625rem;
    font-size: 0.875rem;
    color: #10cc70;
    line-height: 1.25rem;
    padding: 0.25rem 1rem;
    border: 1px solid #10cc70;
    right: 1.5rem;
    bottom: 1rem;
    text-decoration: none;
  }

  .live-status {
    position: absolute;
    top: -1.875rem;
    right: -2.215rem;
    transform: rotate(45deg);
    font-size: 0.625rem;
    letter-spacing: 0.16px;
    padding-top: 2.75rem;
    width: 4.625rem;
    text-align: center;
    padding-bottom: 0.3125rem;
    color: #fff;
  }

  .live-status.finish {
    background-color: #c3c3c3;
  }

  .live-status.running {
    background-color: #10cc70;
  }

  .live-status.preheating {
    background-color: #ff8c00;
  }
</style>