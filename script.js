document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".video-slider", {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

const videoLinks = document.querySelectorAll(".video-link");
videoLinks.forEach(function (videoLink) {
  videoLink.addEventListener("click", function (e) {
    e.preventDefault();
    const videoId = this.getAttribute("data-video-id");
    openVideoModal(videoId);
  });
});

function openVideoModal(videoId) {
  const modal = document.getElementById("videoModal");
  const closeButton = modal.querySelector(".close");
  const vimeoPlayer = document.getElementById("vimeoPlayer");

  closeButton.onclick = function () {
    modal.style.display = "none";
    const player = new Vimeo.Player(vimeoPlayer);
    player.pause();
  };

  modal.style.display = "block";
  getVimeoVideo(videoId);
}

function getVimeoVideo(videoId) {
  const idVideo = "824804225";
  const apiUrl = "https://api.vimeo.com/videos/" + idVideo;
  const accessToken = "b7eab49fe5692df24daf684bda9d6d35";

  fetch(apiUrl, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const player = new Vimeo.Player(vimeoPlayer, {
        id: videoId,
        autoplay: true,
      });
    })
    .catch((error) => {
      console.log("Error", error);
    });
}
