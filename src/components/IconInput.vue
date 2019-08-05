<template>
  <div>
    <ul class="icon-list">
      <li
        @click="set('fas', key)"
        class="icon-list-item"
        v-for="(icon, key, index) in fas"
        :key="`fas-${index}`"
        v-html="icon"
      ></li>
      <li
        @click="set('far', key)"
        class="icon-list-item"
        v-for="(icon, key, index) in far"
        :key="`far-${index}`"
        v-html="icon"
      ></li>
    </ul>
  </div>
</template>

<script>
import fas from "@/assets/icons/fas";
import far from "@/assets/icons/far";

export default {
  name: "IconInput",
  data() {
    return {
      fas,
      far
    };
  },
  methods: {
    set(set, key) {
      this.$emit("update", { set, key });
    }
  }
};
</script>

<style lang="scss">
.icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 400px;
  scroll: auto;
  overflow: auto;

  .icon-list-item {
    width: 30px;
    height: 30px;
    margin: 3px;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
