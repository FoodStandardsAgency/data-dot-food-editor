<!--
Elements are an attribute of Datasets
They hold details of a specific item inside a dataset with a start and end date
Displayed as a modal
-->
<template>
  <div class="distribution">
    <div class="closeBtnHolder pull-right">
      <button v-on:click="$emit('remove', distribution)" class="btn btn-danger">
        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>
    </div>

    <h4>Distribution</h4>

    <div class="form-group">
      <label for="Elformat">Format</label>
      <select class="form-control" :id="'Elformat' + index" v-validate data-vv-rules="required" data-vv-as="format" :name="'Elformat' + index" v-model="distribution.mediaType">
        <option v-for="datatype in datatypes" v-bind:value="datatype.code" v-bind:key="datatype.code">
          {{datatype.name}}
        </option>
      </select>
      <span class="validation-errors" v-show="errors.has('Elformat' + index)">{{ errors.first('Elformat' + index) }}</span>
    </div>

    <div class="form-group">
      <label for="Eldownload" class="form-label">URL</label>
      <input type="text" class="form-control" v-model="url" v-validate data-vv-rules="url" data-vv-as="url" :id="'Eldownload' + index" :name="'Eldownload' + index">
      <span class="validation-errors" v-show="errors.has('Eldownload' + index)">{{ errors.first('Eldownload' + index) }}</span>
    </div>

    <div class="form-group">
      <div>
        <label>URL Type</label>
      </div>
      <label class="radio-direct-download">
        <input type="radio" :name="'published' + index" :id="'publish' + index" v-model="isAccessURL" v-bind:value="!true">
        Direct Download URL
      </label>
      <label>
        <input type="radio" :name="'published' + index" :id="'publish' + index" v-model="isAccessURL" v-bind:value="!!true">
        Access URL
      </label>
      <p class="help-block">
        A Direct Download URL links directly to the data whereas an Access URL links to a webpage describing the data. <br/>
        When possible a Direct Download URL should be made available.
      </p>
    </div>

  </div>
</template>
<script>
  import {getDatatypes} from './Api'
  import log from './log'

  export default {
    data () {
      return {
        datatypes: [],
        isAccessURL: true
      }
    },
    props: {
      distribution: Object,
      index: Number
    },
    mounted () {
      this.isAccessURL = !!this.distribution.accessURL

      getDatatypes().then((dset) => {
        this.datatypes = dset
      }, (e) => {
        log(e)
      })
    },
    computed: {
      url: {
        // getter
        get: function () {
          return this.distribution.downloadURL || this.distribution.accessURL
        },
        // setter
        set: function (newValue) {
          if (this.isAccessURL) {
            this.distribution.accessURL = newValue
            this.distribution.downloadURL = null
          } else {
            this.distribution.downloadURL = newValue
            this.distribution.accessURL = null
          }
        }
      }
    },
    watch: {
      // whenever question changes, this function will run
      isAccessURL: function () {
        // this.url = this.url
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import './assets/validation-errors';

  .radio-direct-download{
    margin-right: 20px;
  }

  .distribution {
    border: 1px solid #AAA;
    margin: 10px 0;
    padding: 5px 5px;
  }
  .closeBtnHolder {
    padding-bottom: 20px;
  }
</style>
