const {ipcRenderer} = require('electron');
const {exec} = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const SerialPort = require('serialport');

// Diretório de dados do usuário compartilhado com o processo principal
let userDataBaseDir = null;
ipcRenderer.invoke('blockly-get-user-data-dir').then(function (dir) {
	if (dir) {
		userDataBaseDir = dir;
		try {
			fs.ensureDirSync(userDataBaseDir);
		} catch (e) {}
	}
}).catch(function () {
	// se falhar, continua usando diretórios relativos como fallback
});

function getUserDataBaseDirFallback() {
	if (userDataBaseDir) return userDataBaseDir;
	// Fallback: diretório atual (comportamento antigo)
	return process.cwd();
}

function getTempSketchDir() {
	const baseDir = getUserDataBaseDirFallback();
	const tmpDir = path.join(baseDir, 'arduino', 'tmp');
	try {
		fs.ensureDirSync(tmpDir);
	} catch (e) {}
	return tmpDir;
}

function traduzirMensagemArduinoCli(texto) {
	if (!texto) return texto;
	let t = texto.toString();
	t = t.replace(/Error during Upload:/g, 'Erro durante o envio:');
	t = t.replace(/opening sketch:/g, 'abrindo o sketch:');
	t = t.replace(/no valid sketch found/g, 'nenhum sketch válido encontrado');
	t = t.replace(/missing tmp\.ino/g, 'arquivo tmp.ino ausente');
	t = t.replace(/Sketch uses ([0-9]+) bytes \(1%\) of program storage space\./g,
		'Sketch usa $1 bytes (1%) do espaço de armazenamento do programa.');
	t = t.replace(/Sketch uses ([0-9]+) bytes \(([0-9]+)%\) of program storage space\./g,
		'Sketch usa $1 bytes ($2%) do espaço de armazenamento do programa.');
	t = t.replace(/Maximum is ([0-9]+) bytes\./g, 'O máximo é de $1 bytes.');
	t = t.replace(/Global variables use ([0-9]+) bytes \(([0-9]+)%\) of dynamic memory, leaving ([0-9]+) bytes for local variables\./g,
		'Variáveis globais usam $1 bytes ($2%) da memória dinâmica, restando $3 bytes para variáveis locais.');
	t = t.replace(/Maximum is ([0-9]+) bytes for local variables\./g,
		'O máximo é de $1 bytes para variáveis locais.');
	return t;
}

/* fake IDE code Arduino
** load: serial port list
** btn_term: open modal with serial console
** btn_factory: open modal with blocks factory
** btn_verify_local: verify and compile in hex file
** btn_flash_local: upload hex file in Arduino board
*/

var menu_com = document.getElementById('serialport_ide')
menu_com.addEventListener('mouseover', function(event) {
    SerialPort.list().then(ports => {
        menu_com.options.length = 0;
        ports.forEach(function (port) {
            var option = document.createElement('option');
            option.value = port.path;
            option.text = port.path + ' ' + port.manufacturer;
            menu_com.appendChild(option);
        });
    })
});

