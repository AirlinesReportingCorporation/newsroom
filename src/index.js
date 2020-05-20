//css imports
import "./sass/index.scss";

//js dependency imports
import $ from "jquery";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

var newsroomData = {
  posts: [],
  postIndex: 0,
  mentions: [],
  mentionIndex: 0
};

var releaseArchiveData = {
  posts: []
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

function setMentions(el) {
  var mention = {};

  var elString = el.html();

  var stringArray = elString.split("<br>");

  mention.mentionTitle = el.find("a").text();
  mention.mentionSource = stringArray[1].trim().replace("</a>", "");
  mention.mentionDate = stringArray[2].trim();
  mention.mentionLink = el.find("a").attr("href");

  return mention;
}

function generateNewsroom() {
  var maxlength = $(".page-grid .content-block--pageItem").length;

  var mentionLength = $(".media-mentions .rtf p").length;

  for (var i = newsroomData.postIndex; i < 6; i++) {
    var post = $(".page-grid .content-block--pageItem").eq(i);
    newsroomData.posts.push(setPostData(post));
  }

  newsroomData.postIndex += 6;

  for (var i = 0; i < mentionLength; i++) {
    var mention = $(".media-mentions .rtf p").eq(i);
    newsroomData.mentions.push(setMentions(mention));
  }

  return post;
}

function generateMoreNewsroom() {
  var maxlength = $(".page-grid .content-block--pageItem").length;

  console.log(newsroomData.postIndex);

  var endofposts = newsroomData.postIndex + 6 >= maxlength;

  console.log(endofposts);

  var nextIndex = endofposts ? maxlength : newsroomData.postIndex + 6;

  if (endofposts) {
    $(".newsroom-content .ctaBtn").hide();
  }

  for (var i = newsroomData.postIndex; i < nextIndex; i++) {
    var post = $(".page-grid .content-block--pageItem").eq(i);
    newsroomData.posts.push(setPostData(post));
  }

  newsroomData.postIndex += 6;

  return post;
}

var newsroom = new Vue({
  el: ".newsroom",
  data: newsroomData,
  methods: {
    showThumbnail: function(post) {
      if (post.postImage === undefined || post.postImage == undefined) {
        return "noImage";
      } else if (post.postImage.indexOf("empty") > -1) {
        return "noImage";
      }
      return "";
    },
    showMoreNews: function() {
      generateMoreNewsroom();
    }
  }
});

generateNewsroom();
