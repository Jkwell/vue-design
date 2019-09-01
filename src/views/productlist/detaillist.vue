<template>
  <div class="addlist">
    <img src="../../assets/bg.png" width="100%" height="200px" alt="">
    <div class="title">
      <div class="subtitle">嘉兴葡萄</div>
      <div class="weight">规格(重/数量+单位)</div>
    </div>
    <div class="rank-wrap">
      <div class="rankTitle">
        <div><span class="auth">认</span><span>官方认证</span></div>
        <div><span class="check">检</span><span>第三方检测</span></div>
        <div><span class="grade">评</span><span>等级评定</span></div>
      </div>
      <div class="adminstor">嘉兴市农产品质量安全监管局</div>
      <div class="productTitle">产品详情</div>
      <a-form :form="form">
        <a-form-item
          label="溯源条码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            value="1346464631313"
            name="code"
            disabled
          />
        </a-form-item>
        <a-form-item
          label="上市时间"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            name="time"
            value="9月-10月"
            disabled
          />
        </a-form-item>
        <a-form-item
          label="食用期限"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            name="eatTime"
            value="30常温/60天冷藏"
            disabled
          />
        </a-form-item>
        <a-form-item
          label="采购渠道"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            name="channel"
            value="天猫"
            disabled
          />
        </a-form-item>
        <a-form-item
          label="实体店"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            name="shop"
            value="实体店1"
            disabled
          />
        </a-form-item>
      </a-form>
    </div>
    <div class="rank-wrap">
      <div class="productTitle">溯源档案</div>
      <div class="pic-list">
        <div class="pic">商家详情</div>
        <div class="pic">农场直播</div>
        <div class="pic">环境设施</div>
        <div class="pic">荣誉资质</div>
      </div>
    </div>
    <div class="rank-wrap">
      <div class="productTitle">产地环境气候</div>
      <div class="weather"><span class="cd">产地</span>嘉兴市</div>
      <img src="../../assets/bg.png" width="100%" height="200px" alt="">
    </div>
    <div class="rank-wrap" style="border: none;">
      <div class="productTitle">更多农产品</div>
      <div class="pictures">
        <div class="picture-item">
          <div class="picture">
            <img src="../../assets/logo.png" width="100" height="100" alt="">
          </div>
          <div class="text">农产品</div>
        </div>
        <div class="picture-item">
          <div class="picture">
            <img src="../../assets/logo.png" width="100" height="100" alt="">
          </div>
          <div class="text">农产品</div>
        </div>
        <div class="picture-item">
          <div class="picture">
            <img src="../../assets/logo.png" width="100" height="100" alt="">
          </div>
          <div class="text">农产品</div>
        </div>
        <div class="picture-item">
          <div class="picture">
            <img src="../../assets/logo.png" width="100" height="100" alt="">
          </div> 
          <div class="text">农产品</div>
        </div>
      </div>
    </div>
    <div class="rank-wrap">
      <div class="productTitle">产品介绍</div>
      <img src="../../assets/bg.png" width="100%" alt="">
      <div class="desc">
        标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
        标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="less">
.ant-input-disabled{
  color: #333;
}
.ant-form-item {
  margin-bottom: 0;
}
.addlist {
  margin: 55px auto;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ccc;
  width: 650px;
}
.title{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  .subtitle{
    font-size: 18px;
    color: #000;
  }
}
.rank-wrap{
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .weather{
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    .cd{
      position: absolute;
      left: 40%;
    }
  }
  .rankTitle{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: 0 20px 20px 20px;
    div{
      line-height: 40px;
      .grade, .check, .auth{
        margin-right: 10px;
        display: inline-block;
        text-align: center;
        width: 40px;
        border-radius: 50%;
        background: red;
        color: #fff;
      }
    }
  }
  .adminstor{
    width: 96%;
    margin: 0 auto;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
  }
  .productTitle{
    text-align: center;
    margin: 20px 0;
  }
  .pic-list{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    .pic{
      width: 80px;
      height: 80px;
      line-height: 80px;
      border-radius: 8px;
      border: 1px solid #ccc;
      text-align: center;
      background: red;
      color: #fff;
    }
  }
  .pictures{
    display: flex;
    display: -webkit-flex;
    padding: 0 20px;
    flex-wrap: wrap;
    // justify-content: center;
    .picture-item{
      margin: 0 25px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .desc{
    width: 96%;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
  }
}
</style>