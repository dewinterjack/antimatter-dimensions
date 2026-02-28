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
      isMobile: false,
      hasAnyNotification: false,
      currentTabKey: "",
      currentSubtabKey: ""
    };
  },
  computed: {
    tabs: () => Tabs.newUI,
    sidebarClasses() {
      return {
        "c-modern-sidebar": true,
        "is-mobile-open": this.isMobileOpen
      };
    },
    isModalOpen() {
      return this.$viewModel.modal.current !== undefined;
    },
    mobileSubtabs() {
      if (!this.isMobile) return [];
      const currentTab = Tabs.newUI.find(t => t.key === this.currentTabKey);
      if (!currentTab) return [];
      const available = currentTab.subtabs.filter(s => s.isAvailable);
      return available.length > 1 ? available : [];
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
      this.hasAnyNotification = Tabs.newUI.some(t => t.isAvailable && t.hasNotification);
      this.currentTabKey = this.$viewModel.tab;
      this.currentSubtabKey = this.$viewModel.subtab;
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
    },
    navigateSubtab(subtab) {
      subtab.show(true);
    }
  },
};
</script>

<template>
  <div v-if="!isHidden">
    <button
      v-if="isMobile"
      v-show="!isMobileOpen && !isModalOpen"
      class="o-mobile-sidebar-toggle"
      :class="{ 'has-notification': hasAnyNotification }"
      @click="toggleMobileSidebar"
    >
      <i class="fas fa-bars" />
    </button>
    <div
      v-if="isMobile && !isMobileOpen && !isModalOpen && mobileSubtabs.length > 0"
      class="o-mobile-subtab-container"
    >
      <button
        v-for="subtab in mobileSubtabs"
        :key="subtab.key"
        class="o-mobile-subtab-btn"
        :class="{ 'is-active': subtab.key === currentSubtabKey }"
        @click="navigateSubtab(subtab)"
        v-html="subtab.symbol"
      />
    </div>
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
