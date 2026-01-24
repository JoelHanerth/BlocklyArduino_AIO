/**
 * Blockly@rduino
 */

'use strict';


/**
 * Populate the edit textarea "edit_code" with the pre arduino code
 */
BlocklyDuino.editArduinoCode = function() {
	    $('#edit_code').val($('#pre_arduino').text());
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
BlocklyDuino.saveXmlFile = function () {
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	
	var toolbox = window.localStorage.toolbox;
	if (!toolbox) {
		toolbox = $("#toolboxes").val();
	}
	
	if (toolbox) {
		var newel = document.createElement("toolbox");
		newel.appendChild(document.createTextNode(toolbox));
		xml.insertBefore(newel, xml.childNodes[0]);
	}
	
	var toolboxids = window.localStorage.toolboxids;
	if (toolboxids === undefined || toolboxids === "") {
		if ($('#defaultCategories').length) {
			toolboxids = $('#defaultCategories').html();
		}
	}
	
	if (toolboxids) {
		var newel = document.createElement("toolboxcategories");
		newel.appendChild(document.createTextNode(toolboxids));
		xml.insertBefore(newel, xml.childNodes[0]);
	}
	
	var data = Blockly.Xml.domToPrettyText(xml);
	var datenow = Date.now();
	var uri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data);
	$(this).attr({
	            'download': "blockly_arduino"+datenow+".B@",
				'href': uri,
				'target': '_blank'
	});
};

/**
 * Creates an INO file containing the Arduino code from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
BlocklyDuino.saveArduinoFile = function () {
	    var code = $('#pre_arduino').text();
	var datenow = Date.now();
	var filename = "arduino_" + datenow + ".ino";
 	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/ino;charset=utf-8,' + encodeURIComponent(code));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

/**
 * Load Arduino code from component pre_arduino
 */
BlocklyDuino.getFiles = function (){
	    var code = $('#pre_arduino').text();
	    return {"sketch.ino": code.replace(/</g, '&lt;').replace(/>/g, '&gt;') };
};


/**
 // * Load blocks from local file.
 */
BlocklyDuino.load = function (event) {
	var files = event.target.files;
	// Only allow uploading one file.
	if (files.length != 1) {
		return;
	}
	// FileReader
	var reader = new FileReader();
	reader.onloadend = function(event) {    
		var target = event.target;
		// 2 == FileReader.DONE
		if (target.readyState == 2) {
		  try {
			var xml = Blockly.Xml.textToDom(target.result);
		  } catch (e) {
			alert(MSG['xmlError']+'\n' + e);
			return;
		  }
		  var count = BlocklyDuino.workspace.getAllBlocks().length;
		  if (count && confirm(MSG['xmlLoad'])) {
			  BlocklyDuino.workspace.clear();
		  }
		  $('#tab_blocks a').tab('show');
		  Blockly.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
		  BlocklyDuino.selectedTab = 'blocks';
		  BlocklyDuino.renderContent();
		  
		  // load toolbox
		  var elem = xml.getElementsByTagName("toolbox")[0];
		  if (elem != undefined) {
			var node = elem.childNodes[0];
			window.localStorage.toolbox = node.nodeValue;
			$("#toolboxes").val(node.nodeValue);
			
			// load toolbox categories
			elem = xml.getElementsByTagName("toolboxcategories")[0];
			if (elem != undefined) {
				node = elem.childNodes[0];
				window.localStorage.toolboxids = node.nodeValue;
			}

			var search = BlocklyDuino.addReplaceParamToUrl(window.location.search, 'toolbox', $("#toolboxes").val());
			search = search.replace(/([?&]url=)[^&]*/, '');
			window.location = window.location.protocol + '//'
					+ window.location.host + window.location.pathname
					+ search;
			}
    }
    // Reset value of input after loading because Chrome will not fire
    // a 'change' event if the same file is loaded again.
    $('#load').val('');
  };
  reader.readAsText(files[0]);
};

/**
 * Discard all blocks from the workspace.
 */
BlocklyDuino.discard = function () {
	  var count = BlocklyDuino.workspace.getAllBlocks().length;
	  if (count < 2 || window.confirm(MSG['discard'].replace('%1', count))) {
	    BlocklyDuino.workspace.clear();
	    //clean URL from example if opened
		var search = window.location.search;
	    var newsearch = search.replace(/([?&]url=)[^&]*/, '');
		window.history.pushState(search, "Title", newsearch);
	    BlocklyDuino.renderContent();
	  }
};

