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
      <span slot="status" slot-scope="text">
        {{ text }}
      </span>
      <span slot="account" slot-scope="text">
        <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, obj">
        <template>
          <a @click="handleEdit(obj)">编辑</a>
        </template>
      </span>
    </s-table>
    <div class="table-operator">
      <a-form layout="inline">
        <a-row type="flex" justify="end" :gutter="10">
            <a-col :offset="8"><a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button></a-col>
            <a-col><a-button type="primary">删除</a-button></a-col>
        </a-row>
      </a-form>
    </div>
    <create-form ref="createModal" @ok="handleOk" />
    <a-modal
      title="Modal"
      ref="modal"
      :visible="visible"
      @ok="hideModal"
      okText="确认"
      cancelText="取消"
    >
      <p>确定要删除吗!</p>
    </a-modal>
  </a-card>
  
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
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
          title: '农场主名称',
          dataIndex: 'name'
        },
        
        {
          title: '账号',
          dataIndex: 'account',
          scopedSlots: { customRender: 'account' }
        },
        {
          title: '单位信息',
          dataIndex: 'shopInfo',
          sorter: true,
          needTotal: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '农场品列表',
          dataIndex: 'productList',
          sorter: true,
          scopedSlots: { customRender: 'productList' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
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
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
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
        alert('dd')
    },
    delete() {
      this.visible = true
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
