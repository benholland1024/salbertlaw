<template>
<div class="flex-content main-content">

  <div class="left-side-content">
    
    <div class="red-quote" v-if="pageData && pageData.red_text">
      {{ $prismic.richTextAsPlain(pageData.red_text)}}
    </div>
    <div class="page-content" v-if="pageData">
      <prismic-rich-text v-if="pageData.main_text" :field="pageData.main_text"/>

      <div v-for="post in sortedBlogData" v-if="sortedBlogData && sortedBlogData[0].blog_date">
        <div class="red-quote" style="padding-left: 0px;padding-bottom:0px;"
        v-if="post.blog_post_title && post.blog_post_title[0]"> 
                              <!-- Inline styling overrides .red-quote-->
          {{post.blog_post_title[0].text}}
        </div>
        <div class="red-date">
          {{ months[new Date(post.blog_date).getMonth()]}}
          {{new Date(post.blog_date).getDate()}},
          {{new Date(post.blog_date).getFullYear()}}
        </div>
        <prismic-rich-text :field="post.blog_content"></prismic-rich-text>
      </div>
      
    </div>

  </div>

  <div class="right-side-content">
    <div class="map raised-container drop-shadow" v-if="map">
      <h3 v-if="map.map_title[0]">{{map.map_title[0].text}}</h3>
      <img :src="map.map_image.url">
    </div>

    <div class="map-subtitle drop-shadow " v-if="map && mapContent.items && mapContent.items[0].icon_title[0]">
      <div v-for="mapItem in mapContent.items" v-if="mapItem.icon_title[0]">
        <img :src="mapItem.map_icon.url">
        <div>
          <p class="b">{{mapItem.icon_title[0].text}}</p>
          <prismic-rich-text :field="mapItem.icon_description1"></prismic-rich-text>
        </div>
      </div>
    </div>

    <div class="contact-marker raised-container" v-if="!map && rightData">
      <p class="b">{{rightData.primary.contact_us_card_title[0].text}}</p>
      <p class="additional-contact" style="opacity:.7;">
        <prismic-rich-text :field="rightData.primary.contact_us_card_text"></prismic-rich-text>
      </p>
      <br>
    </div>

    <div class="contact-marker raised-container" v-else-if="!map && contactInfo">
      <p class="b">Contact Us</p>
      <p class="address-line">{{contactInfo.address_line_1[0].text}}</p>
      <p class="address-line">{{contactInfo.address_line_2[0].text}}</p>
      <p class="address-line">{{contactInfo.address_line_3[0].text}}</p>
      <br>
      <p class="additional-contact">TEL: {{contactInfo.phone[0].text}}</p>
      <p class="additional-contact">
        Email: <a :href="'mailto: ' + contactInfo.email[0].text">{{contactInfo.email[0].text}}</a>
      </p>
      <br>
    </div>

    <div class="areas-of-expertise-links" v-if="!map && rightData">
      <p class="b">{{rightData.primary.success_stories_card_title[0].text}}</p>
      <hr style="margin-top: 0px;margin-bottom:20px;">
      <prismic-rich-text :field="rightData.primary.success_stories_card_text" class="custom-text"></prismic-rich-text>
      <br>
    </div>
  
  <!-- The default "areas of expertise" box-->
    <div class="areas-of-expertise-links" v-if="!map && !rightData"> 
      <p class="b">Areas of Expertise:</p> 
      <hr style="margin-top: 0px;margin-bottom:20px;">
      <router-link tag="div" to="/business-litigation">
        Business Litigation →
      </router-link>
      <router-link tag="div" to="/employment-litigation">
        Employment Litigation →
      </router-link> 
      <router-link tag="div" to="/product-liability-litigation">
        Product Liability Litigation →
      </router-link>
      <router-link tag="div" to="/personal-injury-litigation">
        Personal Injury Litigation →
      </router-link>
      <router-link tag="div" to="/real-estate-litigation">
        Real Estate Litigation →
      </router-link>
      <router-link tag="div" to="/healthcare-litigation">
        Healthcare Litigation →
      </router-link>
      <br>
    </div>
  </div>

</div>

</template>

<script>

 
export default {
  data() {
    return {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  },
  props: {
    pageData: { // Main content on all pages
      type: Object
    },
    blogData: { // Data for blog type pages
      type: Array
    },
    mapContent: { // Optional map data
      type: Object
    },
    rightData: { // Will fill the blue box. Optional. 
      type: Object
    },
    contactInfo: { // Static contact data (Address, phone, etc)
      type: Object
    },

  },
  computed: {
    map() {
      
      if (this.mapContent && this.mapContent.primary)
        return this.mapContent.primary;
      else 
        return null
    },
    sortedBlogData() {
      var sortedArray = this.blogData;
      sortedArray.sort(function(a,b){
        // Turn strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.blog_date) - new Date(a.blog_date);
      });
      return sortedArray;
    }
  },

  mounted() {
    
  }
}
</script>

<style lang="scss">
@import '@/ContentStyling.scss';
.block-img img {
    width: 100%;
    float: right;
    margin: 10px;
    margin-bottom: 20px;
}

</style>