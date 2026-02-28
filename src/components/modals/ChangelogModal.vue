<script>
import ModalCloseButton from "@/components/modals/ModalCloseButton";

export default {
  name: "ChangelogModal",
  components: {
    ModalCloseButton,
  },
  data() {
    return {
      entryId: 0,
    };
  },
  computed: {
    shownEntry: {
      get() {
        return GameDatabase.changelog[this.entryId];
      },
      set(entry) {
        this.entryId = entry.id;
      }
    },
    entries() {
      return GameDatabase.changelog;
    }
  },
  methods: {
    setShownEntry(tab) {
      this.shownEntry = tab;
      this.$refs.changelogBody.scrollTop = 0;
    },
    formatDate(date) {
      return date.map(n => (Math.log10(n) >= 2 ? n : `0${n}`.slice(-2))).join("-");
    }
  },
};
</script>

<template>
  <div class="l-changelog-modal">
    <ModalCloseButton @click="emitClose" />
    <div class="l-changelog-header">
      <div class="c-changelog-title">
        Changelog
      </div>
    </div>
    <div class="l-changelog-container">
      <div class="l-changelog-search-tab">
        <div class="l-changelog-tab-list">
          <div
            v-for="entry in entries"
            :key="entry.id"
            class="o-changelog-tab-button"
            :class="{
              'o-changelog-tab-button--selected': entry === shownEntry
            }"
            @click="setShownEntry(entry)"
          >
            {{ formatDate(entry.date) }}
          </div>
        </div>
      </div>
      <div class="l-changelog-info">
        <div class="c-changelog-body--title">
          {{ formatDate(shownEntry.date) }}<span v-if="shownEntry.name">: "{{ shownEntry.name }}" update</span>
        </div>
        <div
          ref="changelogBody"
          class="l-changelog-body c-changelog-body"
          v-html="shownEntry.info"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-changelog-modal {
  display: flex;
  flex-direction: column;
  /* stylelint-disable-next-line unit-allowed-list */
  width: calc(100vw - 20vh);
  /* stylelint-disable-next-line unit-allowed-list */
  height: 80vh;
  margin: 0.5rem;
}

.l-changelog-container {
  display: flex;
  flex: 1 1 50rem;
  flex-direction: row;
  margin: 2rem 0;
}

.l-changelog-header {
  flex: 0 0.2 5rem;
  text-align: center;
}

.l-changelog-search-tab {
  display: flex;
  flex-direction: column;
  width: 15rem;
}

.l-changelog-info {
  display: flex;
  flex: 1 1 50rem;
  flex-direction: column;
}

.c-changelog-title {
  font-size: 3rem;
  -webkit-user-select: none;
  user-select: none;
}

.c-changelog-body {
  text-align: left;
  font-size: 1.6rem;
}

.l-changelog-body {
  overflow-y: auto;
  flex: 1 1 30rem;
  margin: 1rem 1rem 0;
  padding: 0.5rem;
}

.t-s12 .l-changelog-body {
  font-size: 1.3rem;
  margin-left: 0;
}

.l-changelog-body::-webkit-scrollbar {
  width: 1rem;
}

.l-changelog-body::-webkit-scrollbar-thumb {
  border: none;
}

.s-base--metro .l-changelog-body::-webkit-scrollbar-thumb {
  border-radius: 0;
}

.c-changelog-body--title {
  font-size: 2.5rem;
}

.c-changelog-search-bar {
  width: calc(100% - 1rem);
  font-size: 1.5rem;
  padding: 0.2rem;
}

.l-changelog-tab-list {
  display: flex;
  overflow-y: auto;
  flex: 1 0.8 40rem;
  flex-direction: column;
  justify-content: flex-start;
  scrollbar-width: thin;
  margin: 0.5rem 0.5rem 0;
}

.l-changelog-tab-list::-webkit-scrollbar {
  width: 0.5rem;
}

.l-changelog-tab-list::-webkit-scrollbar-thumb {
  border: none;
}

.s-base--metro .l-changelog-tab-list::-webkit-scrollbar-thumb {
  border-radius: 0;
}

.o-changelog-tab-button {
  font-size: 1.25rem;
  border-bottom: 0.1rem solid black;
  padding: 0.3rem 0.5rem 0.3rem 0;
  transition: all 0.2s;
  cursor: pointer;
}

.o-changelog-tab-button:hover,
.o-changelog-tab-button--selected {
  box-shadow: inset 0 0 0.8rem var(--color-text);
}

.s-base--dark .o-changelog-tab-button {
  border-bottom: 0.1rem solid white;
}

.t-s12 .o-changelog-tab-button {
  border-bottom: 0.1rem solid black;
}

@media (max-width: 768px) {
  .l-changelog-modal {
    width: 100%;
    /* stylelint-disable-next-line unit-allowed-list */
    height: 85vh;
    margin: 0;
    overflow: hidden;
  }

  .c-changelog-title {
    font-size: 2.2rem;
  }

  .l-changelog-container {
    flex-direction: column;
    margin: 0.5rem 0;
    overflow: hidden;
  }

  .l-changelog-search-tab {
    width: 100%;
    flex: 0 0 auto;
  }

  .l-changelog-tab-list {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    flex: 0 0 auto;
    gap: 0.3rem;
    margin: 0.25rem 0;
    padding-bottom: 0.3rem;
  }

  .o-changelog-tab-button {
    white-space: nowrap;
    border-bottom: none;
    border: 0.1rem solid var(--color-text, white);
    border-radius: 0.3rem;
    padding: 0.2rem 0.6rem;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .l-changelog-info {
    overflow: hidden;
    min-width: 0;
  }

  .c-changelog-body--title {
    font-size: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-changelog-body {
    font-size: 1.4rem;
  }

  .l-changelog-body {
    margin: 0.5rem 0 0;
    padding-right: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .l-changelog-header {
    flex: 0 0 auto;
  }
}
</style>

<style>
.c-changelog-body li {
  margin: 0.5rem 0;
}
</style>
