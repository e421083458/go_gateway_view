<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-group-data="panelGroupData" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import {
  panelGroupData,
  flowStat,
  serviceStat
} from '@/api/dashboard'
const lineChartData = {
  yesterday: [12,
    20,
    23,
    57,
    25,
    48,
    76,
    69,
    140,
    200,
    250,
    345,
    500,
    550,
    780,
    670,
    650,
    500,
    488,
    480,
    440,
    360,
    200,
    105],
  today: [5,
    10,
    20,
    48,
    50,
    55,
    60,
    80,
    100,
    180,
    200]
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      panelGroupData: { serviceNum: 456, todayRequestNum: 456, currentQps: 456, appNum: 456 },
      lineChartData: lineChartData,
      pieChartData: {
        'legend': ['HTTP', 'TCP', 'GRPC'],
        'data': [
          { value: 251, name: 'HTTP' },
          { value: 240, name: 'TCP' },
          { value: 149, name: 'GRPC' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      panelGroupData().then(response => {
        this.panelGroupData = response.data
        console.log('panelGroupData', this.panelGroupData)
      })
      flowStat().then(response => {
        this.lineChartData = response.data
        console.log('lineChartData', this.lineChartData)
      })
      serviceStat().then(response => {
        this.pieChartData = response.data
        console.log('pieChartData', this.pieChartData)
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
