<template>
  <div id="header-frame">

    <router-link tag="div" id="logo" to="home">
      <img src="@/assets/albert_logo.png">
    </router-link>
    <div id="call-us" v-if="contact_info && contact_info.phone[0]">
      <p style="opacity:.5;">Call Us:</p>
      <a :href="'tel:' + contact_info.phone[0].text" style="font-weight: bold;opacity:.8;color:#383838;text-decoration:none">
        {{contact_info.phone[0].text}}
      </a>
    </div>

    <div id="menu-options-container">
      <!-- Technically empty, the menu is below -->
    </div>

    <div id="menu-options" class="non-desktop-menu-options">
      <router-link tag="div" class="menu-opt" to="/">
        Menu <img src="@/assets/hamburger_icon.png" width="10px" style="margin-left: 10px;">
        <div class="dropdown-menu" id="main-dropdown">
          <router-link tag="div" class="menu-opt" to="/firm-overview">
            Firm Overview
          </router-link>
          <router-link tag="div" class="menu-label" to="/">
            Professionals ▾
          </router-link>
          <div class="sub-menu">
            <router-link tag="div" class="menu-opt" to="/steven-w-albert">
              Steven Albert 
            </router-link>
            <router-link tag="div" class="menu-opt" to="/nicholas-holland">
              Nicholas Holland 
            </router-link>
            <router-link tag="div" class="menu-opt" to="/andrew-peterson">
              Andrew Peterson
            </router-link>
            <router-link tag="div" class="menu-opt" to="/rebecca-cimino">
              Rebecca Cimino
            </router-link>
          </div>
          <div class="menu-label">
            Areas of Expertise ▾
          </div>
          <div class="sub-menu">
            <router-link tag="div" class="menu-opt" to="/business-litigation">
              Business Litigation
            </router-link>
            <router-link tag="div" class="menu-opt" to="/employment-litigation">
              Employment Litigation
            </router-link>
            <router-link tag="div" class="menu-opt" to="/product-liability-litigation">
              Product Liability Litigation
            </router-link>
            <router-link tag="div" class="menu-opt" to="/personal-injury-litigation">
              Personal Injury Litigation
            </router-link>
            <router-link tag="div" class="menu-opt" to="/real-estate-litigation">
              Real Estate Litigation
            </router-link>
            <router-link tag="div" class="menu-opt" to="/healthcare-litigation">
              Healthcare Litigation
            </router-link>
          </div>
          <router-link tag="div" class="menu-opt" to="/our-work">
            Our Work
          </router-link>
          <router-link tag="div" class="menu-opt" to="/updated-legal-issues">
            Updated Legal Issues
          </router-link>
          <router-link tag="div" class="menu-opt" to="/contact-us">
            Contact Us
          </router-link>
        </div>
      </router-link>
    </div>

    <div id="menu-options" class="desktop-menu-options">
      <router-link tag="div" class="menu-opt" :to="{name: 'frame', params: {pageID: 'firm-overview'} }">
        Firm Overview
      </router-link>
      <div class="menu-opt" >
        Professionals ▾
        <div class="dropdown-menu">
          <router-link tag="div" class="menu-opt" to="/steven-w-albert">
            Steven Albert 
          </router-link>
          <router-link tag="div" class="menu-opt" to="/nicholas-holland">
            Nicholas Holland 
          </router-link>
          <router-link tag="div" class="menu-opt" to="/andrew-peterson">
            Andrew Peterson
          </router-link>
          <router-link tag="div" class="menu-opt" to="/rebecca-cimino">
            Rebecca Cimino
          </router-link>
        </div>
      </div>
      <div class="menu-opt">
        Areas of Expertise ▾
        <div class="dropdown-menu">
          <router-link tag="div" class="menu-opt" to="/business-litigation">
            Business Litigation
          </router-link>
          <router-link tag="div" class="menu-opt" to="/employment-litigation">
            Employment Litigation
          </router-link>
          <router-link tag="div" class="menu-opt" to="/product-liability-litigation">
            Product Liability Litigation
          </router-link>
          <router-link tag="div" class="menu-opt" to="/personal-injury-litigation">
            Personal Injury Litigation
          </router-link>
          <router-link tag="div" class="menu-opt" to="/real-estate-litigation">
            Real Estate Litigation
          </router-link>
          <router-link tag="div" class="menu-opt" to="/healthcare-litigation">
            Healthcare Litigation
          </router-link>
        </div>
      </div>
      <router-link tag="div" class="menu-opt" to="/our-work">
        Our Work
      </router-link>
      <router-link tag="div" class="menu-opt" to="/updated-legal-issues">
        Updated Legal Issues
      </router-link>
      <router-link tag="div" class="menu-opt" to="/contact-us">
        Contact Us
      </router-link>
    </div>

    <div id="image-banner">
      
      <div id="image-banner-shadow"></div>
      <div id="banner-image-container">
        <img id="banner-image" v-if="header && header.primary" :src="header.primary.banner_image.url">
      </div>
      <h1 v-if="header && header.primary && header.primary.white_text">{{header.primary.white_text[0].text}}</h1>
    </div>

    <div id="content">
      <content-template
        v-if="left_content"
        :pageData="left_content.primary"
        :blogData="left_content.items"
        :rightData="right_content"
        :mapContent="map_content"
        :contactInfo="contact_info"
      ></content-template>
    </div>

    <div id="expertise-footer">
      <div class="area-of-expertise">
        <h3>Business Litigation</h3>
        <h4>SOLVING BUSINESS DISPUTES</h4>
        <p>For 40 years, Mr. Albert has successfully represented public companies and privately held corporations in a variety of business disputes.</p>
        <router-link to="/business-litigation">LEARN MORE  →</router-link>
      </div>
      <div class="area-of-expertise">
        <h3>Employment Litigation</h3>
        <h4>EMPLOYEE AND EMPLOYER REPRESENTATION</h4>
        <p>Mr. Albert has extensive experience in creating policies and representing employers and employees.</p>
        <router-link to="/employment-litigation">LEARN MORE  →</router-link>
      </div>
      <div class="area-of-expertise">
        <h3>Product Liability Litigation</h3>
        <h4>REPRESENTING COMPANIES AND INDIVIDUALS</h4>
        <p>Mr. Albert has successfully represented private and public corporations as well as individuals in product liability litigation.</p>
        <router-link to="/product-liability-litigation">LEARN MORE  →</router-link>
      </div>
    </div>

    <div id="footer" v-if="contact_info">
      <p>© 2019 The Albert Law Firm. All rights reserved.	</p>
      <p>{{contact_info.address_line_1[0].text}} &nbsp; 
      {{contact_info.address_line_2[0].text}} &nbsp; 
      {{contact_info.address_line_3[0].text}} &nbsp; 
      T: <a :href="'tel:' + contact_info.phone[0].text" style="color: #CBCCCE;text-decoration:none;">
        {{contact_info.phone[0].text}}
      </a> &nbsp;  <a :href="'mailto: ' + contact_info.email[0].text" style="color: #CBCCCE">
      {{contact_info.email[0].text}}
      </a></p>
    </div>

  </div>
