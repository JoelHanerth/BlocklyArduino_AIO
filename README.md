# Blockly@rduino_AIO v4

Ambiente **tudo‑em‑um (All‑In‑One)** para programação visual com **Blockly@rduino** e **Arduino**, pensado para funcionar **offline em Windows** e facilitar o trabalho de professores, alunos e entusiastas de robótica/eletrônica educacional.

Este pacote reúne em um único executável o editor visual baseado em blocos, as ferramentas de compilação e envio para placas Arduino, bibliotecas adicionais e recursos de apoio, reduzindo ao máximo a necessidade de configurações manuais.

---

## Sobre o projeto

Este programa foi desenvolvido para simplificar a utilização do **Blockly@rduino** em:

- Escolas e cursos de robótica educacional;
- Laboratórios de informática que não podem (ou não devem) depender de conexão constante com a internet;
- Oficinas, projetos de iniciação científica e clubes de programação/Arduino;
- Ambientes onde a instalação do Arduino IDE completo ou configuração de múltiplas ferramentas seria um obstáculo.

Com ele, o usuário pode abrir o aplicativo, montar o programa em blocos, gerar o código C/C++ correspondente e enviá-lo diretamente para a placa Arduino, tudo a partir de um único pacote portátil.

O projeto original deste AIO (All‑In‑One) está disponível em:

- Repositório original: https://github.com/technologiescollege/BlocklyArduino_AIO

Esta versão foi adaptada e organizada para facilitar ainda mais o uso em português brasileiro e em ambientes educacionais.

---

## Principais adaptações desta versão (Paçoca / Brick)

Além do pacote original, esta versão traz adaptações específicas para o ecossistema **Paçoca / Brick**.

### Suporte completo à placa Paçoca

- Placa **Paçoca** adicionada como placa oficial, baseada em um Arduino Nano compatível, com mapeamento completo de pinos digitais, analógicos, PWM, I2C, SPI e interrupções;
- Imagens dedicadas da placa (foto grande e miniaturas) exibidas na interface, ajudando os alunos a identificarem os pinos corretamente;
- Ambiente já configurado para iniciar direto com a placa Paçoca selecionada e com o toolbox correspondente.

### Novos blocos Brick integrados ao firmware

- Criação de categorias específicas de blocos para o Brick (motores, sensores, LEDs, som, etc.), organizadas para uso com a Paçoca;
- Blocos para **inicializar e atualizar o Brick**:
	- inicialização automática ou manual do Brick (`brick.inicializa()`);
	- atualização periódica (`brick.atualiza()`) pensada para ficar dentro do `loop`;
- Blocos para **interagir com o kit**:
	- leitura do botão físico do Brick (condição “botão apertado”);
	- espera até o botão ser pressionado (controle de fluxo simples para alunos);
	- espera com tempo usando o método `brick.espera(...)` em vez de `delay(...)` puro;
	- impressão no terminal serial via blocos dedicados (útil para depuração e feedback em aula);
- Toda a geração de código desses blocos já inclui automaticamente a biblioteca **brickSimples.h** e garante que a inicialização do Brick aconteça de forma consistente (automática ou manual conforme os blocos usados).

### Fluxo de salvar/abrir projeto pensado para sala de aula

- Controle de **nome do projeto** e **arquivo atual** diretamente na aplicação:
	- o título da janela mostra o nome do projeto em uso (por exemplo, “Projeto 1” ou o nome do arquivo salvo);
	- um asterisco `*` indica quando há alterações não salvas;
- Botões separados para **“Salvar projeto”** e **“Salvar como…”**, utilizando a janela nativa do Windows para escolher pasta e nome de arquivo `.B@`;
- Sistema de **autosave** (salvamento automático) que grava periodicamente o projeto atual sem interromper o fluxo da aula;
- Lista de **projetos recentes**, facilitando reabrir atividades dos alunos sem precisar procurar manualmente os arquivos;
- Atalho de teclado **Ctrl+S** para salvar rapidamente, mantendo o comportamento familiar de outros editores.

### Ajustes visuais e simplificação da interface

