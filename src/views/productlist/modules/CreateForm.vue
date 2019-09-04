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
      <a-form @submit="handleSubmit" :form="form">
      <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">基本信息</span>
       
              <a-form-item v-bind="formItemLayout" label="单位名称">
                <a-input
                  v-decorator="[
                    'name',
                    {
                    rules: [{
                    required: true, message: '请输入单位名称',
                    }],
                        }
                  ]"
                />
              </a-form-item>
              <!-- <a-form-item v-bind="formItemLayout" label="单位地址">
                <area-select v-model="selected2" :data="$pcaa" :level="3"></area-select>
              </a-form-item> -->
              <a-form-item v-bind="formItemLayout" label="联系人">
                <a-input
                  v-decorator="[
                    'concat',
                    {
                        rules: [{
                        required: true, message: '请输入联系人',
                        }],
                    }
                    ]"
                  type="text"
                  @blur="handleConfirmBlur"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="联系电话">
                <a-input
                  v-decorator="[
          'phoneNumber',
          {
            rules: [{
              required: true, message: '请输入联系电话',
            }],
          }
        ]"
                  type="number"
                  @blur="handleConfirmBlur"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="邮箱地址">
                <a-input-search placeholder="请输入邮箱地址">
                  <a-button slot="enterButton">发送验证码</a-button>
                </a-input-search>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="输入验证码">
                <a-input
                  v-decorator="[
                    'code',
                    {
                        rules: [{
                        required: true, message: '输入验证码',
                        }],
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="生产面积">
                <a-input
                  v-decorator="[
                    'productArea',
                    {
                        rules: [{
                        required: true, message: '输入验证码',
                        }],
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="单位介绍">
                <a-textarea rows="4" v-decorator="[
            'description',
          ]" />
              </a-form-item>
              <!-- <a-form-item v-bind="tailFormItemLayout">
                <a-row type="flex" justify="end"><a-button type="primary" html-type="submit">保存</a-button></a-row>
              </a-form-item>
            </a-form> -->
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">农场信息</span>
            
              <a-form-item
                v-bind="formItemLayout"
                label="行业"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                has-feedback
              >
                <a-select
                  v-decorator="[
                    'select',
                    {rules: [{ required: true, message: '请输入行业名称' }]}
                  ]"
                  placeholder="请输入行业名称"
                >
                  <a-select-option value="china">
                    水果
                  </a-select-option>
                  <a-select-option value="usa">
                    电子
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="农产品类别"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                :required="true"
              >
                <a-input
                  v-decorator="[
                  'check',
                  {rules: [{ required: true, message: '请输入农产品类别' }]}
                ]"
                  name="check"
                  placeholder="请输入农产品类别"
                />
              </a-form-item>
              <a-form-item
                label="环境设施"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :defaultFileList="fileList"
                  class="upload-list-inline"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item
                label="荣誉证书"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :defaultFileList="fileList"
                  class="upload-list-inline"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item
                label="单位执照"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :defaultFileList="fileList"
                  class="upload-list-inline"
                >
                  <a-button>
                    <a-icon type="upload" /> upload
                  </a-button>
                </a-upload>
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
                  <a-select defaultValue="1"  @change="handleChange">
                    <a-select-option value="1">星期一</a-select-option>
                    <a-select-option value="2">星期二</a-select-option>
                    <a-select-option value="3">星期三</a-select-option>
                  </a-select>
                  </a-col>
                  <a-col :span="2">---</a-col>
                  <a-col :span="11">
                   <a-select defaultValue="1"  @change="handleChange">
                    <a-select-option value="1">星期一</a-select-option>
                    <a-select-option value="2">星期二</a-select-option>
                    <a-select-option value="3">星期三</a-select-option>
                  </a-select>
                  </a-col>
                  </a-row>
                   <a-row :gutter="8">
                  <a-col :span="11">
                  <a-time-picker @change="onChange" :defaultOpenValue="moment('00:00', 'HH:mm')" />
                  </a-col>
                  <a-col :span="2">---</a-col>
                  <a-col :span="11">
                   <a-time-picker @change="onChange" :defaultOpenValue="moment('00:00', 'HH:mm')" />
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
                  <a-col style="position: relative;" v-for="(item, index) in specialServices" :key="index"><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">{{item.name}}</a><a-popconfirm title="确定要删除这一项吗?" @confirm="confirmService(index)" @cancel="cancelService" okText="Yes" cancelText="No"><a-icon type="close-circle" style="color: red; position: absolute; right: 0; cursor: pointer" /></a-popconfirm></a-col>
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
                  <a-col style="position: relative;" v-for="(item, index) in placeItems" :key="index"><a style="margin-right: 6px;backgournd:#fff;border:1px solid #d9d9d9;color:rgba(0, 0, 0, 0.65);border-radius: 4px; padding: 6px 15px; line-height: 32px;">{{item.name}}</a><a-popconfirm title="确定要删除这一项吗?" @confirm="confirmPlace(index)" @cancel="cancelPlace" okText="Yes" cancelText="No"><a-icon type="close-circle" style="color: red; position: absolute; right: 0; cursor: pointer" /></a-popconfirm></a-col>
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
                <a-row type="flex" justify="end"><a-button type="primary" html-type="submit">保存</a-button></a-row>
                
              </a-form-item>
            
          </a-tab-pane>
        </a-tabs>
        </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
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
      autoCompleteResult: [],
      showPlace: false,
      showSpecail: false,
      placeItems: [],
      placeValues: [],
      specialServices: [],
      specailValues: [],
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
    enter(e) {
      console.log(e)
    },
    addPlace() {
      let _this = this
      let value = this.form.getFieldValue('place')
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
        this.placeItems.push({name: value})
        this.showPlace = true
        this.form.resetFields(['place'])
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
        this.specialServices.push({name: value})
        this.showSpecail = true
        this.form.resetFields(['service'])
      }
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
    handleChange() {
      console.log('11')
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
      console.log(obj)
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
    },
    confirmService (index) {
      this.specialServices.splice(index, 1)
      this.$message.success('删除成功')
    },
    cancelService (e) {
      this.$message.error('你取消了')
    },
    confirmPlace (index) {
      this.placeItems.splice(index, 1)
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
