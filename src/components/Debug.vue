<!--出场调试页面-->
<!--eslint-disable-->
<template>
  <div class="debug-box">
    <div class="search-box">
      <span class="label">关键词</span>
      <el-input v-model="searchCons.searchKey" placeholder="请输入内容" class="search-input"></el-input>

      <div class="date-picker-box">
        <span class="label">出厂日期</span>
        <el-date-picker
          v-model="searchCons.startDate"
          type="date"
          :picker-options="pickerOptions0"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <span class="label">至</span>
        <el-date-picker
          v-model="searchCons.endDate"
          type="date"
          :picker-options="pickerOptions1"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>

      <el-button type="primary" class="search-btn" @click="handleSearch">查 询</el-button>
      <el-button type="default" class="add-btn" icon="el-icon-plus" @click="handleAdd">新增出厂设备</el-button>

    </div>
    <div class="table-box">
      <el-table
        :data="alterTableData"
        style="width: 100%"
        :header-cell-style="{background:'#f2f2f2'}"
      >
        <el-table-column
          prop="deviceModel"
          label="设备型号">
          <template slot-scope="scope">
            <div v-if="!deviceToEdit  || deviceToEdit.index !== scope.row.index">
              <span>{{scope.row.deviceModel}}</span>
            </div>
            <div v-if="deviceToEdit && deviceToEdit.index === scope.row.index">
              <!--编辑单元格-->
              <el-input type="text" v-model="deviceToEdit.deviceModel"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceId"
          label="设备ID">
          <template slot-scope="scope">
            <div v-if="!deviceToEdit  || deviceToEdit.index !== scope.row.index">
              <span>{{scope.row.deviceId}}</span>
            </div>
            <div v-if="deviceToEdit && deviceToEdit.index === scope.row.index">
              <!--编辑单元格-->
              <el-input type="text" v-model="deviceToEdit.deviceId"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="controllerId"
          label="控制器ID">
          <template slot-scope="scope">
            <div v-if="!deviceToEdit  || deviceToEdit.index !== scope.row.index">
              <span>{{scope.row.controllerId}}</span>
            </div>
            <div v-if="deviceToEdit && deviceToEdit.index === scope.row.index">
              <!--编辑单元格-->
              <el-input type="text" v-model="deviceToEdit.controllerId"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveFactoryDate"
          label="出厂日期">
          <template slot-scope="scope">
            <div v-if="!deviceToEdit  || deviceToEdit.index !== scope.row.index">
              <span>{{scope.row.leaveFactoryDate}}</span>
            </div>
            <div v-if="deviceToEdit && deviceToEdit.index === scope.row.index">
              <!--编辑单元格-->
              <el-date-picker
                v-model="deviceToEdit.leaveFactoryDate"
                type="date"
                :picker-options="pickerOptions1"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div v-if="!deviceToEdit  || deviceToEdit.index !== scope.row.index" @click="handleEditRow(scope.row)">
              <i class="el-icon-edit-outline"><span style="paddingLeft: 9px;">启动编辑</span></i>
            </div>
            <div v-if="deviceToEdit && deviceToEdit.index === scope.row.index">
              <!--编辑该行记录-->
              <i class="el-icon-edit-outline" @click="handleCancel(scope.row.index)"><span
                style="paddingLeft: 9px">取消</span></i>
              <i class="el-icon-edit-outline" style="marginLeft:35px" @click="handleSave(scope.row.index)"><span
                style="paddingLeft: 9px">保存</span></i>
              <i class="el-icon-delete ope-i" style="marginLeft:35px" @click="handleDelete(scope.row.index)"><span
                style="paddingLeft: 9px">删除</span></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {debugTableData} from '../data'
  import {findIndex} from 'lodash'
  import {saveDebugInfo} from '../service'

  export default {
    name: 'debug',
    data() {
      return {
        searchCons: {
          searchKey: '',
          startDate: '',
          endDate: ''
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
//      完整的数据list
        tableData: debugTableData,
//      过滤后的数据list
        alterTableData: debugTableData,
        deviceToEdit: null
      }
    },
    methods: {
      handleEditRow(row) {
        this.deviceToEdit = {...row}
      },
//      过滤查询
      handleSearch() {
        let {searchCons, tableData} = this
        let {searchKey, startDate, endDate} = searchCons
        this.alterTableData = (tableData || []).filter(({deviceModel, deviceId, controllerId, leaveFactoryDate}) => {
          typeof deviceModel !== 'string' && (deviceModel = '')
          typeof deviceId !== 'string' && (deviceId = '')
          typeof controllerId !== 'string' && (controllerId = '')
          typeof leaveFactoryDate !== 'string' && (leaveFactoryDate = '')
          return (!searchKey || deviceModel.indexOf(searchKey) > -1 || deviceId.indexOf(searchKey) > -1 || controllerId.indexOf(searchKey) > -1) && (!startDate || (startDate && new Date(startDate).getTime() <= new Date(leaveFactoryDate).getTime())) && (!endDate || (endDate && new Date(endDate).getTime() >= new Date(leaveFactoryDate).getTime()))
        })
      },
//      取消编辑
      handleCancel(index) {
        this.deviceToEdit = null
      },
//      保存（提交接口）
      handleSave(index) {
        let {tableData, deviceToEdit} = this
        let index2 = findIndex(tableData, {index})
        tableData.splice(index2, 1, deviceToEdit)
//        todo 调接口保存
        saveDebugInfo.call(this, () => {
          console.log('--执行callback,deviceToEdit置空--')
          this.deviceToEdit = null
          this.handleSearch()
        })
      },
//      删除某个记录
      handleDelete(index) {
        console.log('--index in handleDelete--', index)
        let {tableData} = this
        let index2 = findIndex(tableData, {index})
        tableData.splice(index2, 1)
        this.deviceToEdit = null
        this.handleSearch()
      },
//      新增出厂设备
      handleAdd() {
        let {tableData, searchCons} = this
        let newDevice = {
          index: tableData && tableData.length > 0 ? tableData[tableData.length - 1].index + 1 : 0,
          deviceModel: searchCons.searchKey,   // 设备型号
          deviceId: '',             // 设备ID
          controllerId: '',              // 控制器ID
          leaveFactoryDate: searchCons.startDate        // 出厂日期
        }
        tableData.push(newDevice)
        this.handleSearch()
      }
    },
    computed: {}
  }
</script>
<style scoped lang="stylus">
  .debug-box {
    margin: 20px 20px;
    border: 1px solid #f2f2f2
    .search-box {
      margin: 0 20px;
      height: 74px;
      border-bottom 1px solid #f2f2f2
      .search-input {
        width 275px
        margin-top: 17px;
      }
      .date-picker-box {
        display inline
        margin-left 46px
      }
      .search-btn {
        width: 96px;
        height: 39px;
        margin-left: 33px;
      }
      .add-btn {
        margin-left 633px
        color: #348fdf;
      }
    }
    .table-box {
      margin-top 32px
    }
    .label {
      font-size 16px
    }
  }
</style>