- Redesign do menu lateral com foco nas ações mais usadas (salvar, abrir, configurações principais);
- Botões de salvar/carregar com destaque visual (cores, ícones e feedback de “Salvo”) para que o aluno veja claramente quando o projeto foi gravado;
- Ocultação de botões avançados e pouco usados da interface original, reduzindo distrações e deixando o ambiente mais “enxuto” para uso em sala;
- Melhor organização de miniaturas de placas, área de ajuda e acessibilidade, tornando o layout mais limpo em telas de laboratório.

Essas adaptações foram pensadas para que quem utiliza os kits Paçoca possa abrir o programa, escolher a placa correta, montar o programa em blocos Brick e salvar seus projetos com segurança, tudo com o mínimo de configuração manual possível.

---

## Principais recursos

- Versão **offline para Windows** (não depende de navegador ou conexão constante à internet);
- Interface **multilíngue** (francês, inglês, espanhol e outros idiomas via arquivos de tradução);
- Suporte a diversas placas Arduino, com **detecção automática** das placas mais comuns;
- Ferramentas integradas para **compilar** e **enviar** o código para a placa;
- Possibilidade de instalar drivers e ferramentas auxiliares a partir da própria pasta `tools/`;
- Integração com servidor de supervisão (Firmata / PyMata) para testes de entrada/saída em tempo real;
- Organização em pastas para sketchbook, bibliotecas e exemplos de projetos;
- Ambiente portátil: pode ser descompactado em um pendrive e utilizado em diferentes computadores Windows.

---

## Como usar

1. **Baixe** o pacote compactado do Blockly@rduino_AIO.
2. **Descompacte** o conteúdo em uma pasta de sua preferência (ou em um pendrive).
3. **Execute** o arquivo `BlocklyArduino_AIO.exe` (pode exigir permissão do Windows).
4. Aguarde a inicialização do ambiente Electron e do Blockly@rduino.
5. Escolha a placa e a porta serial adequadas.
6. Monte o programa em blocos, gere o código e envie para o Arduino.

> Dica: mantenha a estrutura de pastas como está no pacote. Evite renomear ou mover diretórios internos, para que todos os componentes funcionem corretamente.

---

## Estrutura básica de pastas

Algumas pastas importantes deste pacote:

- `B@electron/` – Contém a aplicação Electron e os arquivos necessários para a execução offline.
- `B@electron/arduino/` – Configurações e arquivos relacionados à integração com Arduino (CLI, pacotes, etc.).
- `B@electron/www/` – Versão embarcada do Blockly@rduino utilizada pela aplicação.
- `sketchbook/` – Local padrão para projetos e bibliotecas de usuário.
- `tools/` – Scripts auxiliares, drivers, Firmata, Python embutido e outros utilitários.
- `documentation/` – Links e/ou arquivos de apoio à documentação.

Essa organização permite atualizar partes específicas (por exemplo, a pasta `www/` com uma nova versão do Blockly@rduino) sem precisar reinstalar tudo.

---

## Atualizações e personalização

- Você pode atualizar o conteúdo do Blockly@rduino substituindo a pasta `B@electron/www/` por uma versão mais recente do projeto web.
- É possível adicionar bibliotecas Arduino personalizadas em `sketchbook/libraries/`.
- Para incluir novos exemplos, utilize a pasta `sketchbook/projects/` ou a estrutura de exemplos do próprio Blockly@rduino.
- Professores podem adicionar materiais de apoio e documentação na pasta `documentation/`, criando um ambiente mais completo para as aulas.

---

## Créditos

- **Projeto original AIO**: https://github.com/technologiescollege/BlocklyArduino_AIO
- **Projeto Blockly@rduino (web)**: https://github.com/technologiescollege/Blockly-at-rduino
- Integração Arduino/serial baseada na versão Electron do BlocklyArduino e em ferramentas da comunidade Arduino.

### Adaptação desta versão

- Adaptação, organização e ajustes para este pacote e documentação em português:
	- **Joel Hanerth** – https://www.linkedin.com/in/joel-hanerth/

Se você utiliza este ambiente em aulas, laboratórios ou projetos, considere apoiar e divulgar o projeto original e o trabalho de quem contribui com adaptações e materiais em sua instituição.
