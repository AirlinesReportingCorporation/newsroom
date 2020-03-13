//css imports
import "./sass/index.scss";

//js dependency imports
import $ from "jquery";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

require("paroller.js");

Vue.use(BootstrapVue);

var newsroomData = {
  posts: [],
  postIndex: 0,
  mentions: []
};

var releaseArchiveData = {
  posts: [],
  postIndex: 0,
  currentFilter: "all"
};

function setPostData(el) {
  var post = {};
  post.postTitle = el
    .find(".content-block--pageItem__title a")
    .text()
    .trim();

  post.postDate = el
    .find(".content-block--pageItem__metadata li")
    .eq(0)
    .text();

  if (el.find(".content-block--pageItem__metadata li").length > 1) {
    post.postTags = el
      .find(".content-block--pageItem__metadata li")
      .eq(0)
      .text()
      .split(",");
    post.postDate = el
      .find(".content-block--pageItem__metadata li")
      .eq(1)
      .text();
  }

  post.postMonth = post.postDate.split(" ")[0].trim();

  switch (post.postMonth) {
    case "Jan":
      post.postMonth = "January";
      break;
    case "Feb":
      post.postMonth = "February";
      break;
    case "Mar":
      post.postMonth = "March";
      break;
    case "Apr":
      post.postMonth = "April";
      break;
    case "May":
      post.postMonth = "May";
      break;
    case "Jun":
      post.postMonth = "June";
      break;
    case "Jul":
      post.postMonth = "July";
      break;
    case "Aug":
      post.postMonth = "August";
      break;
    case "Sep":
      post.postMonth = "September";
      break;
    case "Oct":
      post.postMonth = "October";
      break;
    case "Nov":
      post.postMonth = "November";
      break;
    case "Dec":
      post.postMonth = "December";
      break;
  }

  post.postDay = post.postDate.split(" ")[1].trim();
  post.postYear = post.postDate.split(" ")[2].trim();

  post.postDate = post.postMonth + " " + post.postDay + " " + post.postYear;

  post.postBody = post.postBody = el
    .find(".content-block--pageItem__body")
    .text();

  var link = el.find(".content-block--pageItem__title a").prop("href");
  var subString = link.substring(link.indexOf("latest/") + 7).replace("/", "");
  if (link.indexOf("arctravelconnect") > -1) {
    subString = link
      .substring(link.indexOf("highlights/") + 11)
      .replace("/", "");
  }

  var imagelink = el.find(".content-block--pageItem__thumb img").prop("src")
    ? el.find(".content-block--pageItem__thumb img").prop("src")
    : "https://www2.arccorp.com/globalassets/_empty.jpg";

  post.postImage =
    'url("' + imagelink + '") center center/cover no-repeat !important';

  post.postLink = link;

  return post;
}

function generateArchive() {
  var maxlength = $(".page-grid .content-block--pageItem").length;
  for (var i = 0; i < maxlength; i++) {
    var post = $(".page-grid .content-block--pageItem").eq(i);
    releaseArchiveData.posts.push(setPostData(post));
  }

  console.log("====================");
  console.log("Archive Loaded")
  console.log("====================");
}

var releaseArchive = new Vue({
  el: ".release-archive",
  data: releaseArchiveData,
  methods: {
    changeFilter: function(filter){
      this.currentFilter = filter;
    },
    showFilter: function(thispost){
      if(this.currentFilter === "all"){
        return true;
      }
      else if(thispost.postYear == this.currentFilter) {
        return true;
      }
      else {
        return false;
      }
    }
  }
});

generateArchive();
