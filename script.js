const api_key = "AIzaSyAjThLmYxlSh_jVkX_uKjcFWjw5pskiPlE";

const video_http = "https://www.googleapis.com/youtube/v3/videos?";

let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

const videoCardContainer = document.querySelector('.video-container')

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 62,
    regionCode: 'IN'
})).then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
        // console.log(data);
    }).catch(error => console.log(error))

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    })).then(res => res.json())
        .then(data => {
            // console.log(data)
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data);
            makeVideoCard(video_data);
        })
}
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name" ${data.snippet.channelTitle}></p>
                </div>
            </div>
        </div>
    `;
}

const searchInput = document.querySelector('.search-bar');

const searchBtn = document.querySelector('.search-btn');

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})