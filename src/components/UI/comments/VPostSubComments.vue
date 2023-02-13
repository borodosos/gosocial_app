<template>
  <div class="subcomment">
    <div class="subcomment__body">
      <div class="subcomment__title">
        <v-avatar
          class="subcomment__user-avatar"
          size="45"
          color="purple darken-1"
        >
          <img :src="setImageProfile" alt="alt" />
        </v-avatar>
        <div class="subcomment__info">
          <span class="subcomment__user-name">
            {{ user.first_name }} {{ user.second_name }}
          </span>
          <span class="subcomment__data">Just Now</span>
        </div>
      </div>
      <div class="subcomment__text">
        Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba Aboba aboba aboba
        Aboba aboba aboba Aboba aboba aboba
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
