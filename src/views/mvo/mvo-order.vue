<template>
 <el-container id="main-content" class="clearfix">
 
       <el-main>
         
       <el-input type='text' v-model='sCondition' autocomplete='off' placeholder='please enter the order title' style='width:40%' ></el-input>
      <el-button type="primary"  size="small" style="margin-left:50px" @click="deliverall" :disabled="orders.length===0">DeliverAll</el-button>
       <el-button type="primary"  size="small" style="margin-left:60px" @click="cancelAll" :disabled="corders.length===0">CancelAll</el-button>

            <!-- <待支付> -->
      <el-tabs style="margin-top:70px">
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

        <el-table-column align="center" label="Title" >
          <template slot-scope="scope">
            <el-button type="text"  @click="seeProduct(scope.row)" > {{ scope.row.products[0].title }}</el-button>
          </template>
        </el-table-column>

       <el-table-column align="center" label="Price"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price }}
          </template>
        </el-table-column>

        

        <el-table-column align="center" label="QTY" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.products[0].sku_cd }}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center" >
          <template slot-scope="scope">     
              {{ scope.row.order_no }}        
          </template>
        </el-table-column>

        <el-table-column label="Creation Date"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.creation_date | dateFmt('YYYY-MM-DD HH:mm:ss')}}
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

    <!-- <待发货> -->
    <el-tab-pane label="Awaiting Shipment">
       <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredAwaitingShipmentData"
        element-loading-text="Loading"
        fit
        highlight-current-row
         @selection-change="selschange"
        width="80%"
      >
       <el-table-column type="selection" v-model="orders"/>
     
           <el-table-column align="center" label="Title" >
          <template slot-scope="scope">
            <el-button type="text"  @click="seeProduct(scope.row)" > {{ scope.row.products[0].title }}</el-button>
          </template>
        </el-table-column>

       <el-table-column align="center" label="Price" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="QTY" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.products[0].sku_cd }}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center" >
          <template slot-scope="scope">     
              {{ scope.row.order_no }}        
          </template>
        </el-table-column>

        <el-table-column label="Creation Date"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.creation_date | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

         <el-table-column label="Operation" >
            <template slot-scope="scope">
              <el-button type="primary"  @click="deliver(scope.row,scope.$index)" >Deliver</el-button>        
          </template>
          </el-table-column>
        </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
        <!-- <el-button type="primary"  size="small"  @click="deliverall" :disabled="orders.length===0">DeliverAll</el-button> -->
    </el-tab-pane>

       <!-- <已发货> -->
    <el-tab-pane label="Shiped">
       <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredShipedData"
        element-loading-text="Loading"
        fit
        highlight-current-row
         @selection-change="selschange1"
        width="80%"
      >
       <el-table-column type="selection" v-model="corders"/>
     
           <el-table-column align="center" label="Title" >
          <template slot-scope="scope">
            <el-button type="text"  @click="seeProduct(scope.row)" > {{ scope.row.products[0].title }}</el-button>
          </template>
        </el-table-column>

       <el-table-column align="center" label="Price" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="QTY" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.products[0].sku_cd }}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center" >
          <template slot-scope="scope">     
              {{ scope.row.order_no }}        
          </template>
        </el-table-column>

        <el-table-column label="Creation Date"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.creation_date | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

          <el-table-column label="Tracking No"  align="center" >
          <template slot-scope="scope">
             <el-button type="text"  @click="track(scope.row,scope.$index)" >{{ scope.row.salesOrderLineItems[0].tracking_no }}</el-button>
          </template>
        </el-table-column>
         <el-table-column label="Operation" >
            <template slot-scope="scope">
              <el-button type="primary"  @click="cancel(scope.row,scope.$index)" >Cancel</el-button>        
          </template>
          </el-table-column>
        </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
        <!-- <el-button type="primary"  size="small"  @click="cancelAll" :disabled="corders.length===0">CancelAll</el-button> -->
    </el-tab-pane>

       <!-- <已完成> -->
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

         <el-table-column align="center" label="Title" >
          <template slot-scope="scope">
            <el-button type="text"  @click="seeProduct(scope.row)" > {{ scope.row.products[0].title }}</el-button>
          </template>
        </el-table-column>

       <el-table-column align="center" label="Price" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.products[0].sku_cd }}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center" >
          <template slot-scope="scope">     
              {{ scope.row.order_no }}        
          </template>
        </el-table-column>

        <el-table-column label="Creation Date"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.creation_date | dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>

         <el-table-column label="Tracking No"  align="center" >
          <template slot-scope="scope">
             <el-button type="text"  @click="track(scope.row,scope.$index)" >{{ scope.row.salesOrderLineItems[0].tracking_no }}</el-button>
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

     
       <!-- <已取消> -->
    <el-tab-pane label="Cancelled Orders">
         <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="FilteredCancelledData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        width="80%"
      >
  <el-table-column align="center" label="Title" >
          <template slot-scope="scope">
            <el-button type="text"  @click="seeProduct(scope.row)" > {{ scope.row.products[0].title }}</el-button>
          </template>
        </el-table-column>

       <el-table-column align="center" label="Price" >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].price }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="QTY"  >
          <template slot-scope="scope">
            {{ scope.row.salesOrderLineItems[0].qty }}
          </template>
        </el-table-column>

        <el-table-column label="Sku"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.products[0].sku_cd }}
          </template>
        </el-table-column>
        <el-table-column label="Order No"  align="center" >
          <template slot-scope="scope">     
              {{ scope.row.order_no }}        
          </template>
        </el-table-column>

        <el-table-column label="Creation Date"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.creation_date | dateFmt('YYYY-MM-DD HH:mm:ss')}}
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
                  <el-button type="text" v-model="ruleForm.start_time" >{{this.ruleForm.start_time }} </el-button>
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
                <el-button type="text"   v-model="ruleForm.update_time3">{{this.ruleForm.update_time3 }} </el-button>
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
                  <el-button type="text"  v-model="ruleForm.end_time">{{this.ruleForm.end_time }} </el-button>
                </el-form-item>
            </div>
          </el-col>
        </el-row>
  </el-form>
   <span slot = 'footer' class = 'dialog-footer'>
           <el-button  style="" type="info" @click.native="closeDialog">Close</el-button>
       </span>
    </el-dialog>
    </el-main>
