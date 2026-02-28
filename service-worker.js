/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-71caf847'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "about.html",
    "revision": "73b1d88400255e7e8a35ebac8fce7451"
  }, {
    "url": "font_test.html",
    "revision": "1645729c1cc23f893e74a850e2083434"
  }, {
    "url": "fungame/depression.css",
    "revision": "eb5036d0643bbbcfb2b23eb87c819cb5"
  }, {
    "url": "fungame/depression.html",
    "revision": "33cd3b8e7b35aba22b12198ed9252025"
  }, {
    "url": "fungame/depression.js",
    "revision": "6bb53e5eba584a67fdc8a8e737fb1471"
  }, {
    "url": "icon.png",
    "revision": "fba427398ded0ea65522294c6743d041"
  }, {
    "url": "images/achhidden.png",
    "revision": "2e827aa076d961bee0c29745f90a8cbb"
  }, {
    "url": "images/cage.png",
    "revision": "91485a5398b3f8a0c473eecd501d67fb"
  }, {
    "url": "images/cancer achievements.png",
    "revision": "7e3f12ace80e09e55f88e4f1f35d40c9"
  }, {
    "url": "images/celestial-navigation-bg.webp",
    "revision": "1e517dc21435f7bcdd05f902abebe4cf"
  }, {
    "url": "images/dark-bg.png",
    "revision": "cfbc4ecb3176af875c136dacca41a7bc"
  }, {
    "url": "images/kred_single.png",
    "revision": "e23fe60fe5a45869176d7513941c57a5"
  }, {
    "url": "images/laitela-icon-dark.svg",
    "revision": "2b5fd24fca4182ab4a692ed27e51b770"
  }, {
    "url": "images/laitela-icon.svg",
    "revision": "bc0c631c64654cff9f6f23c49b8674b6"
  }, {
    "url": "images/loading.png",
    "revision": "3cb05e9791cd626a4848c41f20b7aa48"
  }, {
    "url": "images/noise.png",
    "revision": "cc34590528a0682bbd5e01fc094452a1"
  }, {
    "url": "images/normal achievements.png",
    "revision": "a4737edfcd45213a396706aa50ad70b7"
  }, {
    "url": "images/s1-bg.svg",
    "revision": "9541e09e6f889a121fc94063e1531129"
  }, {
    "url": "images/s12-bg.jpg",
    "revision": "da288dceaafd7c97f1b09c594eac7868"
  }, {
    "url": "images/s12/achievements.png",
    "revision": "061591e119e4a3b1e1afa8187675b7c5"
  }, {
    "url": "images/s12/automation.png",
    "revision": "14ce63f27796e79dea6a1fdf317b23d6"
  }, {
    "url": "images/s12/celestials.png",
    "revision": "0ac92f5fbd5620fd447dc451c07323bd"
  }, {
    "url": "images/s12/challenges.png",
    "revision": "81e8f080b08127f07b2c19cfadebe007"
  }, {
    "url": "images/s12/desktop--discord-logo.png",
    "revision": "1b1a7195da2d4d82363436fc80a43466"
  }, {
    "url": "images/s12/desktop--games.png",
    "revision": "a75c9cc13f951073d3e9996fde374f05"
  }, {
    "url": "images/s12/desktop--windows-media-player.png",
    "revision": "792756f8ad792d420c0174977005d4f0"
  }, {
    "url": "images/s12/dimensions.png",
    "revision": "a0288f5506a9ba34805a8782c64d46b9"
  }, {
    "url": "images/s12/eternity.png",
    "revision": "102aa90dec85a3ee9aadcff9b789bc9a"
  }, {
    "url": "images/s12/game--alkahistorian.png",
    "revision": "33b73683ff84aa1add6ebfd670759093"
  }, {
    "url": "images/s12/game--anti-idle.png",
    "revision": "1a4cecb5e05e9bff276cfdf8a1b37f1f"
  }, {
    "url": "images/s12/game--hex-game.png",
    "revision": "09d52aa87614aac242e05177b276ae3d"
  }, {
    "url": "images/s12/game--melvor-idle.svg",
    "revision": "7533273326e9d796928a5f06ba9c5e77"
  }, {
    "url": "images/s12/game--mine-defense.png",
    "revision": "bd4b1f1ffa4a8559026b613f2239b785"
  }, {
    "url": "images/s12/game--monies2.png",
    "revision": "495628aa624368b3a580323bfbc67234"
  }, {
    "url": "images/s12/game--synergism.png",
    "revision": "db945571e87ca20deb54f50ba7e5a89a"
  }, {
    "url": "images/s12/game--trimps.png",
    "revision": "284e19ae292c0742aafa6898246a3877"
  }, {
    "url": "images/s12/game--universal-paperclips.png",
    "revision": "06e5a31523a20a664d0a74c1cd404102"
  }, {
    "url": "images/s12/game--wami.png",
    "revision": "50838f7fe7c597b7236526af1b577876"
  }, {
    "url": "images/s12/infinity.png",
    "revision": "20bb4df1cc46b00ecd73e5a489143c68"
  }, {
    "url": "images/s12/options.png",
    "revision": "b7eb7f72ee411f77a54158a1012c4b20"
  }, {
    "url": "images/s12/reality.png",
    "revision": "8ef9b5008aa797ef4ef2570f5be4fcc7"
  }, {
    "url": "images/s12/shop.png",
    "revision": "8ccaa6544bd8724def0a622ade78a43c"
  }, {
    "url": "images/s12/statistics.png",
    "revision": "824ac78e1ae0e3f82add4eb8542621c5"
  }, {
    "url": "images/s12/win7-start-menu-inactive.png",
    "revision": "e075309ffb62ba3bbfc67fe0186c5502"
  }, {
    "url": "images/s12/xmark.png",
    "revision": "c717216e1b1734ff05ecfd544da9962b"
  }, {
    "url": "images/s2-bg.svg",
    "revision": "0e839c21226331fdf9ad7810cd035351"
  }, {
    "url": "images/s5-bg.jpg",
    "revision": "0c9a699e8ba475c8c6b26c5071319cd5"
  }, {
    "url": "images/s8-bg.jpg",
    "revision": "08ef0b4db0665133e3a474202aadb451"
  }, {
    "url": "images/secret achievements.png",
    "revision": "3d29b98df207b2f7e338a3c49d39a90e"
  }, {
    "url": "images/snow1.png",
    "revision": "dc4f21e08ee409f3bddc878432467bd8"
  }, {
    "url": "images/snow2.png",
    "revision": "967d3bb6360d3ffb402a9156094e7560"
  }, {
    "url": "images/snow3.png",
    "revision": "2495a079fd000bc82fec34b572c89aad"
  }, {
    "url": "images/stars-bg.png",
    "revision": "95a4eaeff4948e4f646ac61a7920c605"
  }, {
    "url": "images/std_coin.png",
    "revision": "3a3388ccc9076c7d5d598b4d3aa3c86f"
  }, {
    "url": "images/unsmith.png",
    "revision": "541b413cda967aea2df62d80ed62612b"
  }, {
    "url": "img/dark-bg.ed00b71f..png",
    "revision": null
  }, {
    "url": "img/s1-bg.8c293b88..svg",
    "revision": null
  }, {
    "url": "img/s12-bg.7929eed6..jpg",
    "revision": null
  }, {
    "url": "img/s2-bg.c2663f92..svg",
    "revision": null
  }, {
    "url": "img/s5-bg.9bf7e005..jpg",
    "revision": null
  }, {
    "url": "img/s8-bg.8135ae4a..jpg",
    "revision": null
  }, {
    "url": "img/stars-bg.f04db429..png",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "fa67eddb6934d63c8172d474d6851a63"
  }, {
    "url": "js/app.js",
    "revision": "99976ed6a9befeb3bdb8eaf28c15d290"
  }, {
    "url": "js/chunk-vendors.js",
    "revision": "cf8e22f2263eafe2b35b9750b1ee2326"
  }, {
    "url": "manifest.json",
    "revision": "daffb07c34da82f756354028ae18fdc6"
  }, {
    "url": "stylesheets/Barrio-Regular.ttf",
    "revision": "731c0a44aba38e7ce0c1b12b1a5bbc24"
  }, {
    "url": "stylesheets/BlobEmoji-Bold.ttf",
    "revision": "079f63b7bbc8a6e8065b62e97d63c76c"
  }, {
    "url": "stylesheets/MonospaceTypewriter.190830-2211.ttf",
    "revision": "75ff18d5bfc2188301ba13f4c0cdee58"
  }, {
    "url": "stylesheets/MonospaceTypewriter.ttf",
    "revision": "27b6aa171af7946b3aa0cdb12ba44895"
  }, {
    "url": "stylesheets/Runescape.ttf",
    "revision": "b74f2299e526a1cf93f16edd32b0c786"
  }, {
    "url": "stylesheets/ad-slider-component.css",
    "revision": "33d38393a23276b0e234be2eaed1ede3"
  }, {
    "url": "stylesheets/automator.css",
    "revision": "a1031abe6fd4650f7099593b8096e468"
  }, {
    "url": "stylesheets/codemirror/codemirror.css",
    "revision": "acf836b51f7e9ff454419eec4ac3d187"
  }, {
    "url": "stylesheets/codemirror/lint.css",
    "revision": "ab9a241fc1262396b84e23ca8b49d550"
  }, {
    "url": "stylesheets/codemirror/liquibyte.css",
    "revision": "3f8f02d86f68a20738f8b7eca489850a"
  }, {
    "url": "stylesheets/codemirror/panda-syntax.css",
    "revision": "eb541d41427f7a8d0f283be0a3218a30"
  }, {
    "url": "stylesheets/codemirror/show-hint.css",
    "revision": "3d21dc65b3f627a5fd94c50b16536dee"
  }, {
    "url": "stylesheets/cursor.cur",
    "revision": "7ef8b732915a2e24c974da8853c4de6e"
  }, {
    "url": "stylesheets/cursor2.cur",
    "revision": "8cab01afc5cf05b7518212595d5946f7"
  }, {
    "url": "stylesheets/fa-solid-900.ttf",
    "revision": "1ab236ed440ee51810c56bd16628aef0"
  }, {
    "url": "stylesheets/fontawesome/css/all.css",
    "revision": "a42010964efe24441190e229baf1af36"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-brands-400.ttf",
    "revision": "a78ffbbed2d858c61e068e3b756c9988"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-brands-400.woff2",
    "revision": "cd2b4095e9ce66cde642c3502a4022d9"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-regular-400.ttf",
    "revision": "b1a1bebb63656b34a23982706f712f71"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-regular-400.woff2",
    "revision": "e8a1ba418ee6d897d1339ef22e6d8e60"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-solid-900.ttf",
    "revision": "738201559a50502aacabdbdb02720910"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-solid-900.woff2",
    "revision": "55b416a8df21f9f987aa352f10d1343b"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-v4compatibility.ttf",
    "revision": "0d6f5f1852affca569715821fe4aa29b"
  }, {
    "url": "stylesheets/fontawesome/webfonts/fa-v4compatibility.woff2",
    "revision": "786e6b3373bab47e928c81c26eeccb08"
  }, {
    "url": "stylesheets/github-light.css",
    "revision": "a120a528631847b8445b29e96ac63dac"
  }, {
    "url": "stylesheets/glyphs.css",
    "revision": "ca74dc71adfb15dbdc459cc68c7062f5"
  }, {
    "url": "stylesheets/mobile.css",
    "revision": "b139dd9b435349d2c80393891f76a083"
  }, {
    "url": "stylesheets/new-ui-styles.css",
    "revision": "779151dde41ffe307d1a4326d8ef5839"
  }, {
    "url": "stylesheets/old-ui.css",
    "revision": "8cc8eacf960e3e420cf27c6baddc364e"
  }, {
    "url": "stylesheets/styles.css",
    "revision": "e89f8c328b8747e4f576545e494f2922"
  }, {
    "url": "stylesheets/theme-AMOLED Metro.css",
    "revision": "8140a7889e8944f1ccb8b5b19ebd1c94"
  }, {
    "url": "stylesheets/theme-AMOLED.css",
    "revision": "263a4b037bb2d37f1ed6b0787ed1cfef"
  }, {
    "url": "stylesheets/theme-Dark Metro.css",
    "revision": "0f990ab51a39b6e2e61f9c7f531a0cf8"
  }, {
    "url": "stylesheets/theme-Dark.css",
    "revision": "145d30a1d7a9c066a0a318ce45fbf8f3"
  }, {
    "url": "stylesheets/theme-Inverted Metro.css",
    "revision": "e2b13a215787d2cdeecc0245cf163c37"
  }, {
    "url": "stylesheets/theme-Inverted.css",
    "revision": "e902eaa44da33a4cce662ed6ba0831ca"
  }, {
    "url": "stylesheets/theme-Metro.css",
    "revision": "57a1ddd68f957b187239d21d297d6db3"
  }, {
    "url": "stylesheets/theme-S1.css",
    "revision": "a88c3ea1a13ada9c9eaf42095f7b7bdf"
  }, {
    "url": "stylesheets/theme-S10.css",
    "revision": "69d1aba922e3dce739f9b937edf36ff8"
  }, {
    "url": "stylesheets/theme-S11.css",
    "revision": "db40b52d5011649f7f0c92d74f587139"
  }, {
    "url": "stylesheets/theme-S12.css",
    "revision": "1c12c5b4b02681c963822b5aef8897e9"
  }, {
    "url": "stylesheets/theme-S2.css",
    "revision": "7462b4bd58c98bf82acf1a2b1b892916"
  }, {
    "url": "stylesheets/theme-S3.css",
    "revision": "88b8a05f6ad43b59f45cabd2f4f45ea3"
  }, {
    "url": "stylesheets/theme-S4.css",
    "revision": "1cdf86e577c046fe90e3a79efdfb98c0"
  }, {
    "url": "stylesheets/theme-S5.css",
    "revision": "3e419b20f68bccf1ca0ba8d27c8d0b88"
  }, {
    "url": "stylesheets/theme-S6.css",
    "revision": "1c973b47e1810810ea01e2908c4f7f6e"
  }, {
    "url": "stylesheets/theme-S7.css",
    "revision": "dcbe0e7e49e2d79b837509d7eefbbdfa"
  }, {
    "url": "stylesheets/theme-S8.css",
    "revision": "c93010f44c9d8afd9c771a617998aedc"
  }, {
    "url": "stylesheets/theme-S9.css",
    "revision": "22093029ec156d6f3a26ea0d2c8cdea4"
  }, {
    "url": "stylesheets/time-studies.css",
    "revision": "a7de6724502210c10e76d7e31a10e80b"
  }, {
    "url": "stylesheets/tooltips.css",
    "revision": "10c2604168c867650ce0cfa180de895d"
  }, {
    "url": "stylesheets/vis-network.css",
    "revision": "c5d943b816add200a892b973dfd0b81e"
  }, {
    "url": "stylesheets/vue-sfc-classes.css",
    "revision": "0558b1fd89e957e6648f96d621ed459c"
  }, {
    "url": "version.txt",
    "revision": "880d25baaf7f631134da81257a7022f3"
  }], {
    "ignoreURLParametersMatching": [/.*/]
  });
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, new workbox.StaleWhileRevalidate({
    "cacheName": "google-fonts-css",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, new workbox.CacheFirst({
    "cacheName": "google-fonts-webfonts",
    plugins: [new workbox.ExpirationPlugin({
      maxAgeSeconds: 31536000
    })]
  }), 'GET');
  workbox.registerRoute(/\.mp3$/, new workbox.CacheFirst({
    "cacheName": "audio",
    plugins: [new workbox.ExpirationPlugin({
      maxAgeSeconds: 2592000
    })]
  }), 'GET');

}));
//# sourceMappingURL=service-worker.js.map
