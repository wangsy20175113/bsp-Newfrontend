<template>
  <el-container>
    <el-header></el-header>
    <el-header></el-header>
    <el-main>
      <div class="content">
        <p class="title">Please Select A Platform For Your New Store</p><br><br>
        <p class="title"></p><br><br>
        <el-button type="primary" class="button">Amazon</el-button><br><br><br>
        <el-button type="primary" class="button">eBay</el-button>

      </div>
    </el-main>
  </el-container>
<!--  <div id="page-content" class="clearfix">-->
<!--    <h3 class="header smaller lighter red">Add a new store</h3>-->

<!--  </div>-->

</template>

<script>
export default {
  name: 'ChoosePlatform'
}

</script>

<style scoped>
.el-container{
  height:100%;
}
.el-header{
   color: #333;
   text-align: center;
   line-height: 60px;
 }
.el-main {

  color: #333;
  text-align: center;
}
.title{
  font-family: "Microsoft YaHei";
  font-size: 20px;
  color: #2d2f33;
  font-style: italic;
}
.button{
  size:40px;
}

</style>
