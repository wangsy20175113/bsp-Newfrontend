<template>
  <div id="wishListDetailContainer">
    <div style="overflow: hidden; width: 100%">
      <span style="width: 420px; float: left">
        <img :src="productDetail[0].productCategory.img_url" style="width: 380px; height: 380px">
      </span>
      <!--      <span style="width: 200px; float: left">-->
      <div class="info">
        <div class="productproperty" style="font-weight: 700; font-size: 22px;color: #3a835d">{{ productDetail[0].title }}</div>
        <div class="productproperty" style="color:#b3450e">{{'Price: $'+productDetail[0].price.price }}</div>
        <div class="productproperty" style="color:#808080">SKU:  {{ productDetail[0].sku_cd }}</div>
        <div class="productproperty" style="color:#808080">Brand: {{ productDetail[0].brand.name_en }}</div>
        <div class="productproperty" style="color:#808080">Stock: {{ productDetail[0].stock }}</div>

        <div style="margin-top: 20px">
          <el-row style="width: 1000px;">
            <el-button type="success" size="mini" class="productproperty" @click="dropShip()"  round>Dropship Now</el-button>
            <el-button icon="el-icon-star-on" type="success" size="mini" class="productproperty" @click="addToWishlist()"  round >Add to Wish List</el-button>

          </el-row>
        </div>
      </div>

    </div>
    <div>
      <div class="wishlistTitle">Item Description</div>
      <el-tabs v-model="activeName" type="border-card" style="font-size: 20px; width: 800px">
        <el-tab-pane label="ebay description" name="first"><div class="productproperty">{{ productDetail[0].productDescription.description }}</div></el-tab-pane>
        <el-tab-pane label="Amazon description" name="second"><div class="productproperty">{{ productDetail[0].productDescription.description }}</div></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishListDetail',
  data() {
    return {
      productDetail:[],
      title:'',
      activeName: 'first',
      wishList:[],
      data:{
        user_id:'',
      },
      wishlistData:{
        dsr_id:'',
        pro_id:'',
      }
    }
  },
  created:function(){
    this.getParams();
    this.loadProductDetailByPRO_ID();
  },
  mounted(){
    this.loadProductDetailByPRO_ID();
    this.getWishListData();
    this.getDsr_id();
  },
  watch:{
      '$route': 'getParams'
    },
  methods:{
    getParams(){
      var routerParams = this.$route.query.pro_id
      this.wishlistData.pro_id = routerParams
      //this.wishList = this.$route.query.wishList
    },
    getWishListData(){
      /**
       * PRO_ID,TITLE,RETAIL_PRICE,SKU_CD
       */
      const user_id = this.$store.getters.userid;
      console.log("----user_id----"+user_id);
      this.$store.dispatch('GetWishListProducts',parseInt(this.wishlistData.dsr_id)).then((result) => {
        this.wishList = result.data
      })
    },
    getDsr_id(){
      this.data.user_id = this.$store.getters.userid;
      // this.data.user_id = 2;
      console.log("哈哈哈哈哈哈user_id:"+ this.data.user_id);
      this.$store.dispatch('GetDsrId',this.data.user_id).then((result) => {
        console.log("-------getDsr_id--result-------");
        console.log(JSON.stringify(result));
        this.wishlistData.dsr_id =  result.data[0].dsr_id;
      })
    },
    loadProductDetailByPRO_ID(){
      /**
       * 根据PRO_ID获取：TITLE,
       * RETAIL_PRICE,SKU_CD,NAME_EN(BRD_ID=>NAME_EN),
       * URI(ENTITY_ID(PRO_ID)=>URI,
       * PLATEFORM_TYPE(PR0_ID=>PRC_ID=>PLATEFORM_TYPE),
       * STOCK
       * ebayDescription & amazonDescription
       */
    //  this.isAddBtn = this.$route.query.isAddBtn;
      this.title = this.$route.query.title,
      console.log("收到的title:"+this.title);
      this.$store.dispatch('LoadProductDetailByPRO_ID',this.title).then((result) => {
        console.log("---------Detail: result-------");
        console.log(JSON.stringify(result));
        console.log("---------Detail: result.data-------");
        console.log(JSON.stringify(result.data));
        console.log("---------Detail: result.data.list-------");
        console.log(JSON.stringify(result.data.list));
        this.productDetail = result.data.list;
      })
    },
    dropShip(){
      console.log("dripship")
      console.log("传给storechoose的pro_id："+this.wishlistData.pro_id);
      this.$router.push({
        name: 'storechoose',
        query: {
           pro_id: this.wishlistData.pro_id,
           dsr_id: this.wishlistData.dsr_id,
        }
      })
    },
    addToWishlist(){
      console.log("----wishlist----");
      console.log(JSON.stringify(this.wishList));
      let flag = 0;
      for(let i = 0;i<this.wishList.length;i++){
        console.log("----product-title----")
        console.log(JSON.stringify(this.wishList[i].product.title));
        if(this.wishList[i].product.title==this.title){
          this.$message({
            type: 'info',
            message: 'Already in wish list！'
          })
          flag = 1;
          break;
        }
      }
      if(flag==0){
        console.log("----要传送的wishlistData-----");
        console.log(JSON.stringify(this.wishlistData))
         this.$store.dispatch('AddToWishList',this.wishlistData).then((result) => {
           if(result.code===200){
             this.$message({
               type: 'info',
               message: 'Add Succeed！'
             })
           }else{
             this.$message({
               type:'info',
               message:'Add Failed！'
             })
           }
         })
      }
    }
  }
}
</script>

<style scoped>
  #wishListDetailContainer {
    margin-top:30px;
    margin-left:30px;
  }

  .productproperty{
    margin-top: 25px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 14px;

  }

  .wishlistTitle {
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .info{
    margin-top: 48px;
    margin-left: 10px;
    font-size: 18px;
  }

</style>
