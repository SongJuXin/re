var desW=640
var winW=document.documentElement.clientWidth
document.documentElement.style.fontSize=winW/desW*100+'px'
var cubeRoate=(function(){
	var par=document.querySelector('.par')
	var main=document.querySelector('.main')
	return {
		init:function(){
			par.rX=-45
			par.rY=-45
			document.addEventListener('touchstart',function(e){
				e=e.changedTouches[0]
				var x=e.pageX
				var y=e.pageY
				var changeX=0
				var changeY=0
				//console.log(par.rX,par.rY)
				document.addEventListener('touchmove',move,false)
				document.addEventListener('touchend',end,false)
				function move(e){
					e=e.changedTouches[0]
					changeX=(e.pageX-x)
					changeY=(e.pageY-y)
				}
				function end(){
					var rY=Math.round(changeX/90)*90
					var rX=Math.round(changeY/90)*90
					par.rX-=rX
					if(Math.abs(par.rX)%360==45||Math.abs(par.rX)%360==315){
						par.rY+=rY
					}
					else{
						par.rY-=rY
					}
					par.style.transform='rotateX('+par.rX+'deg) rotateY('+par.rY+'deg)';
					document.removeEventListener('touchmove',move,false)
					document.removeEventListener('touchend',end,false)
				}
			},false)
		},
		
	}
})()
cubeRoate.init()
var switchPage=(function(){
	var cube=document.querySelector('.cube')
	var main=document.getElementsByClassName('main')[0]
	var par=document.querySelector('.par')
	var aL=main.querySelectorAll('li')
	var back=document.querySelector('.back')
	var music=document.querySelector('#music')
	var bey=document.querySelector('#bey')
	var curIndex
	var slides
	var wid=aL[0].offsetHeight
	return {
		init:function(){
			var iSwiper=new Swiper('.swiper-container',{
				direction:'vertical',
				/*onInit:function(swiper){
					var slides=swiper.slides
					slides[0].id='p1'
				},*/
				onTransitionEnd:function(swiper){
					curIndex=swiper.activeIndex
					slides=swiper.slides
					Array.prototype.forEach.call(slides,function(item,index){
						item.id=''
						if(index==curIndex){
							item.id='p'+(index+1)
						}
					})
				}
			})
			switchPage.bindClick(iSwiper)
			switchPage.bindMusic()
		},
		bindClick:function(){
			par.addEventListener('click',function(e){
				var index
				cube.style.display='none'
				for(var i=0;i<aL.length;i++){
					aL[i].style.zIndex=''
                    aL[i].id=''
				}
				if(e.target.tagName=='DIV'){
					index=e.target.parentNode.getAttribute('index')
				}
				if(e.target.tagName=='LI'){
					index=e.target.getAttribute('index')
				}
				console.log(aL[0].offsetHeight)
				main.style.transform='translateY(-'+index*wid+'px)'
					aL[index].id='p'+(index-1+2)
			})
			back.addEventListener('click',function(){
				cube.style.display='block'
			})
		},
		bindMusic:function(){
			
			window.setTimeout(function(){
				bey.play()
				bey.addEventListener('canplay',function(){
					music.className='music'
				},false)
				music.onclick=function(){
					if(bey.paused){//有d
						bey.play()
						music.className='music'
					}
					else{
						bey.pause()//pause没有d
						music.className=''
					
					}
				}
			},30)
		}
		
	}
})()
switchPage.init()
