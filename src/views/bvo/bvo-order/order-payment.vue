<template>
  <el-container id="main-content" class="clearfix">
    <el-header>
      <div class="page-header position-relative">
        <h1 style="color: #2679b5;">
          BVO
          <small>
            <i class="icon-double-angle-right" /> Order Payment
          </small>
        </h1>
      </div>
    </el-header>
    <el-main>
      <div class="info">
      <el-form ref="ruleForm" :model="ruleForm" label-position="right" label-width="150px" status-icon :rules="rules" class="ruleForm">

        <el-form-item label="Receiver" prop="receiver" style="margin-left:20px;">
          <el-input v-model="ruleForm.receiver" style="width:200px" />
        </el-form-item>

        <el-form-item label="Ship to"  style="margin-left:20px;">
              <el-col :span="4">
                <el-cascader
                  :options="province"
                  placeholder="province"
                  v-model="ruleForm.province"
                  prop="province"
                ></el-cascader>
              </el-col>
              <el-col :span="4">
                <el-cascader
                  :options="city"
                  placeholder="city"
                  v-model="ruleForm.city"
                  prop="city"
                ></el-cascader>
              </el-col>
              <el-input v-model="ruleForm.detailAddress" prop="detailAddress" style="width:200px" placeholder="detail address"/>
        </el-form-item>

        <el-form-item label="Quantity"  style="margin-left:20px;" prop='quantity'>
          <el-input v-model="ruleForm.quantity" style="width:200px" />
        </el-form-item>

        <el-form-item label="Mobile" prop="mobile" style="margin-left:20px;">
          <el-input v-model="ruleForm.mobile" style="width:200px" />
        </el-form-item>

        <el-form-item label="ZIP Code" prop="ZIPCode" style="margin-left:20px;">
          <el-input v-model="ruleForm.ZIPCode" style="width:200px" />
        </el-form-item>

        <el-form-item label="Shipping Method" prop="shipping_method" style="margin-left:20px;">
          <template>
            <el-radio v-model="ruleForm.shipping_method" label="10">2-5 days $10</el-radio>
            <el-radio v-model="ruleForm.shipping_method" label="5">5-10 days $5</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="Should pay for" style="margin-left:20px;">
          {{"￥"+this.payData.WalletAccount.walletAccountFund.withdrawing_money}}
        </el-form-item>

        <el-form-item style="margin-left:20px;">
          <el-button size="small" type="success" @click.native = 'pay'>Pay Now</el-button>
        </el-form-item>

      </el-form>
      </div>

      <!--支付弹窗-->
      <el-dialog title='Payment' :visible.sync = 'visible' width = '40%' :close-on-lick-modal = 'false'>
        <el-form :model='payData'  ref='depositData' :rules="ruleValidate" label-width='0px' class=''>

          <el-form-item label="Payment Method" label-width="130px"  prop='sid'>
            <el-col :span="8">
              <el-radio v-model="ruleForm.payment_method" label="1">My Wallet</el-radio>
              <el-radio v-model="ruleForm.payment_method" label="2">AliPay</el-radio>
            </el-col>
          </el-form-item>

          <el-form-item label="Account Name" label-width="130px"  prop='sid'>
            <el-input v-model="payData.WalletAccount.account_name" style="width:200px" />
          </el-form-item>

          <el-form-item label="Password" label-width="130px"  prop='sid'>
            <el-input v-model="payData.WalletAccount.password" style="width:200px" />
          </el-form-item>


        </el-form>
        <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="submitForm">Pay</el-button>
        <el-button type = 'danger' size='small' @click.native = "visible = false, depositData = {
              account_name:'',
              password:'',
              walletAccountFund:{
                available_money:'',
                depositing_money:0,
                withdrawing_money:'',
                currency:'RMB'
              }
                }">Close</el-button>
       </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import rules from '@/api/rules'
  export default {
    data() {
      return {
        visible:false,
        order:[],
        //账户信息
        accountData:{
          balance:'',
          account_name:''
        },
        sao_order:{
          sto_id:'',
          freight_cost:'',
          product_amount:''
        },
        ruleForm: {
          receiver: '',
          province: '',
          city:'',
          detailAddress:'',
          quantity: '',
          mobile: '',
          ZIPCode: '',
          shipping_method:'',
          payment_method:'',
          account_name:'',
          password:''
        },
        payData:{
          WalletAccount:{
            account_name:'',
            password:'',
            walletAccountFund:{
              available_money:'',
              depositing_money:0,
              withdrawing_money:'',
              currency:'RMB'
            }
          },
          man_id:''
        },
        province:[
          {
            value:'LiaoNing',
            label:'LiaoNing'
          }
        ],
        city:[{
          value:'ShenYang',
          label:'ShenYang'},
          {
            value:'DaLian',
            label:'Dalian'}
        ],
        //validation
        ruleValidate: {
          password:[
            {required: true, trigger: 'blur' }
          ],
          account_name:[
            {required: true, trigger: 'blur' }
          ]
        },
        rules: {
          receiver: [
            { required: true, message: 'receiver name can not be null', trigger: 'blur' }],
          province: [
            { required: true, message: 'province can not be null', trigger: 'blur' }],
          city: [
            { required: true, message: 'city can not be null', trigger: 'blur' }],
          detailAddress: [
            { required: true, message: 'Address name can not be null', trigger: 'blur' }],
          quantity: [
            { required: true, message: 'Chinese name can not be null', trigger: 'blur' },
            {validator:rules.FormValidate.Form().validateNumber,trigger:'blur'}
            ],
          mobile: [
            { required: true, message: 'mobile number can not be null', trigger: 'blur' },
            {validator:rules.FormValidate.Form().validatePhone,trigger:'blur'}],
          ZIPCode: [
            { required: true, message: 'ZIPCode can not be null', trigger: 'blur' }],
          shipping_method:[
            { required: true, message: 'shipping_method can not be null', trigger: 'blur' }]
        }

      }
    },
    created:function(){
      this.getParams();
    },
    mounted() {
      this.loadData();
      //this.getBalance();
    },
    watch:{
      '$route': 'getParams'
    },
    methods: {
      getParams(){
        var routerParams = this.$route.query.sto_id;
        this.sao_order.sto_id = routerParams;
        this.sao_order.freight_cost = this.$route.query.freight_cost;
        this.sao_order.product_amount = this.$route.query.product_amount;
        this.payData.WalletAccount.walletAccountFund.withdrawing_money = parseFloat(this.$route.query.product_amount);
        this.payData.man_id = parseInt(this.$route.query.man_id);
        const temp = this.$route.query.orderInfo;
        temp.order_sts = 2;
        this.order.push(temp);
        console.log("获取的sto_id:"+this.sao_order.sto_id);
        console.log("获取的freight_cost:"+this.sao_order.freight_cost);
        console.log("获取的man_id:"+this.payData.man_id );
        console.log("获取的product_amount:"+this.sao_order.product_amount);
        console.log("获取的orderInfo:"+JSON.stringify(this.order));
      },
      /*getBalance(){
        console.log("获取的buyer_id:"+this.wafData.buyer_id);
        this.$store.dispatch('GetBalance', this.wafData).then((result) => {
          if (result.code == 200) {
            this.$message({
              type: 'info',
              message: `Deposit Succeeded`
            });
            console.log("获取余额");
            console.log(JSON.stringify(result));
            this.accountData.balance = result.data.available_money;
            this.accountData.account_name = result.data.account_name;
            console.log("balance:"+ this.accountData.balance)
          } else {
            this.$message({
              type: 'info',
              message: `Deposit Failed`
            })
          }
        })
      },*/
      loadData(){
        this.$store.dispatch('LoadAddressData',parseInt(this.sao_order.sto_id)).then((result) => {
          console.log("---------LoadAddressData----result-------");
          console.log(JSON.stringify(result));
          console.log("---------LoadAddressData----result.data-------");
          console.log(JSON.stringify(result.data));
          this.ruleForm.receiver = result.data[0].family_name+result.data[0].given_name;
          this.ruleForm.province= result.data[0].state_or_province_name,
          this.ruleForm.city = result.data[0].city_name,
          this.ruleForm.detailAddress = result.data[0].address_line1,
          this.ruleForm.quantity = this.sao_order.product_amount,
          this.ruleForm.mobile = result.data[0].contact_phone_no,
          this.ruleForm.ZIPCode = result.data[0].postal_cd
        })
      },
      pay(){
        this.visible = true;
      },
      submitForm(){
        this.$refs.ruleForm.validate(valid => {
          if(valid) {
           // console.log("balance");
            //console.log(this.accountData.balance);
            console.log("运费");
            console.log(this.ruleForm.shipping_method);
            console.log(this.payData.WalletAccount.walletAccountFund.withdrawing_money);
            console.log("-----------PayData-------");
            console.log(JSON.stringify(this.payData))
              this.$store.dispatch('Pay',this.payData).then((result) => {
                // console.log(result.code)
                if (result.code==200){
                  this.$message({
                    type: 'info',
                    message: `Pay Succeeded`
                  })
                  //this.$router.push({path: '/mvo-mycompany'})
                  this.visible = false;
                }else{
                  this.$message({
                    type: 'info',
                    message: `Insufficient Balance`
                  })
                }
              });
            /**
             * 修改订单状态
             */
            this.$store.dispatch('Deliver',this.order).then((result) => {
              if (result.code==200){
                this.$message({
                  type: 'info',
                  message: `pay operation succeeded`
                })
              }else{
                this.$message({
                  type: 'info',
                  message: `pay operation failed`
                })
              }
              this.loadData()
            })
           /* }else{
              this.$message({
                type: 'info',
                message: `Pay Failed`
              })
            }*/

          } else {
            // console.log('the parameter is invalid');
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.$router.push({path: '/mvo-mycompany'})
      }
    }

  }
</script>

<style>
  .info{
    margin-left: 200px;
  }
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
.cascader{
}
</style>

