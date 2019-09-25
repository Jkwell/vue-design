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
      <a-form :form="form">
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
          label="农产品类别"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
        <a-select placeholder="请输入农产品类别" v-decorator="['apCategory', {initialValue: account && account.apCategory ? account.apCategory : '水果', rules: [{ required: true, message: '请输入采购渠道' }]}]" @change="handleShop">
            <a-select-option value="水果">水果</a-select-option>
            <a-select-option value="蔬菜">蔬菜</a-select-option>
            <a-select-option value="五谷杂粮">五谷杂粮</a-select-option>
          </a-select>
               </a-form-item>
        <a-form-item
          label="重(数)量"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'specifications',
            {initialValue: account && account.specifications,rules: [{ required: true, message: '请输入重量或数量' }]}
          ]"
            name="specifications"
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
            'unit',
            {initialValue: account && account.unit,rules: [{ required: true, message: '请输入单位名称' }]}
          ]"
            name="unit"
            placeholder="请输入单位名称"
          />
        </a-form-item>
        <a-form-item
          label="地块Id"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-input
            v-decorator="[
            'blockId',
            {initialValue: account && account.blockId ,rules: [{ required: true, message: '请输入地块Id' }]}
          ]"
            name="blockId"
            placeholder="请输入地块Id"
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
            'traceabilityBarCode',
            {initialValue: account && account.traceabilityBarCode,rules: [{ required: true, message: '请输入溯源条码' }]}
          ]"
            name="traceabilityBarCode"
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
            name="startDate"
            style="width: 100%"
            placeholder="请选择开始日期"
            v-decorator="[
            'startDate',
            {initialValue: startDate ? moment(startDate) : '' , rules: [{ required: true, message: '请选择开始日期' }]}
          ]"
          />
          <text>——</text>
          <a-date-picker
            name="endDate"
            style="width: 100%"
            placeholder="请选择截止日期"
            v-decorator="[
            'endDate',
            {initialValue: endDate ? moment(endDate) : '', rules: [{ required: true, message: '请选择截止日期' }]}
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
          <a-select placeholder="请输入储藏方式" v-decorator="['consumption', {initialValue: consumption ? consumption : '冷藏' , rules: [{ required: true, message: '请选择储藏方式' }]}]"  @change="handleChange">
            <a-select-option value="冷藏">冷藏</a-select-option>
            <a-select-option value="常温">常温</a-select-option>
          </a-select>
          </a-col>
          <a-col :span="8">
            <a-input-number v-decorator="['time', {initialValue: time ? time : '', rules: [{ required: true, message: '请输入天数' }]}]" :min="1" :max="10" @change="onChange" />天
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
            'edibleMethod',
            {initialValue: account && account.edibleMethod, rules: [{ required: true, message: '请输入食用方法' }]}
          ]"
            name="edibleMethod"
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
          label="分类"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
        <a-select placeholder="请输入分类" v-decorator="['classification', {initialValue: account && account.classification ? account.classification : '种植', rules: [{ required: true, message: '请输入采购渠道' }]}]" @change="handleShop">
            <a-select-option value="种植">种植</a-select-option>
            <a-select-option value="水产">水产</a-select-option>
            <a-select-option value="畜牧">畜牧</a-select-option>
          </a-select>
               </a-form-item>
               <a-form-item
                label="产品图片"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
              >
                <a-upload
                  action=""
                  listType="picture-card"
                  :defaultFileList="fileList"
                  :fileList="fileList"
                  @preview="handlePreview"
                  class="upload-list-inline"
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
          label="上架"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
               <a-switch v-decorator="['shelf', {initialValue: account && account.shelf ? account.shelf : '', rules: [{ required: true, message: '是否上架' }]}]"  defaultChecked @change='onChange'/>
               </a-form-item>
        <a-form-item
          label="产品介绍"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <!-- <tinymce-editor :value="value"></tinymce-editor> -->
          <a-input
            v-decorator="[
            'productDescription',
            {initialValue: account && account.productDescription , rules: [{ required: true, message: '产品介绍' }]}
          ]"
            name="productDescription"
            placeholder="产品介绍"
          />
        </a-form-item>
        <a-row><div class="line" style="height:1px;width:100%;background:#ccc;margin:30px 0 15px 0;"></div></a-row>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right;margin-right:25px">
          <a-button @click="save" type="primary">提交</a-button>
          <a-button style="margin-left: 8px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import tinymceEditor from '../tinymce'
import { addOne, modifyProduct} from '@/api/manage'
const BASE_URL = 'http://47.111.67.221:10000/'
export default {
  props: {
    account:  {
      type: Object
    }
  }, 
  components: {
    tinymceEditor
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
      fileList: [
        {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
      ],
      startDate: '',
      endDate: '',
      consumption: '',
      time: '',
      visible: false,
      value: '',
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
      this.resetValues()
      this.$emit('close')
      this.visible = false
    },
    resetValues() {
      this.fileList = []
      this.startDate =  ''
      this.endDate = ''
      this.consumption = ''
      this.time = ''
    },
    cancel () {
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
    handlePreview (file) {
      console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handlePreviewCancel() {
      this.previewVisible = false
    },
    save(e) {
      let _this = this
      e.preventDefault()
      this.confirmLoading = true
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(this.account)
        if (!err) {

       
        let params = {
            timeToMarket: this.startDate + '-'+ this.endDate,
            consumptionPeriod: this.consumption + this.time
          }
          this.form.resetFields()
          this.resetValues()
          let formData = Object.assign({}, values, params)
          console.log(formData)
          console.log('Received values of form: ', values)
          if (this.account.action === 'edit') {
            console.log('sssss===========')
            this.$emit('productModify', formData)
          } else {
            this.$emit('productAdd', formData)
          }
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
      var array = this.account.images.map((item, index) => {
        return {uid: String(item.id),name: index +'.png', url: BASE_URL + item.originalurl, thumburl: BASE_URL + item.thumburl}
      })
      this.fileList = array
      console.log(this.fileList)
      this.startDate = this.account.timeToMarket.substring(0, 10)
      this.endDate = this.account.timeToMarket.substring(11)
      this.consumption = this.account.consumptionPeriod.substring(0, 2)
      this.time = this.account.consumptionPeriod.substring(2)
      console.log(this.startDate)
      console.log(this.endDate)
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
