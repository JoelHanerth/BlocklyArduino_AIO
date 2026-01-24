const {ipcRenderer} = require('electron');
const {exec} = require('child_process');
const fs = require('fs-extra');
const SerialPort = require('serialport');

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
		var fileSettings = "./Blockly@rduino.json"
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
		try {
			fs.accessSync('.\\arduino\\tmp', fs.constants.W_OK)
			} catch (err) {
				fs.mkdirSync('.\\arduino\\tmp', { recursive: false }, (err) => {
					if (err) throw err
					})
		}
		var file_path = '.\\tmp'
		var file = '.\\arduino\\tmp\\tmp.ino'
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
		if ($('#detailedCompilation').prop('checked'))
				var cmd = 'arduino-cli.exe --debug compile --fqbn ' + upload_arg + ' ' + file_path
			else
				var cmd = 'arduino-cli.exe compile --fqbn ' + upload_arg + ' ' + file_path
		fs.writeFile(file, data, (err) => {
			if (err) return console.log(err)
		});
		document.getElementById('local_debug').innerHTML += '\nVerificação: em andamento...\n' + '<i class="fa fa-spinner fa-pulse fa-1_5x fa-fw"></i>'
		exec(cmd , {cwd: './arduino'} , (error, stdout, stderr) => {
			if (error) {
				document.getElementById('local_debug').style.color = '#ff0000'
				document.getElementById('local_debug').innerHTML = stderr
				return
			}
			document.getElementById('local_debug').style.color = '#00ff00'
				document.getElementById('local_debug').innerHTML = stdout + '\nVerificação: OK'
		})
	}
	document.getElementById('btn_flash_local').onclick = function(event) {
		var file_path = '.\\tmp'
		var carte = document.getElementById('board_select').value
		var com = document.getElementById('serialport_ide').value
		if (carte=="none"){
			document.getElementById('local_debug').style.color = '#ff0000'
			document.getElementById('local_debug').innerHTML = 'Selecione uma placa!'
			return
			} else {
				if (com=="no_com"){
				document.getElementById('local_debug').style.color = '#ff0000'
					document.getElementById('local_debug').innerHTML = 'Selecione uma porta!'
				return
				} else {
					document.getElementById('local_debug').style.color = '#ffffff'
					document.getElementById('local_debug').innerHTML = 'Placa ' + profile.defaultBoard['description'] + ' na porta ' + com
					var upload_arg = profile.defaultBoard['upload_arg']
				}
		}
		if ($('#detailedCompilation').prop('checked'))
				var cmd = 'arduino-cli.exe --debug upload -p ' + com + ' --fqbn ' + upload_arg + ' ' + file_path
			else
				var cmd = 'arduino-cli.exe upload -p ' + com + ' --fqbn ' + upload_arg + ' ' + file_path
		document.getElementById('local_debug').innerHTML = 'Placa ' + profile.defaultBoard['description'] + ' na porta ' + com
		document.getElementById('local_debug').innerHTML += '\nTransferência: em andamento...\n' + '<i class="fa fa-spinner fa-pulse fa-1_5x fa-fw"></i>'
		console.log(cmd)
		exec(cmd , {cwd: './arduino'} , (error, stdout, stderr) => {
			if (error) {
				document.getElementById('local_debug').style.color = '#ff0000'
				document.getElementById('local_debug').innerHTML = stderr
				return
			}
			document.getElementById('local_debug').style.color = '#00ff00'
				document.getElementById('local_debug').innerHTML = stdout + '\nTransferência: OK'
			const path = require('path')
			fs.readdir('.\\arduino\\tmp', (err, files) => {
			  if (err) throw err;
			  for (const file of files) {
				fs.unlink(path.join('.\\arduino\\tmp', file), err => {
				  if (err) throw err
				})
			  }
			})
		})
	}
})