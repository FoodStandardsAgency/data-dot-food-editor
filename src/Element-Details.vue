<!--
Elements are an attribute of Datasets
They hold details of a specific item inside a dataset with a start and end date
Displayed as a modal
-->
<template>
  <main>
    <div class="container">
      <ol class="breadcrumb">
        <li>
          <router-link
            :to="{ name: 'datasets'}"
            class="active"
          >
            Datasets
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'dataset', params: { id: $route.params.id, eid: 'new' }}"
            class="active"
          >
            {{ $route.params.id }}
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}"
            class="active"
          >
            elements
          </router-link>
        </li>
        <li>{{ $route.params.eid }}</li>
      </ol>
    </div>
    <div
      v-if="element"
      id="details"
      :key="element.id"
    >
      <div class="container">
        <form @submit.prevent="">
          <div class="pull-right buttons">
            <a
              v-if="$route.params.eid !== 'new'"
              class="btn btn-danger"
              @click="remove"
            >Delete</a>
            <router-link
              :to="{ name: 'elements', params: { id: $route.params.id, eid: 'new' }}"
              class="btn btn-default"
            >
              Cancel
            </router-link>
            <button
              type="button"
              class="btn btn-success"
              @click="checkAndSave"
            >
              Save
            </button> <!-- :disabled="!unsavedChanges ? true : false" -->
          </div>
          <h4
            id="myModalLabel"
            class="modal-title"
          >
            Element editor
          </h4>

          <messages />

          <div
            class="form-group"
            style="clear:left"
          >
            <label for="Eltitle">Title</label>
            <input
              id="Eltitle"
              v-model="element.title"
              v-validate
              type="text"
              class="form-control"
              data-vv-as="title"
              data-vv-rules="required|min:8"
              name="Eltitle"
            >
            <span
              v-show="errors.has('Eltitle')"
              class="validation-errors"
            >{{ errors.first('Eltitle') }}</span>
          </div>
          <div class="form-group">
            <label for="Eldescription">Description</label>
            <textarea
              id="Eldescription"
              v-model="element.description"
              v-validate
              class="form-control"
              data-vv-as="description"
              rows="5"
              data-vv-rules="required|min:6"
              name="Eldescription"
            />
            <span
              v-show="errors.has('Eldescription')"
              class="validation-errors"
            >{{ errors.first('Eldescription') }}</span>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="Elstartdate">Start Date</label>
              <input
                id="Elstartdate"
                v-model="element.startDate"
                v-validate
                type="date"
                class="form-control"
                data-vv-as="start date"
                data-vv-rules="date_format:yyyy-MM-dd"
                name="Elstartdate"
                placeholder="dd/mm/yyyy"
              >
              <span
                v-show="errors.has('Elstartdate')"
                class="validation-errors"
              >{{ errors.first('Elstartdate') }}</span>
            </div>
            <div class="form-group col-md-6">
              <label for="Elenddate">End Date</label>
              <input
                id="Elenddate"
                v-model="element.endDate"
                v-validate
                type="date"
                class="form-control"
                data-vv-as="end date"
                data-vv-rules="date_format:yyyy-MM-dd"
                name="Elenddate"
                placeholder="dd/mm/yyyy"
              >
              <span
                v-show="errors.has('Elenddate')"
                class="validation-errors"
              >{{ errors.first('Elenddate') }}</span>
            </div>
          </div>
        </form>
      </div>
      <div class="container distributions">
        <hr>
        <div class="pull-right">
          <button
            class="btn btn-success add-distribution"
            title="add distribution"
            @click="newDistribution"
          >
            <span
              class="glyphicon glyphicon-plus"
              aria-hidden="true"
            />
          </button>
        </div>
        <h3>Distributions</h3>
        <p>Distributions are for different file format versions of an element</p>

        <template
          v-for="(distribution, index) in element.distribution"
          class="distributions row"
        >
          <distribution
            :key="index"
            :distribution="distribution"
            :index="index"
            @remove="removeDistribution"
          />
        </template>
      </div>
    </div>
  </main>
