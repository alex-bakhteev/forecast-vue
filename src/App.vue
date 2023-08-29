<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import WheatherSummary from './components/WheatherSummary.vue';
import Highlights from './components/Highlights.vue';
import { BASE_URL, API_KEY } from './constants/index';
import Coords from './components/Coords.vue';
import Humidity from './components/Humidity.vue';

const city = ref('Moscow');
const weatherInfo = ref(null);
const isError = computed(() => weatherInfo?.value?.cod !== 200);

function getWeather() {
  axios.get(`${BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`).then((data) => {
    weatherInfo.value = data.data;
  }).catch((err) => {
    weatherInfo.value = err.response.data;
    console.log(err);
  });
}
onMounted(getWeather)
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', { 'section-error': isError }]">
              <div class="info">
                <div class="city-inner">
                  <input v-model="city" type="text" class="search" @keyup.enter="getWeather">
                  <button @click="getWeather" class="search-button"/>
                </div>
                <WheatherSummary v-if="!isError" :weatherInfo="weatherInfo" />
                <div v-else="" class="error">
                  <div class="error-title">
                    Something went wrong!
                    <div v-if="weatherInfo?.message" class="error-message">
                      {{ weatherInfo?.message }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section v-if="!isError" class="section section-right">
              <Highlights :weatherInfo="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coord="weatherInfo?.coord" />
            <Humidity :humidity="weatherInfo?.main?.humidity" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="sass" scoped>
@import './assets/styles/main'
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-error
  min-width: 235px
  width: auto
  padding-right: 0
.section-left
  width: 30%
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0

.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

.search-button
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    border: none
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%

.error
  padding-top: 20px
  &-title
    font-size: 18px
    font-weight: 700
.error-message
  padding-top: 20px
  font-size: 14px
</style>
