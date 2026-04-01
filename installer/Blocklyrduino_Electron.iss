; Script Inno Setup para instalar o Blockly@rduino (versão Electron)
; Ajuste AppVersion, Publisher e outros dados se quiser.

[Setup]
AppId={{771C21F0-20F2-4A4A-9E7B-BlocklyRduinoElectron}
AppName=Blockly@rduino
AppVersion=1.0.1
AppPublisher=JV
AppPublisherURL=https://
; Instalar em Program Files
DefaultDirName={pf64}\\Blocklyrduino
DefaultGroupName=Blockly@rduino
DisableDirPage=no
DisableProgramGroupPage=no
OutputDir=.
OutputBaseFilename=Blocklyrduino_Electron_Installer
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64
; Exigir admin para instalar em Program Files
PrivilegesRequired=admin
; Versões do executável (Propriedades do arquivo no Windows)
VersionInfoVersion=1.0.0.0
VersionInfoProductVersion=1.0.0.0
VersionInfoProductName=Blockly@rduino
VersionInfoCompany=JV
; Ícone do instalador (usa favicon principal do app Electron)
SetupIconFile=..\\B@electron\\www\\favicon.ico

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "Criar atalho na área de trabalho"; GroupDescription: "Tarefas adicionais"; Flags: unchecked

[Files]
; Copia toda a pasta B@electron para a pasta de instalação
; ".." significa: sair da pasta installer e ir para a pasta B@electron ao lado
Source: "..\\B@electron\\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Icons]
; Atalho no menu Iniciar
Name: "{group}\Blockly@rduino"; Filename: "{app}\Blockly@rduino.exe"; WorkingDir: "{app}"; IconFilename: "{app}\www\favicon.ico"
; Atalho na área de trabalho (opcional)
Name: "{commondesktop}\Blockly@rduino"; Filename: "{app}\Blockly@rduino.exe"; WorkingDir: "{app}"; Tasks: desktopicon; IconFilename: "{app}\www\favicon.ico"

[Run]
; Executar após a instalação (opcional)
Filename: "{app}\Blockly@rduino.exe"; Description: "Executar Blockly@rduino"; Flags: nowait postinstall skipifsilent
