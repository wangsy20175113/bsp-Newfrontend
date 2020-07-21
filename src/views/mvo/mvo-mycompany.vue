<template>
  <div class="app-container">
<!--公司信息-->
    <el-col :span = '20' class = 'toolbar'>
      <p v-text ='head'></p>
    </el-col>

    <div class="ProductTable">
      <el-table
        ref="multipleTable"
        :data="companylist"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        width="80%"
      >
      <el-table-column align="center" prop = 'man_id' label = 'Company ID'>
        </el-table-column>
        <el-table-column align="center" prop = 'name_cn' label = 'Company Name(CN)'>
        </el-table-column>
        <el-table-column align="center" prop = 'name_en' label = 'Company Name(EN)'>
        </el-table-column>
        <el-table-column align="center" prop = 'gmc_report_type' label = 'GMC Report Type'>
        </el-table-column>
        <el-table-column align="center" prop = 'gmc_report_url' label = 'GMC Report Url'>
        </el-table-column>
         <el-table-column align="center"  label = 'Operations' >
         <template slot-scope = 'scope'>
           <el-button type = 'primary' size="small" style="width:60px" @click = 'EditCompany(scope.row)'>Modify</el-button>
         <el-button type="info" size="small" @click='showDetail(scope.row)'  style="width:60px">Detail</el-button>
         </template>
       </el-table-column>
      </el-table>
       <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content" /></el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="block">
          </div>
        </div></el-col>
      <el-col :span="8"><div class="grid-content" /></el-col>
    </el-row>
      <br>
      <el-button type="primary" @click="showAddInfo" plain icon="el-icon-plus" style="margin-left:10px">Add</el-button>
    </div>
    <!--修改company弹窗-->
    <el-dialog title='Edit Company Information' :visible.sync = 'dialogVisible' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model = 'ProductData'  ref = 'ProductData' label-width = '0px' class = ''>

        <el-form-item label="Company Name(CN)" label-width="130px"  prop='name_cn'>
          <el-col :span="8">
            <el-input type='text' v-model='ProductData.name_cn'  autocomplete='off' placeholder='Title'>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Company Name(EN)" label-width="130px"  prop='name_en'>
          <el-col :span="8">
            <el-input type='text' v-model='ProductData.name_en'  autocomplete='off' placeholder='Title'>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="GMC Report Type(1-TUV , 2-UL)" label-width="130px"  prop='gmc_report_type'>
         <el-col :span="8">
            <el-input type='text' v-model='ProductData.gmc_report_type'  autocomplete='off' placeholder='Type'>
            </el-input>
          </el-col>
        </el-form-item>
         <el-form-item label="GMC Report Url" label-width="130px" prop='gmc_report_url'>
         <el-col :span="8">
            <el-input type='text' v-model='ProductData.gmc_report_url'  autocomplete='off' placeholder='Url'>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
          <el-button type = 'primary' size='small' @click="updateCompany">Save</el-button>
          <el-button type = 'danger' size='small' @click.native = "dialogVisible = false, ProductData = {
                     name_cn:'',
                    name_en:'',
                    description:'',
                    gmc_report_type :'',
                    gmc_report_url:'' }">Close</el-button>
       </span>
    </el-dialog>


  </div>

</template>



<script>
export default {
  name: 'mvo-mycompany',
  data() {
    return {
      orders:[],
      companylist: [],
      brandList:[],
      downloadLoading: false,
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible2:false,
      head:'Company Information',


      ProductData:{
         user_id: '',
          man_id:'',
          name_cn:'',
          name_en:'',
          decription:'',
          gmc_report_type:'',
          gmc_report_url:'',
      },
      
     }
  },
   mounted: function () {
    this.loadData()
  },
  methods: {
    showDetail(rowData){
  console.log("rowData.man_id:" + rowData.man_id)
      this.$router.push({
        name: 'brandDetail',
        query: {
          'man_id': rowData.man_id
        }
      })
    },
    
    loadData () {
      this.ProductData.user_id=this.$store.getters.userid
      console.log( 'this.ProductData')
      console.log(this.ProductData)
      this.$store.dispatch('GetManByFilter',this.ProductData).then((result) => {
      console.log("result.data.list-----companylist")
      this.companylist = result.data.list
      console.log(this.companylist)
      })
    },

    EditCompany(rowData){
      this.ProductData = Object.assign({}, rowData)
      this.dialogVisible = true

    },
    updateCompany(){
      this.$refs.ProductData.validate(valid => {
        if(valid) {
          // console.log('the parameter is valid');
          this.$store.dispatch('UpdateManufacturer',this.ProductData).then((result) => {
            // console.log("result.code:"+result.code)
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
            this.dialogVisible = false
            this.loadData()
          })
        } else {
          // console.log('the parameter is invalid')
          return false
        }
      })
    },
   
    showAddInfo() {
      this.$router.push({path: "mvo/myInfo"})
    }
  }
}
</script>


<style scoped>
  #wishListDetailContainer {
    margin: 20px 20px 20px 20px
  }


  .ProductTable {
    margin-top: 50px;
    margin-left: 80px;
    margin-right: 80px;
  }

.BrandTable {
    margin-top: 50px;
    margin-left: 80px;
    margin-right: 80px;
  }

.divcss5{ color:#F00}

</style>
