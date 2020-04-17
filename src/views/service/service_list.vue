<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.info"
        placeholder="服务名/服务描述"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>

      <router-link :to="'/service/service_create_http'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          添加HTTP服务
        </el-button>
      </router-link>

      <router-link :to="'/service/service_create_tcp'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          添加TCP服务
        </el-button>
      </router-link>

      <router-link :to="'/service/service_create_grpc'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
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
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" min-width="75px">
        <template slot-scope="{row}">
          <span>{{ row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务描述" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.service_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="38px">
        <template slot-scope="{ row }">
          <span v-for="(item,index) in TypeOptions" :key="index">
            <template v-if="item.key==row.load_type">{{ item.display_name }}</template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="服务地址" min-width="130px">
        <template slot-scope="{ row }">
          <span>{{ row.service_addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QPS" width="55px">
        <template slot-scope="{ row }">
          <span>{{ row.qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日请求数" width="80px">
        <template slot-scope="{ row }">
          <span>{{ row.qpd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点数" min-width="38px">
        <template slot-scope="{ row }">
          <span>{{ row.total_node }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <router-link :to="'/service/service_stat/'+row.id">
            <el-button
              type="primary"
              size="small"
            >
              统计
            </el-button>
          </router-link>
          <router-link v-if="row.load_type === 0" :to="'/service/service_edit_http/'+row.id">
            <el-button
              type="primary"
              size="small"
            >
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type === 1" :to="'/service/service_edit_tcp/'+row.id">
            <el-button
              type="primary"
              size="small"
            >
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type === 2" :to="'/service/service_edit_grpc/'+row.id">
            <el-button
              type="primary"
              size="small"
            >
              修改
            </el-button>
          </router-link>
          <el-button
            type="primary"
            size="small"
            @click="handleDelete(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page_no"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  serviceList,
  serviceDelete
} from '@/api/service'
import waves from '@/directive/waves' // waves directive
import dateFormat from '@/utils/date'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// 0=http 1=tcp 2=grpc
const TypeOptions = [
  { key: 0, display_name: 'HTTP' },
  { key: 1, display_name: 'TCP' },
  { key: 2, display_name: 'GRPC' }
]

export default {
  name: 'UserList',
  components: { Pagination },
  directives: { waves },
  filters: {
    formatdate: function(time) {
      const date = new Date(time)
      return dateFormat.formatDate(date, 'yyyy.MM.dd')
    }
  },
  data() {
    return {
      tableKey: 'qq',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 20,
        info: ''
      },
      TypeOptions,
      parentsProps: { checkStrictly: true, value: 'id', label: 'name', children: 'children' },
      parentsKey: 0,
      temp: {
        'id': undefined,
        'city_id': undefined,
        'user_id': undefined,
        'question': undefined,
        'question_pics': undefined,
        'type': undefined,
        'status': undefined,
        'reply': undefined,
        'created_at': undefined,
        'updated_at': undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '查看或处理',
        create: '新增功能'
      },
      rules: {
        area_name: [
          { required: true, message: '区域名称不能为空', trigger: 'change' }
        ],
        city_id: [
          { required: true, message: '城市不能为空 ', trigger: 'change' }
        ],
        center_point: [
          { required: true, message: '区域中心点不能为空', trigger: 'change' }
        ],
        geojson: [
          { required: true, message: '区域边界不能为空', trigger: 'change' }
        ]
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
    handleDelete(row) {
      const tempData = {
        id: row.id
      }
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serviceDelete(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 500
          })
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>
