<template>
  <b-container class="home pt-5">
    <b-row justify-content-md-center class="px-3">
      <b-col col lg="2"></b-col>
      <b-col cols="12" lg="8" class="score__container">
        <div class="score__wrapper row p-4 justify-content-between">
          <b-img :src="Logo" fluid alt="Logo"></b-img>
          <div class="score__show column justify-content-center px-5 pt-3 pb-3">
            <p class="score__show-title">score</p>
            <p class="score__show-value">{{ score }}</p>
          </div>
        </div>

        <b-row>
          <b-col cols="12">
            <div v-if="!me" class="action__wrapper">
              <icon-container
                v-for="icon in iconData"
                :key="icon.name"
                :color1="icon.color1"
                :color2="icon.color2"
                :name="`${icon.name} Icon`"
                :class="`action-icon action__${icon.name}`"
                :imgSrc="icon.source"
                @click.native="startPlay(icon)"
              />
            </div>

            <div v-else class="action__wrapper picked">
              <b-row class="mt-5 pt-5 action__picked__wrapper">
                <b-col class="action__picked-item">
                  <p>You Picked</p>
                  <icon-container
                    :color1="me.color1"
                    :color2="me.color2"
                    :name="`${me.name} Icon`"
                    :imgSrc="me.source"
                    :size="250"
                    :class="{ 'win': win }"
                  />
                  <p class="pt-5">You Picked</p>
                </b-col>

                <b-col
                  v-if="finished"
                  class="align-items-center column m-auto px-5 action__result__wrapper first"
                >
                  <p class="action__result" v-if="win">You Win</p>
                  <p class="action__result" v-else-if="tied">Try again</p>
                  <p class="action__result" v-else>You Lose</p>
                  <div class="action__play-again" @click="playAgain()">
                    Play Again
                  </div>
                </b-col>

                <b-col class="action__picked-item">
                  <p>The House Picked</p>
                  <icon-container
                    v-if="computer"
                    :color1="computer.color1"
                    :color2="computer.color2"
                    :name="`${computer.name} Icon`"
                    :imgSrc="computer.source"
                    :size="250"
                    :class="{ 'win': !win && win !== null }"
                  />
                  <p v-if="computer" class="mt-5">The House Picked</p>
                  <div v-else class="action__picked-computer-empty">
                    <div></div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  v-if="finished"
                  class="align-items-center column m-auto px-5 action__result__wrapper"
                >
                  <p class="action__result" v-if="win">You Win</p>
                  <p class="action__result" v-else-if="tied">Try Again</p>
                  <p class="action__result" v-else>You Lose</p>
                  <div class="action__play-again" @click="playAgain()">
                    Play Again
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col col lg="2"></b-col>
    </b-row>

    <b-row>
      <b-col cols="0" sm="8" md="10"></b-col>
      <b-col cols="12" md="2" sm="4" class="d-flex justify-content-center">
        <div class="rules" v-b-modal.rules-modal>
          Rules
        </div>

        <b-modal id="rules-modal" hide-footer centered size="200">
          <template v-slot:modal-header="{ close }">
            <div class="rules__header d-flex justify-content-between pt-3 px-3">
              <h2>rules</h2>
              <b-img class="rules__header__close" :src="CloseIcon" @click="close()" />
            </div>
          </template>

          <div class="p-3 d-flex justify-content-center rules__content mb-5">
            <b-img :src="RulesImage" />
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  mapMutations, mapState, mapActions, mapGetters,
} from 'vuex';

import Logo from '@/assets/logo-bonus.svg';
import Rock from '@/assets/icon-rock.svg';
import Paper from '@/assets/icon-paper.svg';
import Scissors from '@/assets/icon-scissors.svg';
import Lizard from '@/assets/icon-lizard.svg';
import Spock from '@/assets/icon-spock.svg';
import CloseIcon from '@/assets/icon-close.svg';
import RulesImage from '@/assets/image-rules-bonus.svg';

import IconContainer from '@/components/IconContainer.vue';

