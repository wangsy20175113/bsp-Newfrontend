<template>
<div class="app-container">
<!--   <div class="page-header position-relative">-->
<!--        <h1 style="color: #2679b5;">-->
<!--          Feature Products-->
<!--        </h1>-->
<!--      </div>-->

 <el-row :gutter="10" class="panel-group">
    <div>
    <el-col :span="7" v-for="product in productList" v-bind:key="product.prc_id">

<el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img :src="product.productCategory.img_url" class="image" @click="showDetail(product)">
    </div>
    <div style="position:relative;">

      <div style="padding-top:5px;" class="progress-item">
        <span>{{product.title }}({{product.productCategory.category_name}})</span>
      </div>
      <div class="progress-item">
        <span>{{product.sku_cd}}</span>
      </div>
      <div class="progress-item1">
        <span>$ {{product.price.price}}</span>
        </div>
    </div>
  </el-card>
   </el-col>
   </div>
    </el-row>

</div>

</template>

<script>
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
export default {
  name: 'ProductScan',
  data() {
    return {
      productCategoryList:[],
      productList:[]
    }
  },
  components: { PanThumb, Mallki },
   mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      // const userid=this.$store.getters.userid
      // console.log('userid:'+userid)
      this.$store.dispatch('getAllProductCategory').then((result) => {
        console.log("productCategoryList:" + result.data)
        this.productCategoryList = result.data
      })
       this.$store.dispatch('GetProducts').then((result) => {
          console.log("productList:"+result.data.list)
        this.productList = result.data.list
        })
    },
    showDetail(rowData) {
      console.log("rowData.pro_id:" + rowData.pro_id)
      this.$router.push({
        name: 'productDetail',
        query: {
          'pro_id': rowData.pro_id,
          'title':rowData.title,
        }
      })
    },
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
      this.$router.push({
        path: '/productDetail'
      })
    }
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  }
   .progress-item1 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #b3450e;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
