<template>
  <el-container id="main-content" class="clearfix">
    <el-main>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="ruleForm">

    <el-form-item label="Company Name(Chinese)" prop="name_cn" style="margin-left:20px;">
      <el-input v-model="ruleForm.name_cn" style="width:200px" />
    </el-form-item>

    <el-form-item label="Company Name(English)" prop="name_en" style="margin-left:20px;">
      <el-input v-model="ruleForm.name_en" style="width:200px" />
    </el-form-item>

     <el-form-item label="Brief Description"  style="margin-left:20px;">
    </el-form-item>

    <el-form-item  prop="description" style="margin-left:20px;">
      <!-- <el-input
        v-model="ruleForm.description"
        style="width:800px"
        :autosize="{ minRows: 8, maxRows: 8}"
        type="textarea"
        placeholder="enter"
      /> -->

      <quill-editor ref="text" style="height:300px; margin-left=100px" v-model="ruleForm.description"  :options="editorOption" >
     <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-code-block" title="代码"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header" title="段落格式">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size" title="字体大小">
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px" selected>16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="ql-font" title="字体">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <select class="ql-color" value="color" title="字体颜色"></select>
          <select class="ql-background" value="background" title="背景颜色"></select>
          <select class="ql-align" value="align" title="对齐"></select>
          <button class="ql-clean" title="还原"></button>
          <!-- You can also add your own -->
        </div>
      </quill-editor>
    </el-form-item>
<br>
<br>
    <el-form-item label="GMC Report Type"  style="margin-left:20px;" prop='gmc_report_type'>
      <!-- <el-cascader
            v-model="options.value"
            :options="options"></el-cascader> -->
       <el-input v-model="ruleForm.gmc_report_type" style="width:200px" />
    </el-form-item>
    <el-form-item label="GMC Report Url" prop="gmc_report_url" style="margin-left:20px;">
      <el-input v-model="ruleForm.gmc_report_url" style="width:200px" />
    </el-form-item>
    <el-form-item style="margin-left:20px;">
      <el-button style="width:150px" @click="resetForm('ruleForm')">cancel</el-button>
      <el-button style="width:150px" type="danger" @click.native = 'submitForm'>save</el-button>
    </el-form-item>
  </el-form>
    </el-main>
</el-container>
</template>

<script>
import {  Quill,quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/css/font.css'
 // 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
Quill.register(Size, true)

  // 自定义字体类型
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
var Font = Quill.import('formats/font')
Font.whitelist = fonts
Quill.register(Font, true)

export default {
 data() {
    return {
      ruleForm: {
        user_id: '',
        name_cn: '',
        name_en: '',
        decription: '',
        gmc_report_type: '',
        gmc_report_url: ''
      },
      editorOption: {
          placeholder: "please enter your description",
          theme: "snow", // or 'bubble'
          modules: {
            toolbar: {
              container: '#toolbar'
            }
          }
        }
        ,
     
      rules: {
        name_cn: [{ required: true, message: 'Chinese name can not be null', trigger: 'blur' }],
        name_en: [{ required: true, message: 'English name can not be null', trigger: 'blur' }],
        gmc_report_type: [{ required: true, message: 'gmc_report_type can not be null', trigger: 'blur' }]
      }

    }
  },
  components: {
    quillEditor
  },
  methods: {
    submitForm(){
       this.ruleForm.user_id=this.$store.getters.userid
       this.$refs.ruleForm.validate(valid => {
        if(valid) {
          // console.log('valid');
          this.$store.dispatch('AddManufacturer',this.ruleForm).then((result) => {
            // console.log(result.code)
            if (result.code==200){
              this.$message({
                type: 'info',
                message: `add operation succeeded`
              })
               this.$router.push({path: '/mvo-mycompany'})
            }else{
              this.$message({
                type: 'info',
                message: `add operation failed`
              })
            }

          })
        } else {
          // console.log('the parameter is invalid');
          return false
        }
      })
    }
   ,
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.push({path: '/mvo-mycompany'})
    }
  }

}
</script>

<style>
 .main-content {
        border:1px solid red;
        padding-left: 7px;
        padding-right: 7px;
    }
    .el-header {
        margin: 0 0 12px;
        border-bottom: 1px dotted #e2e2e2;
    }
.flex{
    display: flex;
    height: 600px;
    flex-direction: column;
}
.div{
        margin: 0;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        background-color: #fff;

    }

</style>

