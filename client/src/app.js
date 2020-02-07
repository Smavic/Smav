$('.error').hide()
// $("#registerForm").show()
// $(".container-login").hide()
// $(".container-main").show()

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
$('#movie-search').on('submit', function(event) {
    event.preventDefault()
})
$('#anime-search').on('submit', function(event) {
    event.preventDefault()

})
$('#tvshow-search').on('submit', function(event) {
    event.preventDefault()
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

function tvShowListHome(list){
    for(let i = 0; i < list.length; i++){
        let item = `<a class="card-homepage" style="background-image: url(${list[i].img.medium});">
                    </a>`
        $('.card-tv').append(item)
    }
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
        let item = `<div class="card-tv-list">
                        <div class="card-tv-mini1" style="background-image: url(${list[i].img.medium});">
                        </div>
                        <div class="card-tv-mini2">
                            <p class="title">${list[i].title}</p>
                            <p class="year">${list[i].premiered.substring(0,4)}</p>
                            <button type="button" class="btn btn-warning">Details</button>
                        </div>
                    </div>`
        $('.tvshow-list').append(item)
    }
}

function display(page){
    let pages = ['moviePage','animePage','tvshowPage','top-movie','container-login']
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
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/tv',
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