</template>
<script>
  import blankElement from './proto/blank-element'
  import blankDistribution from './proto/blank-distribution'
  import DistributionDetails from './Distribution-Details'
  import uuid from 'uuid'
  import statics from './statics'
  import log from './log'
  import parseHeader from './parseHeader'
  import bus from './components/Bus'
  import commonErrors from './common-errors.json'

  import {getDatatypes, saveElement, removeElement, getElement} from './Api'

  export default {
    components: {
      distribution: DistributionDetails
    },
    data () {
      return {
        datatypes: [],
        unsavedChanges: false,
        beforeLoad: true,
        element: JSON.parse(JSON.stringify(blankElement))
      }
    },
    watch: {
      '$route': 'fetchData',
      'element': {
        deep: true,
        handler: function () {
          if (!this.beforeLoad) {
            // this.unsavedChanges = true
          } else {
            this.beforeLoad = false
          }
        }
      }
    },
    created () {
      this.fetchData()
    },
    beforeRouteLeave (to, from, next) {
      if (this.unsavedChanges) {
        // cancelConfirm(next)
      } else {
        next()
      }
    },
    mounted () {
      getDatatypes().then((dset) => {
        this.datatypes = dset
      }, (e) => {
        log(e)
      })
    },
    methods: {
      fetchData () {
        if (this.$route.query.saved) {
          bus.$emit('message', {
            str: 'Added Successfully. Changes won\'t appear publicly until published',
            success: true
          })
        }

        if (this.$route.params.eid !== 'new') {
          getElement({id: this.$route.params.id, eid: this.$route.params.eid}).then((ele) => {
            this.element = ele
          }, (e) => {
            log(e)
          })
        } else {
          this.element = JSON.parse(JSON.stringify(blankElement))
        }
      },
      checkDistributionUrl(dist, errorMsg, index) {
        var newErrorMsg = errorMsg
        const url = dist.accessURL || dist.downloadURL

        Object.keys(commonErrors).forEach(key => {
          commonErrors[key].forEach(value => {
            switch (key) {
              case "includes":
                if (url.includes(value)) {
                  newErrorMsg += `Distribution "${index + 1}" URL would not normally contain "${value}".\n`
                }
                break
              case "startsWith":
                if (url.startsWith(value)) {
                  newErrorMsg += `Distribution "${index + 1}" URL would normally start with an https, not "${value}", scheme.\n`
                }
                break
            }
          })
        })

        return newErrorMsg
      },
      checkDistributionsUrl() {
        var errorMsg = ''

        this.element.distribution.forEach((dist, index) => {
          errorMsg = this.checkDistributionUrl(dist, errorMsg, index)
        })

        if (errorMsg !== '')
          errorMsg += 'Are you sure this is correct?'
        
        return errorMsg
      },
      checkAndSave () {
        let promise = Promise.resolve()

        if (this.element.distribution.length != 0) {
          const checksUrls = this.checkDistributionsUrl()
          if (checksUrls !== '') {
            promise = this.$dialog.confirm(checksUrls)
          }
        }

        promise
          .then(() => {
            this.save()
          })
          .catch(() => {})
      },
      save () {
        saveElement({
          id: this.$route.params.id,
          eid: this.$route.params.eid
        }, this.element).then((resp) => {
          this.unsavedChanges = false
          bus.$emit('message', {
            str: 'Updated Successfully. Changes won\'t appear publicly until published',
            success: true
          })

          let eid = parseHeader(resp.headers)
          if (eid) {
            this.$router.push({name: 'element', params: {id: this.$route.params.id, eid: eid}, query: {saved: true}})
          }
        }, (e) => {
          log(e)
        })
      },
      remove () {
        let that = this
        this.$dialog
          .confirm('Are you sure you want to delete this element?')
          .then(function() { // confirmed
            removeElement({
              id: that.$route.params.id,
              eid: that.$route.params.eid
            }).then(() => {
              that.unsavedChanges = false
              that.$router.push({name: 'elements', params: {id: that.$route.params.id}, query: {deleted: true}})
            }, (e) => {
              log(e)
            })
          })
          .catch(function() { // canceled
          });
      },
      newDistribution () {
        // Add a new distribution to distributions
        let newDistro = JSON.parse(JSON.stringify(blankDistribution))
        newDistro['@id'] = statics.distributionUri + uuid.v4()
        this.element.distribution = [newDistro].concat(this.element.distribution) // Add as first element
      },
      removeDistribution (el) {
        this.element.distribution.splice(this.element.distribution.indexOf(el), 1)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import './assets/validation-errors';

  .distribution {
    border: 1px solid #AAA;
    margin: 10px 0;
    padding: 5px 5px;
  }
  .closeBtnHolder {
    padding-bottom: 20px;
  }
</style>

<style>
  .dg-content {
    white-space: pre-wrap;
  }
</style>