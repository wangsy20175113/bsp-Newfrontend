<template>
  <div class="app-container">
    <el-col :span = '20' class = 'toolbar'>
      <p v-text ='head'></p>
      <el-input type='text' v-model='sCondition' autocomplete='off' placeholder='please enter the product name' style='width:30%' ></el-input>
      <el-button type = 'primary' size="small" style="margin-left:15px" @click="search">Search</el-button>
      <el-button type = 'primary' size="small"  style="margin-left:20px"  @click="addBtn">添加</el-button>
    </el-col>

    <div class="ProductTable">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="filteredProductCategoryData"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        width="80%"
      >
        <el-table-column type="selection" />

        <el-table-column align="center" label="Product Name">
          <template slot-scope="scope">
            {{ scope.row.product.title }}
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Category">
          <template slot-scope="scope">
            {{ scope.row.category_name }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="image"  >
          <template slot-scope="scope">
            <img :src="scope.row.img_url" width="80" height="80" >
          </template>
        </el-table-column>

        <el-table-column label="state"  align="center">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.product_status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column  align="center" width="250px"  label = 'Operations' >
          <template slot-scope="scope">
            <el-button type = 'info' size="mini" @click="edit(scope.row)">edit</el-button>
            <el-button type = 'danger' size="mini" @click ='deleteRecord(scope.row,scope.$index)'>delete</el-button>

            <el-button v-if="scope.row.product_status==='待入仓'" type="primary" size="mini" round @click="changeState(scope.row)">入仓</el-button>

            <el-button v-else-if="scope.row.product_status==='待上架'" type="primary" size="mini" round  @click="changeState(scope.row)">上架</el-button>

            <el-button v-else-if="scope.row.product_status==='已上架'" type="primary" size="mini" round @click="changeState(scope.row)">下架</el-button>

            <el-button v-else type = 'primary' size="mini" round :style="{ display: 'none' }"></el-button>

          </template>
        </el-table-column>

      </el-table>

      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>

    </div>

    <!--添加信息弹窗-->
    <el-dialog title='Add Product Category' :visible.sync = 'visible' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model='productCategoryFormData'  ref='productCategoryFormData' label-width='0px' class=''>

        <el-form-item label="product" label-width="130px" prop="sid">
          <el-col :span="8">
            <el-input type="text" v-model="productCategoryFormData.productCategory.product.title" autocomplete="off" placeholder="Product Name">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="category" label-width="130px"  prop='sid'>
          <el-col :span="8">
            <el-cascader
              :options="options"
              v-model='productCategoryFormData.productCategory.category_name'
              ></el-cascader>
          </el-col>
        </el-form-item>

        <el-form-item label="platform type" label-width="130px"  prop='sid'>
          <el-col :span="8">
            <el-cascader
            :options="platform_options"
            v-model='productCategoryFormData.productCategory.plateform_type'
            ></el-cascader>
          </el-col>
        </el-form-item>

        <el-form-item label="Main Pricture" label-width="130px">
          <el-upload
            action="http://localhost:8088/image/uploadImage"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <img height="100px" width="100px" :src="dialogImageUrl" alt="" style="float: left">
        </el-form-item>

      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="addProductCategory">Save</el-button>
        <el-button type = 'danger' size='small' @click.native = "visible = false, ProductData = {
                    TITLE:'',
                    CATEGORY_NAME:'',
                    SECOND_CATEGORY:'',
                    image:'' }">Close</el-button>
       </span>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: 'ProductCategory',
    data() {
      return {
        resultList: [],
        listLoading: false,
        downloadLoading: false,
        sCondition:'',
        head:'Product Name',
        operation:'',
        img_id: '',
        dialogImageUrl: '',
        dialogVisible: false,

        total:0,//默认数据总数
        pagesize:7,//每页的数据条数
        currentPage:1,//默认开始页面

        visible: false,

        productCategoryFormData:{
          productCategory: {
            category_name: '',
            plateform_type: '',
            product_status: '',
            img_url: '',
            product: {
              title: ''
            }
          },
          operationFlag: 'add'
        },

        options:[
          {
            value:'electronic product',
            label:'electronic product'
          },
          {
            value:'drinks',
            label:'drinks'
          },
          {
            value:'food',
            label:'food'
          },
          {
            value:'electric appliance',
            label:'electric appliance'
          }
        ],
        value2:'',
        platform_options:[{
          value:'Ebay',
          label:'Ebay'},
          {
            value:'Amazon',
            label:'Amazon'}
        ]
      }
    },
    created() {
      this.loadData()
    },
    mounted() {
      this.loadData()
    },
    methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      loadData() {
        this.listLoading = true;
        this.$store.dispatch('getAllProductCategory').then((result) => {
          console.log(result)
          this.resultList = result.data;
          this.total = this.resultList.length;
          this.listLoading = false
        })
      },
      fetchData() {
        // this.$store.dispatch('getProductCategory').then((result) => {
        //   this.list = result.data
        // })
        this.loadData()
      },
      deleteRecord(row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$store.dispatch('DeleteRecord',row).then((result) => {
              if(result.code===200){
                this.$message({
                  type: 'info',
                  message: '删除成功！'
                })
              }else{
                this.$message({
                  type:'info',
                  message:'删除失败！'
                })
              }
              this.fetchData()
            })
          })
          .catch(() => {
          })
      },
      changeState(row){
        //改变状态，传给后端商品ID和商品当前状态，后端进行判断，并在数据库进行相应的更新
       if (row.product_status === '已上架')
          this.productCategoryFormData.productCategory.product_status = '待入仓'
       else if (row.product_status === '待上架')
         this.productCategoryFormData.productCategory.product_status = '已上架'
        else if (row.product_status === '待入仓')
          this.productCategoryFormData.productCategory.product_status = '待上架'
        console.log(row)
        this.productCategoryFormData.operationFlag = "update"
        this.productCategoryFormData.productCategory.category_name = row.category_name
        this.productCategoryFormData.productCategory.plateform_type = row.plateform_type
        this.productCategoryFormData.productCategory.img_url = row.img_url
        this.productCategoryFormData.productCategory.prc_id = row.prc_id
        this.productCategoryFormData.productCategory.pro_id = row.product.pro_id
        this.productCategoryFormData.productCategory.product = row.product
        this.$store.dispatch('addAndUpdateProductCategory', this.productCategoryFormData).then((result) => {
          if(result.code===200){
            console.log("result:"+result.code);
            this.$message({
              type: 'info',
              message: '操作成功！'
            })
          }else{
            this.$message({
              type:'info',
              message:'操作失败！'
            })
          }
          this.fetchData()
        })

      },
      edit(rowData) {
          this.productCategoryFormData.operationFlag = "update"
          this.productCategoryFormData.productCategory.category_name = rowData.category_name
          this.productCategoryFormData.productCategory.plateform_type = rowData.plateform_type
          this.productCategoryFormData.productCategory.img_url = rowData.img_url
          this.productCategoryFormData.productCategory.prc_id = rowData.prc_id
          this.productCategoryFormData.productCategory.pro_id = rowData.product.pro_id
          this.productCategoryFormData.productCategory.product = rowData.product
          this.dialogImageUrl = rowData.img_url
          this.dialogVisible = true
          this.visible = true
      },
      search() {
        this.listLoading = true
        this.$store.dispatch('SearchRecord',this.sCondition).then((result) => {
          if(result.code===200){
            this.list = result.data
          }else{
            this.$message({
              type:'info',
              message:'查询失败！'
            })
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
      },
      resetForm() {
        this.productCategoryFormData.productCategory.img_url = ''
        this.productCategoryFormData.productCategory.product_status = ''
        this.productCategoryFormData.productCategory.plateform_type = ''
        this.productCategoryFormData.productCategory.category_name = ''
      },

      addBtn() {
        this.resetForm()
        this.productCategoryFormData.operationFlag = 'add'
        this.visible = true
      },

      addProductCategory() {
        this.productCategoryFormData.productCategory.img_url = this.dialogImageUrl
        this.productCategoryFormData.productCategory.product_status = "待入仓"
        console.log(this.productCategoryFormData.productCategory.plateform_type)
        console.log(this.productCategoryFormData.productCategory.category_name)
        if (Array.isArray(this.productCategoryFormData.productCategory.plateform_type))
         this.productCategoryFormData.productCategory.plateform_type = this.productCategoryFormData.productCategory.plateform_type[0]
        if (Array.isArray(this.productCategoryFormData.productCategory.category_name))
         this.productCategoryFormData.productCategory.category_name = this.productCategoryFormData.productCategory.category_name[0]
            this.$store.dispatch('addAndUpdateProductCategory', this.productCategoryFormData).then((result) => {
              if (result.code == 200) {
                this.$message({
                  type: 'info',
                  message: `Succeeded`
                })
              } else {
                this.$message({
                  type: 'info',
                  message: `Failed`
                })
              }
              this.visible = false
              this.loadData()
            })
      },
      /**
       * 图片上传,有点问题
       * @param
       * @param file
       */
      /* handleChange (file) {
         this.ProductData.image = URL.createObjectURL(file.raw);

         let img = new Image();
         img.src = this.ProductData.image;

         //   let type = this.formData.iconFile.type.split('/')[1];
         /*
               this.ProductData.width = img.width
               console.log("url:"+this.ProductData.image)
               console.log("width:"+this.ProductData.width)
               console.log("height:"+img.height)*/
      //   },
      /* beforeUpload(file) {
         return true;
       }*/
    },
    computed: {
      filteredProductCategoryData () {
          console.log("进入filteredProductCategoryData")
        const search = this.sCondition
        return this.resultList.filter(data => {
          const a =  Object.keys(data.product).some(key => {
            return (
              String(data.product[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
          const b = Object.keys(data).some(key => {
              return (
                String(data[key])
                  .toLowerCase()
                  .indexOf(search) > -1
              )
            })
          return (a || b)
        })
    
      }
    }

  }
</script>

<style scoped>
  .ProductTable {
    margin-top: 100px;
    margin-left: 70px;
    margin-right: 70px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
