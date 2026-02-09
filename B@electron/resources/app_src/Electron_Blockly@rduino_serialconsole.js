const remote = require('electron').remote 

window.addEventListener('load', function load(event) {
	var moniteur = document.getElementById('fenetre_term')
	var MAX_LINES = 300
	var _buffer = []
	var _flushScheduled = false

	function appendLine(text) {
		// guarda as linhas em buffer para minimizar operações de DOM
		_buffer.push(text)
		if (!_flushScheduled) {
			_flushScheduled = true
			setTimeout(flushBuffer, 50)
		}
	}

	function flushBuffer() {
		_flushScheduled = false
		if (_buffer.length === 0) return

		// verifica se o usuário está atualmente no final do scroll
		var isAtBottom = (moniteur.scrollTop + moniteur.clientHeight >= moniteur.scrollHeight - 5)

		var frag = document.createDocumentFragment()
		for (var i = 0; i < _buffer.length; i++) {
			var lineDiv = document.createElement('div')
			lineDiv.textContent = _buffer[i]
			frag.appendChild(lineDiv)
		}
		_buffer = []
		moniteur.appendChild(frag)

		// mantém apenas as últimas MAX_LINES linhas
		// se houver um ícone inicial dentro de moniteur, ele permanece como primeiro filho
		while (moniteur.childNodes.length > MAX_LINES + 1) {
			moniteur.removeChild(moniteur.childNodes[1])
		}

		// só faz scroll automático se o usuário já estava no final
		if (isAtBottom) {
			moniteur.scrollTop = moniteur.scrollHeight
		}
	}

	document.getElementById('btn_envoi').disabled = true
	document.getElementById('btn_efface').onclick = function(event) {
		// limpa todas as linhas, mantendo o possível ícone inicial
		while (moniteur.childNodes.length > 1) {
			moniteur.removeChild(moniteur.childNodes[1])
		}
	}
	document.getElementById('btn_envoi').onclick = function(event) {
		var entree = document.getElementById('schbox').value
		if (s_p.isOpen()) {
			appendLine(entree)
			s_p.write(entree)
		}
	}
	document.getElementById('btn_connect').onclick = function(event) {
		var SerialPort = require("serialport")
		var Readline = require('@serialport/parser-readline')
		var vit = document.getElementById('vitesse').value
		var baud = parseInt(vit)
		var _com = localStorage.getItem("com")
		s_p = new SerialPort(_com,{baudRate:baud})
		var parser = s_p.pipe(new Readline({ delimiter: '\r\n' }))
		document.getElementById('btn_connect').disabled = true
		document.getElementById('btn_envoi').disabled = false
		s_p.on('open', function(){
			appendLine('Início da comunicação serial')
		})
		parser.on('data', function(line){
			appendLine(line)
		})
	}
})