/**
 * Undo/redo functions
 */
BlocklyDuino.Undo = function () {
	  Blockly.mainWorkspace.undo(0);
};
BlocklyDuino.Redo = function () {
	  Blockly.mainWorkspace.undo(1);
};


/**
 * Reset Blockly@rduino and clean webbrowser cache, local storage
 */
BlocklyDuino.clearLocalStorage = function () {
	window.removeEventListener('unload', BlocklyDuino.backupBlocks, false);
	localStorage.clear();
	sessionStorage.clear();
};


/**
 * Change ergonomy and resize left buttons in just icons
 */ 
BlocklyDuino.miniMenuPanel = function() {
	  // Store the blocks for the duration of the reload.
	  BlocklyDuino.backupBlocks();

	  var search = window.location.search;
	  if (search.length <= 1) {
	    search = '?size=miniMenu';
	  } else if (search.match(/[?&]size=[^&]*/)) {
	    search = search.replace(/([?&]size=)[^&]*/, '');
	    search = search.replace(/\&/, '?');
	  } else {
	    search = search.replace(/\?/, '?size=miniMenu&');
	  }

	  // remove url file
	  //search = search.replace(/([?&]url=)[^&]*/, '');

	  // Navegação interna para mudar o modo miniMenu: não deve exibir
	  // alerta de "projeto não salvo" no beforeunload.
	  try {
	  	if (typeof BlocklyDuino !== 'undefined') {
	  		BlocklyDuino._suppressUnloadPrompt = true;
	  	}
	  } catch (e) {}
	  window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + search;
};


/**
 * Try to take a screen capture of all blocks on workspace
 * Thanks to fontaine.jp from forum http://blockly.technologiescollege.fr/forum/index.php/topic,128.msg635.html#new
 *
 */
BlocklyDuino.workspace_capture = function() {
	var ws = BlocklyDuino.workspace.svgBlockCanvas_.cloneNode(true);
	ws.removeAttribute("width");
	ws.removeAttribute("height");
	ws.removeAttribute("transform");
	var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
	styleElem.textContent = Blockly.Css.CONTENT.join('') ;
	ws.insertBefore(styleElem, ws.firstChild);
	var bbox = BlocklyDuino.workspace.svgBlockCanvas_.getBBox();
	var canvas = document.createElement( "canvas" );
	canvas.width = Math.ceil(bbox.width+10);
	canvas.height = Math.ceil(bbox.height+10);
	var ctx = canvas.getContext( "2d" );
	var xml = new XMLSerializer().serializeToString(ws);
	xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="' + bbox.x + ' ' + bbox.y + ' '  + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
	var img = new Image();
	img.setAttribute( "src", 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml))));
	img.onload = function() {
		ctx.drawImage( img, 5, 5 );
		var canvasdata = canvas.toDataURL("image/png",1);
		var datenow = Date.now();
		var a = document.createElement("a");
		a.download = "capture"+datenow+".png";
		a.href = canvasdata;
		document.body.appendChild(a);
		a.click();
	}
};

// =============================================================
//  Extensões: controle de nome de projeto e salvar/salvar como
// =============================================================

/**
 * Nome do arquivo de projeto atualmente aberto (.B@ ou .xml).
 * A cada vez que o programa é aberto, começamos sempre "sem projeto";
 * o primeiro "Salvar projeto" da sessão vai se comportar como
 * "Salvar como" e, daí em diante, reaproveitar o mesmo nome.
 */
BlocklyDuino.currentProjectName = null;

// Caminho completo do arquivo no disco (somente em modo Electron).
// Usado para que o processo principal consiga sobrescrever o mesmo
// arquivo sem abrir novamente a janela de salvar.
BlocklyDuino.currentProjectPath = null;

// Título base da aplicação (capturado uma vez)
BlocklyDuino._baseDocumentTitle = document.title || 'Blockly@rduino';

// Flag de alterações pendentes desde o último salvamento/carregamento
BlocklyDuino._isWorkspaceDirty = false;

