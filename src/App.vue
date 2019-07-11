<template>
  <div id="app">
    <nav id="nav" class="navbar has-shadow">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/editor">Editor</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";

html, body, #app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
