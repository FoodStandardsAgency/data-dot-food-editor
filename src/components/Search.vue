<template>
  <div class="custom-search-input">
    <div class="input-group col-md-12">
      <input type="text" class="form-control input" placeholder="search" v-model="searchQuery" />
      <span class="input-group-btn">
          <button class="btn btn-info btn" type="button">
              <i class="glyphicon glyphicon-search"></i>
          </button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      searchEvent: Function
    },
    data: function () {
      return {
        searchQuery: ''
      }
    },
    watch: {
      searchQuery: function (val, oldVal) {
        if (val === oldVal) {
          return
        }
        if (this.searchEvent) {
          this.searchEvent(this.searchQuery)
        }
      }
    }
  }
</script>

<style type="sass" scoped>
  .custom-search-input{
      padding: 3px;
      border: solid 1px #E4E4E4;
      border-radius: 6px;
      background-color: #fff;
      margin: 10px 0px;
  }

  .custom-search-input input{
      border: 0;
      box-shadow: none;
  }

  .custom-search-input button{
      margin: 2px 0 0 0;
      background: none;
      box-shadow: none;
      border: 0;
      color: #666666;
      padding: 0 8px 0 10px;
      border-left: solid 1px #ccc;
  }

  .custom-search-input button{
      border: 0;
      box-shadow: none;
      border-left: solid 1px #ccc;
  }

  .custom-search-input .glyphicon-search{
      font-size: 16px;
      color: #999;
  }

  .custom-search-input button.btn:focus{
    outline: 0;
  }
</style>
