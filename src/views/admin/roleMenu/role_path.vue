<template>
  <div class="app-container">
    <el-col :span = '20' class = 'toolbar'>
      <h2 v-text ='head' ></h2>
      <div>Selected role: {{role.role_name}}</div>
      <el-button type = 'primary' size="small" @click="addPermission" style="margin-top: 10px">添加</el-button>
    </el-col>

    <br>

    <div class="roleTable">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="pathList"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        width="80%"
      >
        <el-table-column type="selection" />

        <el-table-column  align="center" label="Parent Route Id">
          <template slot-scope="scope">
            {{ scope.row.parentRoute.parent_route_id}}
          </template>
        </el-table-column>

        <el-table-column label="Parent Route Name"  align="center">
          <template slot-scope="scope">
            {{ scope.row.parentRoute.parent_route_name }}
          </template>
        </el-table-column>


        <el-table-column label="Children Route Id"  align="center">
          <template slot-scope="scope">
            {{ scope.row.childrenRoute.children_route_id }}
          </template>
        </el-table-column>


        <el-table-column label="Chilren Route Name"  align="center">
          <template slot-scope="scope">
            {{ scope.row.childrenRoute.children_route_name}}
          </template>
        </el-table-column>

        <el-table-column  align="center" width="250px"  label = 'Operations' >
          <template slot-scope="scope">
            <el-button type = 'info' size="mini" @click="edit(scope.row)">edit</el-button>
            <el-button type = 'danger' size="mini" @click ='deleteRecord(scope.row,scope.$index)'>delete</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!--添加信息弹窗-->
    <el-dialog title='Add Permission' :visible.sync = 'visible' width = '50%' :close-on-lick-modal = 'false'>
      <el-form :model='permissionRuleForm'  ref='permissionRuleForm' class='' :rules="rules">

        <el-form-item label="parent route name" label-width="200px" prop="currentParentRoute">
          <el-col :span="24">
            <el-cascader
              :options="parentRoutes"
              @change="handleParentRoutesChange"
              v-model='permissionRuleForm.currentParentRoute'
              style="float: left"
            ></el-cascader>
            <el-button style="float: right; margin-right: 40px" type="primary" plain @click="loadChildrenRouteByParent">search</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="children route name" label-width="200px" prop="currentChildrenRoute">
          <el-col :span="24">
            <el-cascader
              :options="childrenRoutes"
              v-model='permissionRuleForm.currentChildrenRoute'
              style="float: left"
            ></el-cascader>
          </el-col>
        </el-form-item>

      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="addOrUpdatePermission">Save</el-button>
        <el-button type = 'danger' size='small' @click.native = "visible = false, ProductData = {
                    TITLE:'',
                    CATEGORY_NAME:'',
                    SECOND_CATEGORY:'',
                    image:'' }">Close</el-button>
       </span>
    </el-dialog>

    <el-button type = 'text' size="small" @click="returnToMain" style="font-size: medium">return</el-button>
  </div>

</template>

