 let docTitle = document.title ;
            
            window.addEventListener("blur", () => {
                document.title = "Thanks For Visiting - Chetan" ;
            }) ;

            window.addEventListener("focus", () => {
                document.title = docTitle ;
            }) ;

            let previous = document.querySelector('#pre') ;
            let play = document.querySelector('#play') ;
            let next = document.querySelector('#next') ;
            let title = document.querySelector('#title') ;
            let recent_volume = document.querySelector('#volume') ;
            let volume_show = document.querySelector('#volume_show') ;
            let slider = document.querySelector('#duration_slider') ;
            let show_duration = document.querySelector('#show_duration') ;
            let track_image = document.querySelector('#track_image') ;
            let auto_play = document.querySelector('#auto') ;
            let present = document.querySelector('#present') ;
            let total = document.querySelector('#total') ;
            let artist = document.querySelector('#artist') ;

            let timer ;
            let autoplay = 0 ;

            let index_no = 0 ;
            let Playing_song = false ;

            /* Creating an audio Element */
            let track = document.createElement('audio') ;


            /* All songs list */
            let All_song = [
                {
                	name : "Tere Naina",
                	path : "Tere Naina.mp3",
                	img : "tere naina 1.jpg",
                	singer : "Shafqat Amanat Ali"
                },
                {
                	name : "Sajdaa",
                	path : "Sajdaa Best Song.mp3",
                	img : "sajdaa 1.jpg",
                	singer : "Rahat Fateh Ali Khan"
                },
                {
                	name : "Satranga",
                	path : "SATRANGA.mp3",
                	img : "satranga 1.jpg",
                	singer : "Arijit Sing"
                },
                {
                	name : "O Maahi",
                	path : "O Maahi.mp3",
                	img : "o mahi.jpg",
                	singer : "Arijit Sing"
                },
                {
                	name : "Channa Ve",
                	path : "Channa Ve.mp3",
                	img : "channa ve.jpg",
                	singer : "Akhil Sachdeva and Mansheel Gujral"
                },
                {
                	name : "Ve Kamleya",
                	path : "Ve Kamleya.mp3",
                	img : "ve kamleya 1.jpg",
                	singer : "Arijit Sing"
                }
            ] ;
                    
                        
            /* Function to load the track */
            function load_track(index_no) 
            {
            	clearInterval(timer) ;
            	reset_slider() ;
            
            	track.src = All_song[index_no].path ;
            	title.innerHTML = All_song[index_no].name ;
            	track_image.src = All_song[index_no].img ;
            	artist.innerHTML = All_song[index_no].singer ;
            	track.load() ;
            
            	timer = setInterval(range_slider, 1000) ;
            	total.innerHTML = All_song.length ;
            	present.innerHTML = index_no + 1 ;
            }

            load_track(index_no) ;


            /* Mute the sound function */
            function mute_sound() 
            {
            	track.volume = 0 ;
            	volume.value = 0 ;
            	volume_show.innerHTML = 0 ;
            }


            /* Function to check whether the song is playing or not */
            function justplay() 
            {
            	if (Playing_song == false) 
                {
            		playsong() ;
            	} 
                else 
                {
            		pausesong() ;
            	}
            }


            /* Play song function */
            function playsong() 
            {
            	track.play() ;
            	Playing_song = true ;
            	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>' ;
            }

            /* Pause song function */
            function pausesong() 
            {
            	track.pause() ;
            	Playing_song = false ;
            	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>' ;
            }

            /* Function to Reset Song Slider */
            function reset_slider() 
            {
            	slider.value = 0 ;
            }


            /* Next song play function */
            function next_song() 
            {
            	if (index_no < All_song.length - 1) 
                {
            		index_no += 1 ;
            		load_track(index_no) ;
            		playsong() ;
            	} 
                else 
                {
            		index_no = 0 ;
            		load_track(index_no) ;
            		playsong() ;
            	}
            }


            /* Previous song play function */
            function previous_song() 
            {
            	if (index_no > 0) 
                {
            		index_no -= 1 ;
            		load_track(index_no) ;
            		playsong() ;
            	} 
                else 
                {
            		index_no = All_song.length ;
            		load_track(index_no) ;
            		playsong() ;
            	}
            }


            /* Change volume function */
            function volume_change() 
            {
            	volume_show.innerHTML = recent_volume.value ;
            	track.volume = recent_volume.value / 100 ;
            }

            /* Change Slider Position function */
            function change_duration() 
            {
            	slider_position = track.duration * (slider.value / 100) ;
            	track.currentTime = slider_position ;
            }


            /* Autoplay function */
            function autoplay_switch() 
            {
            	if (autoplay == 1) 
                {
            		autoplay = 0 ;
            		auto_play.style.background = "rgba(255,255,255,0.2)" ;
            	} 
                else 
                {
            		autoplay = 1 ;
            		auto_play.style.background = "#FF8A65" ;
            	}
            }


            function range_slider() 
            {
            	let position = 0 ;
            
            	/* Update Slider position */
            	if (! isNaN(track.duration)) 
                {
            		position = track.currentTime * (100 / track.duration) ;
            		slider.value = position ;
            	}
            
            
            	// function will run when the song is over
            	if (track.ended) 
                {
            		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>' ;
            		if (autoplay == 1) 
                    {
            			index_no += 1 ;
            			load_track(index_no) ;
            			playsong() ;
            		}
            	}
            }