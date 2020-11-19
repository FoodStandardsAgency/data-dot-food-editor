<template>
  <main>
    <div class="container readable-line-length">
      <h1>FSA Data Catalog Editor </h1>
      <p>
        The
        <a href="https://data.food.gov.uk/catalog-editor">FSA Data Catalog Editor</a>
        is  the Internal Editor for the FSA data team and other data publishers to
        manage the records published in the
        <a href="https://data.food.gov.uk">public data catalog</a>.
      </p>

      <h2>Tasks</h2>
      <ul>
        <li>
          <a href="../catalog-editor">View and Update Data Catalog</a><br />
          View and update Food Standards Agency open datasets and related assets.
        </li>
        <li>
          <a href="../reports">Reports</a><br />
          View basic Admin reports (currently not active)
        </li>
        <li>
          <a href="../publish">Publication</a><br />
          Publish changes from editor to public catalog. This task is undertaken
          by the FSA Data Team only and not other publishers
        </li>
      </ul>

      <h2>
        Help
      </h2>
      <p>
        If you experience any difficulties with this application then please initially
        contact the
        <a href="mailto:data@food.gov.uk?subject=data-dot-food-editor">FSA Data Team</a>.
        If you provide the following information it will
        greatly assist in identifying and resolving any issues:
      </p>
      <ul>
        <li>
          a reference in to the specific service and part of the service that is
          relevant (for example for Alerts this could be the Editor, the initial
          template ingestion, the data API, or user access issues)
        </li>
        <li>
          a clear detailed description, including how the issue can be replicated
        </li>
        <li>
          what browser you are using
        </li>
        <li>
          the address of the page that you are on (if relevant)
        </li>
        <li>
          any screenshots
        </li>
        <li>
          an indication of the severity of the issue
        </li>
        <li>
          your contact details, in case of any required follow-up
        </li>

      </ul>
      <p>
        Note: Critical issues with the Public Catalog should be logged with the
        IT Service Desk CC in the FSA Digital and FSA Data Teams.
      </p>

      <p>
        For reference the Epimorphics team support contact address for data.food.gov.uk
        is:
        <a
          href="mailto:fsa-services-support@epimorphics.com?subject=data-dot-food-editor"
        >fsa-services-support@epimorphics.com</a>.
        Note generally this will only be used by the Service Lead or the Service Desk.
        Issues will be logged and tracked within
        <a href="https://github.com/FoodStandardsAgency/data-dot-food/issues">GitHub</a>.
        You will need access to the FSA GitHub organisation to be able to view
        these). For details see
        <a href="https://github.com/FoodStandardsAgency/data-dot-food">data-dot-food</a>.
        If you have suggestions or ideas for improving this service, please send your
        suggestion to the FSA Data Team.
      </p>

    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5em;
}

.readable-line-length {
  max-width: 80ch;
}
</style>