// Flag para indicar que o recarregamento da página foi disparado
// internamente pela aplicação (por exemplo, ao trocar o layout ou
// o modo de exibição). Quando verdadeiro, não mostramos o alerta
// de "projeto não salvo" no evento beforeunload.
BlocklyDuino._suppressUnloadPrompt = false;

BlocklyDuino._markWorkspaceDirty = function () {
	BlocklyDuino._isWorkspaceDirty = true;
};

BlocklyDuino._markWorkspaceClean = function () {
	BlocklyDuino._isWorkspaceDirty = false;
};

// Atualiza o estado "sujo/limpo" com base no conteúdo atual
// do workspace: se não houver blocos, consideramos limpo;
// se houver qualquer bloco, consideramos sujo.
BlocklyDuino._updateDirtyFromWorkspace = function () {
	try {
		if (!BlocklyDuino.workspace ||
			typeof BlocklyDuino.workspace.getAllBlocks !== 'function') {
			return;
		}
		var count = BlocklyDuino.workspace.getAllBlocks().length;
		if (count === 0) {
			BlocklyDuino._isWorkspaceDirty = false;
		} else {
			BlocklyDuino._isWorkspaceDirty = true;
		}
		if (typeof BlocklyDuino._updateWindowTitle === 'function') {
			BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
		}
	} catch (e) {
		// falha silenciosa; não é crítico
	}
};

// Tenta restaurar o estado do projeto da sessão atual (sobrevive a
// recarregamentos internos, mas NÃO entre execuções diferentes do app).
try {
	if (window.sessionStorage) {
		var storedName = window.sessionStorage.currentProjectName || null;
		var storedPath = window.sessionStorage.currentProjectPath || null;
		if (storedName) {
			BlocklyDuino.currentProjectName = storedName;
		}
		if (storedPath) {
			BlocklyDuino.currentProjectPath = storedPath;
		}
	}
} catch (e) {
	// Ignora problemas de acesso ao sessionStorage
}

/**
 * Constrói o XML do workspace incluindo informações de toolbox
 * e devolve o texto pronto para salvar em disco.
 */
BlocklyDuino.buildWorkspaceXmlText = function () {
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);

	var toolbox = window.localStorage.toolbox;
	if (!toolbox) {
		toolbox = $('#toolboxes').val();
	}

	if (toolbox) {
		var newel = document.createElement('toolbox');
		newel.appendChild(document.createTextNode(toolbox));
		xml.insertBefore(newel, xml.childNodes[0]);
	}

	var toolboxids = window.localStorage.toolboxids;
	if (toolboxids === undefined || toolboxids === '') {
		if ($('#defaultCategories').length) {
			toolboxids = $('#defaultCategories').html();
		}
	}

	if (toolboxids) {
		var newel2 = document.createElement('toolboxcategories');
		newel2.appendChild(document.createTextNode(toolboxids));
		xml.insertBefore(newel2, xml.childNodes[0]);
	}

	return Blockly.Xml.domToPrettyText(xml);
};

// Atualiza o título da janela com o nome do projeto atual
BlocklyDuino._updateWindowTitle = function (projectName) {
	try {
		var baseTitle = BlocklyDuino._baseDocumentTitle || 'Blockly@rduino';
		var title = baseTitle;
		if (projectName && projectName !== '') {
			title = baseTitle + ' - ' + projectName;
		}
		// Se houver alterações não salvas, prefixa um * no título.
		if (BlocklyDuino._isWorkspaceDirty) {
			title = title + ' *';
		}
		document.title = title;
	} catch (e) {
		// apenas ignora, não é crítico
	}
};

// Define o estado padrão para um novo projeto não salvo
BlocklyDuino._setDefaultProject = function () {
	BlocklyDuino.currentProjectName = 'Projeto 1';
	BlocklyDuino.currentProjectPath = null;
	if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
		BlocklyDuino._markWorkspaceClean();
	}
	BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
	try {
		if (window.sessionStorage) {
			window.sessionStorage.currentProjectName = BlocklyDuino.currentProjectName;
			window.sessionStorage.currentProjectPath = '';
		}
	} catch (e) {}
};

// Ao iniciar:
// - se já houver um nome de projeto restaurado da sessão (por exemplo,
//   após recarregar a página ao mudar o layout), apenas reaplicamos o
//   título com esse nome;
// - se não houver nenhum nome (primeira execução, ou storage limpo),
//   assumimos "Projeto 1" como projeto padrão.
if (!BlocklyDuino.currentProjectName) {
	try {
		BlocklyDuino._setDefaultProject();
	} catch (e) {}
} else {
	try {
		if (typeof BlocklyDuino._updateWindowTitle === 'function') {
			BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
		}
	} catch (e) {}
}