export default {
  name: 'Home',

  components: {
    IconContainer,
  },

  data() {
    return {
      Logo,
      Rock,
      Paper,
      Scissors,
      Lizard,
      Spock,
      CloseIcon,
      RulesImage,
      tied: false,
      finished: false,
      win: null,
    };
  },

  computed: {
    ...mapState(['iconData', 'me', 'computer', 'score']),
    ...mapGetters(['getScore']),

    iconData() {
      return [
        {
          color1: 'hsl(39, 89%, 49%)',
          color2: 'hsl(40, 89%, 53%)',
          name: 'Scissors',
          source: this.Scissors,
        },
        {
          color1: 'hsl(349, 71%, 52%)',
          color2: 'hsl(349, 70%, 56%)',
          name: 'Rock',
          source: this.Rock,
        },
        {
          color1: 'hsl(230, 89%, 62%)',
          color2: 'hsl(230, 89%, 65%)',
          name: 'Paper',
          source: this.Paper,
        },
        {
          color1: 'hsl(261, 31%, 60%)',
          color2: 'hsl(261, 72%, 63%)',
          name: 'Lizard',
          source: this.Lizard,
        },
        {
          color1: 'hsl(189, 59%, 53%)',
          color2: 'hsl(189, 58%, 57%)',
          name: 'Spock',
          source: this.Spock,
        },
      ];
    },
  },

  methods: {
    ...mapMutations({
      setMe: 'SET_ME',
      setComputer: 'SET_COMPUTER',
    }),

    ...mapActions(['setScore', 'initState']),

    startPlay(icon) {
      this.setMe(icon);

      setTimeout(async () => {
        const randomIndex = Math.floor(Math.random() * 4);
        await this.setComputer(this.iconData[randomIndex]);

        const res = this.evalute(this.me.name, this.computer.name);
        if (res === this.me.name) {
          this.win = true;
          this.setScore(this.score + 1);
        } else if (res === this.computer.name) {
          this.win = false;
          this.setScore(this.score - 1);
        } else this.tied = true;
      }, 1000);

      setTimeout(() => {
        this.finished = true;
      }, 2000);
    },

    evalute(first, second) {
      const choices = {
        rock: { name: 'Rock', defeats: ['Scissors', 'Lizard'] },
        paper: { name: 'Paper', defeats: ['Rock', 'Spock'] },
        scissors: { name: 'Scissors', defeats: ['Paper', 'Lizard'] },
        lizard: { name: 'Lizard', defeats: ['Paper', 'Spock'] },
        spock: { name: 'Spock', defeats: ['Scissors', 'Rock'] },
      };

      if (first === second) return 'tied';

      const victory = choices[first.toLowerCase()].defeats.indexOf(second) > -1;
      return victory ? first : second;
    },

    playAgain() {
      this.setMe(null);
      this.setComputer(null);
      this.tied = false;
      this.finished = false;
      this.win = null;
    },
  },

  mounted() {
    this.initState();
  },
};
</script>

<style lang="scss" scoped>
.score {
  &__wrapper {
    border: 2px solid hsl(217, 16%, 45%);
    border-radius: 10px;

    img {
      @media only screen and (max-width: 600px) {
        width: 75px;
      }
    }
  }

  &__show {
    background: white;
    border-radius: 10px;
    align-items: center;

    @media only screen and (max-width: 600px) {
      padding: 10px !important;
    }

    &-title {
      color: hsl(229, 64%, 46%);
      margin-bottom: 0;
      text-transform: uppercase;

      @media only screen and (max-width: 600px) {
        font-size: 10px;
      }
    }

    &-value {
      margin-bottom: 0;
      font-size: 75px;
      line-height: 75px;
      @media only screen and (max-width: 600px) {
        font-size: 45px;
        line-height: 45px;
      }
    }
  }
}

.action {
  &__wrapper {
    min-height: 600px;
    background: url(../assets/bg-pentagon.svg);
    background-repeat: no-repeat;
    background-position: center;

    @media only screen and (max-width: 768px) {
      zoom: 75%;
      margin-bottom: 50px;
    }

    @media only screen and (max-width: 475px) {
      zoom: 50%;
    }

    &.picked {
      background: none;

      @media only screen and (max-width: 475px) {
        margin-top: 150px !important;
      }
    }
  }

  &-icon {
    left: calc(50% - 70px);
    position: absolute;
    z-index: 5;
  }

  &__Scissors {
    top: 100px;
  }

  &__Lizard {
    top: 375px;
    left: calc(50% - 175px);
  }

  &__Rock {
    top: 375px;
    left: calc(50% + 30px);
  }

  &__Paper {
    top: 210px;
    left: calc(50% + 75px);
  }

  &__Spock {
    top: 210px;
    left: calc(50% - 225px);
  }

  &__picked {
    &__wrapper {
      @media only screen and (max-width: 600px) {
        zoom: 75%;
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.5rem;
        text-transform: uppercase;
        color: white;

        &:last-child {
          display: none;

          @media only screen and (max-width: 600px) {
            display: block;
          }
        }

        &:first-child {
          @media only screen and (max-width: 600px) {
            display: none;
          }
        }
      }
    }

    &-computer-empty {
      height: 250px;

      & > div {
        height: 187.5px;
        width: 187.5px;
        border-radius: 50%;
        background: hsl(237, 49%, 15%);
        margin: 31.25px;
      }
    }
  }

  &__play-again {
    border-radius: 5px;
    background: white;
    padding: 10px;
    text-transform: uppercase;
    max-width: 300px;
    margin: auto;
    cursor: pointer;
  }

  &__result {
    color: white;
    text-transform: uppercase;
    font-size: 40px;

    &__wrapper {
      @media only screen and (max-width: 600px) {
        margin-top: 100px !important;
        zoom: 200%;

        &.first {
          @media only screen and (max-width: 600px) {
            display: none;
          }
        }
      }

      &:last-child {
        display: none;

        @media only screen and (max-width: 600px) {
          display: block;
        }
      }
    }
  }
}

.rules {
  border: 2px solid;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  padding: 10px 10px;
  position: relative;
  top: -50px;
  cursor: pointer;
  width: 200px;

  @media only screen and (max-width: 600px) {
    top: 0;
    margin-top: 100px;
  }

  &__header {
    align-items: center;
    text-transform: uppercase;
    width: 100%;

    &__close {
      cursor: pointer;
    }
  }

  &__content {
    margin-top: -30px;
  }
}

.win {
  box-shadow: -10px 0px 20px 15px hsl(214, 47%, 23%);
}

.rules-modal {
  @media only screen and (max-width: 600px) {
    zoom: 75%;
  }
}
</style>>
