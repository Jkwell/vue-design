<template>
  <a-modal
    title="新建农场"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
       <a-form :form="form">
      <a-tabs defaultActiveKey="2">
          <a-tab-pane key="2">
           
            <span slot="tab">农场信息</span>
            
              <a-form-item
                v-bind="formItemLayout"
                label="农场名称"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                has-feedback
              >
                <a-input
                  v-decorator="[
                    'name',{
                      initialValue: account && account.name
                    }
                  ]"
                    name="name"
                    placeholder="请输入农场名称"
                  />
                  
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="农产品类别"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                has-feedback
              >
                <a-select
                  v-decorator="[
                    'apCategory',
                    {initialValue: account && account.apCategory,rules: [{ required: true, message: '请输入农产品类别' }]}
                  ]"
                  placeholder="请输入农产品类别"
                >
                  <a-select-option value="水果">
                    水果
                  </a-select-option>
                  <a-select-option value="蔬菜">
                    蔬菜
                  </a-select-option>
                  <a-select-option value="水产">
                    水产
                  </a-select-option>
                  <a-select-option value="禽类">
                    禽类
                  </a-select-option>
                  <a-select-option value="特种养殖">
                    特种养殖
                  </a-select-option>
                  <a-select-option value="五谷杂粮">
                    五谷杂粮
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="环境设施"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                  action=""
                  listType="picture-card"
                  :defaultFileList="environmentalFacilities"
                  class="upload-list-inline"
                  :fileList='environmentalFacilities'
                  @preview="handlePreview"
                  @change="uploadImage($event, 'enviroment')"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                label="荣誉证书"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                action=""
                  listType="picture-card"
                  :defaultFileList="certificateHonors"
                  class="upload-list-inline"
                  :fileList='certificateHonors'
                  @preview="handlePreview"
                  @change="uploadImage($event, 'honor')"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                label="单位执照"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                 action=""
                  listType="picture-card"
                  :defaultFileList="unitlicense"
                  class="upload-list-inline"
                  :fileList='unitlicense'
                  @preview="handlePreview"
                  @change="uploadImage($event, 'unit')"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="营业时间"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                has-feedback
              >
                <a-row :gutter="8">
                  <a-col :span="11">
                  <a-select :defaultValue="startWeek" :value="startWeek"  @change="handleStartWeek">
                    <a-select-option :value="index" v-for="(item,index) in week" :key="index">{{week[index]}}</a-select-option>
                    <!-- <a-select-option value="2">星期二</a-select-option>
                    <a-select-option value="3">星期三</a-select-option>
                    <a-select-option value="4">星期四</a-select-option>
                    <a-select-option value="5">星期五</a-select-option>
                    <a-select-option value="6">星期六</a-select-option>
                    <a-select-option value="7">星期日</a-select-option> -->
                  </a-select>
                  </a-col>
                  <a-col :span="2">---</a-col>
                  <a-col :span="11">
                   <a-select :defaultValue="endWeek" :value="endWeek"  @change="handleEndWeek">
                    <a-select-option :value="index" v-for="(item,index) in week" :key="index">{{week[index]}}</a-select-option>
                    <!-- <a-select-option value="2">星期二</a-select-option>
                    <a-select-option value="3">星期三</a-select-option>
                    <a-select-option value="4">星期四</a-select-option>
                    <a-select-option value="5">星期五</a-select-option>
                    <a-select-option value="6">星期六</a-select-option>
                    <a-select-option value="7">星期日</a-select-option> -->
                  </a-select>
                  </a-col>
                  </a-row>
                   <a-row :gutter="8">
                  <a-col :span="11">
                  <!-- <a-time-picker :defaultValue="moment('12:08', 'HH:mm')" format="HH:mm" /> -->
                  <a-time-picker @change="handleStartTime" :value="moment(startTime, 'HH:mm')" :defaultValue="moment('00:00', 'HH:mm')" format="HH:mm" />
                  </a-col>
                  <a-col :span="2">---</a-col>
                  <a-col :span="11">
                   <a-time-picker @change="handleEndTime" :value="moment(endTime, 'HH:mm')" :defaultValue="moment('23:59', 'HH:mm')" format="HH:mm" />
                  </a-col>
                  </a-row>
              </a-form-item>
              <a-form-item
                label="特色服务"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                :required="false"
              >
                <a-row type="flex" v-if="showSpecail">
                  <a-col style="position: relative;" v-for="(item, index) in characteristicService" :key="index"><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">{{item.name}}</a><a-popconfirm title="确定要删除这一项吗?" @confirm="confirmService(index)" @cancel="cancelService" okText="Yes" cancelText="No"><a-icon type="close-circle" style="color: red; position: absolute; right: 0; cursor: pointer" /></a-popconfirm></a-col>
                </a-row>
                <a-row type="flex">
                    <a-col><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">自定义</a></a-col>
                  <a-col> <a-input
                  v-decorator="[
                    'service',
                  ]"
                    name="service"
                    placeholder="请自定义特色服务"
                  />
                  
                  </a-col>
                  <a-col :offset="1"><a-button @click="addService" type="primary" size="small">添加</a-button></a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="场地设施"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                :required="false"
              >
                <a-row type="flex" v-if="showPlace">
                  <a-col style="position: relative;" v-for="(item, index) in siteFacilities" :key="index"><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">{{item.name}}</a><a-popconfirm title="确定要删除这一项吗?" @confirm="confirmPlace(index)" @cancel="cancelPlace" okText="Yes" cancelText="No"><a-icon type="close-circle" style="color: red; position: absolute; right: 0; cursor: pointer" /></a-popconfirm></a-col>
                </a-row>
                <a-row type="flex">
                    <a-col><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">自定义</a></a-col>
                  <a-col> <a-input
                  v-decorator="[
                    'place',
                  ]"
                    name="place"
                    placeholder="请自定义类别"
                  />
                  
                  </a-col>
                  <a-col :offset="1"><a-button @click="addPlace" type="primary" size="small">添加</a-button></a-col>
                </a-row>
              </a-form-item>
              <a-form-item>
                <a-row type="flex" justify="end"><a-button type="primary" @click="save">保存</a-button></a-row>
                
              </a-form-item>
           
          </a-tab-pane>
        </a-tabs>
         </a-form>
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
      visible: false,
      confirmLoading: false,
      previewVisible: false,
      previewImage: '',
      selected: [],
      confirmDirty: false,
      week: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      residences,
      unitlicense: [],
      certificateHonors: [],
      environmentalFacilities: [],
      characteristicService: [],
      siteFacilities: [],
      startWeek: '星期一',
      startNum: 0,
      endWeek: '星期日',
      endNum: 6,
      startTime: '00:00',
      endTime: '23:59',
      autoCompleteResult: [],
      showPlace: false,
      showSpecail: false,
      placeItems: [],
      placeValues: [],
      specialServices: [],
      disabled: false,
      specailValues: [],
      vertifyCode: '发送验证码',
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
    onSearch(value) {
        console.log(value)
        if (value === undefined || value === '') {
          this.$warning({
          title: '提示',
          content: '请输入邮箱地址!',
        });
        return false
        }
        let flag = true
        if (flag) {
          let time = 60;
          let timer = setInterval(() => {
          if(time == 0) {
            flag = true
            clearInterval(timer);
            this.disabled = false;
            this.vertifyCode = "获取验证码";
          } else {
            flag = false
            this.vertifyCode =time + '秒后重试';
            this.disabled = true;
            time--
          }
      },1000)
        }
        
    },
    enter(e) {
      console.log(e)
    },
    addPlace() {
      let _this = this
      let value = this.form.getFieldValue('place')
      console.log(value)
      if (this.placeValues.indexOf(value) > -1) {
          this.$warning({
          title: '提示',
          content: '内容不能相同!',
        });
        return false
      }
      if (value === '' || value === undefined) {
        this.$warning({
          title: '提示',
          content: '内容不能为空!',
        });
      } else {
        this.placeValues.push(value)
        console.log({name: value, id: 0, farmInforId: null})
        this.siteFacilities.push({name: value, id: 0, farmInforId: null})
        this.showPlace = true
        this.form.resetFields(['place'])
      }
    },
    uploadImage(e, type) {
      if (type === 'enviroment') {
        this.environmentalFacilities = e.fileList
      } else if (type === 'honor') {
        this.certificateHonors = e.fileList
      } else if (type === 'unit') {
        this.unitlicense = e.fileList
      }
    },
    del(index) {
      console.log(index)
    },
    addService() {
      let _this = this
      let value = this.form.getFieldValue('service')
      if (this.specailValues.indexOf(value) > -1) {
          this.$warning({
          title: '提示',
          content: '内容不能相同!',
        });
        return false
      }
      if (value === '' || value === undefined) {
        this.$warning({
          title: '提示',
          content: '内容不能为空!',
        });
      } else {
        this.specailValues.push(value)
        this.characteristicService.push({name: value, id: 0, farmInforId: null})
        this.showSpecail = true
        this.form.resetFields(['service'])
      }
    },
    cityChange(e) {
      console.log(e)
    },
    delImage(array) {
      let newArray = []
      array.forEach((item, index) => {
        newArray.push({type: 'image', fileName: index + '.png', base64String: item.thumbUrl}) 
        return newArray
      })
      return newArray
    },
    save () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          let params = {
            unitlicense: this.delImage(this.unitlicense),
            certificateHonors: this.delImage(this.certificateHonors),
            environmentalFacilities: this.delImage(this.environmentalFacilities),
            characteristicService: this.characteristicService,
            siteFacilities: this.siteFacilities,
            openingHours: [{
						name: '营业时间',
						id: 0,
						weekRange: this.startWeek+'到'+this.endWeek,
						timeRange: this.startTime+'至'+this.endTime,
						farmInforId: null
					}],
					id: null
          }
          this.form.resetFields()
          this.resetValues()
          let formData = Object.assign({}, values, params)
          console.log(formData)
          this.$emit('farmAdd', formData)
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
    handleChange() {
      console.log('11')
    },
    handleCancel () {
      this.visible = false
    },
    resetValues() {
      this.unitlicense = []
      this.certificateHonors = []
      this.environmentalFacilities = []
      this.characteristicService = []
      this.siteFacilities = []
      this.startWeek = '星期一'
      this.endWeek = '星期日'
      this.startTime = '00:00'
      this.endTime = '23:59'
    },
    handlePreviewCancel() {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    moment,
    handleStartTime(time, timeString){
      this.startTime = timeString
      console.log(time, timeString);
    },
    handleEndTime(time, timeString){
      this.endTime = timeString
      console.log(time, timeString);
    },
    handleStartWeek(value, option) {
      // console.log(value)
      this.startNum = value
       if (this.startNum > this.endNum) {
        this.$message.warning('开始日期不能大于开始日期')
        return
      } else {
        this.startWeek = this.week[value]
      }
      console.log(this.startWeek);
    },
    handleEndWeek(value, option) {
      this.endNum = value
      if (this.startNum > this.endNum) {
        this.$message.warning('结束日期不能小于开始日期')
        return
      } else {
        this.endWeek = this.week[value]
      }
      
      console.log(this.endWeek);
      console.log(value, option)
    },
    check() {
      this.visible = true
      console.log(this.account)
    },
    handleProvinceChange(value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
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
    delImage(array) {
      var newArray = []
      newArray = array.map((item, index) => {
        return {uid: String(item.id), url: BASE_URL + item.originalurl, thumburl: BASE_URL + item.thumburl}
      })
      return newArray
    },
    edit(obj) {
      this.visible = true
      // var array = this.account.environmentalFacilities.map((item, index) => {
      //   return {uid: String(item.id), url: BASE_URL + item.originalurl, thumburl: BASE_URL + item.thumburl}
      // })
      this.environmentalFacilities = this.delImage(this.account.environmentalFacilities)
      this.unitlicense = this.delImage(this.account.unitlicense)
      this.certificateHonors = this.delImage(this.account.certificateHonors)
      this.startWeek = this.account.openingHours[0].weekRange.substring(0, 3)
      var timeStr = this.account.openingHours[0].timeRange
      this.endWeek = this.account.openingHours[0].weekRange.substring(4, 7)
      var timeArray = timeStr.split('至')
      this.startTime = timeArray[0]
      this.endTime = timeArray[1]
      if (this.account.characteristicService.length > 0) {
        this.characteristicService = this.account.characteristicService
        this.showSpecail = true
      }
      if (this.account.characteristicService.length > 0) {
        this.siteFacilities = this.account.siteFacilities
        this.showPlace = true
      }
    },
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
      }
      this.autoCompleteResult = autoCompleteResult
    },
    confirmService (index) {
      this.characteristicService.splice(index, 1)
      this.specailValues.splice(index, 1)
      this.$message.success('删除成功')
    },
    cancelService (e) {
      this.$message.error('你取消了')
    },
    confirmPlace (index) {
      this.siteFacilities.splice(index, 1)
      this.placeValues.splice(index, 1)
      this.$message.success('删除成功')
    },
    cancelPlace (e) {
      this.$message.error('你取消了')
    },
  }
}
</script>
<style>
.ant-time-picker{
  width: 100%;
}
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 120px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .area-select-wrap .area-select{
    margin-left: 0px !important;
  }
  .area-select.medium{
    width: 155px;
  }
  .area-select{
    line-height: 32px;
  }
  .area-select .area-selected-trigger{
    padding: 0 20px 0 12px;
  }
</style>