</el-container>
</template>

<script>
 export default {
    name: 'MVOOrderManagement',
    data() {
      return {   
        orders:[],
        corders:[],
        orders1:[],
        corders1:[],
        resultList: [],
        sCondition:'',
        dialogVisible:false,
        AwaitingPaymentData:[],  
        AwaitingShipmentData:[],
        ShipedData:[],
        CompletedData:[],
        CancelledData:[],
        cancelorders:[],
        listLoading: false,   
        total:0,//默认数据总数
        pagesize:7,//每页的数据条数
        currentPage:1,//默认开始页面
        ProductData:{
         user_id: '',
          man_id:'',
          name_cn:'',
          name_en:'',
          decription:'',
          gmc_report_type:'',
          gmc_report_url:'',
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
      this.loadData()
    },
    methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
       closeDialog() {
      this.dialogVisible = false
    },
    track(rowData,rowindex){
      this.dialogVisible = true
      this.$store.dispatch('GetTrack',rowData).then((result) => {
      // console.log(result.data)
      console.log(result)
      this.ruleForm=result[0].data[0]
      console.log(this.ruleForm)
      })

    },
      loadData(){
          this.ProductData.user_id=this.$store.getters.userid
          console.log( 'this.ProductData')
          console.log(this.ProductData)
        this.$store.dispatch('GetAwaitingPayment',this.ProductData).then((result) => {
          console.log("AwaitingPaymentData")
            const temp = result.data;
             for(let i=0;i<temp.length;i++){
              if(temp[i]!=null){
                this.AwaitingPaymentData.push(temp[i]);
                console.log(this.AwaitingPaymentData)
            }
             }
      })
       this.$store.dispatch('GetAwaitingShipment',this.ProductData).then((result) => {
          console.log("GetAwaitingShipment")
           const temp = result.data;
             for(let i=0;i<temp.length;i++){
              if(temp[i]!=null){
                this.AwaitingShipmentData.push(temp[i]);
                console.log(this.AwaitingPaymentData)
            }
             }
      })
         this.$store.dispatch('GetShiped',this.ProductData).then((result) => {
          console.log("getShiped")
           const temp = result.data;
           for(let i=0;i<temp.length;i++){
              if(temp[i]!=null){
                this.ShipedData.push(temp[i]);
                console.log(this.ShipedData)
            }
             }
      })
      this.$store.dispatch('GetCompleted',this.ProductData).then((result) => {
          console.log("GetCompleted")
           const temp = result.data;
          for(let i=0;i<temp.length;i++){
              if(temp[i]!=null){
                this.CompletedData.push(temp[i]);
                console.log(this.CompletedData)
            }
             }
      })
       this.$store.dispatch('GetCancelled',this.ProductData).then((result) => {
          console.log("GetCancelled")
           const temp = result.data;
           for(let i=0;i<temp.length;i++){
              if(temp[i]!=null){
                this.CancelledData.push(temp[i]);
                console.log(this.CancelledData)
            }
             }
      })
      adata()
      }, 
       seeProduct(rowData){
      this.$router.push({
        name: 'mvoproduct',
        query: {       
          'title':rowData.products[0].title
        }
      })
       },
       selschange(orders){
        this.orders=orders
        console.log("orders")
        console.log( this.orders)
       },
        selschange1(corders){
        this.corders=corders
        console.log('cancelOrders')
        console.log(this.corders)
       },
       deliverall(){
         console.log("进入deliverall")
        this.$confirm('Are you sure to deliver the orders?', 'Orders Deliver', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for(let i=0;i<this.orders.length;i++){
            this.orders[i].order_sts=3
        }
        console.log('修改状态之后的this.orders')
        console.log(this.orders)
        this.$store.dispatch('Deliver',this.orders).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `deliver operation succeeded`
            })
          }else{
            this.$message({
              type: 'info',
              message: `deliver operation failed`
            })
          }
          this.loadData()
        })
      }).catch(() => {
      });
       },
      deliver(rowData){
         console.log("进入deliver")
        this.$confirm('Are you sure to deliver the order?', 'Order Deliver', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
           rowData.order_sts=3
            console.log('rowData')
            console.log( rowData)
            this.orders1.push(rowData)
            console.log('orders1')
            console.log( this.orders1)
        this.$store.dispatch('Deliver',this.orders1).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `deliver operation succeeded`
            })
          }else{
            this.$message({
              type: 'info',
              message: `deliver operation failed`
            })
          }
          this.loadData()
        })
      }).catch(() => {
      });
       },
    cancelAll(){
       console.log("CancelAll")
        this.$confirm('Are you sure to cancel the orders?', 'Orders Cancel', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
         for(let i=0;i<this.corders.length;i++){
            this.corders[i].order_sts=5
        }
         console.log('修改状态之后的this.corders')
        console.log(this.corders)
        this.$store.dispatch('CancelOrder',this.corders).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `cancel operation succeeded`
            })
          }else{
            this.$message({
              type: 'info',
              message: `cancel operation failed`
            })
          }
          this.loadData()
        })
      }).catch(() => {
      });

    },
    cancel(rowData){
         console.log("deliver")
        this.$confirm('Are you sure to cancel the order?', 'Order Cancel', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {     
          rowData.order_sts=5
            console.log('rowData')
            console.log( rowData)
            this.corders1.push(rowData)
            console.log('orders1')
            console.log( this.corders1)  
        this.$store.dispatch('CancelOrder',this.corders1).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `cancel operation succeeded`
            })
          }else{
            this.$message({
              type: 'info',
              message: `cancel operation failed`
            })
          }
          this.loadData()
        })
      }).catch(() => {
      });
       },
},
   computed: {
     FilteredAwaitingPaymentData() {
       for(let i=0;i<this.AwaitingPaymentData.length;i++){
        return this.AwaitingPaymentData[i].filter(value => {
          
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
       }
       
     },
      FilteredAwaitingShipmentData() {
         for(let i=0;i<this.AwaitingShipmentData.length;i++){
       return this.AwaitingShipmentData[i].filter(value => {
         console.log("this.AwaitingShipmentData[i]")
         console.log(this.AwaitingShipmentData[i])
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
       }
     },
    FilteredShipedData() {
       for(let i=0;i<this.ShipedData.length;i++){
       return this.ShipedData[i].filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
       }
     },
  FilteredCompletedData() {
    for(let i=0;i<this.CompletedData.length;i++){
       return this.CompletedData[i].filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
       }
     },
       FilteredCancelledData() {
      for(let i=0;i<this.CancelledData.length;i++){
       return this.CancelledData[i].filter(value => {
         const a = value.products[0].title.match(this.sCondition);
         const b = value.products[0].sku_cd.match(this.sCondition);
         const c = value.order_no.match(this.sCondition);
        return a||b||c
       })
       }
     }
    }
}
</script>

<style>
 
</style>