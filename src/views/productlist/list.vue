<template>
  <a-card :bordered="true">
    <div class="table-operator">
      <a-form layout="inline">
        <a-row type="flex" justify="end" :gutter="10">
            <a-col :offset="8"><a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button></a-col>
            <a-col><a-button type="primary" @click="del">删除</a-button></a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="detail" slot-scope="text, obj">
        <a @click="handleCheck(obj)">{{text}}</a>
      </span>
      <span slot="action" slot-scope="text, obj">
        <template>
          <a-button type="default" @click="handleError" style="margin-bottom: 4px;margin-right: 6px">提示有错误信息</a-button>
          <a-button type="default" @click="handleSuc" style="margin-bottom: 4px">通过审核</a-button>
          <a-button type="default" @click="handleEdit(obj)" >编辑</a-button>
        </template>
      </span>
    </s-table>
    
    <create-form ref="createModal" @refresh="refresh" @ok="handleOk" />
    <create-detail ref="createDetail" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateProductForm'
import CreateDetail from './modules/CreateProductDetail'
import { getRoleList, getProductList, deleteOne } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    CreateDetail
  },
  data () {
    return {
      mdl: {},
      visible: false,
      // 高级搜索 展开/关闭
    //   advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
          
        {
          title: '农产品名称',
          dataIndex: 'name'
        },
        
        {
          title: '详情',
          dataIndex: 'detail',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '280px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getProductList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
    }
  },
  created () {
    this.tableOption()
  },
  methods: {
    tableOption () {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
    },
    del() {
      let _this = this
      console.log(_this.selectedRowKeys)
          console.log(_this.selectedRows)
      if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined && _this.selectedRowKeys.length>0 && _this.selectedRows.length) {
      this.$confirm({
        title: '提示',
        content: '确认删除吗?',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined) {
            const id = _this.selectedRows[0].id
            const obj = {id: id}
            deleteOne(obj).then(res => {
              if (res.success === true) {
                _this.$message.success('删除成功');   
                _this.$refs.table.refresh(true);
              }
            })
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      })
      } else {
        this.$warning({
        title: '提示',
        content: '请至少选择一项要删除的内容!',
      });
      }
    },
    refresh() {
      console.log('ddd')
      this.$refs.table.refresh(true);
    },
    handleEdit (record) {
      console.log(record)
      Object.assign(record, {action: 'edit'})
      this.$refs.createModal.edit(record)
    },
    handleCheck() {
      console.log(this.$refs.createDetail)
      this.$refs.createDetail.check()
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleError() {
      this.$warning({
        title: '提示',
        content: '有违规信息请检查!',
      });
    },
    handleSuc() {
      this.$success({
        title: '提示',
        content: '通过审核!',
      });
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
