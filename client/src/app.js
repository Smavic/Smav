// $("#registerForm").hide()
$(".container-login").hide()
$(".homepage").show()

var $err = ""

$('.movie-search').on('click', function(event) {
    event.preventDefault()
    display('moviePage')
})

$('#movie-search-input').on('click', function(event) {
    event.preventDefault()
    var word = $("#movie-search-key").val()
    movieSearch(word)
})
$('.anime-search').on('click', function(event) {
    event.preventDefault()
    display('animePage')
})
$('.tvshow-search').on('click', function(event) {
    event.preventDefault()
    display('tvshowPage')
})
$('.toFavoritePage').on('click', function(event) {
    event.preventDefault()
    display('favoritePage')
})
$('.frontPage').on('click', function(event) {
    event.preventDefault()
    display('top-movie')
    tvShowListHome()
})
$('#movie-search').on('submit', function(event) {
    event.preventDefault()
})
$('#anime-search').on('submit', function(event) {
    event.preventDefault()

})
$('#tvshow-search').on('submit', function(event) {
    event.preventDefault()
    console.log('woi')
    let str = $('#tvshow-search').find('#tvshow-search-key').val()
    getTvShowList(str)
})

$('#loginForm').on('submit', function (event) {
    event.preventDefault()
    var email = $(".email").val()
    var password = $(".password").val()
    console.log('wooe')
    console.log(email, password)
    loginUser(email, password)
})

$('#registerForm').on('submit', function (event) {
    event.preventDefault()
    var nameRegister = $(".name").val()
    var emailRegister = $(".emailRegister").val()
    var passwordRegister = $(".passwordRegister").val()
    registerUser(nameRegister, emailRegister, passwordRegister)
})

$('.register-click').on('click', function(event) {
    $('#loginForm').hide()
    $("#registerForm").show()
})

$('.back-login').on('click', function(event) {
    $('#loginForm').show()
    $("#registerForm").hide()
})

function addToFavorite(title,premiered,genres,image){
    console.log(title,premiered,genres,image)
    $.ajax({
      url: "http://localhost:3000/user/favorite",
      method: "POST",
      headers: {token: localStorage.token},
      data: { 
        title: title,
        // summary: summary,
        premiered: premiered,
        genres: genres,
        image: image
      }
    })
    .done(result=>{
      console.log('berhasil add')
    })
    .fail(err=>{
      console.log('gagal add')
    })
}

function checkLogin(){
    console.log("set");
    
    if(localStorage.getItem("token")){
        $('.container-login').hide()
        $('.homepage').show()
        console.log('masuk check login')
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/movie/'
        })
        .done(response => {
            console.log(response)
            for(let i = 0; i < response.length; i++){
                let item = `<div style=" margin-right: 2rem; display: flex; flex-direction: column;">
                <img src="https://image.tmdb.org/t/p/w500/${response[i].picture}" alt="" style="width: 10rem;">
                <span>${response[i].name}</span>
            </div>`
                $('.card-movie').append(item)
            }
        })
        .fail(err => {
            console.log(err)
        })
    } else {
        $('.homepage').show()
        tvShowListHome()
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        checkLogin()
        console.log('User signed out.');
    });
}

function registerUser(name, email, password){
    console.log(name)
    console.log(email)
    console.log(password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
            name,
            email,
            password 
        }
    })
    .done(response => {
        console.log(response)
        $('#loginRegister').hide()
    })
    .fail(err => {
        console.log(err)
        $('.error').text(err.responseJSON.errors).show()
        setTimeout(() => {
            $('.error').hide() 
        }, 1000);
    })
}

