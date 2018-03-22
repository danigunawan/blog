import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Article from '@/components/Article'
import MyStory from '@/components/MyStory'
import CreateStory from '@/components/CreateStory'
import EditStory from '@/components/EditStory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/articles/:id/edit',
      name: 'ArticleEdit',
      component: EditStory
    },
    {
      path: '/my-articles',
      name: 'MyStory',
      component: MyStory
    },
    {
      path: '/create-article',
      name: 'CreateStory',
      component: CreateStory
    }
  ]
})
