<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :title="title" :today="today" :yesterday="yesterday" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/FlowStat'
import {
  appDetail,
  appStat
} from '@/api/app'
export default {
  name: 'FlowStat',
  components: { Chart },
  data: function() {
    return {
      id: '',
      title: '',
      today: [],
      yesterday: []
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      const query = {
        id: id
      }
      appDetail(query).then(response => {
        this.title = response.data.name + '流量统计'
        console.log('title', this.title)
        appStat(query).then(response => {
          console.log('response', response)
          this.today = response.data.today
          this.yesterday = response.data.yesterday
          console.log('today', this.today)
          console.log('yesterday', this.yesterday)
          this.listLoading = false
        })
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  background-color: #fff;
  height: calc(100vh - 84px);
}
</style>