// Em alguns ambientes Electron, o processo principal pode voltar a
// sobrescrever o título da janela (por exemplo, ao maximizar). Para
// garantir que o nome do projeto continue aparecendo na barra superior,
// reaplicamos o título toda vez que a janela é redimensionada ou ganha foco.
try {
	window.addEventListener('resize', function () {
		try {
			if (typeof BlocklyDuino !== 'undefined' &&
				typeof BlocklyDuino._updateWindowTitle === 'function') {
				BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
			}
		} catch (e) {}
	});
	window.addEventListener('focus', function () {
		try {
			if (typeof BlocklyDuino !== 'undefined' &&
				typeof BlocklyDuino._updateWindowTitle === 'function') {
				BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
			}
		} catch (e) {}
	});
} catch (e) {}

// Antes de fechar a janela do app, se houver alterações pendentes,
// exibe um alerta padrão do navegador/Electron pedindo confirmação.
try {
	window.addEventListener('beforeunload', function (e) {
		// Se não houver alterações, ou se o recarregamento estiver
		// sendo feito internamente (mudança de layout, por exemplo),
		// não exibimos nenhum aviso.
		if (!BlocklyDuino._isWorkspaceDirty || BlocklyDuino._suppressUnloadPrompt) {
			return;
		}
		var msg = (typeof MSG !== 'undefined' && MSG['unsavedProject']) ?
			MSG['unsavedProject'] :
			'Você tem alterações não salvas neste projeto. Deseja realmente sair?';
		e.returnValue = msg;
		return msg;
	});
} catch (e) {}

// Feedback visual para indicar que o projeto foi salvo
BlocklyDuino._showSaveAnimation = function (anchorElement) {
	try {
		var $btn = anchorElement ? $(anchorElement) : $('#btn_saveXML');
		if (!$btn || !$btn.length) {
			return;
		}

		var btnId = $btn.attr('id') || 'btn_saveXML';
		BlocklyDuino._saveAnimState = BlocklyDuino._saveAnimState || {};
		var state = BlocklyDuino._saveAnimState[btnId];

		var $icon = $btn.find('span.fas, span.fa').first();
		var $label = $btn.find('span[id^="span_"]').last();
		if (!$icon.length || !$label.length) {
			return;
		}

		// Guarda o estado original apenas na primeira animação
		if (!state) {
			state = {
				originalClasses: $icon.attr('class'),
				originalText: $label.text(),
				timeoutId: null
			};
			BlocklyDuino._saveAnimState[btnId] = state;
		} else if (state.timeoutId) {
			// Se já havia um timeout pendente, cancelamos para reiniciar o timer
			clearTimeout(state.timeoutId);
			state.timeoutId = null;
		}

		var savedText = (typeof MSG !== 'undefined' && MSG['span_saved']) ? MSG['span_saved'] : 'Salvo';

		// Ícone de check e texto "Salvo"
		$icon.attr('class', 'fas fa-check');
		$label.text(savedText);

		state.timeoutId = setTimeout(function () {
			// Restaura ícone e texto originais
			if (state.originalClasses) {
				$icon.attr('class', state.originalClasses);
			}
			$label.text(state.originalText);
			state.timeoutId = null;
		}, 500);
	} catch (e) {
		// falha silenciosa, animação é apenas cosmética
	}
};

// Agendamento de salvamento automático
BlocklyDuino._scheduleAutoSave = function () {
	try {
		// Só faz autosave quando já existe um arquivo associado
		// (projeto previamente salvo ou aberto). Projetos novos
		// ainda não salvos não devem abrir diálogo de "Salvar como"
		// automaticamente.
		if (!BlocklyDuino.currentProjectPath) {
			return;
		}
		// Verifica se estamos em Electron e temos ipcRenderer.
		var ipcRenderer = null;
		try {
			if (typeof require === 'function') {
				var electron = require('electron');
				ipcRenderer = electron && electron.ipcRenderer ? electron.ipcRenderer : null;
			}
		} catch (e) {
			ipcRenderer = null;
		}
		if (!ipcRenderer) {
			return;
		}

		// Debounce: espera um pequeno intervalo após a última alteração
		if (BlocklyDuino._autoSaveTimeoutId) {
			clearTimeout(BlocklyDuino._autoSaveTimeoutId);
		}
		BlocklyDuino._autoSaveTimeoutId = setTimeout(function () {
			BlocklyDuino._autoSaveTimeoutId = null;
			// Salvamento automático: grava o arquivo atual e,
			// em caso de sucesso, mostra a animação padrão de "Salvo".
			BlocklyDuino._saveProjectNative(false, null, true);
		}, 500);
	} catch (e) {
		// autosave é apenas uma conveniência; falhas são silenciosas
	}
};

