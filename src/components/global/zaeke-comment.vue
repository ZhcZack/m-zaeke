<template>
  <li>
    <div class="tops">
      <div class="clearfix">
        <!--是否要给评论用户添加链接-->
        <template v-if="userLink">
          <!--检测评论用户是否继续存在-->
          <template v-if="authorLink">
            <router-link :to="authorLink">
              <img :src="userImage" alt="头像" class="avatar fl">
            </router-link>
          </template>
          <template v-else>
            <img :src="userImage" alt="头像" class="avatar fl">
          </template>
        </template>
        <template v-else>
          <img :src="userImage" alt="头像" class="avatar fl">
        </template>
        <p class="fl">
          <!--是否要给评论用户添加链接-->
          <template v-if="userLink">
            <!--检测评论用户是否继续存在-->
            <template v-if="authorLink">
              <router-link :to="authorLink">
                <span class="author">{{authorName}}</span>
              </router-link>
            </template>
            <template v-else>
              <span class="author">{{authorName}}</span>
            </template>
          </template>
          <template v-else>
            <span class="author">{{authorName}}</span>
          </template>
          <br>
          <span class="time">{{replyTime}}</span>
        </p>
      </div>
      <p class="reply">{{content}}</p>
    </div>
    <div class="bottom">
      <p class="yuan">来源于：</p>
      <!--检测对应文章是否存在-->
      <template v-if="sourceLink">
        <router-link :to="sourceLink">
          <p class="source">{{sourceTitle}}</p>
        </router-link>
      </template>
      <template v-else>
        <p class="source">{{sourceTitle}}</p>
      </template>
    </div>
  </li>
</template>

<script>
  import { getDateDiff } from '@/lib/lib';

  export default {
    name: 'zaeke-comment',
    props: {
      comment: {
        type: Object,
        default: () => {}
      },
      userLink: {
        type: Boolean,
        default: () => false
      }
    },
    computed: {
      member() {
        return this.comment.member_info ? this.comment.member_info : (this.comment.member ? this.comment.member : {});
      },
      /**
       * 评论者头像
       */
      userImage() {
        return this.member.img ? this.member.img : 'http://www.zaeke.com/css/images/morentouxiang.png';
      },
      /**
       * 返回评论者昵称。如果评论者不存在则返回自定义错误信息。
       * @returns {string} 评论者昵称
       */
      authorName() {
        return this.member.nickname ? this.member.nickname : '（该用户已前往时空裂隙～）';
      },
      /**
       * 回复评论距离现在的时间
       * @returns {string} 评论距离现在的时间
       */
      replyTime() {
        return getDateDiff(this.comment.created * 1000);
      },
      /**
       * @returns {string} 回复的内容
       */
      content() {
        return this.comment.content;
      },
      /**
       * 返回关联文章的标题。如果文章标题错误，则返回自定义错误信息。
       * @returns {string} 关联文章的标题
       */
      sourceTitle() {
        return this.comment.article.title ? this.comment.article.title : '（这篇文章已被吸入虚空……）';
      },
      /**
       * 返回文章的链接，如果文章不存在（ID或者标题为空，文章状态不正确）则返回null
       * @returns {string|null} 文章的链接
       */
      sourceLink() {
        if (!this.comment.article.id || !this.comment.article.title) {
          return null;
        }
        return '/article/' + this.comment.article.id;
      },
      /**
       * 返回评论作者的链接。如果作者不存在（ID信息消失）则返回null
       * @returns {string|null} 评论作者的链接
       */
      authorLink() {
        if (!this.member.id) {
          return null;
        }
        return `/home/${this.member.id}`;
      }
    }
  };
</script>

<style scoped>
  li {
    background-color: #fff;
    margin-bottom: 1.5rem;
    overflow: hidden;
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  .tops {
    padding: 1rem;
  }

  .tops .avatar {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.75rem;
    background-size: cover;
    border-radius: 50%;
  }

  .tops .author {
    font-size: 1rem;
    color: #464646;
  }

  .tops .time {
    font-size: 0.75rem;
    color: #a6a6a6;
  }

  .tops .reply {
    font-size: 1.125rem;
    color: #464646;
    letter-spacing: 0.4px;
    line-height: 1.25rem;
    margin-top: 1rem;
  }

  .bottom {
    padding: 1rem;
    border-top: 1px solid #f6f6f6;
  }

  .bottom .yuan {
    font-size: 0.875rem;
    color: #00e676;
    line-height: 1.625rem;
  }

  .bottom .source {
    font-size: 1.125rem;
    color: #464646;
    letter-spacing: 0.4px;
    line-height: 1.25rem;
  }
</style>