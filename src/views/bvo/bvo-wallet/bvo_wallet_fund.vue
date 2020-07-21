<template>
<div class="card">
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
<!--        <div class="icon">-->
<!--          <i class="el-icon-bank-card" style="size:100px"></i>-->
<!--        </div>-->
      <div class="title">
        <span>My Balance</span>
            <div class="footer">current balance:<span>{{"￥"+this.accountData.balance}}</span> </div>
        <div class="item">{{'Hello! '+this.accountData.account_name}}</div>
      </div>
      <div>
        <el-button style="float: right; margin-right: 30px" type="success" size="mini" round plain @click="depositBtn">Deposit</el-button>
        <el-button style="float: right;" type="primary" size="mini" round plain @click="changePasswordBtn">Change Password</el-button>
      </div>
    </div>
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <div class="view">
              View Transaction Record
            </div>
          </template>
          <div>
            <el-table
              ref="multipleTable"
              v-loading="listLoading"
              :data="transactionRecords"
              fit
              highlight-current-row
              width="80%"
            >
              <el-table-column align="center" label="Transaction Number">
                <template slot-scope="scope">
                  {{scope.row.transaction_id}}
                </template>
              </el-table-column>
              <el-table-column  align="center" label="Available Money">
                <template slot-scope="scope">
                  {{scope.row.walletTransactionAudit.available_money_after}}
                </template>
              </el-table-column>
              <el-table-column  align="center" label="Operate Money">
                <template slot-scope="scope">
                  {{scope.row.transaction_money}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="Create Time"  >
                <template slot-scope="scope">
                  {{scope.row.create_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}
                </template>
              </el-table-column>
              <el-table-column label="State"  align="center">
                <template slot-scope="scope">
                  {{scope.row.status}}
                </template>
              </el-table-column>

            </el-table>
<!--            <el-pagination @size-change="handleSizeChange"-->
<!--                           @current-change="handleCurrentChange"-->
<!--                           :current-page="currentPage"-->
<!--                           :page-sizes="pageSizes"-->
<!--                           :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"-->
<!--                           :total="total">-->
<!--            </el-pagination>-->

          </div>
        </el-collapse-item>
      </el-collapse>

    </div>

  </el-card>



  <!--修改密码弹窗-->
  <el-dialog title='Change Password' :visible.sync = 'visible_changePassword' width = '40%'   :close-on-lick-modal = 'false'>
    <el-form :model='changePasswordData'  ref='changePasswordData' :rules="ruleValidate" label-width='0px' class=''>

      <el-form-item label="Old Password" label-width="180px" prop="password">
        <el-col :span="12">
          <el-input type="text" v-model="changePasswordData.password" autocomplete="off" placeholder="Product Name">
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Email" label-width="180px"  prop='email'>
        <el-col :span="12">
          <el-input type="text" v-model="changePasswordData.email" autocomplete="off" placeholder="Email">
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="New Password" label-width="180px"  prop='newpassword'>
        <el-col :span="12">
          <el-input type="text" v-model="changePasswordData.newpassword" autocomplete="off" placeholder="Product Name">
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Enter Password Again" label-width="180px"  prop='passwordAgain'>
        <el-col :span="12">
          <el-input type="text" v-model="changePasswordData.passwordAgain" autocomplete="off" placeholder="Product Name">
          </el-input>
        </el-col>
      </el-form-item>

    </el-form>
    <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="changePassword">Confirm</el-button>
        <el-button type = 'danger' size='small' @click.native = "visible_changePassword = false, changePasswordData = {
                account_name:'',
                password:'',
                passwordAgain:'',
                newpassword:'',
                email:''
                     }">Cancel</el-button>
       </span>
  </el-dialog>

  <!--充值弹窗-->
  <el-dialog title='Change Password' :visible.sync = 'visible_deposit' width = '40%'  :close-on-lick-modal = 'false'>
    <el-form :model='depositData'  ref='depositData' label-width='0px' class=''>

      <el-form-item label="Deposit Amount:$" label-width="180px" prop="sid">
        <el-col :span="12">
          <el-input type="text" v-model="depositData.walletAccountFund.depositing_money" autocomplete="off" placeholder="Product Name">
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Password:" label-width="180px"  prop='sid'>
        <el-col :span="12">
          <el-input type="text" v-model="depositData.password" autocomplete="off" placeholder="Product Name">
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="deposit">Confirm</el-button>
        <el-button type = 'danger' size='small' @click.native = "visible_deposit = false, depositForm = {
                    depositAmount:'',
                    password:''
                     }">Cancel</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
    export default {
        name: "bvo_wallet_fund",

      data(){
        const pwdAgainCheck = async(rule, value, callback) => {
          if(this.changePasswordData.newpassword != this.changePasswordData.passwordAgain){
            this.changeAgainFlag = 2;
            return callback(new Error('Password do not match with your first input!'));
          }else{
            this.changeAgainFlag = 1;
            callback();
          }
        };
        return{
          visible_changePassword:false,
          visible_deposit:false,
          changePasswordData: {
              buyer_id:'',
              account_name:'',
              email:'',
              password:'',
              passwordAgain:'',
              newpassword:'',
              walletAccountFund:{
                buyer_id:'',
                available_money:''
            }
          },
          depositData:{
            buyer_id:'',
            account_name:'',
            password:'',
            walletAccountFund:{
              buyer_id:'',
              available_money:'',
              depositing_money:'',
              withdrawing_money:0,
              currency:'RMB'
            }
          },
          wafData:{
            buyer_id:''
          },
          accountData:{
            balance:'',
            account_name:''
          },
          /*depositForm:{
            password:'',
            depositAmount:'',
          },*/
          transactionRecords:[],
          changeFlag: 0,
          changeAgainFlag: 0,

          // 默认显示第几页
          currentPage:1,
          // 总条数，根据接口获取数据长度(注意：这里不能为空)
          total:1,
          // 个数选择器（可修改）
          pageSizes:[1,2,3,4],
          // 默认每页显示的条数（可修改）
          PageSize:1,

          //validation
          ruleValidate: {
            password:[
              {required: true, trigger: 'blur' }
            ],
            email:[
              {required: true, trigger: 'blur' }
            ],
            newpassword: [
              { required: true, trigger: 'blur' }
            ],
            passwordAgain: [
              { required: true, validator: pwdAgainCheck, trigger: 'blur' }
            ],
          },
        }
      },
      created:function(){
        this.getParams();
      },
      watch:{
        '$route': 'getParams'
      },
      mounted(){
        this.getBalance();
        this.loadTransactionRecords();
      },
      methods:{
        getParams(){
          var routerParams = this.$route.query.buyer_id;
          this.wafData.buyer_id = routerParams;
          this.accountData.account_name = this.$route.query.account_name;
          this.changePasswordData.account_name = this.$route.query.account_name;
          this.changePasswordData.buyer_id = this.$route.query.buyer_id;
          this.changePasswordData.walletAccountFund.buyer_id = routerParams;
          this.depositData.account_name = this.$route.query.account_name;
          this.depositData.buyer_id = this.$route.query.buyer_id;
          this.depositData.walletAccountFund.buyer_id = this.$route.query.buyer_id;
          console.log("this.wafData.buyer_id:"+this.wafData.buyer_id);
        },
        changePasswordBtn(){
          this.visible_changePassword = true;
        },
        depositBtn(){
          this.visible_deposit = true;
        },
        getBalance(){
          console.log("获取的buyer_id:"+this.wafData.buyer_id);
          this.$store.dispatch('GetBalance', this.wafData).then((result) => {
            if (result.code == 200) {
              /*this.$message({
                type: 'info',
                message: ` Succeeded`
              });*/
              console.log("获取余额");
              console.log(JSON.stringify(result));
              this.accountData.balance = result.data.available_money;
              this.changePasswordData.walletAccountFund.available_money = result.data.available_money;
              this.depositData.walletAccountFund.available_money = result.data.available_money;
              console.log("balance:"+ this.accountData.balance)
            } else {
              this.$message({
                type: 'info',
                message: `Load Failed`
              })
            }
          })
        },
        loadTransactionRecords(){
          this.$store.dispatch('LoadTransactionRecords', this.wafData).then((result) => {
            if (result.code == 200) {
              /*this.$message({
                type: 'info',
                message: ` Succeeded`
              });*/
              console.log("---------LoadTransactionRecords----result-------");
              console.log(JSON.stringify(result));
              console.log("---------LoadTransactionRecords----result.data-------");
              console.log(JSON.stringify(result.data));
              this.transactionRecords = result.data;
            } else {
              this.$message({
                type: 'info',
                message: `Load Failed`
              })
            }
          })
        },
        deposit() {
          this.depositData.walletAccountFund.depositing_money = parseFloat(this.depositData.walletAccountFund.depositing_money);
          this.$store.dispatch('Deposit', this.depositData).then((result) => {
            if (result.code == 200) {
              this.$message({
                type: 'info',
                message: `Deposit Succeeded`
              });
              this.visible_deposit = false;
              this.getBalance();
            } else {
              this.$message({
                type: 'info',
                message: `Deposit Failed`
              })
            }
          })
        },
        changePassword() {
          this.$store.dispatch('ChangePassword', this.changePasswordData).then((result) => {
            if (result.code == 200) {
              this.$message({
                type: 'info',
                message: `Change password Succeeded`
              });
              this.visible_changePassword = false;
              this.$router.push({
                name: 'bvo_wallet_login',
              })
            } else {
              this.$message({
                type: 'info',
                message: `Change password Failed`
              })
            }
          })
        },
      }
    }
</script>

<style>
  .balance{
    float: right;
    margin-top: 25px;
    margin-right: 30px;
  }
  .icon{
    font-size: 60px;
  }
  .card{
    margin-top: 50px;
    margin-left: 80px;
  }

  .item {
    font-size: 18px;
    margin-bottom: 18px;
    margin-top: 25px;
    margin-left: 25px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
    background-color: #000000;
  }
  .title{
    /*font-family: "Helvetica Neue";*/
    font-size: 28px;
    color:#DEB887;
    font-weight: bold;
  }
  .footer{
    float: right;
    font-size: 18px;
    margin-right: 20px;
    margin-top: 25px;
  }
  .footer span{
    font-size: 28px;
    margin-right: 20px;
  }
  .view{
    color: #DEB887;
    font-size: 14px;
    margin-left: 25px;
  }
  .el-collapse-item__header{
    background-color: #000000;
  }
</style>
