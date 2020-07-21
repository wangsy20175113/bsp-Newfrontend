<template>
  <div class="block">
    <el-timeline>


      <el-timeline-item v-model="ruleForm"  placement="top">
        <el-card>
          <h4>Place Of Dispatch</h4>
          <p>{{this.ruleForm.start}}</p>
          <p>{{this.ruleForm.start_time}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item  placement="top">
        <el-card>
          <h4>Delivery to </h4>
          <p>{{this.ruleForm.address1}}</p>
          <p>{{this.ruleForm.update_time1}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top">
        <el-card>
          <h4>arrive </h4>
          <p>{{this.ruleForm.address2}}</p>
          <p>{{this.ruleForm.update_time2}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
    export default {
        name: "order_delivery",
      data() {
        return {
          tracking_no:'',
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
      created:function(){
        this.getParams();
      },
      watch:{
        '$route': 'getParams'
      },
      mounted() {
        this.track()
      },
      methods:{
        getParams(){
          var routerParams = this.$route.query.tracking_no;
          this.tracking_no = routerParams;
          console.log(" this.tracking_no:"+ this.tracking_no );
        },
        track(rowData,rowindex){
          this.dialogVisible = true;
          console.log("track:"+rowData.track_no);
          this.$store.dispatch('GetTrack',rowData).then((result) => {
            console.log('result.data')
            console.log(result)
            this.ruleForm=result.data[0]
            console.log("ruleForm")
            console.log(this.ruleForm)
          })

        },
      }
    }
</script>

<style scoped>

</style>
