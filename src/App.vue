<template>
  <div id="app">
    <nav id="nav" class="navbar has-shadow">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Editor</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import "@/assets/variables.scss";

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 12px;
    margin: 0;
    font-weight: normal;
  }
}

#nav {
  background: $light-grey;
  height: 40px;
  border-bottom: 1px solid rgba($black, 0.1);
  display: flex;
  align-items: center;

  .navbar-menu {
    margin: 0 10px;

    .navbar-item:not(:first-child) {
      margin: 0 0 0 10px;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
