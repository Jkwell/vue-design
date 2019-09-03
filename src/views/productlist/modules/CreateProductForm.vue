<template>
  <a-modal
    title="新建农产品"
    :width="860"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    @cancel="handleCancel(false)"
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
            {initialValue: account && account.name ,rules: [{ required: true, message: '请输入产品名称' }]}
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
            {initialValue: account && account.weight ,rules: [{ required: true, message: '请输入重量或数量' }]}
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
            {initialValue: account && account.company,rules: [{ required: true, message: '请输入单位名称' }]}
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
            {initialValue: account && account.code,rules: [{ required: true, message: '请输入溯源条码' }]}
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
          <a-select placeholder="请输入储藏方式" v-decorator="['heart', {initialValue: account && account.heart ? account.heart : '1', rules: [{ required: true, message: '请选择储藏方式' }]}]"  @change="handleChange">
            <a-select-option value="1">冷藏1</a-select-option>
            <a-select-option value="2">冷藏2</a-select-option>
            <a-select-option value="3">冷藏3</a-select-option>
          </a-select>
          </a-col>
          <a-col :span="8">
            <a-input-number v-decorator="['dayTime', {initialValue: account && account.dayTime, rules: [{ required: true, message: '请输入天数' }]}]" :min="1" :max="10" @change="onChange" />天
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
            {initialValue: account && account.eatMethod, rules: [{ required: true, message: '请输入食用方法' }]}
          ]"
            name="eatMethod"
            placeholder="请输入食用方法"
          />
        </a-form-item>
        <!-- <a-form-item
          label="照片"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-upload
            name="upload"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            @preview="handlePreview"
            @change="handleUpload"
            class="upload-list-inline"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="cancelUpload">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        </a-form-item> -->
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
            {initialValue: account && account.description, rules: [{ required: true, message: '请输入产品介绍' }]}
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
          <a-select placeholder="请输入采购渠道" v-decorator="['shopChannel', {initialValue: account && account.shopChannel ? account.shopChannel : '4', rules: [{ required: true, message: '请输入采购渠道' }]}]" @change="handleShop">
            <a-select-option value="4">jk1</a-select-option>
            <a-select-option value="5">jk2</a-select-option>
            <a-select-option value="6">其他</a-select-option>
          </a-select>
          </a-col>
          <a-col :span="8" >
          <a-input
            v-if="showChannel"
            v-decorator="[
            'channel',
            {initialValue: account && account.channel , rules: [{ required: true, message: '人工填写' }]}
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
            {initialValue: account && account.shop, rules: [{ required: true, message: '请输入店铺名称'}]}
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
            {initialValue: account && account.url,rules: [{ required: true, message: '请输入网址' }]}
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
            {initialValue: account && account.check,rules: [{ required: true, message: '请输入检测名称' }]}
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
            {initialValue:account && account.auth,rules: [{ required: true, message: '请输入认证名称' }]}
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
            {initialValue: account && account.grade, rules: [{ required: true, message: '请输入等级评定' }]}
          ]"
            name="grade"
            placeholder="请输入等级评定"
          />
        </a-form-item>
        <a-row><div class="line" style="height:1px;width:100%;background:#ccc;margin:30px 0 15px 0;"></div></a-row>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right;margin-right:25px">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { addOne, modifyProduct} from '@/api/manage'
export default {
  props: {
    account: Object
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
      fileList: [],
      visible: false,
      previewVisible: false,
      previewImage: '',
      confirmLoading: false,
      confirmDirty: false,
      dayTime: '',
      autoCompleteResult: [],
      showChannel: false,
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
    handleChange(value) {
      console.log(value)
    },
    handleShop(value) {
      if (value === '6') {
        this.showChannel = true
      } else {
        this.showChannel = false
      }
    },
    
    handleCancel () {
      this.form.resetFields()
      this.$emit('close')
      this.visible = false
    },
    cancel () {
      this.visible = false
    },
    cancelUpload () {
      this.previewVisible = false
    },
    moment,
    onChange(time, timeString){
      console.log(time, timeString);
    },
    check() {
      this.visible = true
      console.log(obj)
    },
    handlePreview (file) {
      console.log(file)
      this.previewImage = file.response.url || file.response.thumbUrl
      this.previewVisible = true
    },
    handleUpload (file) {
      let fileLists = [];
      console.log(file)
      for (let i = 0; i< file.fileList.length; i++) {
        let item = {...file.fileList[i].response}
        fileLists.push({uid: file.fileList[i].uid, name: file.fileList[i].name, url: item.url, thumbUrl: item.thumbUrl, status: item.status})
      }
      this.fileList = fileLists
      console.log(this.fileList)
    },
    handleSubmit(e) {
      let _this = this
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(this.account)
        if (!err) {
          if (this.account !== null && this.account.action === 'edit') {
                 const upValues = {...values, id: '100'}
                 modifyProduct(upValues).then((res) => {
                   _this.$message.success('修改成功');   
                   this.form.resetFields()
                   this.$emit('close') 
                   this.visible = false
                    this.$emit('refresh')
                 })
               } else {
           addOne(values).then((res) => {
             console.log('zhengai')
             if (res.success === true) {
               console.log('xxxxx')
               _this.$message.success('添加成功'); 
               this.form.resetFields()
               this.$emit('close')  
               this.visible = false
               this.$emit('refresh')
             }
           })
        }
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
    edit() {
      this.visible = true
      console.log()
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
    width: 100px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>
