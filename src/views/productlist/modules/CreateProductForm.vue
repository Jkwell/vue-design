<template>
  <a-modal
    title="新建农产品"
    :width="860"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="产品名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入产品名称' }]}
          ]"
            name="name"
            placeholder="请输入产品名称"
          />
        </a-form-item>
        <a-form-item
          label="重(数)量"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'weight',
            {rules: [{ required: true, message: '请输入重量或数量' }]}
          ]"
            name="weight"
            placeholder="请输入重量或数量"
          />
        </a-form-item>
        <a-form-item
          label="单位"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'company',
            {rules: [{ required: true, message: '请输入单位名称' }]}
          ]"
            name="company"
            placeholder="请输入单位名称"
          />
        </a-form-item>
        <a-form-item
          label="溯源条码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'code',
            {rules: [{ required: true, message: '请输入溯源条码' }]}
          ]"
            name="code"
            placeholder="请输入溯源条码"
          />
        </a-form-item>
        <a-form-item
          label="上市日期"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-date-picker
            name="startTime"
            style="width: 100%"
            placeholder="请选择开始日期"
            v-decorator="[
            'startTime',
            {rules: [{ required: true, message: '请选择开始日期' }]}
          ]"
          />
          <text>——</text>
          <a-date-picker
            name="endTime"
            style="width: 100%"
            placeholder="请选择截止日期"
            v-decorator="[
            'endTime',
            {rules: [{ required: true, message: '请选择截止日期' }]}
          ]"
          />
        </a-form-item>
        <a-form-item
          label="食用期限"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
        <a-row :gutter="8">
          <a-col :span="16">
          <a-select defaultValue="1"  @change="handleChange">
            <a-select-option value="1">冷藏1</a-select-option>
            <a-select-option value="2">冷藏2</a-select-option>
            <a-select-option value="3">冷藏3</a-select-option>
          </a-select>
          </a-col>
          <a-col :span="8">
            <a-input-number :min="1" :max="10" v-model="dayTime" @change="onChange" />
          </a-col>
          </a-row>
        </a-form-item>
        <a-form-item
          label="食用方法"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'eatMethod',
            {rules: [{ required: true, message: '请输入食用方法' }]}
          ]"
            name="eatMethod"
            placeholder="请输入食用方法"
          />
        </a-form-item>
        <a-form-item
          label="照片"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text"></div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="产品介绍"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-textarea
          rows="4"
          placeholder="请输入产品介绍"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入产品介绍' }]}
          ]" />
        </a-form-item>
        
        <a-form-item
          label="采购渠道"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
        <a-row :gutter="8">
          <a-col :span="16">
          <a-select defaultValue="4" @change="handleChange">
            <a-select-option value="4">jk1</a-select-option>
            <a-select-option value="5">jk2</a-select-option>
            <a-select-option value="6">其他</a-select-option>
          </a-select>
          </a-col>
          <a-col :span="8">
          <a-input
            v-decorator="[
            'channel',
            {rules: [{ required: true, message: '人工填写' }]}
          ]"
            name="channel"
            placeholder="人工填写"
          />
          </a-col>
          </a-row>
          </a-form-item>
          <a-form-item
          label="实体店"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'shop',
            {rules: [{ required: true, message: '请输入店铺名称'}]}
          ]"
            name="shop"
            placeholder="请输入店铺名称"
          />
        </a-form-item>
        <a-form-item
          label="电商网址"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'url',
            {rules: [{ required: true, message: '请输入网址' }]}
          ]"
            name="url"
            placeholder="请输入网址"
          />
        </a-form-item>
        <a-form-item
          label="第三方检测"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'check',
            {rules: [{ required: true, message: '请输入检测名称' }]}
          ]"
            name="check"
            placeholder="请输入检测名称"
          />
        </a-form-item>
        <a-form-item
          label="官方认证"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'auth',
            {rules: [{ required: true, message: '请输入认证名称' }]}
          ]"
            name="auth"
            placeholder="请输入认证名称"
          />
        </a-form-item>
        <a-form-item
          label="等级评定"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input
            v-decorator="[
            'grade',
            {rules: [{ required: true, message: '请输入等级评定' }]}
          ]"
            name="grade"
            placeholder="请输入等级评定"
          />
        </a-form-item>
        <a-row><div class="line" style="height:1px;width:100%;background:#ccc;margin:30px 0 15px 0;"></div></a-row>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right;margin-right:25px">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </a-form-item>
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
    }
  }
}
</script>
<style scoped>
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
</style>
