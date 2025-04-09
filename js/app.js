// Funções para o assistente virtual

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do chat
    const chatArea = document.getElementById('chatArea');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const voiceButton = document.getElementById('voiceButton');
    
    // Elementos do modal
    const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const helpButton = document.getElementById('helpButton');
    
    // Elementos de acessibilidade
    const decreaseFontBtn = document.getElementById('decreaseFont');
    const normalFontBtn = document.getElementById('normalFont');
    const increaseFontBtn = document.getElementById('increaseFont');
    
    // Controle de tamanho de fonte
    decreaseFontBtn.addEventListener('click', function() {
        document.body.classList.remove('font-size-large', 'font-size-larger');
        document.body.classList.add('font-size-normal');
        savePreference('font-size-normal');
    });
    
    normalFontBtn.addEventListener('click', function() {
        document.body.classList.remove('font-size-normal', 'font-size-larger');
        document.body.classList.add('font-size-large');
        savePreference('font-size-large');
    });
    
    increaseFontBtn.addEventListener('click', function() {
        document.body.classList.remove('font-size-normal', 'font-size-large');
        document.body.classList.add('font-size-larger');
        savePreference('font-size-larger');
    });
    
    // Carregar preferência salva (se existir)
    function loadPreferences() {
        const savedFontSize = localStorage.getItem('assistente-font-size');
        if (savedFontSize) {
            document.body.classList.remove('font-size-normal', 'font-size-large', 'font-size-larger');
            document.body.classList.add(savedFontSize);
        }
    }
    
    // Salvar preferência
    function savePreference(value) {
        localStorage.setItem('assistente-font-size', value);
    }
    
    // Carregar preferências ao iniciar
    loadPreferences();
    
    // Conteúdo para cada categoria
    const categoryContent = {
        whatsapp: {
            title: "WhatsApp - Como Usar",
            content: `
                <div class="tutorial-section">
                    <h4>Tutoriais básicos:</h4>
                    <div class="tutorial-item" data-topic="instalar">
                        <h5><i class="fas fa-download me-2"></i> Como instalar o WhatsApp</h5>
                        <p>Aprenda a baixar e instalar o WhatsApp em seu celular.</p>
                    </div>
                    <div class="tutorial-item" data-topic="contatos">
                        <h5><i class="fas fa-address-book me-2"></i> Como adicionar contatos</h5>
                        <p>Saiba como adicionar familiares e amigos aos seus contatos.</p>
                    </div>
                    <div class="tutorial-item" data-topic="mensagens">
                        <h5><i class="fas fa-comment me-2"></i> Como enviar mensagens</h5>
                        <p>Aprenda a enviar mensagens de texto, áudio e fotos.</p>
                    </div>
                    <div class="tutorial-item" data-topic="videochamadas">
                        <h5><i class="fas fa-video me-2"></i> Como fazer videochamadas</h5>
                        <p>Converse cara a cara com seus familiares e amigos.</p>
                    </div>
                </div>
                <div class="tutorial-section mt-4">
                    <h4>Segurança no WhatsApp:</h4>
                    <div class="tutorial-item" data-topic="seguranca">
                        <h5><i class="fas fa-lock me-2"></i> Como proteger sua conta</h5>
                        <p>Dicas para manter suas conversas seguras.</p>
                    </div>
                </div>
            `
        },
        banking: {
            title: "Internet Banking - Como Usar",
            content: `
                <div class="tutorial-section">
                    <h4>Primeiros passos:</h4>
                    <div class="tutorial-item" data-topic="app-banco">
                        <h5><i class="fas fa-mobile-alt me-2"></i> Como baixar o aplicativo do seu banco</h5>
                        <p>Aprenda a encontrar e instalar o app do seu banco.</p>
                    </div>
                    <div class="tutorial-item" data-topic="primeiro-acesso">
                        <h5><i class="fas fa-key me-2"></i> Como fazer o primeiro acesso</h5>
                        <p>Passo a passo para acessar sua conta pela primeira vez.</p>
                    </div>
                </div>
                <div class="tutorial-section mt-4">
                    <h4>Operações básicas:</h4>
                    <div class="tutorial-item" data-topic="saldo">
                        <h5><i class="fas fa-search-dollar me-2"></i> Como consultar saldo e extrato</h5>
                        <p>Veja como verificar seu saldo e movimentações da conta.</p>
                    </div>
                    <div class="tutorial-item" data-topic="pix">
                        <h5><i class="fas fa-exchange-alt me-2"></i> Como fazer transferências PIX</h5>
                        <p>Transfira dinheiro de forma rápida e segura.</p>
                    </div>
                    <div class="tutorial-item" data-topic="contas">
                        <h5><i class="fas fa-file-invoice-dollar me-2"></i> Como pagar contas</h5>
                        <p>Aprenda a pagar boletos e contas de consumo.</p>
                    </div>
                </div>
            `
        },
        shopping: {
            title: "Compras Online - Como Fazer",
            content: `
                <div class="tutorial-section">
                    <h4>Introdução ao e-commerce:</h4>
                    <div class="tutorial-item" data-topic="criar-contas">
                        <h5><i class="fas fa-user-plus me-2"></i> Como criar contas em sites confiáveis</h5>
                        <p>Aprenda a se cadastrar em sites como Mercado Livre e Amazon.</p>
                    </div>
                    <div class="tutorial-item" data-topic="pesquisar">
                        <h5><i class="fas fa-search me-2"></i> Como pesquisar produtos</h5>
                        <p>Saiba como encontrar os produtos que você procura.</p>
                    </div>
                </div>
                <div class="tutorial-section mt-4">
                    <h4>Processo de compra:</h4>
                    <div class="tutorial-item" data-topic="carrinho">
                        <h5><i class="fas fa-cart-plus me-2"></i> Como adicionar produtos ao carrinho</h5>
                        <p>Selecione os produtos que deseja comprar.</p>
                    </div>
                    <div class="tutorial-item" data-topic="pagamento">
                        <h5><i class="fas fa-credit-card me-2"></i> Como selecionar formas de pagamento</h5>
                        <p>Escolha entre cartão, boleto ou PIX.</p>
                    </div>
                    <div class="tutorial-item" data-topic="entrega">
                        <h5><i class="fas fa-truck me-2"></i> Como acompanhar seus pedidos</h5>
                        <p>Veja onde está seu produto e quando ele chegará.</p>
                    </div>
                </div>
            `
        },
        security: {
            title: "Segurança Digital",
            content: `
                <div class="tutorial-section">
                    <h4>Proteção de dados:</h4>
                    <div class="tutorial-item" data-topic="senhas">
                        <h5><i class="fas fa-key me-2"></i> Como criar e gerenciar senhas fortes</h5>
                        <p>Dicas para criar senhas seguras e fáceis de lembrar.</p>
                    </div>
                    <div class="tutorial-item" data-topic="phishing">
                        <h5><i class="fas fa-exclamation-triangle me-2"></i> Como identificar e-mails falsos</h5>
                        <p>Aprenda a reconhecer tentativas de golpe por e-mail.</p>
                    </div>
                </div>
                <div class="tutorial-section mt-4">
                    <h4>Golpes comuns:</h4>
                    <div class="tutorial-item" data-topic="suporte-falso">
                        <h5><i class="fas fa-headset me-2"></i> Como identificar golpes do falso suporte</h5>
                        <p>Evite cair em golpes de pessoas fingindo ser técnicos.</p>
                    </div>
                    <div class="tutorial-item" data-topic="golpe-parente">
                        <h5><i class="fas fa-user-friends me-2"></i> Como reconhecer golpes do falso parente</h5>
                        <p>Saiba identificar quando alguém finge ser seu familiar.</p>
                    </div>
                    <div class="tutorial-item" data-topic="links">
                        <h5><i class="fas fa-link me-2"></i> Como identificar links maliciosos</h5>
                        <p>Aprenda a verificar se um link é seguro antes de clicar.</p>
                    </div>
                </div>
            `
        }
    };
    
    // Função para adicionar mensagem no chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatArea.appendChild(messageDiv);
        
        // Rolagem automática para a nova mensagem
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    
    // Função para processar a entrada do usuário
    function processUserInput() {
        const text = userInput.value.trim();
        if (text !== '') {
            addMessage(text, true);
            userInput.value = '';
            
            // Simula resposta do assistente (depois de um pequeno delay)
            setTimeout(() => {
                addMessage("Entendi sua pergunta. Vou ajudar você com isso! Em um aplicativo real, eu daria uma resposta mais específica baseada no que você perguntou.");
            }, 500);
        }
    }
    
    // Event listeners para o chat
    sendButton.addEventListener('click', processUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
    
    voiceButton.addEventListener('click', function() {
        addMessage("Microfone ativado! Em um aplicativo real, isso iniciaria a captura de voz.", false);
    });
    
    // Event listeners para os cards de categoria
    document.getElementById('whatsapp-card').addEventListener('click', function() {
        openCategoryModal('whatsapp');
    });
    
    document.getElementById('banking-card').addEventListener('click', function() {
        openCategoryModal('banking');
    });
    
    document.getElementById('shopping-card').addEventListener('click', function() {
        openCategoryModal('shopping');
    });
    
    document.getElementById('security-card').addEventListener('click', function() {
        openCategoryModal('security');
    });
    
    // Função para abrir modal com conteúdo da categoria
    function openCategoryModal(category) {
        const categoryData = categoryContent[category];
        modalTitle.textContent = categoryData.title;
        modalContent.innerHTML = categoryData.content;
        
        // Adicionar event listeners para itens de tutorial
        const tutorialItems = modalContent.querySelectorAll('.tutorial-item');
        tutorialItems.forEach(item => {
            item.addEventListener('click', function() {
                const topic = this.getAttribute('data-topic');
                const title = this.querySelector('h5').textContent;
                
                // Fechar o modal
                categoryModal.hide();
                
                // Adicionar mensagem no chat como se o usuário tivesse perguntado
                addMessage(`Como faço para ${title.toLowerCase().replace(/como |\.|\?/g, '')}`, true);
                
                // Simular resposta do assistente
                setTimeout(() => {
                    addMessage(`Vou te ensinar como ${title.toLowerCase().replace(/como |\.|\?/g, '')}. Em um aplicativo real, você veria um tutorial passo a passo com imagens e instruções detalhadas.`);
                }, 500);
            });
        });
        
        // Event listener para o botão de ajuda
        helpButton.onclick = function() {
            categoryModal.hide();
            addMessage(`Preciso de ajuda com ${categoryData.title.split(' -')[0].toLowerCase()}`, true);
            setTimeout(() => {
                addMessage(`Claro! Vou te ajudar com ${categoryData.title.split(' -')[0]}. O que você gostaria de saber especificamente?`);
            }, 500);
        };
        
        categoryModal.show();
    }
});