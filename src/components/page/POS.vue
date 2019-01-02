<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%;">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="单价" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="deleteSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
                数量：{{totalCount}} &nbsp;&nbsp;金额：{{totalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
              <el-button type="success" @click="checkOut()">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="ofen-goods">
          <div class="title">热门商品</div>
          <div class="ofen-goods-lists">
            <ul>
              <li v-for="goods in ofenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">¥{{goods.price}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
                <div>
                <ul class="cookList">
                  <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
                <div>
                <ul class="cookList">
                  <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
                <div>
                <ul class="cookList">
                  <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      tableData: [
       
      ],
      ofenGoods: [],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[],
      totalCount:0,
      totalMoney:0
    };
  },
  methods:{
      addOrderList(goods){
          
          //判断商品是否存在于订单列表中
          let isHave=false;
          for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].goodsId==goods.goodsId){
                  isHave=true;
              }
          }
          
          //根据判断的值新增数量或条目
          if(isHave){ 
              //改变列表商品数量
              let arr=this.tableData.filter(a=>a.goodsId==goods.goodsId);
              arr[0].count++;
          }else{
              let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
              this.tableData.push(newGoods);
          }

         this.getAllMoney();

      },
      delAllGoods(){
        this.tableData=[];
        this.totalCount=0;
        this.totalMoney=0;
      },
//计算汇总金额和数量
      getAllMoney(){
           this.totalCount=0;
          this.totalMoney=0;
          if(this.tableData){
              this.tableData.forEach((element)=>{
              this.totalCount+=element.count;
              this.totalMoney+=(element.count*element.price);
              });
          }
          
      },
      //模拟结账
      checkOut(){
          if(this.totalCount!=0){
              this.tableData=[];
              this.totalCount=0;
              this.totalMoney=0;
              this.$message({
                  message:'结账成功，感谢你又为店多进一单',
                  type:'success'

              });

          }else{
              this.$message.error('不能空结，请检查是否有点单')
          }

      },
      deleteSingleGoods(goods){
          this.tableData=this.tableData.filter(o=>o.goodsId!=goods.goodsId);
          this.getAllMoney();
      }


  },
  name: "pos",
  mounted: function() {
    //等dom加载完后 实现100%高度
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
  created:function(){
      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
      .then(response=>{
        //   console.log(response);
          this.ofenGoods=response.data;
      })
      .catch(error=>{
          
        //   console.log(error);
          alert('网络错误，请稍后重试');
      })

      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
      .then(response=>{
          this.type0Goods=response.data[0];
          this.type1Goods=response.data[1];
          this.type2Goods=response.data[2];
          this.type3Goods=response.data[3];
        //   console.log(response);
      })
      .catch(error=>{
          alert('网络错误，请稍后重试！')
        //   console.log(error);

      })
  }
};
</script>
<style scoped>
.pos-order {
  background-color: #f9fcfa;
  border-right-color: 1px solid #c0ccda;
  padding-left: 5px;
}

.div-btn {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.ofen-goods-lists ul li {
    cursor:pointer;
  list-style: none;
  float: left;
  border: 1px solid #e5edf2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
  padding:10px;
}
.cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
       cursor:pointer;
   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 16px;
       padding-left: 10px;
       color:brown;
   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }

   .totalDiv{
       background: #fff;
       padding:10px;
       border:1px solid #d3dce6;
       
   }
</style>
