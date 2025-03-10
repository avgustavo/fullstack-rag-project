#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# powerline fonts for zsh agnoster theme
git clone https://github.com/powerline/fonts.git
cd fonts
./install.sh
cd .. && rm -rf fonts

# oh-my-zsh plugins
zsh -c 'git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions'
zsh -c 'git clone https://github.com/z-shell/F-Sy-H.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/F-Sy-H'
zsh -c 'git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k'

PLUGINS="git git-flow F-Sy-H zsh-autosuggestions asdf yarn"
THEME="powerlevel10k/powerlevel10k"

sed -i "s@^plugins=\(.*\)\$@plugins=($PLUGINS)@" ~/.zshrc
sed -i "/^ZSH_THEME/c\ZSH_THEME=\"$THEME\"" ~/.zshrc

cp $SCRIPT_DIR/config/.p10k.zsh ~/.p10k.zsh

cat <<EOF >> ~/.zshrc
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
EOF

source ~/.zshrc