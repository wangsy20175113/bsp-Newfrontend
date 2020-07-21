<template>
 <el-container id="main-content" class="clearfix">
    <el-header>
<!--      <div class="page-header position-relative">-->
<!--        <h1 style="color: #2679b5;">-->
<!--         Order Management-->
<!--        </h1>-->
<!--      </div>-->
       <el-input type='text' v-model='sCondition' autocomplete='off' placeholder='please enter the product name' style='width:20%' ></el-input>
      <el-button type = 'primary' size="small" style="margin-left:30px">Search</el-button>
    </el-header>
       <el-main>

         <!-- <待支付 Awating payment> -->
      <el-tabs style="margin-top:20px">
      <el-tab-pane label="Awaiting Payment" >
          <el-table
            ref="multipleTable"
            v-loading="listLoading"
            :data="FilteredAwaitingPaymentData"
            element-loading-text="Loading"
            fit
            highlight-current-row
            width="80%"
        >
          <el-table-column align="center" label="Title">
            <template slot-scope="scope">
             <el-button  type="text" @click="showProduct(scope.row.products[0].title)">{{ scope.row.products[0].title}}</el-button>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="Price">
            <template slot-scope="scope">
              {{ scope.row.salesOrderLineItems[0].price}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="QTY"  >
            <template slot-scope="scope">
              {{ scope.row.salesOrderLineItems[0].qty }}
            </template>
          </el-table-column>

          <el-table-column label="Sku"  align="center">
            <template slot-scope="scope">
                {{ scope.row.products[0].sku_cd}}
            </template>
          </el-table-column>
          <el-table-column label="Order No"  align="center">
            <template slot-scope="scope">
                {{ scope.row.order_no}}
            </template>
          </el-table-column>

          <el-table-column label="Total"  align="center">
            <template slot-scope="scope">
                {{ scope.row.product_amount}}
            </template>
          </el-table-column>

          <el-table-column label="Operation"  align="center">
            <template slot-scope="scope">
            <el-button type = 'success' size="mini" @click="pay(scope.row)" >Pay Now</el-button>
            </template>
          </el-table-column>

          </el-table>
<!--        <el-pagination @size-change="handleSizeChange"-->
<!--                       @current-change="handleCurrentChange"-->
<!--                       :current-page="currentPage"-->
<!--                       :page-sizes="pageSizes"-->
<!--                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"-->
<!--                       :total="total">-->
<!--        </el-pagination>-->

    </el-tab-pane>



    <!-- <待发货 awaiting shipment> -->
    <el-tab-pane label="Awaiting Shipment">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredAwaitingShipmentData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        width="80%"
      >
        <el-table-column align="center" label="Title">
          <template slot-scope="scope">
         <el-button type="text" @click="showProduct(scope.row.products[0].title)">{{ scope.row.products[0].title}}</el-button>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Price">
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center">
          <template slot-scope="scope">
            {{ scope.row.products[0].sku_cd}}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center">
          <template slot-scope="scope">
              {{ scope.row.order_no }}
          </template>
        </el-table-column>

        <el-table-column label="Total"  align="center">
          <template slot-scope="scope">
            {{ scope.row.product_amount}}
          </template>
        </el-table-column>

        </el-table>

      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-tab-pane>



       <!-- <已发货 shipment> -->
    <el-tab-pane label="Shiped">
       <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredShipmentData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        width="80%"
      >

        <el-table-column align="center" label="Title">
          <template slot-scope="scope">
             <el-button type="text" @click="showProduct(scope.row.products[0].title)">{{ scope.row.products[0].title}}</el-button>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Price">
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center">
          <template slot-scope="scope">
            {{ scope.row.products[0].sku_cd}}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center">
          <template slot-scope="scope">
              {{ scope.row.order_no }}
          </template>
        </el-table-column>

        <el-table-column label="Total"  align="center">
          <template slot-scope="scope">
            {{ scope.row.product_amount}}
          </template>
        </el-table-column>

         <el-table-column label="Tracking No">
            <template slot-scope="scope">
              <el-button type="text" @click="track(scope.row,scope.$index)" >{{scope.row.salesOrderLineItems[0].tracking_no}} </el-button>
            </template>
          </el-table-column>
        </el-table>

      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-tab-pane>

       <!-- <已完成 completed orders> -->
    <el-tab-pane label="Completed Orders">
         <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredCompletedData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        width="80%"
      >

        <el-table-column align="center" label="Title">
          <template slot-scope="scope">
            <el-button type="text" @click="showProduct(scope.row.products[0].title)">{{ scope.row.products[0].title}}</el-button>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Price">
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center">
          <template slot-scope="scope">
            {{ scope.row.products[0].sku_cd}}
          </template>
        </el-table-column>

        <el-table-column label="Order No"  align="center">
          <template slot-scope="scope">
              {{ scope.row.order_no }}
          </template>
        </el-table-column>

        <el-table-column label="Total"  align="center">
          <template slot-scope="scope">
            {{ scope.row.product_amount}}
          </template>
        </el-table-column>

         <el-table-column label="Tracking No">
            <template slot-scope="scope">
              <el-button type="text" @click="track(scope.row,scope.$index)" >{{scope.row.salesOrderLineItems[0].tracking_no}} </el-button>
            </template>
         </el-table-column>

        </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-tab-pane>



       <!-- <已取消 canceled> -->
    <el-tab-pane label="Cancelled Orders">
         <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredCanceledData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        width="80%"
      >

        <el-table-column align="center" label="Title">
          <template slot-scope="scope">
            <el-button type="text" @click="showProduct(scope.row.products[0].title)">{{ scope.row.products[0].title}}</el-button>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Price">
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center">
          <template slot-scope="scope">
            {{ scope.row.products[0].sku_cd}}
          </template>
        </el-table-column>

           <el-table-column label="Total"  align="center">
           <template slot-scope="scope">
             {{ scope.row.product_amount}}
           </template>
         </el-table-column>

        <el-table-column label="Order No"  align="center">
          <template slot-scope="scope">
              {{ scope.row.order_no}}
          </template>
        </el-table-column>

        </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-tab-pane>
    </el-tabs>

         <!-- <物流弹窗> -->
         <el-dialog title='Show Tracking Information' :visible.sync = 'dialogVisible' width = '50%' :close-on-lick-modal = 'false'>
           <el-form ref="ruleForm" :model="ruleForm" status-icon  class="ruleForm">
             <el-form-item label="Tracking No :" prop="username" label-width="150px">
               <el-button type="text" v-model="ruleForm.track_no"  >{{this.ruleForm.track_no}} </el-button>
             </el-form-item>

             <el-row :gutter="20">
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item label="Place of Dispatch :" prop="start" label-width="150px">
                     <el-button type="text" v-model="ruleForm.start" >{{this.ruleForm.start}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item  prop="Start Time :" label-width="150px">
                     <el-button type="text" v-model="ruleForm.start_time" >{{this.ruleForm.start_time}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>
             <el-row :gutter="20">
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item label="Transit Depot 1 :" prop="address1" label-width="150px">
                     <el-button type="text" v-model="ruleForm.address1" >{{this.ruleForm.address1}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item  prop="update_time1" label-width="150px">
                     <el-button type="text" v-model="ruleForm.update_time1" >{{this.ruleForm.update_time1}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>
             <el-row :gutter="20">
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item label="Transit Depot 2 :" prop="address2" label-width="150px">
                     <el-button type="text"  v-model="ruleForm.address2" >{{this.ruleForm.address2}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item prop="update_time2" label-width="150px">
                     <el-button type="text" v-model="ruleForm.update_time2" >{{this.ruleForm.update_time2}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>
             <el-row :gutter="20">
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item label="Transit Depot 3 :" prop="address3" label-width="150px">
                     <el-button type="text"  v-model="ruleForm.address3" >{{this.ruleForm.address3}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item prop="update_time3" label-width="150px">
                     <el-button type="text"   v-model="ruleForm.update_time3">{{this.ruleForm.update_time3}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>

             <el-row :gutter="20">
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item label="Shipping Address :" prop="destination" label-width="150px">
                     <el-button type="text"  v-model="ruleForm.destination">{{this.ruleForm.destination}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
               <el-col :span="6">
                 <div class="grid-content">
                   <el-form-item  prop="Arrive Time" label-width="150px">
                     <el-button type="text"  v-model="ruleForm.end_time">{{this.ruleForm.end_time}} </el-button>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>
             <el-form-item  >
               <el-button  align="center" type="info" @click.native="closeDialog">Close</el-button>
             </el-form-item>
           </el-form>
         </el-dialog>
    </el-main>


</el-container>
</template>

<script>

 export default {
    name: 'BVOOrderManagement',
    data() {
      return {
        sCondition:'',
        AwaitingPaymentData:[],
        AwaitingShipmentData:[],
        ShipmentData:[],
        CompletedData:[],
        CanceledData:[],
        listLoading: false,
        dialogVisible:false,
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        total:0,
        // 个数选择器（可修改）
        pageSizes:[1,2,3,4],
        // 默认每页显示的条数（可修改）
        PageSize:1,

        data:{
          dsr_id:'',
          user_id:''
        },
        ruleForm: {
          track_no: '',
          start: '',
          start_time: '',
          address1: '',
          address2:'',
          address3:'',
          update_time1:'',
          update_time2:'',
          update_time3:'',
          destination:'',
          end_time:''
        }
      }
  },
   mounted() {
      this.getDsr_id();
     // this.loadGetAwaitingPaymentData();
    },
    methods: {
      closeDialog() {
      this.dialogVisible = false
    },
      track(rowData,rowindex){
        this.dialogVisible = true
        this.$store.dispatch('GetTrack',rowData).then((result) => {
          console.log('result.data')
          console.log(result[0].data[0])
          this.ruleForm=result[0].data[0]
          console.log("ruleForm")
          console.log(this.ruleForm)
        })

      },
      // 分页
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.PageSize=val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
      pay(rowData){
        this.$router.push({
          name: 'order-payment',
          query: {
            'sto_id': rowData.sto_id,
            'man_id':rowData.man_id,
            'freight_cost': rowData.freight_cost,
            'product_amount':rowData.product_amount,
            'orderInfo':rowData
          }
        })
      },
      showProduct(title){
          this.$router.push({
            name: 'productDetail',
            query: {
              'title': title,
               isAddBtn:false
            }
          })
      },
      showDeliveryStatus(rowData){
        this.dialogVisible = true;
        /*this.$router.push({
          name: 'order_delivery',
          query: {
            'sao_id':rowData.sao_id,
            'tracking_no':rowData.salesOrderLineItems[0].tracking_no
          }
        })*/
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      getDsr_id(){
        this.data.user_id = this.$store.getters.userid;
       // this.data.user_id = 2;
        console.log("哈哈哈哈哈哈user_id:"+ this.data.user_id);
        this.$store.dispatch('GetDsrId',this.data.user_id).then((result) => {
          console.log("-------getDsr_id--result-------");
          console.log(JSON.stringify(result));
          this.data.dsr_id =  result.data[0].dsr_id;
          this.loadGetAwaitingPaymentData();
          this.loadGetAwaitingShipmentData();
          this.loadGetShipmentData();
          this.loadGetCompletedData();
          this.loadGetCanceledData();
        })
      },
      loadGetAwaitingPaymentData(){
        console.log("dsr_id"+this.data.dsr_id);
        this.$store.dispatch('GetAwaitingPaymentData',this.data.dsr_id).then((result) => {
          const temp = result.data;
          console.log("------loadGetAwaitingPaymentData------")
          console.log(JSON.stringify(result.data))
          //console.log(JSON.stringify(temp.length));
          for(let i=0;i<temp.length;i++){
            for(let j=0;j<temp[i].length;j++){
              if(temp[i][j]!=null){
                this.AwaitingPaymentData.push(temp[i][j]);
                console.log("temp:"+JSON.stringify(temp[i]))
              }
            }

          }
        })
      },
      loadGetAwaitingShipmentData(){
        this.$store.dispatch('GetAwaitingShipmentData',this.data.dsr_id).then((result) => {
          const temp = result.data;
          console.log("------loadGetAwaitingShipmentData------")
          console.log(JSON.stringify(result.data))
          //console.log(JSON.stringify(temp.length))
          for(let i=0;i<temp.length;i++){
            for(let j=0;j<temp[i].length;j++){
              if(temp[i][j]!=null){
                this.AwaitingShipmentData.push(temp[i][j]);
                console.log("temp:"+JSON.stringify(temp[i][j]))
              }
            }
          }
        })
      },
      loadGetShipmentData(){
        this.$store.dispatch('GetShipmentData',this.data.dsr_id).then((result) => {
          const temp = result.data;
          console.log("------loadGetShipmentData------")
          console.log(JSON.stringify(result.data))
          for(let i=0;i<temp.length;i++){
            for(let j=0;j<temp[i].length;j++){
              if(temp[i][j]!=null){
                this.ShipmentData.push(temp[i][j]);
                console.log("temp:"+JSON.stringify(temp[i]))
              }
            }
          }
        })
      },
      loadGetCompletedData(){
        this.$store.dispatch('GetCompletedData',this.data.dsr_id).then((result) => {
          const temp = result.data;
          console.log("------loadGetCompletedData------")
          console.log(JSON.stringify(result.data))
          for(let i=0;i<temp.length;i++){
            for(let j=0;j<temp[i].length;j++){
              if(temp[i][j]!=null){
                this.CompletedData.push(temp[i][j]);
                console.log("temp:"+JSON.stringify(temp[i]))
              }
            }
          }

        })
      },
      loadGetCanceledData(){
        this.$store.dispatch('GetCanceledData',this.data.dsr_id).then((result) => {
          console.log("---------CanceledData----result-------");
          console.log(JSON.stringify(result));
          console.log("---------CanceledData----result.data-------");
          console.log(JSON.stringify(result.data));
          const temp = result.data;
          console.log(JSON.stringify(temp.length))
          for(let i=0;i<temp.length;i++){
            for(let j=0;j<temp[i].length;j++){
              if(temp[i][j]!=null){
                this.CanceledData.push(temp[i][j]);
                console.log("temp:"+JSON.stringify(temp[i]))
              }
            }
          }

        })
      }
  },
   computed: {
     FilteredAwaitingPaymentData() {
       return this.AwaitingPaymentData.filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
     },
     FilteredAwaitingShipmentData() {
       return this.AwaitingShipmentData.filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
         return a||b||c
       })
     },
     FilteredShipmentData() {
       return this.ShipmentData.filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
         return a||b||c
       })
      },
     FilteredCompletedData() {
       return this.CompletedData.filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
         return a||b||c
       })
     },
     FilteredCanceledData() {
       return this.CompletedData.filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
         return a||b||c
       })
     }

    }
}
</script>

<style>

</style>