// Função auxiliar: tenta usar IPC do Electron; se não houver,
// volta para o comportamento antigo de download via navegador.
// Parâmetro isAuto indica salvamento automático (sem animação).
BlocklyDuino._saveProjectNative = function (forceSaveAs, anchorElement, isAuto) {
	var data = BlocklyDuino.buildWorkspaceXmlText();
	var datenow = Date.now();
	var defaultName = BlocklyDuino.currentProjectName || ('blockly_arduino' + datenow + '.B@');

	var ipcRenderer = null;
	try {
		if (typeof require === 'function') {
			var electron = require('electron');
			ipcRenderer = electron && electron.ipcRenderer ? electron.ipcRenderer : null;
		}
	} catch (e) {
		ipcRenderer = null;
	}

	// Se não estamos em Electron ou não temos ipcRenderer
	if (!ipcRenderer) {
		// Em salvamento automático não há muito o que fazer no modo web
		if (isAuto) {
			return;
		}
		var uri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(data);
		var baseName = BlocklyDuino.currentProjectName || ('blockly_arduino' + datenow);
		var fileName = (baseName.indexOf('.') === -1) ? (baseName + '.B@') : baseName;
		$(anchorElement || this).attr({
			'download': fileName,
			'href': uri,
			'target': '_blank'
		});
		BlocklyDuino.currentProjectName = fileName;
		try {
			window.localStorage.currentProjectName = fileName;
		} catch (e) {}
		if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
			BlocklyDuino._markWorkspaceClean();
		}
		BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
		if (!isAuto) {
			BlocklyDuino._showSaveAnimation(anchorElement || this);
		}
		return;
	}

	var promise;
	if (forceSaveAs || !BlocklyDuino.currentProjectPath) {
		promise = ipcRenderer.invoke('blockly-save-project-as', {
			content: data,
			suggestedName: defaultName
		});
	} else {
		promise = ipcRenderer.invoke('blockly-save-project', {
			content: data,
			filePath: BlocklyDuino.currentProjectPath
		});
	}

	promise.then(function (result) {
		if (!result || result.canceled || !result.filePath) {
			return;
		}
		BlocklyDuino.currentProjectPath = result.filePath;
		try {
			var pathModule = null;
			try {
				pathModule = require('path');
			} catch (e) {}
			if (pathModule && typeof pathModule.basename === 'function') {
				BlocklyDuino.currentProjectName = pathModule.basename(result.filePath);
			} else {
				BlocklyDuino.currentProjectName = result.filePath;
			}
			try {
				window.localStorage.currentProjectName = BlocklyDuino.currentProjectName;
			} catch (e) {}
			try {
				if (window.sessionStorage) {
					window.sessionStorage.currentProjectName = BlocklyDuino.currentProjectName || '';
					window.sessionStorage.currentProjectPath = BlocklyDuino.currentProjectPath || '';
				}
			} catch (e) {}
		} catch (e) {
			// falha silenciosa, apenas não atualiza o nome
		}
		if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
			BlocklyDuino._markWorkspaceClean();
		}
		BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
		if (isAuto) {
			// Para autosave, usamos o botão padrão de salvar caso
			// nenhum elemento tenha sido informado.
			BlocklyDuino._showSaveAnimation(anchorElement || document.getElementById('btn_saveXML'));
		} else {
			BlocklyDuino._showSaveAnimation(anchorElement);
		}
	}).catch(function (e) {
		// Em caso de erro no IPC, não faz nada extra aqui.
	});
};

/**
 * Salvar projeto: se já houver um arquivo associado ao projeto,
 * o processo principal sobrescreve esse arquivo em silêncio.
 * Caso contrário, comporta-se como "Salvar como".
 */
