<template>
  <a-card :bordered="true">
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
    <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="detail" slot-scope="text, obj">
        <a @click="handleCheck(obj)">{{text}}</a>
      </span>
      <span slot="action" slot-scope="text, obj">
        <template>
          <a-button type="default" @click="handleCheck" style="margin-bottom: 4px;margin-right: 6px">提示有错误信息</a-button>
          <a-button type="default" @click="handleCheck" style="margin-bottom: 4px">通过审核</a-button>
          <a-button type="default" @click="handleEdit(obj)" >编辑</a-button>
        </template>
      </span>
    </s-table>
    <div class="table-operator">
      <a-form layout="inline">
        <a-row type="flex" justify="end" :gutter="10">
            <a-col :offset="8"><a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button></a-col>
            <a-col><a-button type="primary" @click="del">删除</a-button></a-col>
        </a-row>
      </a-form>
    </div>
    <create-form ref="createModal" @ok="handleOk" />
    <create-detail ref="createDetail" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateProductForm'
import CreateDetail from './modules/CreateProductDetail'
import { getRoleList, getServiceList } from '@/api/manage'

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
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
          
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
        return getServiceList(Object.assign(parameter, this.queryParam))
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
      this.$confirm({
        title: '提示',
        content: '确认删除吗?',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined) {
            console.log(_this.selectedRowKeys)
            console.log(_this.selectedRows)
            console.log('OK');
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    handleEdit (record) {
      console.log(this.$refs.createModal)
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
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    add() {
        console.log('dddddd')
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
