<template>
  <el-container id="main-content" class="clearfix">
    <el-main id="page-content" iv class="clearfix">
      <div style="margin-left:20%; margin-right:20%">
        <p class="title">My Stores</p>
        <div class="store">
          <el-table :cell-style="{color: '#666', fontFamily: 'Arial',fontSize:'18px'}" :data="amazonStoreList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :header-cell-style="{color: '#0a76a4',fontSize:'18px',fontFamily:'Helvetica'}">
            <el-table-column prop="store_name" label="Amazon"/>
          </el-table>
          <el-row :gutter="20">
            <el-col :span="7"><div class="grid-content" /></el-col>
            <el-col :span="8">
              <div class="grid-content">
                <div class="block" style="alignment: center">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total= this.amazonStoreList.length
                  />
                </div>
              </div></el-col>
            <el-col :span="8"><div class="grid-content" /></el-col>
          </el-row>


        </div>
        <div class="store">
          <el-table :cell-style="{color: '#666', fontFamily: 'Arial',fontSize:'18px'}" :data="ebayStoreList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :header-cell-style="{color: '#0a76a4',fontSize:'18px',fontFamily:'Helvetica'}">
            <el-table-column prop="store_name" label="eBay"/>
          </el-table>
          <el-row :gutter="20">
            <el-col :span="7"><div class="grid-content" /></el-col>
            <el-col :span="8">
              <div class="grid-content">
                <div class="block" style="alignment: center">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total= this.ebayStoreList.length
                  />
                </div>
              </div></el-col>
            <el-col :span="8"><div class="grid-content" /></el-col>
          </el-row>


        </div>

        <div style="text-align: right">
          <el-button type="primary" @click="clickAdd">Add a new store</el-button>
        </div>

        <el-dialog :visible.sync="dialogVisible" width="35%" :close-on-lick-modal="false">
          <div>
            <el-form ref="addFormData" :model="addFormData" :rules="storeRule" label-width="100px" status-icon>
              <el-form-item label="Platform Type" prop="platform_type" label-width="160px">
                <el-select v-model="addFormData.store.platform_type" placeholder="Select Platform" style="width: 300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Store Name" prop="store_name" label-width="160px">
                <el-input v-model="addFormData.store.store_name" type="text" autocomplete="off" clearable style="width: 300px"/>
              </el-form-item>
              <el-form-item label="Seller ID" prop="dsr_id" label-width="160px">
                <el-input v-model="addFormData.store.dsr_id" type="text" autocomplete="off" clearable style="width: 300px"/>
              </el-form-item>
<!--              <el-row>-->
<!--                <el-col>-->
<!--                  <el-form-item label="Marketplace ID" label-width="160px">-->
<!--                    <el-input v-model="addFormData.store.goa_government_area.goa_id" type="text" autocomplete="off" clearable style="width: 300px"/>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
              <el-form-item label="MWS Auth Token" prop="token" label-width="160px">
                <el-input v-model="addFormData.store.eba_ebay_authorization.token" type="text" autocomplete="off" clearable style="width: 300px"/>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 20%; margin-left: 18%;margin-top: 5%" type="info" @click.native="dialogVisible = false">Close</el-button>
                <el-button style="width: 20%; margin-left: 5%" type="primary" @click.native="addStore">Submit</el-button>
              </el-form-item>
            </el-form>

          </div>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name:'Store',
  data() {
    return {
      amazonStoreList: [],
      ebayStoreList: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      user_id:'',
      role:'',
      dsrid:'',
      dialogVisible: false,
      total1:'',
      total2:'',
      options: [{
        value: '1',
        label: 'Amazon'
      }, {
        value: '2',
        label: 'eBay'
      }],
      ebayStore:{
        dsr_id:'',
        platform_type:'2'
      },
      amazonStore:{
        dsr_id:'',
        platform_type:'1'
      },
      addFormData: {
        store:{
          platform_type: '',
          store_name: '',
          dsr_id: '',
          // goa_government_area:{
          //   goa_id: ''
          // },
          eba_ebay_authorization:{
            token: ''
          }
        }
      },

      storeRule: {
        // store_name: [{ required: true, message: 'Store Name can not be null', trigger: 'blur' }],
        // platform_type: [{ required: true, message: 'Platform Type can not be null', trigger: 'blur' }],
        // dsr_id: [{ required: true, message: 'Seller ID can not be null', trigger: 'blur' }],
        // token: [{ required: true, message: 'MWS Auth Token can not be null', trigger: 'blur' }],
      }

    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.user_id = this.$store.getters.userid
      this.role= this.$store.getters.role
      this.$store.dispatch('GetDsr',this.user_id).then((result) =>{
        this.amazonStore.dsr_id = result.data[0].dsr_id
        this.ebayStore.dsr_id = result.data[0].dsr_id
        console.log(result.data)
        console.log(result.data[0])
        console.log(result.data[0].dsr_id)
        console.log(this.role)
        this.amazonStore.dsr_id = parseInt(this.amazonStore.dsr_id)
        this.ebayStore.dsr_id = parseInt(this.ebayStore.dsr_id)
        this.$store.dispatch('GetAmazonStores',this.amazonStore).then((result) => {
          this.amazonStoreList = result.data
          console.log(result.data)
        })
        this.$store.dispatch('GetEBayStores',this.ebayStore).then((result) => {
          this.ebayStoreList = result.data
          console.log(result.data)

        })
      })
    },

      clickAdd(){
      this.addFormData = {
        store:{
          platform_type: '',
          store_name: '',
          dsr_id: '',

          // goa_government_area:{
          //   goa_id: ''
          // },
          eba_ebay_authorization:{
            token: ''
          }
        }
      }
      this.dialogVisible = true
    },
    addStore() {
      this.$refs.addFormData.validate(valid => {
        if (valid) {
          this.addFormData.store.dsr_id = parseInt(this.addFormData.store.dsr_id)
          // this.addFormData.store.goa_government_area.goa_id = parseInt(this.addFormData.store.goa_government_area.goa_id)
          console.log('===================================')
          console.log(this.addFormData)
          console.log('===================================')
          this.$store.dispatch('AddStore', this.addFormData).then((result) => {
            if (result.code == 200) {
              this.$message({
                type: 'info',
                message: `Add Succeeded`
              })
            } else {
              this.$message({
                type: 'info',
                message: `Add Failed`
              })
            }
            this.dialogVisible = false
            this.loadData()
          })
        }
      })
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
  // computed: {
  //   ebayStore(){
  //     return this.ebayStoreList.filter(data => {
  //       return Object.keys(data).some(platform_type => {
  //         return (
  //           String(data[platform_type]) == "2"
  //         )
  //       })
  //     })
  //   },
  //   amazonStore(){
  //     return this.amazonStoreList.filter(data => {
  //       return Object.keys(data).some(platform_type => {
  //         return (
  //           String(data[platform_type]) == "1"
  //         )
  //       })
  //     })
  //   }

  // }

}
</script>

<style>
.el-container {
  margin: 0;
  padding: 8px 20px 24px;
}
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

.p {
  line-height: 40px;
  color: #666;
  border-top: 1px solid #ccc;
  font-family:  Arial;
  font-size: 18px;
}
.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


</style>