BlocklyDuino.saveXmlFile = function () {
	return BlocklyDuino._saveProjectNative(false, this, false);
};

/**
 * "Salvar como": sempre pergunta (via diálogo nativo) onde salvar
 * e qual nome usar, e memoriza esse caminho como projeto corrente.
 */
BlocklyDuino.saveXmlFileAs = function () {
	return BlocklyDuino._saveProjectNative(true, this, false);
};


// Função auxiliar: aplica o XML de um projeto no workspace
BlocklyDuino._applyProjectXmlText = function (xmlText) {
	try {
		var xml = Blockly.Xml.textToDom(xmlText);
	} catch (e) {
		alert(MSG['xmlError']+'\n' + e);
		return;
	}
	var count = BlocklyDuino.workspace.getAllBlocks().length;
	if (count && confirm(MSG['xmlLoad'])) {
		BlocklyDuino.workspace.clear();
	}
	$('#tab_blocks a').tab('show');
	Blockly.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
	BlocklyDuino.selectedTab = 'blocks';
	BlocklyDuino.renderContent();
	
	// load toolbox
	var elem = xml.getElementsByTagName('toolbox')[0];
	if (elem != undefined) {
		var node = elem.childNodes[0];
		window.localStorage.toolbox = node.nodeValue;
		$('#toolboxes').val(node.nodeValue);
		
		// load toolbox categories
		elem = xml.getElementsByTagName('toolboxcategories')[0];
		if (elem != undefined) {
			node = elem.childNodes[0];
			window.localStorage.toolboxids = node.nodeValue;
		}

		// Nos navegadores/web, o código original recarregava a página
		// para aplicar o parâmetro de toolbox na URL. Em Electron isso
		// faz com que a aplicação esqueça o arquivo atual (nome/caminho).
		// Detectamos se estamos em Electron e só recarregamos a página
		// quando NÃO estivermos em Electron.
		var isElectron = false;
		try {
			isElectron = !!(window && window.process && window.process.versions && window.process.versions.electron);
		} catch (e) {
			isElectron = false;
		}
		if (!isElectron) {
			var search = BlocklyDuino.addReplaceParamToUrl(window.location.search, 'toolbox', $('#toolboxes').val());
			search = search.replace(/([?&]url=)[^&]*/, '');
			window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + search;
		}
	}
};

// Carregamento via input file (fallback web)
BlocklyDuino.load = function (event) {
	var files = event.target.files;
	// Only allow uploading one file.
	if (files.length != 1) {
		return;
	}

	// Memoriza apenas o nome lógico; não temos caminho real aqui
	BlocklyDuino.currentProjectName = files[0].name;
	BlocklyDuino.currentProjectPath = null;
	try {
		window.localStorage.currentProjectName = files[0].name;
	} catch (e) {
		// ignorar problemas de acesso ao localStorage
	}
	try {
		if (window.sessionStorage) {
			window.sessionStorage.currentProjectName = BlocklyDuino.currentProjectName || '';
			window.sessionStorage.currentProjectPath = '';
		}
	} catch (e) {}
	try {
		BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
	} catch (e) {}
	if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
		BlocklyDuino._markWorkspaceClean();
	}

	// FileReader
	var reader = new FileReader();
	reader.onloadend = function(event) {
		var target = event.target;
		// 2 == FileReader.DONE
		if (target.readyState == 2) {
			BlocklyDuino._applyProjectXmlText(target.result);
		}
		// Reset value of input after loading because Chrome will not fire
		// a 'change' event if the same file is loaded again.
		$('#load').val('');
	};
	reader.readAsText(files[0]);
};

