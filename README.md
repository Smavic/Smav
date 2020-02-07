# Smav
Search Engine for Movie, Anime, TV Show


###  Users Login & Register

------

##### POST `users/register`

```
url: 'http://localhost:3000/users/register',
method:'POST',
body:{
	'name': 'your full name',
	'email': 'your@mail.com',
	'password': 'yourpassword'
}

response: {
	{
		name: "your name",
		email: "your@mail.com",
		password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yj"
	}
}
```

##### POST `users/login`

------
```
url: 'http://localhost:3000/users/register',
method:'POST',
body:{
	'email': 'your@mail.com',
	'password': 'yourpassword'
}

response: {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yjc2YjQwZCIsInVzZXJuYW1lIjoidXNlcnRlc3Rkb2MiLCJpYXQiOjE1ODAzOTA4NjF9.BQy_CFlWbEN3_HR9i2hiYnledD2ojH3YPFmp7iHj36Q",
	"user":{
		name: "your name"
		email: "your@mail.com"
	}
}

```

### Movie

#### GET `movie/`

```
url: 'http//localhost:3000/movie/',
method: 'GET',

respose: [
    {
        "picture": "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
        "name": "Ad Astra",
        "release": "2019-09-17",
        "detail": "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
        "vote": 6
    },
    {
        "picture": "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
        "name": "1917",
        "release": "2019-12-10",
        "detail": "At the height of the First World War, two young British soldiers, Schofield and Blake are given a seemingly impossible mission. In a race against time, they must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers—Blake's own brother among them.",
        "vote": 8.1
    },
    {
        "picture": "/z7FCF54Jvzv9Anxyf82QeqFXXOO.jpg",
        "name": "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)",
        "release": "2020-02-05",
        "detail": "After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.",
        "vote": 7.6
    },
    {
        "picture": "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
        "name": "Bad Boys for Life",
        "release": "2020-01-15",
        "detail": "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
        "vote": 6.5
    }
]
```
#### GET `movie/search`

```
url: 'http//localhost:3000/movie/search',
method: 'GET',
body: {
	search: "your search movie"
}
respose: [
    {
        "popularity": 332.645,
        "vote_count": 2219,
        "video": false,
        "poster_path": "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
        "id": 419704,
        "adult": false,
        "backdrop_path": "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
        "original_language": "en",
        "original_title": "Ad Astra",
        "genre_ids": [
            12,
            18,
            9648,
            878,
            53
        ],
        "title": "Ad Astra",
        "vote_average": 6,
        "overview": "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
        "release_date": "2019-09-17"
    },
    {
        "popularity": 0.6,
        "id": 270940,
        "video": false,
        "vote_count": 2,
        "vote_average": 4,
        "title": "Ad Astra",
        "release_date": "1982-01-01",
        "original_language": "en",
        "original_title": "Ad Astra",
        "genre_ids": [],
        "backdrop_path": null,
        "adult": false,
        "overview": "An impressive parable where the artist’s creativity is paralyzed by the dull crowd can be seen as a metaphor for a totalitarian system. Cleverly designed animation shows the artist as a tied man whose creativity is hindered by the crowd. A visually attractive film with very interesting editing won an award at the Annecy festival in 1983.",
        "poster_path": "/yajcBn20E8HcL7KEljSfKjkEutq.jpg"
    }
]
```

### Anime 

#### GET anime /homepage

```
url: 'http//localhost:3000/movie/',
method: 'GET',
response: [
    {
        "mal_id": 39587,
        "rank": 1,
        "title": "Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season",
        "url": "https://myanimelist.net/anime/39587/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_2nd_Season",
        "image_url": "https://cdn.myanimelist.net/images/anime/1010/100084.jpg?s=d4e5ed624b432efaf3c328ab31a29c00",
        "type": "TV",
        "episodes": null,
        "start_date": "Apr 2020",
        "end_date": null,
        "members": 163627,
        "score": 0
    },
    {
        "mal_id": 3786,
        "rank": 2,
        "title": "Evangelion: 3.0+1.0",
        "url": "https://myanimelist.net/anime/3786/Evangelion__30_10",
        "image_url": "https://cdn.myanimelist.net/images/anime/1300/102108.jpg?s=24e84ecee60537419de7340c4867a0b7",
        "type": "Movie",
        "episodes": 1,
        "start_date": "Jun 2020",
        "end_date": "Jun 2020",
        "members": 122813,
        "score": 0
    }
]
```