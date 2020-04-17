<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">创建HTTP服务</span>
            <span v-if="is_edit === true">修改HTTP服务</span>
          </div>
          <div>
            <el-form-item label="服务名称">
              <el-input v-model="form.service_name" :disabled="is_edit===true" placeholder="6-128位字母数字下划线" />
            </el-form-item>
            <el-form-item label="服务描述">
              <el-input v-model="form.service_desc" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="接入类型">
              <el-input v-model="form.rule" :disabled="is_edit===true" placeholder="路径格式：/user/, 域名格式：www.test.com" class="input-with-select">
                <el-select slot="prepend" v-model="form.rule_type" :disabled="is_edit===true" style="width:100px">
                  <el-option label="路径" value="0" />
                  <el-option label="域名" value="1" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="支持https">
              <el-switch
                v-model="form.need_https"
                active-value="1"
                inactive-value="0"
              />
              <span style="color:#606266;font-weight:700;width:300px;padding-left:50px;padding-right:10px;float:;text-align:right">支持strip_uri</span>
              <el-switch
                v-model="form.need_strip_uri"
                active-value="1"
                inactive-value="0"
              />
              <span style="color:#606266;font-weight:700;width:300px;padding-left:50px;padding-right:10px;float:;text-align:right">支持need_websocket</span>
              <el-switch
                v-model="form.need_websocket"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="URL重写">
              <el-input v-model="form.url_rewrite" placeholder="格式: ^/gatekeeper/test_service(.*) $1 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>
            <el-form-item label="Header转换">
              <el-input v-model="form.header_transfor" placeholder="header转换支持增加(add)、删除(del)、修改(edit) 格式: add headname headvalue 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
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

            <el-form-item label="IP列表">
              <el-input v-model="form.ip_list" placeholder="格式: 127.0.0.1:80 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item label="权重列表">
              <el-input v-model="form.weight_list" placeholder="格式: 50 多条换行" type="textarea" :autosize="{ minRows: 2, maxRows: 20}" />
            </el-form-item>

            <el-form-item label="建立连接超时">
              <el-input v-model="form.upstream_connect_timeout" placeholder="单位s，0表示无限制" />
            </el-form-item>

            <el-form-item label="获取header超时">
              <el-input v-model="form.upstream_header_timeout" placeholder="单位s，0表示无限制" />
            </el-form-item>

            <el-form-item label="链接最大空闲时间">
              <el-input v-model="form.upstream_idle_timeout" placeholder="单位s，0表示无限制" />
            </el-form-item>

            <el-form-item label="最大空闲链接数">
              <el-input v-model="form.upstream_max_idle" placeholder="0表示无限制" />
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
  serviceAddHttp,
  serviceUpdateHttp
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
        serviceUpdateHttp(formData).then(() => {
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
        serviceAddHttp(formData).then(() => {
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