</template>

<script>
import ContentTemplate from '@/views/ContentTemplate.vue';
import * as content from '@/content';

export default {
  name: 'home',
  data() {
    return {
      header: null,
      left_content: null,
      right_content: null,
      map_content: null,

      contact_info: null
    }
  },

  // This code makes more sense than the watch function below, but somehow breaks the router links?
  //
  // beforeRouteUpdate (to, from, next) {
  //   this.refreshPageData(to.params.pageID);
  // },

  watch: {
    '$route': function (to, from) {
      this.refreshPageData(to.params.pageID);
    }
  },
  mounted() {
    this.refreshPageData(this.$route.params.pageID);
    this.getContactInfo();
  },
  methods: {
    getContactInfo() {
      this.contact_info = content.getContactInfo().data;
    },
    refreshPageData(pageID) {
      this.left_content = {}
      this.header = {}
      this.map_content = {}

      const document = content.getPage(pageID);
      if (!document) {
        console.log("Page not found.");
        this.$router.push('/')
        return;
      }
      let doc_data = document.data.body;
      this.left_content = doc_data.find(o => o.slice_type === 'left_content');
      this.right_content = doc_data.find(o => o.slice_type === 'right_content');
      this.header = doc_data.find(o => o.slice_type === 'header');
      this.map_content = doc_data.find(o => o.slice_type === 'map_content');
    },
  },
  components: {
    ContentTemplate
  }
}
</script>

<style scoped lang="scss">
@import "~@/GlobalVars.scss";

