/**
 * Blockly@rduino
 */

"use strict";

// Integração com Electron para salvar diretamente no disco (modo AIO)
var BlocklyDuino = BlocklyDuino || {};
BlocklyDuino.currentProjectPath = BlocklyDuino.currentProjectPath || null;

var _fs = null;
var _electronDialog = null;

// Garante que tentamos obter os módulos do Electron apenas quando necessário
BlocklyDuino._ensureElectronEnv = function () {
	if (_fs && _electronDialog !== null) {
		return;
	}
	try {
		var electron = require("electron");
		_fs = require("fs");
		_electronDialog = (electron.remote && electron.remote.dialog) || electron.dialog || null;
	} catch (e) {
		_fs = null;
		_electronDialog = null;
	}
};


/**
 * Populate the edit textarea "edit_code" with the pre arduino code
 */
BlocklyDuino.editArduinoCode = function() {
	    $('#edit_code').val($('#pre_arduino').text());
};

// Gera o XML completo do projeto (incluindo informações de toolbox)
BlocklyDuino.buildProjectXmlText = function () {
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

	return Blockly.Xml.domToPrettyText(xml);
};

// Salvar (sobrescrever) projeto. Se ainda não houver caminho, cai para "Salvar como".
BlocklyDuino.saveXmlFile = function (event) {
	// Impede que outros handlers de clique rodem (por exemplo, handlers legados)
	if (event) {
		if (event.preventDefault) event.preventDefault();
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else if (event.stopPropagation) {
			event.stopPropagation();
		}
	}

	var data = BlocklyDuino.buildProjectXmlText();
	BlocklyDuino._ensureElectronEnv();

	// Se temos acesso ao sistema de arquivos e já existe caminho, sobrescreve sem abrir diálogo
	if (_fs && BlocklyDuino.currentProjectPath) {
		_fs.writeFile(BlocklyDuino.currentProjectPath, data, 'utf8', function (err) {
			if (err) {
				alert('Erro ao salvar o projeto: ' + err.message);
			}
		});
		return false;
	}

	// Caso ainda não haja caminho definido, comporta-se como "Salvar como"
	if (_fs && _electronDialog) {
		BlocklyDuino.saveXmlFileAs(event);
		return false;
	}

	// Fallback: comportamento antigo via download (para ambientes sem Electron)
	var datenow = Date.now();
	var filename = "blockly_arduino" + datenow + ".B@";
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(data));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

// "Salvar como" – sempre pergunta o local e atualiza o caminho do projeto
BlocklyDuino.saveXmlFileAs = function (event) {
	if (event) {
		if (event.preventDefault) event.preventDefault();
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else if (event.stopPropagation) {
			event.stopPropagation();
		}
	}

	var data = BlocklyDuino.buildProjectXmlText();
	BlocklyDuino._ensureElectronEnv();

	if (!_fs || !_electronDialog) {
		// Sem Electron, volta para o comportamento antigo de download, mas usando link temporário
		var datenow = Date.now();
		var filename = "blockly_arduino" + datenow + ".B@";
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		return;
	}

	var defaultName = "blockly_arduino.B@";
	if (BlocklyDuino.currentProjectPath) {
		defaultName = BlocklyDuino.currentProjectPath;
	}

	try {
		var options = {
			title: (typeof MSG !== 'undefined' && MSG['span_saveXML']) ? MSG['span_saveXML'] : 'Salvar projeto',
			defaultPath: defaultName,
			filters: [
				{ name: 'Projetos BlocklyArduino', extensions: ['B@', 'xml'] },
				{ name: 'Todos os arquivos', extensions: ['*'] }
			]
		};

		// API clássica baseada em callback, compatível com versões antigas
		_electronDialog.showSaveDialog(options, function (result) {
			if (!result) {
				return;
			}
			var filePath = (typeof result === 'string') ? result : result.filePath;
			if (!filePath) {
				return; // usuário cancelou
			}
			BlocklyDuino.currentProjectPath = filePath;
			_fs.writeFile(filePath, data, 'utf8', function (err) {
				if (err) {
					alert('Erro ao salvar o projeto: ' + err.message);
				}
			});
		});
	} catch (e) {
		alert('Erro ao abrir o diálogo de salvar: ' + e.message);
	}
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

	// Em Electron, o objeto File possui a propriedade "path" com o caminho real
	if (files[0] && files[0].path) {
		BlocklyDuino.currentProjectPath = files[0].path;
	} else {
		BlocklyDuino.currentProjectPath = null;
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