function loginUser(email, password) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
            email,
            password 
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('token', response.token)
        checkLogin()
    })
    .fail(err => {
        console.log(err)
        $('.error').text(err.responseJSON.errors).show()
        setTimeout(() => {
            $('.error').hide() 
        }, 1000);
    })
}
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/loginGoogle",
        cache: false,
        data: {
            googleToken: id_token
        }
    })
    .done(response => {
        console.log('berhasil login dengan google')
        console.log(response)
        localStorage.setItem('token', response.token)
        checkLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

function tvShowListHome(){
    $('.card-tv').empty()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/tv/homepage'
    })
    .done(list => {
        for(let i = 0; i < list.length; i++){
            console.log(list[i].img.medium)
            let item = `<div class="card-homepage" style="background-image: url(${list[i].img.medium});">
                        </div>`
            $('.card-tv').append(item)
        }
    })
    .fail(err => {
        console.log(err)
    })   
}

function movieSearch(word) {
    $('.movies-list').empty()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/movie/search",
        cache: false,
        data: {
            search: word
        }
    })
    .done(response => {
        for(let i = 0; i < response.length; i++){
            let item = `<div class="card-movie-search" style=" margin-right: 2rem; display: flex; flex-direction: column;">
            <img src="https://image.tmdb.org/t/p/w500/${response[i]["poster_path"]}" alt="" style="width: 10rem;">
            <span>${response[i].title}</span>
        </div>`
            $('.movies-list').append(item)
        }
    })
    .fail(err => {
        console.log(err)
    })
}

function tvShowList(list){
    $('.tvshow-list').empty()
    for(let i = 0; i < list.length; i++){
        let title = String(list[i].title)
        // let summary = String(list[i].summary)
        let premiered = String(list[i].premiered.substring(0,4))
        let genres = String(list[i].genres)
        let img = String(list[i].img.medium)
        let item = `<div class="card-tv-list">
                        <div class="card-tv-mini1" style="background-image: url(${list[i].img.medium});">
                        </div>
                        <div class="card-tv-mini2">
                            <p class="title">${list[i].title}</p>
                            <p class="year">${list[i].premiered.substring(0,4)}</p>
                            <button class="btn btn-danger add-to-fav">Add To Favorite</button>
                        </div>
                    </div>`
        let $item = $(item);
        $item.on('click', '.add-to-fav', function(){
            addToFavorite(title,premiered,genres,img);
        })
        $('.tvshow-list').append($item)
    }
}

function display(page){
    let pages = ['moviePage','animePage','tvshowPage','top-movie','container-login','favoritePage']
    for(let i = 0; i < pages.length; i++){
        if(page == pages[i]){
            $(`.${pages[i]}`).show()
        }else{
            $(`.${pages[i]}`).hide()
        }
    }
}

function getTvShowList(str){
    console.log(str)
    // console.log('a')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/tv/search',
        data: {
            searchKey: str
        }
    })
    .done(response => {
        // console.log(response)
        tvShowList(response)
    })
    .fail(err => {
        console.log(err)
        $('.error').text(err.responseJSON.errors).show()
        setTimeout(() => {
            $('.error').hide() 
        }, 1000);
    })
}

// bagian anime

var animelistTemplate = `
<div class="anime-card col-xs-12 col-sm-6 col-lg-3">
    <div class="card mb-3">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title"><a href="#" target="_blank"></a></h5>
            <p class="card-text"></p>
        </div>
    </div>
</div>`

function animeHome() {
    $.ajax({
        url: `http://localhost:3000/animes/homepage`,
        type: "get"
    })
    .done(function (result) {
        console.log(result);
        animelistAppend(result);
    })
    .fail(function (err) {
        console.error(err);
    });
}
animeHome();

function animelistAppend(data) {
    $("#anime-list").text("");
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        var template = $(animelistTemplate);
        template.find(".card img").attr("src", item.image_url);
        template.find(".card-title a").attr("href", item.url);
        template.find(".card-title a").text(item.title);
        $("#anime-list").append(template);
    }
}

$("#anime-search").on("submit", function (e) {
    e.preventDefault();
    var q = $("#anime-search").find("#q").val();
    console.log(q);
    $.ajax({
        url: `http://localhost:3000/animes/search?q=${q}`,
        type: "GET"
    })
    .done(function (result) {
        console.log(result);
        animelistAppend(result)
    })
    .fail(function (err) {
        console.error(err);
    });
});