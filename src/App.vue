<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.google.com/specimen/Barlow+Semi+Condensed');

#app {
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-weight: 600;
  text-align: center;
  color: #2c3e50;
  background: radial-gradient(
    ellipse at center top,
    hsl(214, 47%, 23%),
    hsl(237, 49%, 15%)
  );
  background-position-y: -50%;
  letter-spacing: 2px;
  min-height: 100vh;
}

header {
  border: none !important;
}
</style>
