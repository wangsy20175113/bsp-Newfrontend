<template>
<el-container id="main-content" class="clearfix">
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;">
         Withdrawal Audit
        </h1>
      </div>

    </el-header>
       <el-main>

      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="AuditData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        width="80%"
      >

        <el-table-column align="center" label="Account Name" >
          <template slot-scope="scope">
          {{ scope.row.account_name }}
          </template>
        </el-table-column>

       <el-table-column align="center" label="Transaction Type"  >
          <template slot-scope="scope">
            <el-button v-if="scope.row.transaction_type===1" type="text">Recharge</el-button>
             <el-button v-else-if="scope.row.transaction_type===2" type="text">Withdraw </el-button>
               <el-button v-else-if="scope.row.transaction_type===3" type="text">Consume  </el-button>
             <el-button v-else type="text"> Refund</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Transaction Money" >
          <template slot-scope="scope">
           {{ scope.row.transaction_money }}
          </template>
        </el-table-column>

        <el-table-column label="Apply Time"  align="center" >
          <template slot-scope="scope">
             {{ scope.row.create_time| dateFmt('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="Status"  align="center" >
          <template slot-scope="scope">
              <el-button v-if="scope.row.status===2" type="text">Waiting Audit</el-button>
             <el-button v-else-if="scope.row.status===1" type="text">Failed</el-button>
             <el-button v-else type="text" > Audited</el-button>
          </template>
        </el-table-column>

       <el-table-column label="Operation" >
            <template slot-scope="scope">
              <el-button type="primary"  @click="audit(scope.row,scope.$index)" >Audit</el-button>
          </template>
          </el-table-column>
        </el-table>
            <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>


        <!--弹窗-->
    <el-dialog title='Audit Flow' :visible.sync = 'visible' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model = 'FlowData'  ref = 'FlowData' label-width = '0px' class = ''>
        <el-form-item label-width="150px"  prop='pass'>
        <template>
            <el-radio v-model="radio" label="4"  @change="getValue">Pass</el-radio>
            <el-radio v-model="radio" label="1" @change="getValue">Failed</el-radio>
        </template>
        </el-form-item>

         <el-form-item label-width="150px" label="Upload flow " >
         <div class="divcss5">Recommended image size 160*80 JPG/PNG format</div>
        </el-form-item>

    <el-form-item label="Flow Picture" label-width="130px" prop='image_url'>
          <el-upload
            action="http://localhost:8088/image/uploadImage"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

         <el-form-item label="Reasons for Failed" label-width="150px"  prop='reason'>
          <el-col :span="8">
            <el-input type='text' v-model='FlowData.reason'  autocomplete='off' placeholder='reason'>
            </el-input>
          </el-col>
        </el-form-item>

      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
          <el-button type = 'primary' size='small' @click="update">Save</el-button>
          <el-button type = 'danger' size='small' @click.native = "visible = false, FlowData = {
                    pass:'',
                    image_url:'' ,
                    reason:'' }">Close</el-button>
       </span>
    </el-dialog>
    </el-main>
</el-container>

</template>

<script>
  export default {
    name: 'adminAudit',
    data() {
      return {
        AuditData:[],
        listLoading: false,
        downloadLoading: false,
        img_id: '',
        radio:'',
        dialogImageUrl: '',
         // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        total:1,
        // 个数选择器（可修改）
        pageSizes:[1,2,3,4],
        // 默认每页显示的条数（可修改）
        PageSize:1,

        dialogVisible:false,
        visible: false,
        FlowData:{
          transaction_id:'',
            status:'',
             pass:'',
             image_url:'',
             reason:'',
          walletTransactionAudit:{
          status:'',
        }
        },

      }
    },
    mounted() {
      console.log("userid=================", this.$store.getters)
      this.loadData()
    },
    methods: {
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
        getValue(){
            console.log(this.radio)
            this.FlowData.pass=this.radio
            if( this.FlowData.pass=='4'){
              this.FlowData.status=4
              this.FlowData.walletTransactionAudit.status=4
            }
            if(this.FlowData.pass=='1'){
              this.FlowData.status=1
              this.FlowData.walletTransactionAudit.status=1
            }
             console.log(this.FlowData.pass)
        },
      loadData() {
        this.$store.dispatch('GetFlow').then((result) => {
         console.log("AuditData")
         this.AuditData = result.data
         this.total = this.AuditData.length
         console.log(this.AuditData)
      })
      this.getValue()
      },
      audit(rowData){
      this.FlowData = Object.assign({}, rowData)
      this.visible = true
    },
      update(){
        console.log(this.FlowData.status)
        console.log(this.FlowData.walletTransactionAudit.status)
        this.$refs.FlowData.validate(valid => {
        if(valid) {
          this.FlowData.img_url = this.dialogImageUrl
          this.$store.dispatch('AuditFlow',this.FlowData).then((result) => {
            // console.log(result)
            if (result.code==200){
              this.$message({
                type: 'info',
                message: `update operation succeeded`
              })
            }else{
              this.$message({
                type: 'info',
                message: `update operation failed`
              })
            }
            this.visible = false
            this.loadData()
          })
        } else {
          return false
        }
      })
      },
       handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadSuccess(result) {
      // console.log(result)
      if(result.code != 200){
        this.$message({
          type: 'error',
          message: `upload failed`
        })
      }
      this.dialogImageUrl = result.data.uri
      this.img_id = result.data.img_id
    }

  }
  }
</script>

<style scoped>

</style>
