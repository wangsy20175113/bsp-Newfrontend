<template>
      <div>
        <el-col :span = '20' class = 'toolbar'>
          <p class="title" style="color:#3CB371; font-weight: bold;">My Stores</p>
        </el-col>
        <el-row>
          <el-col :span="12" >
            <el-card class="box-card-ebay" width="100%">
              <div slot="header" class="clearfix">
                <span style="color:#66CDAA; font-weight: bold; font-size: 18px">eBay</span>
              </div>
              <div>
                <el-table :data="ebayStoreList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                          @selection-change="handleEbaySelectionChange"
                          width="100%" >
                  <el-table-column type="selection"/>
                  <el-table-column label="Store Name">
                    <template slot-scope="scope">
                      <div class="storename" >{{scope.row.store_name}}</div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="enbaytotal"
                  @current-change="current_change">
                </el-pagination>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12" >
            <el-card class="box-card-amazon">
              <div slot="header" class="clearfix">
                <span style="color:#66CDAA; font-weight: bold; font-size: 18px">Amazon</span>
              </div>
              <div>
                <el-table :data="amazonStoreList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                          @selection-change="handleAmazonSelectionChange"
                          width="50%">
                  <el-table-column type="selection" />
                  <el-table-column label="Store Name">
                    <template slot-scope="scope" >
                      <div class="storename" >{{scope.row.store_name}}</div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="amazontotal"
                  @current-change="current_change">
                </el-pagination>
              </div>

            </el-card>
          </el-col>
        </el-row>
        <div class="btn">
        <el-button type = 'success' size="small" @click = 'handelPushBtn' round>Push</el-button>
        </div>
      </div>

</template>

<script>
  export default {
    name: 'storechoose',
    data(){
      return{
        ebayStoreList:[],
        amazonStoreList:[],
        selectedEbayStores:[],
        selectedAmazonStores:[],

        //分页
        enbaytotal:0,//默认数据总数
        amazontotal:0,
        pagesize:5,//每页的数据条数
        currentPage:1,//默认开始页面
        pro_id:'',
        str_id:'',
        dropship_price:'',
        ebaystore:{
          dsr_id:'',
          platform_type:'1', data(){
            return{
              ebayStoreList:[],
              amazonStoreList:[],
              selectedEbayStores:[],
              selectedAmazonStores:[],

              //分页
              enbaytotal:0,//默认数据总数
              amazontotal:0,
              pagesize:5,//每页的数据条数
              currentPage:1,//默认开始页面
              pro_id:'',
              str_id:'',
              dropship_price:'',
              ebaystore:{
                dsr_id:'',
                platform_type:'1',
              },
              amazonstore:{
                dsr_id:'',
                platform_type:'2',
              },
              sdi_ebay:[],
              sdi_amazon:[],
            }
          }
        },
        amazonstore:{
          dsr_id:'',
          platform_type:'2',
        },
        sdi_ebay:[],
        sdi_amazon:[],
      }
    },
    created:function(){
      this.getParams();
      this.getEbayStoreList();
      this.getAmazonStoreList();
    },
   mounted(){
      this.getEbayStoreList();
      this.getAmazonStoreList();
    },
    watch:{
      '$route': 'getParams'
    },
    methods: {
      getParams(){
        console.log("---------Storechoose的getParams----------");
        var routerParams = this.$route.query.pro_id;
        this.pro_id = routerParams;
        this.ebaystore.dsr_id = parseInt(this.$route.query.dsr_id);
        this.amazonstore.dsr_id = parseInt(this.$route.query.dsr_id);
        //this.dropshipItem.pro_id = parseInt(this.$route.query.pro_id);
      },
      handleEbaySelectionChange(val) {
        console.log("handleEbaySelectionChange--",val);
        this.selectedEbayStores = val
      },
      handleAmazonSelectionChange(val) {
        console.log("handleAmazonSelectionChange--",val);
        this.selectedAmazonStores = val
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      getEbayStoreList(){
        this.$store.dispatch('GetEbayStoreList',this.ebaystore).then((result) => {
           console.log("---------ebay---result.data-------");
           console.log(JSON.stringify(result.data));
           this.ebayStoreList = result.data;
           this.enbaytotal = this.ebayStoreList.length;
        })
      },
      getAmazonStoreList(){
        this.$store.dispatch('GetAmazonStoreList',this.amazonstore).then((result) => {
          console.log("---------amazon-result.data-------");
          console.log(JSON.stringify(result.data));
          this.amazonStoreList = result.data
        })
      },
      pushEbayStores(){
        console.log("进入PushEbay");
            console.log("sdi_ebay:"+JSON.stringify(this.sdi_ebay));
            this.$store.dispatch('PushEbayStores',this.sdi_ebay).then((result) => {
              console.log("result.code:"+result.code);
              if(result.code===200){
                this.$message({
                  type: 'info',
                  message: 'Push Succeed！'
                })
              }else{
                this.$message({
                  type:'info',
                  message:'Push Failed！'
                })
              }
            })
      },
      pushAmazonStores(){
            console.log("amazon_ebay:"+JSON.stringify(this.sdi_amazon));
            this.$store.dispatch('PushAmazonStores',this.sdi_amazon).then((result) => {
              if(result.code===200){
                console.log("result:"+result.data.data);
                this.$message({
                  type: 'info',
                  message: 'Push Succeed！'
                })
              }else{
                this.$message({
                  type:'info',
                  message:'Push Failed！'
                })
              }
            })
      },
      handelPushBtn(){
        this.$confirm('Are you sure to push these products?', '提示', {
          type: 'warning'
        }).then(() => {
          for(let i=0;i<this.selectedEbayStores.length;i++){
            const item = {
              str_id:parseInt(this.selectedEbayStores[i].str_id),
              pro_id:parseInt(this.pro_id)
            }
            console.log("ebay_dropshipItem: "+item.str_id+","+item.pro_id);
            this.sdi_ebay.push(item);
          }
          for(let i=0;i<this.selectedAmazonStores.length;i++){
            const item = {
              str_id:parseInt(this.selectedAmazonStores[i].str_id),
              pro_id:parseInt(this.pro_id)
            }
            console.log("amazon_dropshipItem: "+item.str_id+","+item.pro_id);
            this.sdi_amazon.push(item);
          }
        this.pushEbayStores();
        this.pushAmazonStores();
        })
      }

    }
  }
</script>

<style>

  .el-main {
    padding-bottom: 0;
    font-family: "Open Sans";
    font-size: 13px;
    min-height: 100%;
  }
  .title{
    font-family: "Helvetica Neue";
    font-size: 20px;
    color:#909399;
  }
  .store {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 20px 0 20px 0;
    padding-left: 3%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card-ebay {
    width: 450px;
    margin-left:120px ;
  }
  .box-card-amazon {
    width: 450px;
  }
  .btn{
    float:left;
    position:absolute;
    right:70px;
    bottom:60px;
  }


</style>
