<script>
import ModernSidebarCurrency from "./ModernSidebarCurrency";
import ModernTabButton from "./ModernTabButton";

export default {
  name: "ModernSidebar",
  components: {
    ModernSidebarCurrency,
    ModernTabButton
  },
  data() {
    return {
      isHidden: false,
      tabVisibilities: [],
      isMobileOpen: false,
      isMobile: false
    };
  },
  computed: {
    tabs: () => Tabs.newUI,
    sidebarClasses() {
      return {
        "c-modern-sidebar": true,
        "is-mobile-open": this.isMobileOpen
      };
    }
  },
  created() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    update() {
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => x.isAvailable);
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isMobileOpen = false;
      }
    },
    toggleMobileSidebar() {
      this.isMobileOpen = !this.isMobileOpen;
    },
    closeMobileSidebar() {
      this.isMobileOpen = false;
    }
  },
};
</script>

<template>
  <div v-if="!isHidden">
    <button
      v-if="isMobile"
      v-show="!isMobileOpen"
      class="o-mobile-sidebar-toggle"
      @click="toggleMobileSidebar"
    >
      <i class="fas fa-bars" />
    </button>
    <div
      class="o-mobile-sidebar-overlay"
      :class="{ 'is-visible': isMobileOpen }"
      @click="closeMobileSidebar"
    />
    <div :class="sidebarClasses">
      <ModernSidebarCurrency />
      <template
        v-for="(tab, tabPosition) in tabs"
      >
        <ModernTabButton
          v-if="tabVisibilities[tabPosition]"
          :key="tab.name"
          :tab="tab"
          :tab-position="tabPosition"
          @click.native="closeMobileSidebar"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
