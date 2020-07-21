<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <div class="block">
      <span class="demonstration"></span>
      <el-carousel height="650px">
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <img v-bind:src="img.url" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'editorDashBoard',
      imgList:[
        {url:require('../../assets/index_images/img1.jpg')},
        {url:require('../../assets/index_images/img2.jpg')},
        {url:require('../../assets/index_images/img3.jpg')},
        {url:require('../../assets/index_images/img4.jpg')}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
