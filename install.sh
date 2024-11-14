#!/bin/bash

# Função para exibir mensagens com destaque
mensagem() {
    echo -e "\033[1;32m$1\033[0m"
}

# Verifica se o Zsh está instalado
if ! command -v zsh &> /dev/null; then
    echo "Zsh não está instalado. Deseja instalá-lo agora? (s/n)"
    read -r resposta
    if [[ "$resposta" =~ ^[Ss]$ ]]; then
        mensagem "Instalando Zsh..."
        sudo apt update && sudo apt install -y zsh || { echo "Erro ao instalar o Zsh!"; exit 1; }
    else
        echo "Por favor, instale o Zsh antes de continuar."
        exit 1
    fi
fi

# Instala o Git, se necessário
if ! command -v git &> /dev/null; then
    mensagem "Git não encontrado. Instalando Git..."
    sudo apt install -y git || { echo "Erro ao instalar o Git!"; exit 1; }
fi

# Instala o Oh My Zsh, se necessário
if [[ ! -d "$HOME/.oh-my-zsh" ]]; then
    mensagem "Oh My Zsh não encontrado. Instalando Oh My Zsh..."
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || { echo "Erro ao instalar o Oh My Zsh!"; exit 1; }
fi

# Instala o Powerlevel10k
P10K_DIR="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
if [[ ! -d "$P10K_DIR" ]]; then
    mensagem "Clonando o repositório do Powerlevel10k..."
    git clone https://github.com/romkatv/powerlevel10k.git "$P10K_DIR" || { echo "Erro ao clonar o repositório do Powerlevel10k!"; exit 1; }
else
    mensagem "O Powerlevel10k já está instalado."
fi

# Instala plugins adicionais
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"

# Instala zsh-autosuggestions
if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]]; then
    mensagem "Instalando o plugin zsh-autosuggestions..."
    git clone https://github.com/zsh-users/zsh-autosuggestions "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
else
    mensagem "O plugin zsh-autosuggestions já está instalado."
fi

# Instala zsh-completions
if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-completions" ]]; then
    mensagem "Instalando o plugin zsh-completions..."
    git clone https://github.com/zsh-users/zsh-completions "$ZSH_CUSTOM/plugins/zsh-completions"
else
    mensagem "O plugin zsh-completions já está instalado."
fi

# Instala Fast Syntax Highlighting (F-Sy-H)
if [[ ! -d "$ZSH_CUSTOM/plugins/fast-syntax-highlighting" ]]; then
    mensagem "Instalando o plugin F-Sy-H (Fast Syntax Highlighting)..."
    git clone https://github.com/zdharma-continuum/fast-syntax-highlighting "$ZSH_CUSTOM/plugins/fast-syntax-highlighting"
else
    mensagem "O plugin F-Sy-H já está instalado."
fi

# Configura o tema Powerlevel10k no ~/.zshrc
if grep -q "^ZSH_THEME=" "$HOME/.zshrc"; then
    sed -i 's/^ZSH_THEME=.*$/ZSH_THEME="powerlevel10k\/powerlevel10k"/' "$HOME/.zshrc"
else
    echo 'ZSH_THEME="powerlevel10k/powerlevel10k"' >> "$HOME/.zshrc"
fi

# Configura os plugins no ~/.zshrc
mensagem "Configurando os plugins no arquivo ~/.zshrc..."
if grep -q "^plugins=(" "$HOME/.zshrc"; then
    sed -i '/^plugins=(/c\plugins=(git git-flow fast-syntax-highlighting zsh-autosuggestions zsh-completions)' "$HOME/.zshrc"
else
    echo 'plugins=(git git-flow fast-syntax-highlighting zsh-autosuggestions zsh-completions)' >> "$HOME/.zshrc"
fi

# Mensagem final
mensagem "Instalação do Powerlevel10k e plugins concluída!"
mensagem "Reinicie o terminal ou execute 'source ~/.zshrc' para aplicar as mudanças."

exit 0
