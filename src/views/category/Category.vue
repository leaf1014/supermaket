<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-bar :categories="categories" @itemClick="itemClick"></category-bar>
      <scroll id="category-content" ref="scroll" :probe-type="3" :pull-up-load="true">
        <category-list :goodsList="showSubcategory"></category-list>
        <tab-control :titles="['综合','新款','精选']"
                     @tabClick="tabClick" ref="tabControl2"></tab-control>
        <category-detail :detail-goods="showCategoryDetail"></category-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CategoryBar from "./childComps/CategoryBar";
import CategoryList from "./childComps/CategoryList";
import CategoryDetail from "./childComps/CategoryDetail";
import TabControl from "../../components/context/tabControl/TabControl";
import Scroll from "../../components/common/scroll/Scroll";

import {getCategory,getCategoryDetail,getSubcategory} from "../../network/category";

export default {
  name: "Category",

  data() {
    return {
      categories: [],
      categoryData: {
      },
      currentIndex: -1,
      currentType:'pop',
      tabOffsetTop:null,
      isTabFixed:false,
    }
  },

  components: {
    NavBar,
    CategoryBar,
    CategoryList,
    CategoryDetail,
    Scroll,
    TabControl
  },

  created() {
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    },
  },
  methods: {
    itemClick(index) {
      this._getSubcategories(index)
    },

    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType)
    },
    /*
    * 获取数据
    * */
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        console.log(res)
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        console.log(res)
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
  }
}
</script>

<style scoped>
#category{
  height: 100vh;
}

.nav-bar{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #f6f6f6;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#category-content{
  height: 100%;
  flex: 1;
  overflow: hidden;
}

</style>
