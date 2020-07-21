<template>
  <div class="app-container">

    <el-col :span = '20' class = 'toolbar'>
      <p v-text ='head'></p>
    </el-col>

  
<!--品牌信息-->
    
    <div class="BrandTable">
      <el-table
        ref="multipleTable1"
         :data="brandList.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        element-loading-text="Loading"
        fit
        border
        @selection-change="selschange"
     
        highlight-current-row
        width="80%"
      >
      <el-table-column type="selection"/>
         <el-table-column align="center" prop = 'name_en' label = 'Brand Name(EN)'>
        </el-table-column>
          <el-table-column align="center" label="image"  >
          <template slot-scope="scope">
            <img :src="scope.row.img_url" width="100" height="100" />
          </template>
        </el-table-column>
           <el-table-column align="center"  label = 'Operations'>
          <template slot-scope="scope">
            <el-button type = 'info' size="mini" icon="el-icon-edit" @click.native ='EditBrand(scope.row)'>Modify</el-button>
            <el-button type = 'danger' size="mini" icon="el-icon-delete" @click.native ='deleteBrand(scope.row)'>delete</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content" /></el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="block">
             <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
          </div>
        </div></el-col>
      <el-col :span="8"><div class="grid-content" /></el-col>
    </el-row>
    </div>
        <br>
      <el-button type="primary" @click="showaddBrand" plain icon="el-icon-plus" style="margin-left:90px">Add</el-button>
    <el-button type="primary"  size="small" style="margin-left:50px"  @click="deleteAll" >DeleteAll</el-button>

 <!--添加brand弹窗-->
    <el-dialog title='Add Brand' :visible.sync = 'dialogVisible1' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model = 'BrandData'  ref = 'BrandData' label-width = '0px' class = ''>
        <el-form-item label="Brand Name(EN)" label-width="130px"  prop='name_en'>
          <el-col :span="8">
            <el-input type='text' v-model='BrandData.name_en'  autocomplete='off' placeholder='Title'>
            </el-input>
          </el-col>
        </el-form-item>
         <el-form-item label-width="130px" >
         <div class="divcss5">Recommended image size 160*80 JPG/PNG format</div>
        </el-form-item>

        <el-form-item label="Brand Logo" label-width="130px" prop='image_url'>
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

      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
        <!-- <el-button size='small' @click="resetForm('BrandData')">Reset</el-button> -->
          <el-button type = 'primary' size='small' @click="addBrand">Save</el-button>
          <el-button type = 'danger' size='small' @click.native = "dialogVisible1 = false, BrandData = {
                    man_id:'',
                    name_en:'',
                    image_url:'' }">Close</el-button>
       </span>
    </el-dialog>


<!--修改brand弹窗-->
    <el-dialog title='Edit Brand' :visible.sync = 'dialogVisible2' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model = 'BrandData'  ref = 'BrandData' label-width = '0px' class = ''>
        <el-form-item label="Brand Name(EN)" label-width="130px"  prop='name_en'>
          <el-col :span="8">
            <el-input type='text' v-model='BrandData.name_en'  autocomplete='off' placeholder='Title'>
            </el-input>
          </el-col>
        </el-form-item>

         <el-form-item label-width="130px" >
         <div class="divcss5">Recommended image size 160*80 JPG/PNG format</div>
        </el-form-item>

        <el-form-item label="Brand Logo" label-width="130px" prop='image_url'>
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

      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
         <!-- <el-button size='small' @click="resetForm('BrandData')">Reset</el-button> -->
          <el-button type = 'primary' size='small' @click="updateBrand">Save</el-button>
          <el-button type = 'danger' size='small' @click.native = "dialogVisible2 = false, BrandData = {
                    name_en:'',
                    image_url:'' }">Close</el-button>
       </span>
    </el-dialog>
  </div>

</template>



<script>
export default {
  name: 'brandDetail',
  data() {
    return {
      orders:[],     
      brandList:[],
      downloadLoading: false,
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible2:false,
      head:'Brand Information',
      dialogImageUrl: '',
      img_id: '',
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      total:1,
      // 个数选择器（可修改）
      pageSizes:[1,2,3,4],
      // 默认每页显示的条数（可修改）
      PageSize:2,

       BrandData:{
        user_id: '',
          man_id:'',
          brd_id:'',
          name_en:'',
          image_url:''

      }
     }
  },
   mounted: function () {
    this.loadData()
  },
  methods: {
     selschange (rows) {
      this.orders = []
      if (rows) {
        for (let i = 0; i < rows.length; i++) {
          const item = {}
          item.man_id = rows[i].man_id
          item.brd_id = rows[i].brd_id
          item.name_en = rows[i].name_en
          item.image_url = rows[i].image_url
          this.orders.push(item)
        }
      }
      console.log('selschange')
      console.log(this.orders)
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
    loadData () {
      this.BrandData.user_id=this.$store.getters.userid
      this.BrandData.man_id=this.$route.query.man_id
      console.log( 'this.BrandData')
      console.log(this.BrandData)
       this.$store.dispatch('GetBrandByFilter',this.BrandData).then((result) => {
      this.total = result.data.length;
      this.brandList = result.data//此处有问题，brandlist显示的还是所有品牌，报错是brandList is undefined
      console.log("brandlist")
      console.log(this.brandList)
      })
    },

    showaddBrand(){
      this.dialogVisible1 = true
      this.BrandData.name_en = ''
    },
    addBrand(){
    this.$refs.BrandData.validate(valid => {
        if(valid) {
          this.BrandData.img_url = this.dialogImageUrl
          
          console.log( this.BrandData.man_id)
          this.$store.dispatch('AddBrand',this.BrandData).then((result) => {
            if (result.code==200){
              this.$message({
                type: 'info',
                message: `add operation succeeded`
              })
              this.loadData()
              this.dialogVisible1 = false
              this.$refs.BrandData.resetFields()
            }else{
              this.$message({
                type: 'info',
                message: `add operation failed`
              })
            }

          })
        } else {
          return false
        }
      })
    },
    EditBrand(rowData){
      this.BrandData = Object.assign({}, rowData)
      this.dialogVisible2 = true
    },
    updateBrand(){
    this.$refs.BrandData.validate(valid => {
        if(valid) {
          this.BrandData.img_url = this.dialogImageUrl
          // console.log("BrandData", this.BrandData)
          // console.log("this.$ref.brandData", this.$refs.BrandData)
          this.$store.dispatch('UpdateBrand',this.BrandData).then((result) => {
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
            this.dialogVisible2 = false
            this.loadData()
          })
        } else {
          // console.log('the parameter is invalid')
          return false
        }
      })
    },

    deleteBrand(rowData){
      this.$confirm('Are you sure to delete the record?', 'Brand Delete', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('DeleteBrand',rowData.brd_id).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `delete operation succeeded`
            })
          }else{
            this.$message({
              type: 'info',
              message: `delete operation failed`
            })
          }
          this.loadData()
        })
      }).catch(() => {
      });
    },
    deleteAll(){
    console.log("进入deleteAll")

     console.log(this.orders)
        this.$confirm('Are you sure to delete the brands?', 'Brands Delete', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if(this.orders.length!=0){
        this.$store.dispatch('DeleteAllBrand',this.orders).then((result) => {
          if (result.code==200){
            this.$message({
              type: 'info',
              message: `delete operation succeeded`
            })
          
          }else{
            this.$message({
              type: 'info',
              message: `delete operation failed`
            })
          }
          this.loadData()
        })
        }else{
           this.$message({
              type: 'info',
              message: `delete operation failed`
            })
        }

      }).catch(() => {
      });
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
  },

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
