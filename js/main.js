var top250 = {
	init: function(){
		this.$element = $('#top250')
		this.isloading = false
		this.index = 0
		this.isFinish = false
		this.bind()
		this.start()

	},
	bind: function(){  //绑定数据
		var _this = this
		this.$element.scroll(function(){
			if(_this.isToBottom()){
				_this.start()
			}
		})
	},
	start: function(){  //获取数据
		var _this = this
		this.getData(function(data){
			_this.render(data)
		})
	},
	getData: function(callback){  //得到数据
		var _this = this
		if(_this.isloading) return
		_this.isloading = true
		_this.$element.find('.loading').show()
		$.ajax({
			url: 'http://api.douban.com/v2/movie/top250',
			data: {
				start: _this.index||0
			},
			dataType: 'jsonp'
		}).done(function(ret){
			// console.log(ret)
			_this.index +=20
			if(_this.index >= ret.total){
				_this.isFinish = true
			}
			callback&&callback(ret)  //回调
		}).fail(function(){
			console.log('数据异常')
		}).always(function(){
			_this.isloading = false
			_this.$element.find('.loading').hide()
		})
	},
	render: function(data){   //渲染数据
		var _this = this
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
			$node.find('a').attr('href',movie.alt)
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
			_this.$element.find('.container').append($node)
		})
	},
	isToBottom: function(){
		return this.$element.find('.container').height()  <= this.$element.height() + this.$element.scrollTop() + 10 
	}
}
var usBox = {
	init: function(){
		console.log('usBox ok')
		this.$element = $('#beimei')
		this.start()
	},

	start: function(){  //获取数据
		var _this = this
		this.getData(function(data){
			_this.render(data)
		})
	},
	getData: function(callback){  //得到数据
		var _this = this
		if(_this.isloading) return
		_this.isloading = true
		_this.$element.find('.loading').show()
		$.ajax({
			url: 'http://api.douban.com/v2/movie/us_box',
			
			dataType: 'jsonp'
		}).done(function(ret){
			
			callback&&callback(ret)  //回调
		}).fail(function(){
			console.log('数据异常')
		}).always(function(){
			_this.$element.find('.loading').hide()
		})
	},
	render: function(data){   //渲染数据
		var _this = this
		console.log(data)
		data.subjects.forEach(function(movie){
			movie = movie.subject
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
			$node.find('a').attr('href',movie.alt)
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
			_this.$element.find('.container').append($node)
		})
	}
}
var search = {
	init: function(){
		console.log('usBox ok')
		this.$element = $('#search')
		this.keyword = ''
		this.bind()
		this.start()
	},
	bind: function(){
		var _this = this
		this.$element.find('.button').click(function(){
			_this.keyword = _this.$element.find('input').val()
			_this.start()
		})
	},
	start: function(){  //获取数据
		var _this = this
		this.getData(function(data){
			_this.render(data)
		})
	},
	getData: function(callback){  //得到数据
		var _this = this
		
		_this.$element.find('.loading').show()
		$.ajax({
			url: 'http://api.douban.com/v2/movie/search',
			data: {
				q: _this.keyword
			},
			dataType: 'jsonp'
		}).done(function(ret){
			
			callback&&callback(ret)  //回调
		}).fail(function(){
			console.log('数据异常')
		}).always(function(){
			_this.$element.find('.loading').hide()
		})
	},
	render: function(data){   //渲染数据
		var _this = this
		console.log(data)
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
			$node.find('a').attr('href',movie.alt)
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
			_this.$element.find('.search-result').append($node)
		})
	}
}







var app = {
	init: function(){
		this.$tabs = $('footer>div')
		this.$panels = $('section')
		this.bind()

		top250.init()
		usBox.init()
		search.init()
	},
	bind: function(){
		var _this = this
		this.$tabs.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active')
			_this.$panels.eq($(this).index()).fadeIn().siblings().hide()
		})
		console.log('bind')
	}
}
app.init()