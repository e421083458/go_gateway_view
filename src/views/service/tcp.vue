<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">创建TCP服务</span>
            <span v-if="is_edit === true">修改TCP服务</span>
          </div>
          <div>
            <el-form-item label="服务名称" class="is-required">
              <el-input v-model="form.service_name" :disabled="is_edit===true" placeholder="6-128位字母数字下划线" />
            </el-form-item>
            <el-form-item label="服务描述" class="is-required">
              <el-input v-model="form.service_desc" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="端口" class="is-required">
              <el-input v-model="form.port" :disabled="is_edit===true" placeholder="需要设置8001-8999范围内数字，必填" />
            </el-form-item>
            <el-form-item label="开启验证">
              <el-switch
                v-model="form.open_auth"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>

            <el-form-item label="IP白名单">
              <el-input v-model="form.white_list" placeholder="格式: 127.0.0.1 多条换行，白名单优先级高于黑名单" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item label="IP黑名单">
              <el-input v-model="form.black_list" placeholder="格式: 127.0.0.1 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item label="客户端限流">
              <el-input v-model="form.clientip_flow_limit" placeholder="0表示无限制" />
            </el-form-item>

            <el-form-item label="服务端限流">
              <el-input v-model="form.service_flow_limit" placeholder="0表示无限制" />
            </el-form-item>

            <el-form-item label="轮询方式">
              <el-radio v-model="form.round_type" label="0">random</el-radio>
              <el-radio v-model="form.round_type" label="1">round-robin</el-radio>
              <el-radio v-model="form.round_type" label="2">weight_round-robin</el-radio>
              <el-radio v-model="form.round_type" label="3">ip_hash</el-radio>
            </el-form-item>

            <el-form-item label="IP列表" class="is-required">
              <el-input v-model="form.ip_list" placeholder="格式: 127.0.0.1:80 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item label="权重列表" class="is-required">
              <el-input v-model="form.weight_list" placeholder="格式: 50 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="disableButton" @click="onSubmit">立即提交</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {
  serviceDetail,
  serviceAddTcp,
  serviceUpdateTcp
} from '@/api/service'
export default {
  components: { },
  data() {
    return {
      is_edit: false,
      disableButton: false,
      form: {
        id: '0',
        service_name: '',
        service_desc: '',
        port: '',
        rule_type: '0',
        rule: '',
        need_https: '0',
        need_strip_uri: '1',
        need_websocket: '1',
        url_rewrite: '',
        header_transfor: '',
        open_auth: '0',
        black_list: '',
        white_list: '',
        white_host_name: '',
        clientip_flow_limit: '',
        service_flow_limit: '',
        round_type: '2',
        ip_list: '',
        weight_list: '',
        forbid_list: '',
        upstream_connect_timeout: '',
        upstream_header_timeout: '',
        upstream_idle_timeout: '',
        upstream_max_idle: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.is_edit = true
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
      serviceDetail(query).then(response => {
        const formData = response.data

        this.form.id = formData.info.id
        this.form.service_name = formData.info.service_name
        this.form.service_desc = formData.info.service_desc

        this.form.port = formData.tcp_rule.port.toString()

        this.form.rule_type = formData.http_rule.rule_type.toString()
        this.form.rule = formData.http_rule.rule
        this.form.need_https = formData.http_rule.need_https.toString()
        this.form.need_strip_uri = formData.http_rule.need_strip_uri.toString()
        this.form.need_websocket = formData.http_rule.need_websocket.toString()
        this.form.url_rewrite = formData.http_rule.url_rewrite.replace(/,/g, '\n')
        this.form.header_transfor = formData.http_rule.header_transfor.replace(/,/g, '\n')

        this.form.open_auth = formData.access_control.open_auth.toString()
        this.form.black_list = formData.access_control.black_list.replace(/,/g, '\n')
        this.form.white_list = formData.access_control.white_list.replace(/,/g, '\n')
        this.form.white_host_name = formData.access_control.white_host_name.replace(/,/g, '\n')
        this.form.clientip_flow_limit = formData.access_control.clientip_flow_limit
        this.form.service_flow_limit = formData.access_control.service_flow_limit

        this.form.round_type = formData.load_balance.round_type.toString()
        this.form.ip_list = formData.load_balance.ip_list.replace(/,/g, '\n')
        this.form.weight_list = formData.load_balance.weight_list.replace(/,/g, '\n')
        this.form.forbid_list = formData.load_balance.forbid_list.replace(/,/g, '\n')

        this.form.upstream_connect_timeout = formData.load_balance.upstream_connect_timeout
        this.form.upstream_header_timeout = formData.load_balance.upstream_header_timeout
        this.form.upstream_idle_timeout = formData.load_balance.upstream_idle_timeout
        this.form.upstream_max_idle = formData.load_balance.upstream_max_idle

        this.listLoading = false
      })
    },
    onSubmit() {
      this.disableButton = true
      const formData = Object.assign({}, this.form)
      formData.port = Number(formData.port)
      formData.rule_type = Number(formData.rule_type)
      formData.need_https = Number(formData.need_https)
      formData.need_strip_uri = Number(formData.need_strip_uri)
      formData.need_websocket = Number(formData.need_websocket)
      formData.open_auth = Number(formData.open_auth)
      formData.round_type = Number(formData.round_type)
      formData.clientip_flow_limit = Number(formData.clientip_flow_limit)
      formData.service_flow_limit = Number(formData.service_flow_limit)
      formData.upstream_connect_timeout = Number(formData.upstream_connect_timeout)
      formData.upstream_header_timeout = Number(formData.upstream_header_timeout)
      formData.upstream_idle_timeout = Number(formData.upstream_idle_timeout)
      formData.upstream_max_idle = Number(formData.upstream_max_idle)

      formData.ip_list = formData.ip_list.replace(/\n/g, ',')
      formData.weight_list = formData.weight_list.replace(/\n/g, ',')
      formData.forbid_list = formData.forbid_list.replace(/\n/g, ',')
      formData.white_host_name = formData.white_host_name.replace(/\n/g, ',')
      formData.white_list = formData.white_list.replace(/\n/g, ',')
      formData.black_list = formData.black_list.replace(/\n/g, ',')
      formData.header_transfor = formData.header_transfor.replace(/\n/g, ',')
      formData.url_rewrite = formData.url_rewrite.replace(/\n/g, ',')

      if (this.is_edit) {
        serviceUpdateTcp(formData).then(() => {
          this.disableButton = false
          this.$notify({
            title: 'Success',
            message: 'Submit Successfully',
            type: 'success',
            duration: 500
          })
        }, () => {
          this.disableButton = false
        })
      } else {
        serviceAddTcp(formData).then(() => {
          this.disableButton = false
          this.$notify({
            title: 'Success',
            message: 'Submit Successfully',
            type: 'success',
            duration: 500
          })
        }, () => {
          this.disableButton = false
        })
      }
    }
  }
}
</script>
<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

