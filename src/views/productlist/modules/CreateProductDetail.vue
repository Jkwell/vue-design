<template>
  <a-modal
    title="详情"
    :width="748"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <div class="addlist">
    <img src="../../../assets/timg.jpg" width="100%" alt="">
    <div class="title">
      <div class="subtitle">{{account.name}}</div>
      <div class="weight">{{account.specifications}}规格(重/数量+单位)</div>
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
            :value="account.traceabilityBarCode"
            name="traceabilityBarCode"
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
            name="timeToMarket"
            :value="account.timeToMarket"
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
            name="consumptionPeriod"
            :value="account.consumptionPeriod"
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
      <img src="../../../assets/timg.jpg" width="100%" alt="">
    </div>
    <div class="rank-wrap" style="border: none;">
      <div class="productTitle">更多农产品</div>
      <div class="pictures">
        <div class="picture-item">
          <div class="picture" v-for="(item, index) in productImages" :key="index">
            <img :src="item.url" width="100" height="100" alt="">
          </div>
          <div class="text">农产品</div>
        </div>
      </div>
    </div>
    <div class="rank-wrap">
      <div class="productTitle">产品介绍</div>
      <img src="../../../assets/timg.jpg" width="100%" alt="">
      <div class="desc" v-html="account.productDescription">
      </div>
    </div>
  </div>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
const BASE_URL = 'http://47.111.67.221:10000/'
const provinceData = ['Zhejiang', 'Jiangsu']
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
}
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]
export default {
  props: {
    account: {
      type: Object
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }, {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      visible: false,
      confirmLoading: false,
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      confirmDirty: false,
      residences,
      productImages: [],
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    moment,
    onChange(time, timeString){
      console.log(time, timeString);
    },
    check() {
      this.visible = true
      var array = this.account.images.map((item, index) => {
        return {uid: String(item.id), url: BASE_URL + item.originalurl, thumburl: BASE_URL + item.thumburl}
      })
      this.productImages = array
    },
    handleProvinceChange(value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    edit(obj) {
      this.visible = true
      console.log(obj)
    },
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
      }
      this.autoCompleteResult = autoCompleteResult
    }
  }
}
</script>
<style lang="less">
.ant-input-disabled{
  color: #333;
}
.ant-form-item {
  margin-bottom: 0;
}
.addlist {
  margin: 10px auto 20px auto;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ccc;
  width: 698px;
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
      .text{
        margin-top: 10px;
      }
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
