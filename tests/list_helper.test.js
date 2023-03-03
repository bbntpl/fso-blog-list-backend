const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes ', () => {
	const blogs = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}
	]


	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('of empty list is zero', () => {
		const result = listHelper.getTotalLikes([])

		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.getTotalLikes(listWithOneBlog)

		expect(result).toBe(listWithOneBlog[0].likes)
	})

	test('of a bigger list is calculated right ', () => {
		const reducer = (total, number) => {
			return total + number
		}

		const totalLikes = blogs
			.map(blog => blog.likes)
			.reduce(reducer, 0)

		const result = listHelper.getTotalLikes(blogs)

		expect(result).toBe(totalLikes)
	})
})

describe('favorite', () => {
	test('blog does not exist since there are no blogs must return zero', () => {
		const blogs = []
		const result = listHelper.getBlogWithMostLikes(blogs)

		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const blogs = [{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}]

		const result = listHelper.getTotalLikes(blogs)

		expect(result).toBe(blogs[0].likes)
	})

	test(' blog with the most likes', () => {
		const blogs = [{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 12,
			__v: 0
		},
		]
		const result = listHelper.getBlogWithMostLikes(blogs)

		const expectedResult = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}
		expect(result).toEqual(expectedResult)
	})
})

describe('most', () => {
	const blogs = [{
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000668'
		},
		'title': 'placerat praesent blandit nam nulla integer pede justo',
		'author': 'Tigran Hamasyan',
		'url': 'https://answers.com/tempor/turpis/nec.json?faucibus=nec&orci=nisi&luctus=vulputate&et=nonummy&ultrices=maecenas&posuere=tincidunt&cubilia=lacus',
		'likes': 79,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000669'
		},
		'title': 'gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin',
		'author': 'Tigran Hamasyan',
		'url': 'http://gov.uk/libero/nam/dui.html?praesent=dui&lectus=nec&vestibulum=nisi&quam=volutpat&sapien=eleifend&varius=donec&ut=ut&blandit=dolor&non=morbi&interdum=vel&in=lectus&ante=in&vestibulum=quam&ante=fringilla&ipsum=rhoncus&primis=mauris&in=enim&faucibus=leo&orci=rhoncus&luctus=sed&et=vestibulum&ultrices=sit&posuere=amet&cubilia=cursus&curae=id&duis=turpis&faucibus=integer&accumsan=aliquet&odio=massa&curabitur=id&convallis=lobortis&duis=convallis&consequat=tortor&dui=risus&nec=dapibus&nisi=augue&volutpat=vel&eleifend=accumsan&donec=tellus&ut=nisi&dolor=eu&morbi=orci&vel=mauris&lectus=lacinia&in=sapien&quam=quis&fringilla=libero&rhoncus=nullam&mauris=sit&enim=amet&leo=turpis&rhoncus=elementum&sed=ligula&vestibulum=vehicula&sit=consequat&amet=morbi&cursus=a&id=ipsum&turpis=integer&integer=a&aliquet=nibh&massa=in&id=quis&lobortis=justo&convallis=maecenas&tortor=rhoncus&risus=aliquam&dapibus=lacus',
		'likes': 84,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066a'
		},
		'title': 'in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate',
		'author': 'Hiromi Uehara',
		'url': 'http://youku.com/purus/phasellus/in/felis/donec/semper/sapien.html?fermentum=dui&justo=nec&nec=nisi&condimentum=volutpat&neque=eleifend&sapien=donec&placerat=ut&ante=dolor&nulla=morbi&justo=vel',
		'likes': 45,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066b'
		},
		'title': 'diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis',
		'author': 'Tigran Hamasyan',
		'url': 'https://dyndns.org/pede/lobortis/ligula/sit.aspx?diam=nunc&erat=commodo&fermentum=placerat&justo=praesent&nec=blandit&condimentum=nam&neque=nulla&sapien=integer&placerat=pede&ante=justo&nulla=lacinia&justo=eget&aliquam=tincidunt&quis=eget&turpis=tempus&eget=vel&elit=pede&sodales=morbi&scelerisque=porttitor&mauris=lorem&sit=id&amet=ligula&eros=suspendisse&suspendisse=ornare&accumsan=consequat&tortor=lectus&quis=in&turpis=est&sed=risus&ante=auctor&vivamus=sed&tortor=tristique&duis=in&mattis=tempus&egestas=sit&metus=amet&aenean=sem&fermentum=fusce&donec=consequat&ut=nulla&mauris=nisl&eget=nunc',
		'likes': 40,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066c'
		},
		'title': 'non interdum in ante vestibulum ante ipsum primis in faucibus orci',
		'author': 'Tigran Hamasyan',
		'url': 'http://usda.gov/enim/sit/amet/nunc/viverra.png?scelerisque=nibh&quam=fusce&turpis=lacus&adipiscing=purus&lorem=aliquet&vitae=at&mattis=feugiat&nibh=non&ligula=pretium&nec=quis&sem=lectus&duis=suspendisse&aliquam=potenti&convallis=in&nunc=eleifend&proin=quam&at=a&turpis=odio&a=in&pede=hac&posuere=habitasse&nonummy=platea&integer=dictumst&non=maecenas&velit=ut&donec=massa&diam=quis&neque=augue&vestibulum=luctus&eget=tincidunt&vulputate=nulla&ut=mollis&ultrices=molestie&vel=lorem&augue=quisque&vestibulum=ut&ante=erat&ipsum=curabitur&primis=gravida&in=nisi&faucibus=at&orci=nibh&luctus=in&et=hac&ultrices=habitasse&posuere=platea',
		'likes': 22,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066d'
		},
		'title': 'donec odio justo sollicitudin ut suscipit a feugiat',
		'author': 'Hiromi Uehara',
		'url': 'https://deliciousdays.com/morbi/a/ipsum/integer/a/nibh/in.jsp?venenatis=vel&turpis=est&enim=donec&blandit=odio&mi=justo&in=sollicitudin&porttitor=ut&pede=suscipit&justo=a&eu=feugiat&massa=et&donec=eros&dapibus=vestibulum&duis=ac&at=est&velit=lacinia&eu=nisi&est=venenatis&congue=tristique&elementum=fusce&in=congue&hac=diam&habitasse=id&platea=ornare&dictumst=imperdiet&morbi=sapien&vestibulum=urna&velit=pretium&id=nisl&pretium=ut&iaculis=volutpat&diam=sapien&erat=arcu&fermentum=sed&justo=augue&nec=aliquam&condimentum=erat&neque=volutpat&sapien=in&placerat=congue&ante=etiam&nulla=justo&justo=etiam&aliquam=pretium&quis=iaculis&turpis=justo&eget=in&elit=hac&sodales=habitasse&scelerisque=platea&mauris=dictumst&sit=etiam&amet=faucibus',
		'likes': 9,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066e'
		},
		'title': 'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo',
		'author': 'Tigran Hamasyan',
		'url': 'https://ibm.com/eros/vestibulum/ac/est/lacinia/nisi.aspx?nisl=non&duis=velit&ac=donec&nibh=diam&fusce=neque&lacus=vestibulum&purus=eget',
		'likes': 78,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00066f'
		},
		'title': 'in felis eu sapien cursus vestibulum proin eu mi nulla ac enim',
		'author': 'Natalia Lafourcade',
		'url': 'https://twitter.com/interdum/venenatis/turpis/enim/blandit.png?lorem=erat&quisque=volutpat&ut=in&erat=congue&curabitur=etiam&gravida=justo&nisi=etiam&at=pretium&nibh=iaculis&in=justo&hac=in&habitasse=hac&platea=habitasse&dictumst=platea&aliquam=dictumst&augue=etiam&quam=faucibus&sollicitudin=cursus&vitae=urna&consectetuer=ut&eget=tellus&rutrum=nulla&at=ut&lorem=erat&integer=id&tincidunt=mauris&ante=vulputate&vel=elementum&ipsum=nullam&praesent=varius&blandit=nulla&lacinia=facilisi&erat=cras&vestibulum=non&sed=velit&magna=nec&at=nisi&nunc=vulputate',
		'likes': 56,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000670'
		},
		'title': 'hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam',
		'author': 'Hiromi Uehara',
		'url': 'http://squidoo.com/in/faucibus/orci/luctus/et/ultrices/posuere.json?pede=est&malesuada=congue&in=elementum&imperdiet=in&et=hac&commodo=habitasse&vulputate=platea&justo=dictumst&in=morbi&blandit=vestibulum&ultrices=velit&enim=id&lorem=pretium&ipsum=iaculis&dolor=diam&sit=erat&amet=fermentum&consectetuer=justo&adipiscing=nec&elit=condimentum&proin=neque&interdum=sapien&mauris=placerat&non=ante&ligula=nulla&pellentesque=justo&ultrices=aliquam&phasellus=quis&id=turpis&sapien=eget&in=elit&sapien=sodales&iaculis=scelerisque&congue=mauris&vivamus=sit&metus=amet&arcu=eros&adipiscing=suspendisse&molestie=accumsan&hendrerit=tortor&at=quis&vulputate=turpis&vitae=sed&nisl=ante&aenean=vivamus&lectus=tortor&pellentesque=duis&eget=mattis&nunc=egestas&donec=metus&quis=aenean&orci=fermentum&eget=donec&orci=ut&vehicula=mauris&condimentum=eget&curabitur=massa&in=tempor&libero=convallis&ut=nulla&massa=neque&volutpat=libero&convallis=convallis&morbi=eget&odio=eleifend&odio=luctus',
		'likes': 81,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000671'
		},
		'title': 'libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
		'author': 'Hiromi Uehara',
		'url': 'https://odnoklassniki.ru/quam/a/odio/in.js?pellentesque=felis&ultrices=eu&mattis=sapien&odio=cursus&donec=vestibulum&vitae=proin&nisi=eu&nam=mi&ultrices=nulla&libero=ac&non=enim&mattis=in&pulvinar=tempor&nulla=turpis&pede=nec&ullamcorper=euismod&augue=scelerisque&a=quam&suscipit=turpis&nulla=adipiscing&elit=lorem&ac=vitae&nulla=mattis',
		'likes': 99,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000672'
		},
		'title': 'congue elementum in hac habitasse platea dictumst morbi vestibulum',
		'author': 'Hiromi Uehara',
		'url': 'http://un.org/rutrum/nulla/tellus/in/sagittis/dui.aspx?nullam=in&porttitor=imperdiet&lacus=et&at=commodo&turpis=vulputate&donec=justo&posuere=in&metus=blandit&vitae=ultrices&ipsum=enim&aliquam=lorem&non=ipsum&mauris=dolor&morbi=sit&non=amet&lectus=consectetuer&aliquam=adipiscing&sit=elit&amet=proin&diam=interdum&in=mauris&magna=non&bibendum=ligula&imperdiet=pellentesque&nullam=ultrices&orci=phasellus',
		'likes': 100,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000673'
		},
		'title': 'vitae consectetuer eget rutrum at lorem integer tincidunt ante',
		'author': 'Hiromi Uehara',
		'url': 'http://boston.com/vitae/nisi/nam/ultrices.json?libero=blandit&convallis=lacinia&eget=erat&eleifend=vestibulum&luctus=sed&ultricies=magna&eu=at&nibh=nunc&quisque=commodo&id=placerat&justo=praesent&sit=blandit&amet=nam&sapien=nulla&dignissim=integer&vestibulum=pede&vestibulum=justo&ante=lacinia&ipsum=eget&primis=tincidunt&in=eget&faucibus=tempus&orci=vel&luctus=pede&et=morbi&ultrices=porttitor&posuere=lorem&cubilia=id&curae=ligula&nulla=suspendisse&dapibus=ornare&dolor=consequat&vel=lectus&est=in&donec=est&odio=risus&justo=auctor&sollicitudin=sed&ut=tristique&suscipit=in&a=tempus&feugiat=sit&et=amet&eros=sem&vestibulum=fusce&ac=consequat&est=nulla&lacinia=nisl&nisi=nunc&venenatis=nisl&tristique=duis&fusce=bibendum&congue=felis&diam=sed&id=interdum&ornare=venenatis&imperdiet=turpis&sapien=enim&urna=blandit',
		'likes': 78,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000674'
		},
		'title': 'tellus in sagittis dui vel nisl duis ac nibh fusce',
		'author': 'Tigran Hamasyan',
		'url': 'https://sun.com/arcu/libero/rutrum.xml?consectetuer=ac&adipiscing=consequat&elit=metus&proin=sapien&interdum=ut&mauris=nunc&non=vestibulum&ligula=ante&pellentesque=ipsum&ultrices=primis&phasellus=in&id=faucibus&sapien=orci&in=luctus&sapien=et&iaculis=ultrices&congue=posuere&vivamus=cubilia&metus=curae&arcu=mauris&adipiscing=viverra&molestie=diam&hendrerit=vitae&at=quam&vulputate=suspendisse&vitae=potenti&nisl=nullam&aenean=porttitor&lectus=lacus&pellentesque=at&eget=turpis&nunc=donec&donec=posuere&quis=metus&orci=vitae&eget=ipsum&orci=aliquam&vehicula=non&condimentum=mauris&curabitur=morbi&in=non&libero=lectus&ut=aliquam&massa=sit&volutpat=amet&convallis=diam&morbi=in&odio=magna&odio=bibendum&elementum=imperdiet&eu=nullam&interdum=orci&eu=pede&tincidunt=venenatis&in=non&leo=sodales&maecenas=sed&pulvinar=tincidunt&lobortis=eu&est=felis&phasellus=fusce&sit=posuere&amet=felis&erat=sed&nulla=lacus&tempus=morbi&vivamus=sem&in=mauris&felis=laoreet&eu=ut&sapien=rhoncus&cursus=aliquet&vestibulum=pulvinar&proin=sed&eu=nisl&mi=nunc&nulla=rhoncus&ac=dui&enim=vel&in=sem&tempor=sed&turpis=sagittis&nec=nam&euismod=congue&scelerisque=risus&quam=semper&turpis=porta&adipiscing=volutpat&lorem=quam&vitae=pede&mattis=lobortis',
		'likes': 51,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000675'
		},
		'title': 'ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies',
		'author': 'Hiromi Uehara',
		'url': 'http://google.it/sollicitudin.jsp?sit=ipsum&amet=integer&erat=a&nulla=nibh&tempus=in&vivamus=quis&in=justo&felis=maecenas&eu=rhoncus&sapien=aliquam&cursus=lacus&vestibulum=morbi&proin=quis&eu=tortor&mi=id&nulla=nulla&ac=ultrices&enim=aliquet&in=maecenas&tempor=leo&turpis=odio&nec=condimentum&euismod=id&scelerisque=luctus&quam=nec&turpis=molestie&adipiscing=sed&lorem=justo&vitae=pellentesque&mattis=viverra&nibh=pede&ligula=ac&nec=diam&sem=cras&duis=pellentesque&aliquam=volutpat&convallis=dui&nunc=maecenas&proin=tristique&at=est&turpis=et&a=tempus&pede=semper&posuere=est&nonummy=quam&integer=pharetra&non=magna&velit=ac&donec=consequat&diam=metus&neque=sapien&vestibulum=ut&eget=nunc&vulputate=vestibulum&ut=ante&ultrices=ipsum&vel=primis&augue=in&vestibulum=faucibus&ante=orci&ipsum=luctus&primis=et&in=ultrices&faucibus=posuere&orci=cubilia&luctus=curae&et=mauris&ultrices=viverra&posuere=diam&cubilia=vitae&curae=quam&donec=suspendisse&pharetra=potenti&magna=nullam&vestibulum=porttitor&aliquet=lacus&ultrices=at&erat=turpis&tortor=donec&sollicitudin=posuere&mi=metus&sit=vitae&amet=ipsum&lobortis=aliquam&sapien=non&sapien=mauris&non=morbi&mi=non&integer=lectus&ac=aliquam&neque=sit&duis=amet&bibendum=diam&morbi=in&non=magna&quam=bibendum&nec=imperdiet&dui=nullam&luctus=orci',
		'likes': 24,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000676'
		},
		'title': 'in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat',
		'author': 'Hiromi Uehara',
		'url': 'http://alibaba.com/lobortis/est/phasellus/sit/amet.html?consequat=in&nulla=faucibus&nisl=orci&nunc=luctus&nisl=et&duis=ultrices&bibendum=posuere&felis=cubilia&sed=curae&interdum=duis&venenatis=faucibus&turpis=accumsan&enim=odio&blandit=curabitur&mi=convallis&in=duis&porttitor=consequat&pede=dui&justo=nec&eu=nisi&massa=volutpat&donec=eleifend&dapibus=donec&duis=ut&at=dolor&velit=morbi&eu=vel&est=lectus&congue=in',
		'likes': 61,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000677'
		},
		'title': 'quis turpis eget elit sodales scelerisque mauris sit',
		'author': 'Natalia Lafourcade',
		'url': 'http://e-recht24.de/magna/vulputate/luctus/cum/sociis.jpg?elementum=vestibulum&ligula=proin&vehicula=eu&consequat=mi&morbi=nulla&a=ac&ipsum=enim&integer=in&a=tempor&nibh=turpis&in=nec&quis=euismod&justo=scelerisque&maecenas=quam&rhoncus=turpis',
		'likes': 9,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000678'
		},
		'title': 'vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper',
		'author': 'Natalia Lafourcade',
		'url': 'http://merriam-webster.com/erat/curabitur/gravida/nisi/at.png?augue=in&luctus=porttitor&tincidunt=pede&nulla=justo&mollis=eu&molestie=massa&lorem=donec&quisque=dapibus&ut=duis&erat=at&curabitur=velit&gravida=eu&nisi=est&at=congue&nibh=elementum&in=in&hac=hac&habitasse=habitasse&platea=platea&dictumst=dictumst&aliquam=morbi&augue=vestibulum&quam=velit&sollicitudin=id&vitae=pretium&consectetuer=iaculis&eget=diam&rutrum=erat&at=fermentum&lorem=justo&integer=nec&tincidunt=condimentum&ante=neque&vel=sapien&ipsum=placerat&praesent=ante&blandit=nulla&lacinia=justo&erat=aliquam&vestibulum=quis&sed=turpis&magna=eget&at=elit&nunc=sodales&commodo=scelerisque&placerat=mauris&praesent=sit&blandit=amet&nam=eros&nulla=suspendisse&integer=accumsan&pede=tortor&justo=quis&lacinia=turpis&eget=sed&tincidunt=ante&eget=vivamus&tempus=tortor&vel=duis&pede=mattis&morbi=egestas&porttitor=metus&lorem=aenean&id=fermentum&ligula=donec&suspendisse=ut&ornare=mauris&consequat=eget&lectus=massa&in=tempor&est=convallis&risus=nulla&auctor=neque&sed=libero&tristique=convallis&in=eget&tempus=eleifend&sit=luctus&amet=ultricies&sem=eu&fusce=nibh&consequat=quisque&nulla=id&nisl=justo&nunc=sit&nisl=amet&duis=sapien&bibendum=dignissim&felis=vestibulum&sed=vestibulum&interdum=ante&venenatis=ipsum&turpis=primis&enim=in&blandit=faucibus',
		'likes': 56,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb000679'
		},
		'title': 'ut ultrices vel augue vestibulum ante ipsum primis in',
		'author': 'Hiromi Uehara',
		'url': 'https://dot.gov/imperdiet/et/commodo/vulputate/justo/in.html?venenatis=quis&tristique=libero&fusce=nullam&congue=sit&diam=amet&id=turpis&ornare=elementum&imperdiet=ligula&sapien=vehicula&urna=consequat&pretium=morbi&nisl=a&ut=ipsum&volutpat=integer&sapien=a&arcu=nibh&sed=in&augue=quis&aliquam=justo&erat=maecenas&volutpat=rhoncus&in=aliquam&congue=lacus&etiam=morbi&justo=quis&etiam=tortor&pretium=id&iaculis=nulla&justo=ultrices&in=aliquet&hac=maecenas&habitasse=leo&platea=odio&dictumst=condimentum&etiam=id&faucibus=luctus&cursus=nec&urna=molestie&ut=sed&tellus=justo&nulla=pellentesque&ut=viverra&erat=pede&id=ac&mauris=diam&vulputate=cras&elementum=pellentesque&nullam=volutpat&varius=dui&nulla=maecenas&facilisi=tristique&cras=est&non=et&velit=tempus&nec=semper&nisi=est&vulputate=quam&nonummy=pharetra&maecenas=magna&tincidunt=ac&lacus=consequat&at=metus&velit=sapien&vivamus=ut&vel=nunc&nulla=vestibulum&eget=ante&eros=ipsum&elementum=primis&pellentesque=in&quisque=faucibus&porta=orci&volutpat=luctus&erat=et&quisque=ultrices&erat=posuere&eros=cubilia&viverra=curae&eget=mauris',
		'likes': 84,
		'_v': 0
	}, {
		'_id': {
			'$oid': '63fd8e0ffc13ae47cb00067a'
		},
		'title': 'potenti cras in purus eu magna vulputate luctus cum sociis',
		'author': 'Natalia Lafourcade',
		'url': 'https://joomla.org/consectetuer/adipiscing.png?interdum=vestibulum&venenatis=eget&turpis=vulputate&enim=ut&blandit=ultrices&mi=vel&in=augue&porttitor=vestibulum&pede=ante&justo=ipsum&eu=primis&massa=in&donec=faucibus&dapibus=orci&duis=luctus&at=et&velit=ultrices&eu=posuere&est=cubilia&congue=curae',
		'likes': 72,
		'_v': 0
	}, {
		_id: {
			'$oid': '63fd8e0ffc13ae47cb00067b'
		},
		title: 'nunc donec quis orci eget orci vehicula condimentum curabitur in',
		author: 'Tigran Hamasyan',
		url: 'https://plala.or.jp/at/lorem/integer/tincidunt/ante.js?id=nunc&turpis=proin&integer=at&aliquet=turpis&massa=a&id=pede&lobortis=posuere&convallis=nonummy&tortor=integer&risus=non&dapibus=velit&augue=donec&vel=diam&accumsan=neque&tellus=vestibulum&nisi=eget&eu=vulputate&orci=ut&mauris=ultrices&lacinia=vel&sapien=augue&quis=vestibulum&libero=ante&nullam=ipsum&sit=primis&amet=in&turpis=faucibus&elementum=orci&ligula=luctus&vehicula=et&consequat=ultrices&morbi=posuere&a=cubilia&ipsum=curae&integer=donec&a=pharetra&nibh=magna&in=vestibulum&quis=aliquet&justo=ultrices&maecenas=erat&rhoncus=tortor&aliquam=sollicitudin&lacus=mi&morbi=sit&quis=amet&tortor=lobortis&id=sapien&nulla=sapien&ultrices=non&aliquet=mi&maecenas=integer&leo=ac&odio=neque&condimentum=duis',
		likes: 17,
		_v: 0
	}]

	describe('blogs', () => {

		test('of empty list is zero', () => {
			const result = listHelper.mostBlogs([])

			expect(result).toBe(0)
		})

		test('are represented in an object with the author and number of blogs', () => {
			const result = listHelper.mostBlogs(blogs)

			const expectedResult = {
				author: 'Hiromi Uehara',
				blogs: 9
			}

			expect(result).toEqual(expectedResult)
		})
	})

	describe('likes', () => {
		test('of empty list is zero', () => {
			const result = listHelper.mostLikes([])

			expect(result).toBe(0)
		})

		test(' is equal to the author with the highest total likes', () => {
			const result = listHelper.mostLikes(blogs)

			const expectedResult = {
				author: 'Hiromi Uehara',
				likes: 581
			}

			expect(result).toEqual(expectedResult)
		})
	})
})