// Abertura nativa de projeto (Electron): usa diálogo do sistema
BlocklyDuino.openProject = function () {
	var ipcRenderer = null;
	try {
		if (typeof require === 'function') {
			var electron = require('electron');
			ipcRenderer = electron && electron.ipcRenderer ? electron.ipcRenderer : null;
		}
	} catch (e) {
		ipcRenderer = null;
	}

	// Se não estivermos em Electron, cai no fluxo antigo
	if (!ipcRenderer) {
		$('#load').click();
		return;
	}

	ipcRenderer.invoke('blockly-open-project').then(function (result) {
		if (!result || result.canceled) {
			// usuário apenas cancelou o diálogo nativo
			return;
		}
		if (!result.filePath || !result.content || result.error) {
			// algo deu errado no handler nativo: volta para o fluxo antigo
			$('#load').click();
			return;
		}
		// Atualiza nome lógico e caminho real do projeto aberto
		try {
			var pathModule = null;
			try {
				pathModule = require('path');
			} catch (e) {}
			if (pathModule && typeof pathModule.basename === 'function') {
				BlocklyDuino.currentProjectName = pathModule.basename(result.filePath);
			} else {
				BlocklyDuino.currentProjectName = result.filePath;
			}
			BlocklyDuino.currentProjectPath = result.filePath;
			try {
				window.localStorage.currentProjectName = BlocklyDuino.currentProjectName;
			} catch (e) {}
			try {
				if (window.sessionStorage) {
					window.sessionStorage.currentProjectName = BlocklyDuino.currentProjectName || '';
					window.sessionStorage.currentProjectPath = BlocklyDuino.currentProjectPath || '';
				}
			} catch (e) {}
			BlocklyDuino._updateWindowTitle(BlocklyDuino.currentProjectName);
		} catch (e) {}

		// Aplica o conteúdo XML no workspace
		BlocklyDuino._applyProjectXmlText(result.content);
		if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
			BlocklyDuino._markWorkspaceClean();
		}
	}).catch(function (e) {
		// Se o IPC falhar por qualquer motivo, volta para o input file
		try {
			$('#load').click();
		} catch (e2) {}
	});
};

// Ajusta descarte para voltar o projeto ao estado "novo"
var _origDiscard = BlocklyDuino.discard;
BlocklyDuino.discard = function () {
	var count = BlocklyDuino.workspace.getAllBlocks().length;
	if (count < 2 || window.confirm(MSG['discard'].replace('%1', count))) {
		BlocklyDuino.workspace.clear();
		//clean URL from example if opened
		var search = window.location.search;
		var newsearch = search.replace(/([?&]url=)[^&]*/, '');
		window.history.pushState(search, 'Title', newsearch);
		BlocklyDuino.renderContent();

		try {
			window.localStorage.removeItem('currentProjectName');
		} catch (e) {
			// ignorar problemas de acesso ao localStorage
		}
		try {
			if (window.sessionStorage) {
				window.sessionStorage.removeItem('currentProjectName');
				window.sessionStorage.removeItem('currentProjectPath');
			}
		} catch (e) {}
		// volta ao estado de projeto novo "Projeto 1"
		try {
			BlocklyDuino._setDefaultProject();
		} catch (e) {}
		if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
			BlocklyDuino._markWorkspaceClean();
		}
	}
};

// Ajusta limpeza de storage para também esquecer o projeto atual
var _origClearLocalStorage = BlocklyDuino.clearLocalStorage;
BlocklyDuino.clearLocalStorage = function () {
	if (typeof _origClearLocalStorage === 'function') {
		_origClearLocalStorage();
	} else {
		window.removeEventListener('unload', BlocklyDuino.backupBlocks, false);
		localStorage.clear();
		sessionStorage.clear();
	}
	try {
		window.localStorage.removeItem('currentProjectName');
	} catch (e) {
		// ignorar problemas de acesso ao localStorage
	}
	try {
		if (window.sessionStorage) {
			window.sessionStorage.removeItem('currentProjectName');
			window.sessionStorage.removeItem('currentProjectPath');
		}
	} catch (e) {}
	// volta ao estado padrão de projeto novo
	try {
		BlocklyDuino._setDefaultProject();
	} catch (e) {}
	if (typeof BlocklyDuino._markWorkspaceClean === 'function') {
		BlocklyDuino._markWorkspaceClean();
	}
};

// Permite definir/alterar manualmente o nome do projeto atual
BlocklyDuino.renameProject = function () {
	var sugestao = BlocklyDuino.currentProjectName || ('blockly_arduino' + Date.now() + '.B@');
	var nome = window.prompt(MSG['span_renameProject'] || 'Nome do projeto:', sugestao);
	if (!nome) {
		return;
	}
	BlocklyDuino.currentProjectName = nome;
	try {
		window.localStorage.currentProjectName = nome;
	} catch (e) {
		// ignorar problemas de acesso ao localStorage
	}
};