<script>
  export default {
    name: 'role_menu',
    data() {
      return {
        role: '',
        head: 'role permission',
        listLoading: false,
        pathList: [],
        parentRoutes: [],
        childrenRoutes: [],
        permissionFormData: {
          operationFlag: '',
          permission: {
            permission_id: '',
            role_id: '',
            parent_route_id: '',
            children_route_id: ''
          }
        },
        permissionRuleForm: {
          currentParentRoute: '',
          currentChildrenRoute: '',
        },
        visible: false,
        rules: {
          currentParentRoute: [{ required: true, message: 'parent route cannot be null', trigger: 'blur' }],
        }
      }
    },
    created() {
      this.loadRole()
      this.loadData()
    },
    mounted() {
      this.loadRole()
      this.loadData()
      this.loadParentRoute()
    },
    methods: {
      returnToMain() {
       this.$router.push({path: "/admin/roleMenu"})
      },
      loadRole() {
        this.role = this.$store.getters.current_role
      },
      loadData() {
        this.listLoading = true
        // console.log(this.role)
        let roleForm = {
          role_id: this.role.role_id
        }
        // console.log(roleForm)
        this.$store.dispatch('role_permission/getAllPermissions', roleForm).then((result) => {
          this.pathList = result.data
          // console.log("resultList====================", this.pathList)
          this.pathList.forEach(path => {
            // console.log(path)
            if (!path.childrenRoute) {
              path.childrenRoute = new Object()
              path.childrenRoute.children_route_name = "all"
              path.childrenRoute.children_route_id = "empty"
            }
          })
          this.listLoading = false
        })
      },
      loadParentRoute() {
        this.$store.dispatch("role_permission/getAllParentRoute").then((result) => {
          let list = result.data
          console.log("list==================", list, list.length)
          for (let i = 0; i < list.length; i++) {
            let pRoute = new Object()
            pRoute.value = {
              parent_route_id: list[i].parent_route_id
            }
            pRoute.label = list[i].parent_route_name
            this.parentRoutes.push(pRoute)
          }
          console.log("parent route================" ,this.parentRoutes)

        })
      },
      loadChildrenRouteByParent() {
        console.log("1===============", this.permissionRuleForm.currentParentRoute)
        let parentRouteForm
        if (Array.isArray(this.permissionRuleForm.currentParentRoute)) {
          parentRouteForm = {
            parent_route_id: this.permissionRuleForm.currentParentRoute[0].parent_route_id
          }
        } else {
          parentRouteForm = {
            parent_route_id: this.permissionRuleForm.currentParentRoute.parent_route_id
          }
        }
        console.log(parentRouteForm)
        this.childrenRoutes = []
       this.$store.dispatch("role_permission/getAllChildrenRouteByParent", parentRouteForm).then((result) => {
         console.log("2====================", result)
         let list = result.data
         for(let i = 0; i < list.length; i++) {
           let cRoute = new Object()
           cRoute.value = {
             children_route_id: list[i].children_route_id
           }
           cRoute.label = list[i].children_route_name
           this.childrenRoutes.push(cRoute)
         }
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
       })
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },

      fetchData() {
        // this.$store.dispatch('getProductCategory').then((result) => {
        //   this.list = result.data
        // })
        this.loadData()
      },

      addOrUpdatePermission() {
        console.log(this.permissionRuleForm)
        this.permissionFormData.permission.role_id = this.$store.getters.current_role.role_id
        if (Array.isArray(this.permissionRuleForm.currentChildrenRoute))
          this.permissionFormData.permission.route_id = this.permissionRuleForm.currentChildrenRoute[0].children_route_id
        else
          this.permissionFormData.permission.route_id = this.permissionRuleForm.currentChildrenRoute.children_route_id
        if (Array.isArray(this.permissionRuleForm.currentParentRoute))
          this.permissionFormData.permission.parent_route_id = this.permissionRuleForm.currentParentRoute[0].parent_route_id
        else
          this.permissionFormData.permission.parent_route_id = this.permissionRuleForm.currentParentRoute.parent_route_id
        console.log(this.permissionFormData)
        this.$refs.permissionRuleForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('role_permission/addOrUpdatePermission', this.permissionFormData).then((result) => {
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
            this.$store.dispatch('role_permission/deletePermission',row).then((result) => {
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
        this.permissionFormData.operationFlag = 'update'
        this.permissionFormData.permission.permission_id = rowData.permission_id
        this.parentRoutes.forEach(route => {
          if (rowData.parent_route_id === route.value.parent_route_id)
            this.permissionRuleForm.currentParentRoute = route.value
        })
        this.loadChildrenRouteByParent()
        this.childrenRoutes.forEach(route => {
          if (rowData.route_id === route.value.children_route_id)
            this.permissionRuleForm.currentChildrenRoute = route.value
        })
        this.visible = true
      },
      editPath(rowData) {

      },
      resetForm() {
        this.permissionRuleForm.currentChildrenRoute = ''
        this.permissionRuleForm.currentParentRoute = ''
      },

      addPermission() {
        this.resetForm()
        this.permissionFormData.operationFlag = 'add'
        this.visible = true
      },

      handleParentRoutesChange() {
        this.childrenRoutes = []
        this.currentChildrenRoute = ''

      }

    },
    computed: {}

  }
</script>

<style scoped>
  .roleTable {
    margin-top: 130px;
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
