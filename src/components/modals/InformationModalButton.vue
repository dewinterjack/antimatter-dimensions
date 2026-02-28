<script>
import { openExternalLink } from "@/utility/open-external-link";

export default {
  name: "InformationModalButton",
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: null
    },
    showModal: {
      type: String,
      required: false,
      default: null
    },
  },
  methods: {
    openAssociatedModal() {
      Modal[this.showModal].show();
    },
    openLink() {
      openExternalLink(this.link);
    }
  }
};
</script>

<template>
  <span
    :ach-tooltip="name"
    class="c-socials--icon__wrapper"
  >
    <a
      v-if="link"
      class="c-socials--icon"
      @click="openLink"
    >
      <i :class="icon" />
    </a>
    <a
      v-else
      class="c-socials--icon"
      @click="openAssociatedModal"
    >
      <i :class="icon" />
    </a>
  </span>
</template>

<style scoped>
.c-socials--icon {
  color: var(--color-text);
  cursor: pointer;
}

.c-socials--icon__wrapper {
  transition: all .2s ease-in-out;
}

.c-socials--icon__wrapper:hover {
  transform: scale(1.1);
}

[ach-tooltip]:before {
  width: 20rem;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  [ach-tooltip]::before {
    width: auto;
    max-width: 15rem;
    white-space: nowrap;
    font-size: 1.2rem;
  }

  .c-socials--icon__wrapper:nth-last-child(-n+2)[ach-tooltip]::before {
    left: auto;
    right: 0;
    transform: none;
  }

  .c-socials--icon__wrapper:nth-last-child(-n+2)[ach-tooltip]::after {
    left: auto;
    right: 0.8rem;
  }
}
</style>
