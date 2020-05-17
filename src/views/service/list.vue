<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.info" placeholder="服务名称/服务描述" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <router-link :to="'/service/service_create_http/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加HTTP服务
        </el-button>
      </router-link>
      <router-link :to="'/service/service_create_tcp/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加TCP服务
        </el-button>
      </router-link>
      <router-link :to="'/service/service_create_grpc/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加GRPC服务
        </el-button>
      </router-link>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务描述" min-width="120px">
        <template slot-scope="{row}">
          <span>{{ row.service_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.load_type | loadTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务地址" min-width="165px">
        <template slot-scope="{row}">
          <span>{{ row.service_addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QPS" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日请求量" min-width="70px">
        <template slot-scope="{row}">
          <span>{{ row.qpd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点数" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.total_node }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link :to="'/service/service_stat/'+row.id">
            <el-button type="primary" size="mini">
              统计
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===0" :to="'/service/service_edit_http/'+row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===1" :to="'/service/service_edit_tcp/'+row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===2" :to="'/service/service_edit_grpc/'+row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { serviceList, serviceDelete } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const loadTypeOptions = [
  { key: '0', display_name: 'HTTP' },
  { key: '1', display_name: 'TCP' },
  { key: '2', display_name: 'GRPC' }
]

const loadTypeKeyValue = loadTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ServiceList',
  components: { Pagination },
  directives: { waves },
  filters: {
    loadTypeFilter(type) {
      return loadTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 20,
        info: ''
      },
      temp: {
        id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    handleDelete(row, index) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteQuery = {
          'id': row.id
        }
        serviceDelete(deleteQuery).then(response => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: 'Success',
          message: '已取消删除',
          type: 'info',
          duration: 2000
        })
      })

      // this.list.splice(index, 1)
    }
  }
}
</script>
