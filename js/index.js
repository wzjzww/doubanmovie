$('footer>div').click(function(){
	var index = $(this).index()
	$('section').hide().eq(index).fadeIn()
	$(this).addClass('active').siblings().removeClass('active')
})
var index = 0
var isloading = false
start()
function start(){
	if(isloading) return
		isloading = true
		$('.loading').show()
	$.ajax({
		url: 'http://api.douban.com/v2/movie/top250',
		type: 'GET',
		data: {
			start: index,
			count: 20
		},
		dataType: 'jsonp'
	}).done(function(ret){
		console.log(ret)
		setData(ret)
		index += 20
	}).fail(function(){
		console.log('error ...')
	}).always(function(){
		isloading = false
		$('.loading').hide()
	})
}

var clock
$('main').scroll(function(){
	if(clock){
		clearTimeout(clock)
	}
	clock = setTimeout(function(){
		if($('section').eq(0).height() -10 <= $('main').scrollTop() + $('main').height()){
			start()
		}
	},300)
	
})

function setData(data){
	data.subjects.forEach(function(movie){
		var tpl = '<div class="block">\
						<a href="">\
							<div class="img">\
								<img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg">\
							</div>\
							<div class="intro">\
								<h2></h2>\
								<div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>\
								<div class="extra"><span class="year"></span>/ <span class="type"></span></div>\
								<div class="extra">导演:<span class="director"></span></div>\
								<div class="extra">主演:<span class="actor"></span></div>\
							</div>\
						</a>\
					</div>'

			var $node = $(tpl)
			$node.find('.img>img').attr('src',movie.images.medium)
			$node.find('.intro>h2').text(movie.title)
			$node.find('.score').text(movie.rating.average)
			$node.find('.collect').text(movie.collect_count)
			$node.find('.year').text(movie.year)
			$node.find('.type').text(movie.genres.join('/'))
			$node.find('.director').text(function(){
				var directorsArr = []
				movie.directors.forEach(function(item){
					directorsArr.push(item.name)
				})
				return directorsArr.join('、')
			})
			$node.find('.actor').text(function(){
				var actorArr = []
				movie.casts.forEach(function(item){
					actorArr.push(item.name)
				})
				return actorArr.join('、')
			})


			$('.container').append($node)
	})
}