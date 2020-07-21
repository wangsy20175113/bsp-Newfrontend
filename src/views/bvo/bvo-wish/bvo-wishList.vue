<template>
  <div class="mixin-components-container">
<!--    <el-header>-->
<!--        <h1 style="color: #2679b5;">-->
<!--          Wish List-->
<!--        </h1>-->
<!--    </el-header>-->
    <div class="list">
    <el-row :gutter="20" style="margin-top:30px;">
      <div v-for="product in wishList" :key="product.product.title">
        <el-col :span="13">
          <el-card class="box-card1":body-style="{ padding: '10px' }">

            <div style="height:200px;">

              <img :src="product.product.productCategory.img_url" class="img" width="220" height="220" @click="showDetail(product.product.title,product.product.pro_id)">
              <div class="info"  >
                <div class="title" >{{product.product.title}}</div>
                <div class="price">{{'Price: $'+product.product.price.price}}</div>
                <div class="sku">{{'SKU:'+product.product.sku_cd}}</div>
                <div class="sku">Brand: {{product.product.brand.name_en }}</div>
                <div class="sku">Stock: {{ product.product.stock }}</div>
<!--                style="float: right; padding: 5px 3px 5px 3px; margin-top:20px; margin-right: 0px"-->
                <div class="button" style="float: right;  margin-top:20px; margin-right: 10px">
                  <el-button   icon="el-icon-delete"
                              type="success" plain round size="mini" @click="remove(product)">remove</el-button>
                </div>
              </div>

            </div>

          </el-card>
        </el-col>
      </div>
    </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Wishlist',

  created() {
    this.loadData()
  },
  mounted() {
    this.loadData();
    this.getDsr_id();
  },
  data() {
    return {
      wishList:[],
      category:[],
      user_id:'',
      wishlistData:{
        wit_id:'',
        dsr_id:'',
        pro_id:'',
      }
    }
  },
  methods:{
    loadData(){
      /**
       * PRO_ID,TITLE,RETAIL_PRICE,SKU_CD
       */
      const user_id = this.$store.getters.userid;
      console.log("----user_id----"+user_id);
      this.$store.dispatch('GetWishListProducts',parseInt(this.wishlistData.dsr_id)).then((result) => {
        console.log("---------wishlist----result-------")
        console.log(JSON.stringify(result))
        console.log("---------wishlist----result.data-------")
        console.log(JSON.stringify(result.data))
        console.log("---------wishlist----result.data.items-------")
        console.log(JSON.stringify(result.data.items))
        this.wishList = result.data
      })
    },
    getDsr_id(){
      this.data.user_id = this.$store.getters.userid;
      // this.data.user_id = 2;
      console.log("哈哈哈哈哈哈user_id:"+ this.data.user_id);
      this.$store.dispatch('GetDsrId',this.data.user_id).then((result) => {
        console.log("----bvo-wishList---getDsr_id--result-------");
        console.log(JSON.stringify(result));
        this.wishlistData.dsr_id =  result.data[0].dsr_id;
      })
    },
    showDetail(title,pro_id) {
      console.log("传递title:"+title)
      console.log("传递pro_id:"+pro_id)
      this.$router.push({
        name: 'productDetail',
        query: {
          'title': title,
          'pro_id':pro_id,
          'wishList':this.wishList
        }
      })
    },
    remove(product){
      this.$confirm('Are you sure to remove this product from wishlist?', '提示', {
        type: 'warning'
      }).then(() => {
        this.wishlistData.wit_id = parseInt(product.wit_id);
        console.log("remove-----"+this.wishlistData.wit_id)
        this.$store.dispatch('RemoveWishlist',this.wishlistData).then((result) => {
          if(result.code===200){
            this.$message({
              type: 'info',
              message: 'Remove Succeed！'
            })
          }else{
            this.$message({
              type:'info',
              message:'Remove Failed！'
            })
          }
          this.loadData();
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
/*.mixin-components-container {*/
/*  background-color: #f0f2f5;*/
/*  padding: 30px 0px 50px 100px;*/
/*  min-height: calc(100vh - 84px);*/
/*}*/
.component-item{
  min-height: 100px;
}
.box-card1{
  height:240px;
  width: 850px;
  margin-top: 10px;
}
.title{
  font-weight: bold;
  font-size:18px;
//vertical-align: top;
  color: #3a835d;
  font-weight: bold;
}
.price{
  color:#b3450e;
  font-size:16px;
  margin-top:12px;
}
.sku{
  font-size:16px;
  color:#808080;
  margin-top: 8px;
}
.info{
  float: right;
  padding: 30px 180px 30px 0px;
  margin-right: 230px;
}
.button{
  float: left;
  /*padding: 30px 180px 30px 0px;*/
  padding: 5px 3px 5px 3px;
  margin-top:50px;
  margin-right: 100px;
  /*margin-left: 10px;*/
}
.list{
  margin-top: 0px;
  margin-left: 120px;
}
</style>