$margin-size: 20%;
$content-size: calc(100% - (2 * #{$margin-size}));
$mobile-margin-size: 5%;
$mobile-content-size:  calc(100% - (2 * #{$mobile-margin-size}));

#header-frame {
  text-align: left;
  position: absolute;
  display: grid;
  grid-template-rows: 120px 30px 300px 1fr auto 50px;
  grid-template-columns: $margin-size $content-size $margin-size;
  grid-template-areas: 
    "margin-top   margin-top    margin-top"
    "menu-options menu-options  menu-options"
    "banner-image banner-image  banner-image"
    "margin-left  content       margin-right"
    "expertise    expertise     expertise"
    "footer       footer        footer";
  left: 0;
  top: 0;
  width: 100%;
  overflow-x: hidden;
  min-height: 100%;
  @media screen and (max-width: $md-bp) {
    grid-template-rows: 80px 30px 200px 1fr 500px 100px;

    grid-template-columns: 5% 90% 5%;
  }
}
#menu-options-container {
  background: $light-gray;
  box-shadow: $inset-box-shading;
  grid-row: 2 / 3;
  grid-column: 1 / 4;
  width: 120%;
  height: 100%;
  margin-left: -5%;
  color: black;
}
.router-link-active {
  color: $red;
  font-weight: bold;
}
#menu-options {
  grid-row: 2/3;
  grid-column: 2/3;
  // padding-left: 350px;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  div {
    font-size: 12px;
    color: $dark-gray;
    cursor: pointer;
    text-decoration: none;
    font-weight: bold;
    height: 100%;
    display: flex; // Needed to make the entire section clickable, not just the literal text
    align-items: center;
    position: relative;

    .dropdown-menu {
      display: block;
      position: absolute;
      z-index: 100;
      top: 100%;
      width: 180px;
      display: none;
      opacity: .9;

      div {
        background: $light-gray;
        padding: 0px 10px;
        margin: 0px;
        border: solid 1px $gray;
      }
      div:hover:not(.menu-label) {
        background: $gray;
      }
    }
    .menu-label {
      color: $gray;
      border-bottom: none !important;
      cursor: default;
    }
    .sub-menu {
      display: flex;
      flex-direction: column;
      align-items: end;
      height: auto;
      padding: 0px !important; // Overriding padding in  .dropdown-menu div
      margin: 0px;
      border: none !important; // Overriding border in  .dropdown-menu div
      div {
        padding: 5px;
        padding-right: 20px;
        margin: 0px;
        width: calc(100% - 25px);
        border: none;
      }
    }
  }
  div:hover:not(.menu-label ) {
    color: $red;
    .dropdown-menu {
      display: block;
    }
  }
}

.desktop-menu-options {
  justify-content: space-around;
  @media screen and (max-width: $md-bp) {
    display: none !important;

  }
}
.non-desktop-menu-options {
  justify-content: flex-end;
  
  @media screen and (min-width: $md-bp) {
    display: none !important;
  }
}
#main-dropdown {
  right: 0px;
  opacity: 1 !important;
  div {
    justify-content: flex-end; // Right aligning text in this dropdown
  }
}

#logo {
  cursor: pointer;
  opacity: 1;
  grid-column: 2/3;
  grid-row: 1/4;
  // width: 200px;
  height: 65px;
  z-index: 101;
  padding: 40px 25px 0px 15px;
  img {
    height: 50px;
  }
  @media screen and (max-width: $md-bp) { 
    min-width: 150px;
    height: 60px;
    margin-left: 0px;
    padding: 20px 25px 0px 25px;
    img {
      height: 35px;
    } 
  }
}
#call-us {
  grid-column: 2/3;
  grid-row: 1/4;
  position: absolute;
  right: 20px;
  top: 40px;
  font-size: 20px;
  p {
    margin: 0px;
    font-size: 17px;
  }
  @media screen and (max-width: $md-bp) { 
    display:none;
  }
}
#image-banner {
  background: $dark-gray;
  grid-area: banner-image;
  overflow-y: hidden;
  position: relative;

  h1 {
    position: absolute;
    bottom: -10px;
    font-size: 40px;
    text-shadow: 0px 0px 10px rgba(0,0,0,.4);
    font-weight: bolder;
    max-width: 50%;
    left: 22%;
    margin: 0px;
    color: white;
    font-family: Verdana;
    @media screen and (max-width: $md-bp) {
      left: 10%;
    }
  }
}
#image-banner-shadow {
  box-shadow: $heavy-inset-box-shading;
  position: absolute;
  width: 100%;
  height: 100%; 
}
#banner-image-container {
  height: 100%;
  width: $content-size;
  margin-left: $margin-size;
  overflow: hidden;
  img {
    min-width: 100%;
  }
  @media screen and (max-width: $md-bp) {
    width: $mobile-content-size;
    margin-left: $mobile-margin-size;
  }
}
#banner-image {
  min-height: 100%;
}

#content {
  grid-area: content;
  padding: 10px;
  display: flex;
  padding-bottom: 100px;
}

#expertise-footer {
  background: $light-gray;
  grid-area: expertise;
  padding: 0px $margin-size;
  width: $content-size;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: $md-bp) {
    width: $mobile-content-size;
    padding-left: $mobile-margin-size;
    flex-direction: column;
  }
}
.area-of-expertise {
  border-top: 8px solid $red;
  padding: 20px;
  width: calc(30% - 40px);
  @media screen and (max-width: $md-bp) {
    width: auto;
  }

  h3 {
    color: $red;
    margin: 0px;
  }
  h4 {
    margin-top: 0px;
    font-size: 10px;
  }
  p {
    font-size: 12px;
    margin: 0px;
  }
  a {
    color: $red;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
  }
  a:hover {
    text-decoration: underline;
  }
}

#footer {
  grid-area: footer;
  background: $dark-gray;
  padding: 0px $margin-size;
  width: $content-size;
  color: $gray;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: space-between;
  @media screen and (max-width: $md-bp) { 
    flex-direction: column;
    align-items: flex-start;
    width: $mobile-content-size;
    padding: 0px $mobile-margin-size;
  }
}

.active-link {
  color: $red;
}
</style>