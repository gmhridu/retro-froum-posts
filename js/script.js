const allPosts = document.getElementById("all-post");
const getReadData = document.getElementById("get-read-data");
const clickedCountElement = document.getElementById("clicked-count");
let clickedCount = parseInt(clickedCountElement.innerText);
const categorySearchBtn = document.getElementById("category-search-btn");
const categoryInput = document.getElementById("category-input");
const latestPost = document.getElementById("latest-post-load");

let postData;

const allPostsData = async () => {
  document.getElementById('load-spinner').classList.remove('hidden');
  setTimeout(async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    postData = await response.json();
    renderPosts(postData.posts);

    document.getElementById('load-spinner').classList.add('hidden');
  },2000);

};

const renderPosts = (posts) => {
  allPosts.innerHTML = "";
  posts.forEach((item, index) => {
    document.getElementById("load-spinner").classList.add("hidden");
    const post = document.createElement("div");
    const buttonId = `read-btn-${index}`;

    post.innerHTML = `
    <div id="change-bg-selected" class="flex flex-col md:flex-row space-y-5 gap-10 md:gap-6 bg-[#F3F3F5] hover:cursor-pointer rounded-3xl p-[2.2rem] md:p-10 lg:p-[4.5rem]">
      <div class="relative">
        <div id="status-activity" class="bg-[${
          item.isActive ? "#10B981" : "#FF3434"
        }] w-[1.16669rem] h-[1.16669rem] rounded-full absolute top-[13px] right-[-5px]"></div>
        <div class="mt-4">
          <img class="w-full md:w-[4.5rem] md:h-[4.5rem] rounded-full md:rounded-2xl" src="${
            item.image
          }" alt=""/>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex gap-4 md:gap-8">
          <p class="font-inter text-[0.875rem] font-medium text-[#12132DCC] text-nowrap"># <span>${
            item.category
          }</span></p>
          <p class="font-inter text-[0.875rem] font-medium text-[#12132DCC] text-nowrap">Author : <span>${
            item.author.name
          }</span></p>
        </div>
        <div class="flex flex-col space-y-2">
          <h2 id="clicked-to-get-title" class="font-mulish text-base md:text-xl font-bold text-[#12132D]">${
            item.title
          }</h2>
          <p class="font-inter text-xs md:text-base font-normal text-[#12132D99] border-b-2 border-dashed pb-3">${
            item.description
          }</p>
        </div>
        <div class="flex justify-around md:gap-5 md:justify-between mt-3">
          <div class="flex gap-2 lg:gap-5">
            <div class="flex md:gap-2 lg:gap-4">
              <img class="w-[1.75rem] h-[1.75rem]" src="./image/messages.png" alt=""/>
              <p class="font-inter text-base font-normal text-[#12132D99]">${
                item.comment_count
              }</p>
            </div>
            <div class="flex gap-2 lg:gap-4">
              <img class="w-[1.75rem] h-[1.75rem]" src="./image/eye.png" alt=""/>
              <p id="get-view-count" class="font-inter text-base font-normal text-[#12132D99]">${
                item.view_count
              }</p>
            </div>
            <div class="flex gap-2 lg:gap-4">
              <img class="w-[1.75rem] h-[1.75rem]" src="./image/timeer.png" alt=""/>
              <p class="font-inter text-base font-normal text-[#12132D99] text-nowrap"><span>${
                item.posted_time
              }</span> min</p>
            </div>
          </div>
          <div>
            <button id="${buttonId}" class="read-btn">
              <img class="w-[1.75rem] h-[1.75rem] hover:cursor-pointer" src=${"./image/mail.png"} alt=""/>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

    allPosts.appendChild(post);

    document.getElementById(buttonId).addEventListener("click", () => {
      const title = post.querySelector("#clicked-to-get-title").innerText;
      const viewCount = post.querySelector("#get-view-count").innerText;

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="bg-white shadow p-7 lg:p-7 flex justify-around items-center md:gap-2 rounded-2xl">
          <h4 id="get-clicked-title" class="font-mulish text-base font-semibold text-[#12132D]">${title}</h4>
          <div class="flex gap-1">
            <img class="w-[1.75rem] h-[1.75rem]" src="./image/watch-eye.png" alt=""/>
            <p class="font-inter text-base font-normal text-[#12132D99]">${viewCount}</p>
          </div>
        </div>
      `;

      getReadData.appendChild(div);

      const isActivity = post.querySelector("#status-activity");
      if (isActivity.innerText === "false") {
        isActivity.classList.remove("bg-[#10B981]");
        isActivity.classList.add("bg-[#FF3434]");
      }
      else {
        isActivity.classList.remove("bg-[#FF3434]");
        isActivity.classList.add("bg-[#10B981]");
      }

      const bgChangedBySelected = post.querySelector("#change-bg-selected");
      bgChangedBySelected.addEventListener("click", () => {
        bgChangedBySelected.classList.remove("bg-[#F3F3F5]");
        bgChangedBySelected.classList.add("bg-[#797DFC1A]");
      });

      clickedCount++;
      clickedCountElement.innerText = clickedCount;
    });
  });
};

const searchData = async (category) => {
  document.getElementById("load-spinner").classList.remove("hidden");
  setTimeout(async () => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
    const data = await response.json();
    renderPosts(data.posts);
    document.getElementById("load-spinner").classList.add("hidden");
  }, 2000);
};


categorySearchBtn.addEventListener("click", () => {
  if (!postData) {
    return;
  }
  const categoryName = categoryInput.value;
  // console.log(categoryName);
  searchData(categoryName);
});

const latestPostSection = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();
  data.forEach((item) => {
    const latestPostsContainer = document.createElement("div");

    latestPostsContainer.innerHTML = `
    <div  class="card bg-white shadow-2xl">
              <figure class="px-4 pt-4">
                <img class="w-11/12 h-[11.875rem] rounded-3xl"
                  src="${item.cover_image}"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body gap-4">
                <div class="flex gap-3">
                  <img src="./image/dates-icon.png" alt="" />
                  <p class="font-mulish text-base font-normal text-[#12132D99]">
                    ${
                      item?.author?.posted_date
                        ? item.author.posted_date
                        : "No date available!"
                    }
                  </p>
                </div>

                <h2
                  class="card-title font-mulish text-xl font-extrabold text-[#12132D]"
                >
                  ${item.title}
                </h2>
                <p class="font-mulish text-base font-normal text-[#12132D99]">
                  ${item.description}
                </p>
                <div class="card-actions flex gap-3">
                  <div>
                    <img class="w-11 h-11 rounded-full" src="${
                      item.profile_image
                    }" alt="" />
                  </div>
                  <div>
                    <h5 class="font-mulish text-base font-bold text-[#12132D]">
                      ${item.author.name}
                    </h5>
                    <p
                      class="font-mulish text-[0.875rem] font-normal text-[#12132D99]"
                    >
                      ${item?.author?.designation? item.author.designation : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
    `;

    latestPost.appendChild(latestPostsContainer);
  });
}

latestPostSection();
allPostsData();
