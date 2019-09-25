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
      rowKey= record
      :columns="columns"
      :data="loadData"
      :getFarmTotals="total"
      :farmShow ="farmShow"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <a slot="productList" slot-scope="text, obj" @click="handleCheck(obj)">
        查看农产品列表
      </a>
      <span slot="action" slot-scope="text, obj">
        <template>
          <a @click="handleSuc(obj)" style="margin-bottom: 4px;margin-right: 8px">通过审核</a>
          <a @click="handleEdit(obj)">编辑</a>
        </template>
      </span>
    </s-table>
    
    <create-form ref="createModal" :account="currentAccount" @close="onModalClose" @farmModify="modifyFarm" @ok="handleOk" @farmAdd="farmAdd"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import {getFarmList,farmModify,getFarmDetail, getFarmTotal,farmAdd, FarmReview,deletFarm } from '@/api/manage'
const modify = {"farmInforImages": [
    {
      "id": 0
    }
  ],
  "unitlicense": [
    {
      "id": 0
    }
  ],
  "environmentalFacilities": [
    {
      "id": 0
    }
  ],
  "certificateHonors": [
    {
      "id": 0
    }
  ],
  "officialCertifications": [
    {
      "id": 0
    }
  ],
  "thirdPartyTestings": [
    {
      "id": 0
    }
  ],
  "ratings": [
    {
      "id": 0
    }
  ]
}
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
      farmShow: true,
      // 高级搜索 展开/关闭
    //   advanced: false,
      // 查询参数
      queryParam: {},
      currentAccount: null,
      id: '',
      // 表头
      columns: [  
        {
          title: '农场主名称',
          dataIndex: 'name'
        },
        {
          title: '详情',
          dataIndex: 'detail',
          scopedSlots: { customRender: 'detail' }
        },
        // {
        //   title: '账号',
        //   dataIndex: 'account',
        //   scopedSlots: { customRender: 'account' }
        // },
        // {
        //   title: '单位信息',
        //   dataIndex: 'shopInfo',
        //   needTotal: true,
        // },
        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   scopedSlots: { customRender: 'status' }
        // },
        {
          title: '农场品列表',
          dataIndex: 'productList',
          scopedSlots: { customRender: 'productList' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      total: () => {
        return getFarmTotal()
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getFarmList(Object.assign(parameter, this.queryParam))
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
    handleSuc(obj) {
      var params = {id: obj.id, review: true, remarks: ''}
      Review(params).then((res) => {
        if (res === true) {
          this.$success({
            title: '提示',
            content: '通过审核!',
          });
        }
      })
    },
    onModalClose() {
      this.currentAccount = null
      this.visible = false
    },
    tableOption () {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
    },
    farmAdd(obj) {
      farmAdd(obj, (res) => {
        console.log(res)
        if (res === true) {
          this.$message.success('新增成功')
        }
      })
    },
    modifyFarm(obj) {
      console.log(obj)
      let modifyParmas = Object.assign(obj, {id: this.id, certificateHonors: [], environmentalFacilities:[], unitlicense: []})
      let parameter = {'updateFarmInfor': modifyParmas, ...modify}
      console.log(parameter)
      farmModify(this.id, parameter).then((res) => {
        console.log(res)
      })
    },
    del() {
      let _this = this
      console.log(_this.selectedRowKeys)
      console.log(_this.selectedRows)
      var obj = _this.selectedRows
      console.log(obj)
      if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined && _this.selectedRowKeys.length>0 && _this.selectedRows.length) {
      this.$confirm({
        title: '提示',
        content: '确认删除吗?',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined && _this.selectedRowKeys.length>0 && _this.selectedRows.length) {
            deletFarm({id: obj[0].id}).then((res) => {
              console.log(res)
              if (res !== '') {
                 _this.$success({
                    title: '提示',
                    content: '删除成功!',
                  });
                _this.handleOk(true)
                _this.clearRows()
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
    async handleEdit (record) {
       console.log(record)
      this.id = record.id
      let _this = this
      // Object.assign(record, {action: 'edit'})
      // this.currentAccount = record
      // this.$refs.createModal.edit() 
      // console.log('sfsdfasf')
       await getFarmDetail(record.id).then((res) => {
        Object.assign(res, {action: 'edit'})
         this.currentAccount = res
      })
      this.$refs.createModal.edit() 
    },
    handleCheck(record) {
      console.log(record)
      this.$router.push({path: '/productlist/list', query:{productId: record.id}})
      // this.$refs.createModal.check(record)
    },
    handleOk (bool) {
      console.log('sss')
      this.$refs.table.refresh(bool)
    },
    clearRows (bool) {
      console.log('sss')
      this.$refs.table.clearSelected()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('changge----------------')
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