window.addEventListener('load', function load(event) {
	document.getElementById('btn_saveConfigGlobale').onclick = function(event) {
		var baseDir = getUserDataBaseDirFallback();
		try {
			fs.ensureDirSync(baseDir);
		} catch (e) {}
		var fileSettings = path.join(baseDir, 'Blockly@rduino.json');
		var Settings = window.location.search
		fs.writeFileSync(fileSettings, JSON.stringify(window.location.search), (err) => {
			if(err){
				console.log("An error ocurred creating the file "+ err.message)
			}                    
			console.log("The file has been succesfully saved")
		})
		console.log(window.location.search)
	}
	document.getElementById('btn_term').onclick = function(event) {
		var com = document.getElementById('serialport_ide').value
		if (com != "no_com") {
			localStorage.setItem("com",com)
			ipcRenderer.send("prompt", "")
			document.getElementById('local_debug').style.color = '#ffffff'
			document.getElementById('local_debug').innerHTML = ''
		} else {
			document.getElementById('local_debug').style.color = '#ffffff'
			document.getElementById('local_debug').innerHTML = 'Sélectionner un port COM !!!'
			return
		}
	}
	document.getElementById('btn_factory').onclick = function(event) {
  		var val = location.search.match(new RegExp('[?&]lang=([^&]+)'));
  		var argLangChoice = val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : 'en';
		console.log(argLangChoice);
		ipcRenderer.send("factory", argLangChoice);
	}
	document.getElementById('btn_verify_local').onclick = function(event) {
		var btnVerify = document.getElementById('btn_verify_local');
		const tmpDir = getTempSketchDir();
		var file_path = tmpDir;
		var file = path.join(tmpDir, 'tmp.ino');
		var data = $('#pre_arduino').text()
		var carte = document.getElementById('board_select').value
		if (carte != "none") {
			document.getElementById('local_debug').style.color = '#ffffff'
			document.getElementById('local_debug').innerHTML = 'Placa ' + profile.defaultBoard['description']
			var upload_arg = profile.defaultBoard['upload_arg']
			} else {
				document.getElementById('local_debug').style.color = '#ff0000'
				document.getElementById('local_debug').innerHTML = 'Selecione uma placa!'
				return
		}
		var sketchArg = '"' + file_path + '"';
		if ($('#detailedCompilation').prop('checked'))
				var cmd = 'arduino-cli.exe --debug compile --fqbn ' + upload_arg + ' ' + sketchArg
			else
				var cmd = 'arduino-cli.exe compile --fqbn ' + upload_arg + ' ' + sketchArg
		fs.writeFile(file, data, (err) => {
			if (err) return console.log(err)
		});
		document.getElementById('local_debug').innerHTML += '\nVerificação: em andamento...\n' + '<i class="fa fa-spinner fa-pulse fa-1_5x fa-fw"></i>'
		exec(cmd , {cwd: './arduino'} , (error, stdout, stderr) => {
			if (error) {
				document.getElementById('local_debug').style.color = '#ff0000'
				document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stderr)
				if (btnVerify) {
					btnVerify.style.backgroundColor = '#b91c1c';
					btnVerify.style.borderColor = 'transparent';
					setTimeout(function() {
						btnVerify.style.backgroundColor = '';
						btnVerify.style.borderColor = '';
					}, 2500);
				}
				return
			}
			document.getElementById('local_debug').style.color = '#00ff00'
				document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stdout) + '\nVerificação: OK'
				if (btnVerify) {
						btnVerify.style.backgroundColor = '#22c55e';
					btnVerify.style.borderColor = 'transparent';
					setTimeout(function() {
						btnVerify.style.backgroundColor = '';
						btnVerify.style.borderColor = '';
					}, 2500);
				}
		})
	}
	document.getElementById('btn_flash_local').onclick = function(event) {
		var btnFlash = document.getElementById('btn_flash_local');
		const tmpDir = getTempSketchDir();
		var file_path = tmpDir
		var file = path.join(tmpDir, 'tmp.ino')
		var data = $('#pre_arduino').text()
		var carte = document.getElementById('board_select').value
		var com = document.getElementById('serialport_ide').value
		if (carte=="none"){
			document.getElementById('local_debug').style.color = '#ff0000'
			document.getElementById('local_debug').innerHTML = 'Selecione uma placa!'
			if (btnFlash) {
				btnFlash.style.backgroundColor = '#b91c1c';
				btnFlash.style.borderColor = 'transparent';
				setTimeout(function() {
					btnFlash.style.backgroundColor = '';
					btnFlash.style.borderColor = '';
				}, 2500);
			}
			return
			} else {
				if (com=="no_com"){
					document.getElementById('local_debug').style.color = '#ff0000'
					document.getElementById('local_debug').innerHTML = 'Selecione uma porta!'
					if (btnFlash) {
						btnFlash.style.backgroundColor = '#b91c1c';
						btnFlash.style.borderColor = 'transparent';
						setTimeout(function() {
							btnFlash.style.backgroundColor = '';
							btnFlash.style.borderColor = '';
						}, 2500);
					}
					return
				} else {
					document.getElementById('local_debug').style.color = '#ffffff'
					document.getElementById('local_debug').innerHTML = 'Placa ' + profile.defaultBoard['description'] + ' na porta ' + com
					var upload_arg = profile.defaultBoard['upload_arg']
				}
		}

		// comando de compilação
		var cmdCompile
		var sketchArg2 = '"' + file_path + '"'
		if ($('#detailedCompilation').prop('checked'))
			cmdCompile = 'arduino-cli.exe --debug compile --fqbn ' + upload_arg + ' ' + sketchArg2
		else
			cmdCompile = 'arduino-cli.exe compile --fqbn ' + upload_arg + ' ' + sketchArg2

		fs.writeFile(file, data, (err) => {
			if (err) return console.log(err)
		})

		document.getElementById('local_debug').innerHTML = 'Placa ' + profile.defaultBoard['description'] + ' na porta ' + com
		document.getElementById('local_debug').innerHTML += '\nVerificação: em andamento...\n' + '<i class="fa fa-spinner fa-pulse fa-1_5x fa-fw"></i>'

		// primeiro compila
		exec(cmdCompile , {cwd: './arduino'} , (error, stdout, stderr) => {
			if (error) {
				document.getElementById('local_debug').style.color = '#ff0000'
				document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stderr)
				if (btnFlash) {
					btnFlash.style.backgroundColor = '#b91c1c';
					btnFlash.style.borderColor = 'transparent';
					setTimeout(function() {
						btnFlash.style.backgroundColor = '';
						btnFlash.style.borderColor = '';
					}, 2500);
				}
				return
			}

			// compilação OK, agora faz upload
			document.getElementById('local_debug').style.color = '#00ff00'
			document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stdout) + '\nVerificação: OK'
			document.getElementById('local_debug').innerHTML += '\nTransferência: em andamento...\n' + '<i class="fa fa-spinner fa-pulse fa-1_5x fa-fw"></i>'

			var cmdUpload
			if ($('#detailedCompilation').prop('checked'))
				cmdUpload = 'arduino-cli.exe --debug upload -p ' + com + ' --fqbn ' + upload_arg + ' ' + sketchArg2
			else
				cmdUpload = 'arduino-cli.exe upload -p ' + com + ' --fqbn ' + upload_arg + ' ' + sketchArg2

			console.log(cmdUpload)
				exec(cmdUpload , {cwd: './arduino'} , (error2, stdout2, stderr2) => {
				if (error2) {
					document.getElementById('local_debug').style.color = '#ff0000'
					document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stderr2)
					if (btnFlash) {
						btnFlash.style.backgroundColor = '#b91c1c';
						btnFlash.style.borderColor = 'transparent';
						setTimeout(function() {
							btnFlash.style.backgroundColor = '';
							btnFlash.style.borderColor = '';
						}, 2500);
					}
					return
				}
				document.getElementById('local_debug').style.color = '#00ff00'
				document.getElementById('local_debug').innerHTML = traduzirMensagemArduinoCli(stdout2) + '\nTransferência: OK'
				if (btnFlash) {
						btnFlash.style.backgroundColor = '#22c55e';
					btnFlash.style.borderColor = 'transparent';
					setTimeout(function() {
						btnFlash.style.backgroundColor = '';
						btnFlash.style.borderColor = '';
					}, 2500);
				}
				fs.readdir(tmpDir, (err, files) => {
				  if (err) throw err;
				  for (const file of files) {
					fs.unlink(path.join(tmpDir, file), err => {
					  if (err) throw err
					})
				  }
				})
			})
		})
	}
})