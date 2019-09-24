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
      :productShow="productShow"
      :getProductTotals="total"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="detail" slot-scope="text, obj">
        <a @click="handleCheck(obj)">预览详情</a>
      </span>
      <span slot="action" slot-scope="text, obj">
        <template>
          <!-- <a-button type="default" @click="handleError" style="margin-bottom: 4px;margin-right: 6px">提示有错误信息</a-button> -->
          <a-button type="default" @click="handleSuc(obj)" style="margin-bottom: 4px;margin-right: 6px">通过审核</a-button>
          <a-button type="default" @click="handleEdit(obj)" >编辑</a-button>
        </template>
      </span>
    </s-table>
    
    <create-form ref="createModal" :account="currentAccount" @close="onModalClose" @refresh="refresh" @ok="handleOk" />
    <create-detail ref="createDetail" :account="detailInfo" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateProductForm'
import CreateDetail from './modules/CreateProductDetail'
import { productReview,getProductDetailById, getProductTotal, getProductList, deleteProduct } from '@/api/manage'

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
      productShow: true,
      currentAccount: null,
      detailInfo: null,
      id: '',
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
      total: () => {
        return getProductTotal()
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getProductList(Object.assign(parameter, this.queryParam))
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
  watch: {
    $route(from, to) {
      console.log(to)
      if (from.fullPath === '/productlist/index') {
        console.log('dd')
      }
    }
  },
  created () {
    var productid = this.$route
    console.log('sfsdfsd')
    console.log(productid)
    console.log(this.total)
    this.tableOption()
    
  },
  activated () {
    this.id = this.$route.query.productId
    console.log(this.id)
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
    onModalClose() {
      this.currentAccount = null
      this.visible = false
    },
    del() {
      let _this = this
      var selectRows = _this.selectedRows
      var ids = []
      console.log(_this.selectedRowKeys)
      console.log(_this.selectedRows)
      for (var i in selectRows) {
        ids.push(selectRows[i].id)
      }
      console.log(ids)
      if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined && _this.selectedRowKeys.length>0 && _this.selectedRows.length) {
      this.$confirm({
        title: '提示',
        content: '确认删除吗?',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          if (_this.selectedRowKeys !== '' && _this.selectedRows !== '' && _this.selectedRowKeys !== undefined && _this.selectedRows !== undefined && _this.selectedRowKeys.length>0 && _this.selectedRows.length) {
            deleteProduct({id: ids}).then((res) => {
              console.log(res)
              if (res === true) {
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
    refresh() {
      console.log('ddd')
      this.$refs.table.refresh(true);
    },
    clearRows (bool) {
      console.log('sss')
      this.$refs.table.clearSelected()
    },
    async handleEdit (record) {
      console.log(record)
      let _this = this
      // Object.assign(record, {action: 'edit'})
      // this.currentAccount = record
      // this.$refs.createModal.edit() 
      // console.log('sfsdfasf')
       await getProductDetailById(record.id).then((res) => {
        Object.assign(res, {action: 'edit'})
         this.currentAccount = res
      })
      this.$refs.createModal.edit() 
    },
    async handleCheck(record) {
      // console.log(this.$refs.createDetail)
      await getProductDetailById(record.id).then((res) => {
         this.detailInfo = res
      })
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
    handleSuc(obj) {
      var params = {id: obj.id, review: true, remarks: ''}
      productReview(params).then((res) => {
        console.log(res)
        if (res === true) {
          this.$success({
            title: '提示',
            content: '通过审核!',
          });
        }
      })
      
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
