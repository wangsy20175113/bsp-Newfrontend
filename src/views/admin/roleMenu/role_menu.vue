<template>
  <div class="app-container">
    <el-col :span = '20' class = 'toolbar'>
      <p v-text ='head'></p>
      <el-button type = 'primary' size="small" @click="addRole">添加</el-button>
    </el-col>

    <br>

    <div class="roleTable">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="resultList"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        width="80%"
      >
        <el-table-column type="selection" />

        <el-table-column align="center" label="Role ID">
          <template slot-scope="scope">
            {{ scope.row.role_id }}
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Role Name">
          <template slot-scope="scope">
            {{ scope.row.role_name }}
          </template>
        </el-table-column>

        <el-table-column label="Role Path"  align="center">
          <template slot-scope="scope">
              {{ scope.row.role_path }}
          </template>
        </el-table-column>

        <el-table-column  align="center" width="400px"  label = 'Operations' >
          <template slot-scope="scope">
            <el-button type = 'info' size="mini" @click="edit(scope.row)">edit</el-button>
            <el-button type = 'danger' size="mini" @click ='deleteRecord(scope.row,scope.$index)'>delete</el-button>
            <el-button type = 'primary' size="mini" @click ='editPath(scope.row)'>edit permission</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!--添加信息弹窗-->
    <el-dialog title='Add Product Category' :visible.sync = 'visible' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model='roleRuleForm'  ref='roleRuleForm' label-width='0px' class='' :rules="rules">

        <el-form-item label="role name" label-width="130px" prop="role_name">
          <el-col :span="8">
            <el-input type="text" v-model="roleRuleForm.role_name" autocomplete="off" placeholder="Role Name">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="role path" label-width="130px"  prop='role_path'>
          <el-col :span="8">
            <el-input type="text" v-model="roleFormData.role.role_path" autocomplete="off" placeholder="Role Path">
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="addOrUpdateRole">Save</el-button>
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
    name: 'role_menu',
    data() {
      return {
        resultList: [],
        listLoading: false,
        downloadLoading: false,
        sCondition:'',
        head:'Role Menu',
        operation:'',
        img_id: '',
        dialogImageUrl: '',
        dialogVisible: false,

        total:0,//默认数据总数
        pagesize:7,//每页的数据条数
        currentPage:1,//默认开始页面

        visible: false,

        roleFormData:{
          role: {
            role_id: '',
            role_name: '',
            role_path: ''
          },
          operationFlag: 'add'
        },

        roleRuleForm: {
          role_name: '',
          role_path: ''
        },

        rules: {
          role_name: [{ required: true, message: 'role name cannot be null', trigger: 'blur' }],
        },
        value2:'',
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
        this.listLoading = true
        this.$store.dispatch('role_permission/getAllRoles').then(() => {
          this.resultList = this.$store.getters.role_list
          console.log("resultList====================", this.resultList)
          this.listLoading = false
        })
      },
      fetchData() {
        // this.$store.dispatch('getProductCategory').then((result) => {
        //   this.list = result.data
        // })
        this.loadData()
      },

      addOrUpdateRole() {
        this.roleFormData.role.role_name = this.roleRuleForm.role_name
        this.$refs.roleRuleForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('role_permission/addOrUpdateRole', this.roleFormData).then((result) => {
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
          }
        })
      },

      deleteRecord(row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$store.dispatch('role_permission/deleteRole',row).then((result) => {
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

      edit(rowData) {
        this.roleFormData.operationFlag = 'update'
        this.roleFormData.role.role_id = rowData.role_id
        this.roleFormData.role.role_name = rowData.role_name
        this.roleFormData.role.role_path = rowData.role_path
        this.visible = true
      },

      editPath(rowData) {
        this.$router.push({path: "/admin/rolePath"})
        let role = {
          role_id: rowData.role_id,
          role_name: rowData.role_name,
          role_path: rowData.role_path
        }
        this.$store.commit("role_permission/SET_CURRENT_ROLE", role)
      },

      resetForm() {
       this.roleFormData.role.role_name=""
       this.roleFormData.role.role_path=""
      },

      addRole() {
        this.resetForm()
        this.roleFormData.operationFlag = 'add'
        this.visible = true
      },

    },
    computed: {}

  }
</script>

<style scoped>
  .roleTable {
    margin-top: 70px;
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
