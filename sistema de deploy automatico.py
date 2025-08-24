import sys
import subprocess
import time
import qtawesome as qta
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QTextEdit, QLabel, QLineEdit, QProgressBar, QHBoxLayout, QGridLayout,
    QComboBox, QMessageBox, QTabWidget, QGroupBox, QFormLayout
)
from PySide6.QtCore import Qt, QThread, Signal
from PySide6.QtGui import QTextCursor, QColor

class RestoreThread(QThread):
    log_signal = Signal(str, str)
    progress_signal = Signal(int)
    commit_hash = ""

    def run(self):
        try:
            if not self.commit_hash:
                self.log_signal.emit("❌ Nenhum commit selecionado", "error")
                return
                
            self.log_signal.emit(f"🔄 Iniciando restore para commit: {self.commit_hash[:8]}", "info")
            self.progress_signal.emit(20)
            
            # Verificar se o commit existe
            result = subprocess.run(f"git show {self.commit_hash}", shell=True, capture_output=True)
            if result.returncode != 0:
                self.log_signal.emit(f"❌ Commit {self.commit_hash} não encontrado", "error")
                return
                
            self.progress_signal.emit(40)
            
            # Fazer hard reset
            self.log_signal.emit("🔄 Executando hard reset...", "info")
            result = subprocess.run(f"git reset --hard {self.commit_hash}", shell=True, capture_output=True, text=True)
            
            if result.returncode == 0:
                self.progress_signal.emit(80)
                self.log_signal.emit("✅ Hard reset realizado com sucesso!", "success")
                
                # Limpar arquivos não rastreados (opcional)
                self.log_signal.emit("🧹 Limpando arquivos não rastreados...", "info")
                subprocess.run("git clean -fd", shell=True, capture_output=True)
                
                self.progress_signal.emit(100)
                self.log_signal.emit("🎉 Restore finalizado com sucesso!", "success")
                self.log_signal.emit(f"📝 Projeto restaurado para: {result.stdout.strip()}", "info")
            else:
                self.log_signal.emit(f"❌ Erro no hard reset: {result.stderr}", "error")
                
        except Exception as e:
            self.log_signal.emit(f"❌ Erro inesperado: {e}", "error")
            self.progress_signal.emit(0)

class DeployThread(QThread):
    log_signal = Signal(str, str)
    progress_signal = Signal(int)
    commit_message = ""
    remote_origin = "origin"
    branch_name = "main"

    def run(self):
        try:
            self.log_signal.emit("🌿 Verificando mudanças no Git...", "info")
            changes = self.check_git_changes()
            if changes:
                if not self.commit_message.strip():
                    self.commit_message = f"Deploy automático - {time.strftime('%d/%m/%Y %H:%M:%S')}"
                    self.log_signal.emit(f"Usando mensagem padrão: {self.commit_message}", "info")
                self.do_commit_push()
                self.progress_signal.emit(100)
                self.log_signal.emit("🎉 Deploy finalizado com sucesso!", "success")
            else:
                self.log_signal.emit("Nenhuma mudança detectada.", "info")
        except Exception as e:
            self.log_signal.emit(f"Erro inesperado: {e}", "error")
            self.progress_signal.emit(0)

    def check_git_changes(self):
        try:
            result = subprocess.run("git status --branch --short", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            status = result.stdout.strip()
            if not status:
                return False
            self.parse_git_status(status)
            return True
        except Exception as e:
            self.log_signal.emit(f"Erro ao verificar mudanças: {e}", "error")
            return False

    def do_commit_push(self):
        self.log_signal.emit(f"✏️ Commit: {self.commit_message}", "info")
        subprocess.run("git add .", shell=True)
        if subprocess.run(f'git commit -m "{self.commit_message}"', shell=True).returncode == 0:
            self.log_signal.emit("✅ Commit realizado com sucesso!", "success")
            if subprocess.run(f"git push {self.remote_origin} {self.branch_name}", shell=True).returncode == 0:
                self.log_signal.emit(f"🚀 Push realizado com sucesso para {self.remote_origin}/{self.branch_name}!", "success")
            else:
                self.log_signal.emit("❌ Falha no push", "error")
        else:
            self.log_signal.emit("❌ Falha no commit", "error")



    def parse_git_status(self, status_output):
        lines = status_output.splitlines()
        if not lines:
            return
        branch_line = lines[0]
        self.log_signal.emit(f"🌿 {branch_line}", "info")
        for line in lines[1:]:
            code = line[:2].strip()
            file = line[3:]
            if code == "M":
                symbol = "🔵"
                color = "info"
            elif code == "A":
                symbol = "🟢"
                color = "success"
            elif code == "D":
                symbol = "🔴"
                color = "error"
            else:
                symbol = "⚪"
                color = "info"
            self.log_signal.emit(f"{symbol} {file}", color)


class DeployGUI(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("🚀 Deploy Automático - Projeto Git")
        self.setGeometry(400, 100, 1400, 900)
        self.setStyleSheet("""
            QWidget {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1,
                                            stop:0 #1f1f2e, stop:1 #2d2d44);
                color: #ffffff;
                font-family: Consolas;
            }
        """)

        # Criar abas
        self.tab_widget = QTabWidget()
        self.tab_widget.setStyleSheet("""
            QTabWidget::pane {
                border: 1px solid #8b5cf6;
                background: transparent;
            }
            QTabBar::tab {
                background-color: #2d333b;
                color: #ffffff;
                padding: 10px 20px;
                margin-right: 2px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            QTabBar::tab:selected {
                background-color: #8b5cf6;
            }
            QTabBar::tab:hover {
                background-color: #a371f7;
            }
        """)

        # Aba Configurações
        self.config_tab = self.create_config_tab()
        self.tab_widget.addTab(self.config_tab, "⚙️ Configurações")
        
        # Aba Deploy
        self.deploy_tab = self.create_deploy_tab()
        self.tab_widget.addTab(self.deploy_tab, "🚀 Deploy")
        
        # Aba Restore
        self.restore_tab = self.create_restore_tab()
        self.tab_widget.addTab(self.restore_tab, "🔄 Restore")

        layout = QVBoxLayout()
        layout.addWidget(self.tab_widget)
        self.setLayout(layout)

        # Threads
        self.deploy_thread = DeployThread()
        self.deploy_thread.log_signal.connect(self.update_deploy_log)
        self.deploy_thread.progress_signal.connect(self.update_deploy_progress)
        
        self.restore_thread = RestoreThread()
        self.restore_thread.log_signal.connect(self.update_restore_log)
        self.restore_thread.progress_signal.connect(self.update_restore_progress)

    def create_config_tab(self):
        tab = QWidget()
        layout = QVBoxLayout()
        layout.setSpacing(15)

        # Cabeçalho
        header = QLabel("⚙️ Configuração Automática do Projeto")
        header.setStyleSheet("font-size: 24px; font-weight: bold; color: #8b5cf6; text-align: center;")
        layout.addWidget(header)

        # Instruções
        instructions = QLabel("📋 Cole os comandos Git do GitHub na área abaixo e clique em processar:")
        instructions.setStyleSheet("color: #8b5cf6; font-size: 16px; text-align: center; margin-bottom: 20px;")
        layout.addWidget(instructions)

        # Área para colar comandos Git
        git_commands_group = QGroupBox("📋 Comandos Git do GitHub")
        git_commands_group.setStyleSheet("""
            QGroupBox {
                font-weight: bold; color: #8b5cf6; border: 2px solid #8b5cf6;
                border-radius: 8px; margin-top: 10px; padding-top: 10px;
            }
            QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 5px 0 5px; }
        """)
        git_commands_layout = QVBoxLayout()
        
        self.git_commands_text = QTextEdit()
        self.git_commands_text.setPlaceholderText("Cole aqui os comandos Git do GitHub, por exemplo:\n\necho \"# meu-projeto\" >> README.md\ngit init\ngit add README.md\ngit commit -m \"first commit\"\ngit branch -M main\ngit remote add origin git@github.com:usuario/repositorio.git\ngit push -u origin main")
        self.git_commands_text.setMaximumHeight(150)
        self.git_commands_text.setStyleSheet("""
            background-color: #2d333b; color: #ffffff; padding: 12px;
            border-radius: 8px; font-size: 14px; font-family: Consolas;
        """)
        git_commands_layout.addWidget(self.git_commands_text)
        
        # Botão para processar comandos
        self.process_commands_button = QPushButton("🔍 Processar e Configurar Tudo")
        self.process_commands_button.setStyleSheet("""
            QPushButton {
                background-color: #8b5cf6; font-weight: bold; height: 50px; border-radius: 8px;
                min-width: 250px; font-size: 16px;
            }
            QPushButton:hover { background-color: #a371f7; }
        """)
        self.process_commands_button.clicked.connect(self.process_and_configure_all)
        git_commands_layout.addWidget(self.process_commands_button)
        
        git_commands_group.setLayout(git_commands_layout)
        layout.addWidget(git_commands_group)

        # Área de status
        self.config_status_label = QLabel("Aguardando comandos Git...")
        self.config_status_label.setStyleSheet("color: #fbbf24; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
        layout.addWidget(self.config_status_label)
        
        # Botões de ação
        buttons_layout = QHBoxLayout()
        
        self.save_config_button = QPushButton("💾 Salvar Configurações")
        self.save_config_button.setStyleSheet("""
            QPushButton {
                background-color: #059669; font-weight: bold; height: 45px; border-radius: 8px;
                min-width: 200px;
            }
            QPushButton:hover { background-color: #10b981; }
        """)
        self.save_config_button.clicked.connect(self.save_configurations)
        self.save_config_button.setEnabled(False)
        buttons_layout.addWidget(self.save_config_button)
        
        self.load_config_button = QPushButton("📂 Carregar Configurações")
        self.load_config_button.setStyleSheet("""
            QPushButton {
                background-color: #8b5cf6; font-weight: bold; height: 45px; border-radius: 8px;
                min-width: 200px;
            }
            QPushButton:hover { background-color: #a371f7; }
        """)
        self.load_config_button.clicked.connect(self.load_configurations)
        buttons_layout.addWidget(self.load_config_button)
        
        layout.addLayout(buttons_layout)
        
        layout.addStretch()
        tab.setLayout(layout)
        return tab

    def process_and_configure_all(self):
        """Processa os comandos Git e configura tudo automaticamente"""
        try:
            commands_text = self.git_commands_text.toPlainText().strip()
            if not commands_text:
                QMessageBox.warning(self, "Aviso", "Por favor, cole os comandos Git na área de texto!")
                return
            
            self.config_status_label.setText("🔄 Processando comandos Git...")
            self.config_status_label.setStyleSheet("color: #fbbf24; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
            
            lines = commands_text.split('\n')
            project_name = ""
            repository_url = ""
            remote_name = "origin"
            branch_name = "main"
            
            # Extrair informações dos comandos
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                    
                # Extrair nome do projeto do echo
                if line.startswith('echo "#') and '>>' in line:
                    project_name = line.split('"#')[1].split('"')[0].strip()
                
                # Extrair remote origin
                elif 'git remote add' in line:
                    parts = line.split()
                    if len(parts) >= 4:
                        remote_name = parts[3]  # origin
                        repository_url = parts[4]  # URL
                
                # Extrair branch
                elif 'git branch -M' in line:
                    branch_name = line.split()[-1]
            
            if not project_name or not repository_url:
                QMessageBox.critical(self, "Erro", "Não foi possível extrair todas as informações necessárias dos comandos Git!")
                return
            
            # Configurar automaticamente
            self.config_status_label.setText("⚙️ Configurando repositório...")
            
            # Verificar se já existe um repositório Git
            if subprocess.run("git status", shell=True, capture_output=True).returncode == 0:
                # Repositório já existe, verificar se é o mesmo
                result = subprocess.run("git remote get-url origin", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
                current_remote = result.stdout.strip()
                
                if current_remote and current_remote != repository_url:
                    # Repositório diferente, perguntar se quer sobrescrever
                    reply = QMessageBox.question(
                        self, 
                        "Repositório Diferente Detectado", 
                        f"⚠️ ATENÇÃO: Já existe um repositório Git diferente!\n\n"
                        f"📁 Repositório atual: {current_remote}\n"
                        f"📁 Novo repositório: {repository_url}\n\n"
                        f"Deseja sobrescrever o repositório atual?\n"
                        f"⚠️ Esta ação irá remover o .git atual e criar um novo!",
                        QMessageBox.Yes | QMessageBox.No,
                        QMessageBox.No
                    )
                    
                    if reply == QMessageBox.Yes:
                        # Remover repositório antigo
                        subprocess.run("rm -rf .git", shell=True)
                        self.config_status_label.setText("🆕 Criando novo repositório...")
                    else:
                        self.config_status_label.setText("❌ Operação cancelada pelo usuário")
                        return
                else:
                    # Mesmo repositório, configurar
                    self.config_status_label.setText("🔄 Repositório existente detectado, configurando...")
                    
                    # Verificar se tem remote
                    remote_check = subprocess.run(f"git remote get-url {remote_name}", shell=True, capture_output=True, text=True)
                    
                    if remote_check.returncode == 0:
                        # Remote já existe, alterar para nova URL
                        subprocess.run(f"git remote set-url {remote_name} {repository_url}", shell=True)
                    else:
                        # Remote não existe, adicionar
                        subprocess.run(f"git remote add {remote_name} {repository_url}", shell=True)
                    
                    # Verificar se a branch existe
                    branch_check = subprocess.run(f"git branch --list {branch_name}", shell=True, capture_output=True, text=True)
                    if not branch_check.stdout.strip():
                        # Criar branch se não existir
                        subprocess.run(f"git checkout -b {branch_name}", shell=True)
            
            # Se não tem repositório ou foi removido, criar do zero
            if subprocess.run("git status", shell=True, capture_output=True).returncode != 0:
                self.config_status_label.setText("🆕 Criando novo repositório...")
                
                # Criar README.md
                readme_content = f"# {project_name}\n\n## Descrição\n\nProjeto criado automaticamente.\n\n## Como usar\n\n1. Clone o repositório\n2. Instale as dependências\n3. Execute o projeto\n\n## Tecnologias\n\n- Lista de tecnologias utilizadas\n\n## Autor\n\nSeu nome aqui"
                
                with open('README.md', 'w', encoding='utf-8') as f:
                    f.write(readme_content)
                
                # Comandos Git para inicialização
                git_commands = [
                    'git init',
                    'git add README.md',
                    'git commit -m "first commit"',
                    f'git branch -M {branch_name}',
                    f'git remote add {remote_name} {repository_url}',
                    f'git push -u {remote_name} {branch_name}'
                ]
                
                # Executar comandos
                for cmd in git_commands:
                    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                    if result.returncode != 0:
                        QMessageBox.critical(self, "Erro", f"Erro ao executar: {cmd}\n{result.stderr}")
                        return
            
            # Atualizar threads com novas configurações
            self.deploy_thread.remote_origin = remote_name
            self.deploy_thread.branch_name = branch_name
            
            # Salvar configurações automaticamente
            config = {
                'project_name': project_name,
                'project_description': f"Projeto {project_name}",
                'remote_origin': remote_name,
                'branch_name': branch_name,
                'repository_url': repository_url,

            }
            
            with open('deploy_config.json', 'w', encoding='utf-8') as f:
                import json
                json.dump(config, f, indent=2, ensure_ascii=False)
            
            # Mostrar sucesso
            self.config_status_label.setText(f"✅ Projeto '{project_name}' configurado com sucesso!")
            self.config_status_label.setStyleSheet("color: #10b981; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
            
            self.save_config_button.setEnabled(True)
            
            QMessageBox.information(self, "🎉 Sucesso!", 
                f"Projeto configurado automaticamente!\n\n"
                f"📁 Nome: {project_name}\n"
                f"🌿 Remote: {remote_name}\n"
                f"🌿 Branch: {branch_name}\n"
                f"🔗 URL: {repository_url}\n\n"
                f"Tudo pronto para usar! 🚀")
                
        except Exception as e:
            self.config_status_label.setText(f"❌ Erro: {e}")
            self.config_status_label.setStyleSheet("color: #ef4444; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
            QMessageBox.critical(self, "Erro", f"Erro ao configurar projeto: {e}")

    def save_configurations(self):
        try:
            # Carregar configuração atual
            with open('deploy_config.json', 'r', encoding='utf-8') as f:
                import json
                config = json.load(f)
            
            self.config_status_label.setText("✅ Configurações já salvas automaticamente!")
            self.config_status_label.setStyleSheet("color: #10b981; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
            
        except Exception as e:
            self.config_status_label.setText(f"❌ Erro: {e}")
            self.config_status_label.setStyleSheet("color: #ef4444; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")

    def load_configurations(self):
        try:
            import json
            with open('deploy_config.json', 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            self.config_status_label.setText(f"✅ Configurações carregadas: {config.get('project_name', 'Projeto')}")
            self.config_status_label.setStyleSheet("color: #10b981; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
            
        except FileNotFoundError:
            self.config_status_label.setText("📁 Nenhuma configuração encontrada")
            self.config_status_label.setStyleSheet("color: #fbbf24; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")
        except Exception as e:
            self.config_status_label.setText(f"❌ Erro ao carregar: {e}")
            self.config_status_label.setStyleSheet("color: #ef4444; font-size: 16px; text-align: center; padding: 20px; background-color: #1e1e2e; border-radius: 8px; margin-top: 20px;")

    def create_deploy_tab(self):
        tab = QWidget()
        layout = QVBoxLayout()
        layout.setSpacing(12)

        # Cabeçalho
        header_layout = QHBoxLayout()
        self.logo_label = QLabel()
        github_icon = qta.icon('fa6b.github', color='white')
        self.logo_label.setPixmap(github_icon.pixmap(50, 50))
        header_layout.addWidget(self.logo_label)
        self.header = QLabel("GitHub Deploy Automático")
        self.header.setStyleSheet("font-size: 24px; font-weight: bold; color: #8b5cf6;")
        header_layout.addWidget(self.header)
        header_layout.addStretch()
        layout.addLayout(header_layout)

        # Commit input
        self.commit_label = QLabel("Mensagem do commit:")
        self.commit_label.setStyleSheet("color: #8b5cf6; font-weight: bold; font-size: 14px;")
        layout.addWidget(self.commit_label)
        self.commit_input = QLineEdit()
        self.commit_input.setPlaceholderText("Ex: Atualização do projeto, correção de bugs...")
        self.commit_input.setStyleSheet("""
            background-color: #2d333b; color: #ffffff; padding: 8px;
            border-radius: 5px; font-size: 14px;
        """)
        layout.addWidget(self.commit_input)

        # Botões essenciais
        buttons_layout = QHBoxLayout()
        
        self.view_changes_button = QPushButton("👀 Ver Alterações")
        self.view_changes_button.setStyleSheet("""
            QPushButton {
                background-color: #8b5cf6; font-weight: bold; height: 40px; border-radius: 6px;
                min-width: 150px;
            }
            QPushButton:hover { background-color: #a371f7; }
        """)
        self.view_changes_button.clicked.connect(self.view_git_changes)
        buttons_layout.addWidget(self.view_changes_button)
        
        buttons_layout.addStretch()
        layout.addLayout(buttons_layout)

        # Área de logs
        self.log_area = QTextEdit()
        self.log_area.setReadOnly(True)
        self.log_area.setStyleSheet("""
            background-color: #1e1e2e; border-radius: 5px; padding: 10px;
            font-size: 13px; color: #ffffff;
        """)
        layout.addWidget(self.log_area)

        # Barra de progresso
        self.progress_bar = QProgressBar()
        self.progress_bar.setValue(0)
        self.progress_bar.setStyleSheet("""
            QProgressBar {
                background-color: #333;
                color: #ffffff;
                border-radius: 5px;
                height: 20px;
                text-align: center;
            }
            QProgressBar::chunk {
                background-color: #8b5cf6;
                border-radius: 5px;
            }
        """)
        layout.addWidget(self.progress_bar)

        # Botão de deploy
        self.run_button = QPushButton("🚀 Iniciar Deploy")
        self.run_button.setStyleSheet("""
            QPushButton {
                background-color: #8b5cf6;
                font-weight: bold; height: 45px; border-radius: 8px;
            }
            QPushButton:hover {
                background-color: #a371f7;
            }
            QPushButton:pressed {
                background-color: #6c3ce8;
            }
        """)
        self.run_button.clicked.connect(self.start_deploy)
        layout.addWidget(self.run_button)

        tab.setLayout(layout)
        return tab

    def view_git_changes(self):
        """Mostra alterações do repositório atual"""
        try:
            self.log_area.clear()
            self.log_area.setTextColor(QColor("#58a6ff"))
            self.log_area.append("👀 Verificando alterações no repositório atual...\n")
            
            # Verificar se estamos em um repositório Git
            if subprocess.run("git status", shell=True, capture_output=True).returncode != 0:
                self.log_area.setTextColor(QColor("#ff6b6b"))
                self.log_area.append("❌ Não é um repositório Git válido!")
                return
            
            # Verificar se as configurações estão carregadas
            try:
                with open('deploy_config.json', 'r', encoding='utf-8') as f:
                    import json
                    config = json.load(f)
                    configured_repo = config.get('repository_url', '')
                    configured_name = config.get('project_name', '')
                    

                    
            except FileNotFoundError:
                self.log_area.setTextColor(QColor("#ff6b6b"))
                self.log_area.append("❌ Arquivo de configuração não encontrado!\n")
                self.log_area.append("💡 Configure o projeto primeiro na aba Configurações!\n")
                return
            except Exception as e:
                self.log_area.setTextColor(QColor("#ff6b6b"))
                self.log_area.append(f"❌ Erro ao carregar configurações: {e}\n")
                return
            
            # Verificar se o remote atual corresponde ao configurado
            result = subprocess.run("git remote get-url origin", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            current_remote = result.stdout.strip()
            

            
            if not configured_repo:
                self.log_area.setTextColor(QColor("#ff6b6b"))
                self.log_area.append("❌ Nenhum repositório configurado!\n")
                self.log_area.append("💡 Configure o projeto primeiro na aba Configurações!\n")
                return
            
            if current_remote != configured_repo:
                self.log_area.setTextColor(QColor("#fbbf24"))
                self.log_area.append(f"🔄 Repositório mudou! Atualizando configurações automaticamente...\n")
                
                # Atualizar configurações automaticamente
                try:
                    # Extrair nome do projeto do remote atual
                    new_project_name = current_remote.split('/')[-1].replace('.git', '')
                    
                    # IMPORTANTE: Alterar o remote da pasta para o configurado
                    self.log_area.setTextColor(QColor("#fbbf24"))
                    self.log_area.append(f"🔄 Alterando remote da pasta para: {configured_repo}\n")
                    
                    # Executar git remote set-url para alterar o remote da pasta
                    result = subprocess.run(f"git remote set-url origin {configured_repo}", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
                    
                    if result.returncode == 0:
                        self.log_area.setTextColor(QColor("#10b981"))
                        self.log_area.append(f"✅ Remote da pasta alterado com sucesso!\n")
                        
                        # Verificar se alterou
                        verify_result = subprocess.run("git remote get-url origin", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
                        new_current_remote = verify_result.stdout.strip()
                        
                        if new_current_remote == configured_repo:
                            self.log_area.append(f"✅ Verificação: Remote alterado para {new_current_remote}\n")
                            current_remote = new_current_remote
                        else:
                            self.log_area.setTextColor(QColor("#ff6b6b"))
                            self.log_area.append(f"❌ Falha na verificação: Remote ainda é {new_current_remote}\n")
                            return
                    else:
                        self.log_area.setTextColor(QColor("#ff6b6b"))
                        self.log_area.append(f"❌ Erro ao alterar remote: {result.stderr}\n")
                        return
                    
                    # Atualizar configurações
                    config = {
                        'project_name': configured_name,
                        'project_description': f"Projeto {configured_name}",
                        'remote_origin': 'origin',
                        'branch_name': 'main',
                        'repository_url': configured_repo
                    }
                    
                    # Salvar configurações atualizadas
                    with open('deploy_config.json', 'w', encoding='utf-8') as f:
                        import json
                        json.dump(config, f, indent=2, ensure_ascii=False)
                    
                    # Atualizar threads
                    self.deploy_thread.remote_origin = 'origin'
                    self.deploy_thread.branch_name = 'main'
                    
                    self.log_area.setTextColor(QColor("#10b981"))
                    self.log_area.append(f"✅ Configurações atualizadas automaticamente!\n")
                    self.log_area.append(f"📁 Nome: {configured_name}\n")
                    self.log_area.append(f"🔗 Remote: {configured_repo}\n")
                    
                except Exception as e:
                    self.log_area.setTextColor(QColor("#ff6b6b"))
                    self.log_area.append(f"❌ Erro ao atualizar configurações: {e}\n")
                    self.log_area.append(f"💡 Use a aba Configurações para corrigir manualmente!\n")
                    return
            
            # Mostrar informações do repositório
            self.log_area.setTextColor(QColor("#8b5cf6"))
            self.log_area.append(f"✅ Repositório correto detectado!\n")
            self.log_area.append(f"📁 Nome: {configured_name}\n")
            self.log_area.append(f"🔗 Remote: {current_remote}\n\n")
            
            # Mostrar status do repositório
            result = subprocess.run("git status --branch --short", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            if result.stdout.strip():
                self.log_area.setTextColor(QColor("#ffffff"))
                self.log_area.append("📊 Status do repositório:\n")
                self.log_area.append(result.stdout)
                
                # Mostrar arquivos modificados
                self.log_area.setTextColor(QColor("#58a6ff"))
                self.log_area.append("\n📁 Arquivos modificados:")
                for line in result.stdout.splitlines():
                    if line.strip() and not line.startswith('##'):
                        code = line[:2].strip()
                        file = line[3:]
                        if code == "M":
                            symbol = "🔵"
                        elif code == "A":
                            symbol = "🟢"
                        elif code == "D":
                            symbol = "🔴"
                        else:
                            symbol = "⚪"
                        self.log_area.append(f"{symbol} {file}")
            else:
                self.log_area.setTextColor(QColor("#10b981"))
                self.log_area.append("✅ Nenhuma alteração detectada!")
                
        except Exception as e:
            self.log_area.setTextColor(QColor("#ff6b6b"))
            self.log_area.append(f"❌ Erro ao verificar alterações: {e}")



    def create_restore_tab(self):
        tab = QWidget()
        layout = QVBoxLayout()
        layout.setSpacing(12)

        # Cabeçalho do restore
        restore_header = QLabel("🔄 Restore do Projeto - Hard Reset")
        restore_header.setStyleSheet("font-size: 24px; font-weight: bold; color: #ef4444; text-align: center;")
        layout.addWidget(restore_header)

        # Aviso importante
        warning_label = QLabel("⚠️ ATENÇÃO: Esta operação irá descartar TODAS as mudanças não commitadas!")
        warning_label.setStyleSheet("color: #fbbf24; font-weight: bold; font-size: 16px; text-align: center; padding: 10px;")
        layout.addWidget(warning_label)

        # Seleção de commit
        commit_select_layout = QHBoxLayout()
        commit_select_layout.addWidget(QLabel("Selecionar commit para restaurar:"))
        
        self.commit_combo = QComboBox()
        self.commit_combo.setStyleSheet("""
            QComboBox {
                background-color: #2d333b; color: #ffffff; padding: 8px;
                border-radius: 5px; font-size: 14px; min-width: 300px;
            }
        """)
        self.refresh_commits_button = QPushButton("🔄 Atualizar")
        self.refresh_commits_button.setStyleSheet("""
            QPushButton {
                background-color: #059669; font-weight: bold; height: 40px; border-radius: 6px;
            }
            QPushButton:hover { background-color: #10b981; }
        """)
        self.refresh_commits_button.clicked.connect(self.refresh_commits)
        
        commit_select_layout.addWidget(self.commit_combo)
        commit_select_layout.addWidget(self.refresh_commits_button)
        commit_select_layout.addStretch()
        layout.addLayout(commit_select_layout)

        # Informações do commit selecionado
        self.commit_info_label = QLabel("Selecione um commit para ver detalhes")
        self.commit_info_label.setStyleSheet("color: #8b5cf6; font-size: 14px; padding: 10px; background-color: #1e1e2e; border-radius: 5px;")
        layout.addWidget(self.commit_info_label)

        # Área de logs do restore
        self.restore_log_area = QTextEdit()
        self.restore_log_area.setReadOnly(True)
        self.restore_log_area.setStyleSheet("""
            background-color: #1e1e2e; border-radius: 5px; padding: 10px;
            font-size: 13px; color: #ffffff;
        """)
        layout.addWidget(self.restore_log_area)

        # Barra de progresso do restore
        self.restore_progress_bar = QProgressBar()
        self.restore_progress_bar.setValue(0)
        self.restore_progress_bar.setStyleSheet("""
            QProgressBar {
                background-color: #333;
                color: #ffffff;
                border-radius: 5px;
                height: 20px;
                text-align: center;
            }
            QProgressBar::chunk {
                background-color: #ef4444;
                border-radius: 5px;
            }
        """)
        layout.addWidget(self.restore_progress_bar)

        # Botão de restore
        self.restore_button = QPushButton("🔄 Executar Restore (Hard Reset)")
        self.restore_button.setStyleSheet("""
            QPushButton {
                background-color: #ef4444;
                font-weight: bold; height: 45px; border-radius: 8px;
            }
            QPushButton:hover {
                background-color: #f87171;
            }
            QPushButton:pressed {
                background-color: #dc2626;
            }
        """)
        self.restore_button.clicked.connect(self.start_restore)
        layout.addWidget(self.restore_button)

        # Carregar commits iniciais
        self.refresh_commits()
        
        tab.setLayout(layout)
        return tab

    def refresh_commits(self):
        try:
            # Buscar commits recentes
            result = subprocess.run("git log --oneline -20", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            commits = result.stdout.splitlines()
            
            self.commit_combo.clear()
            self.commit_combo.addItem("Selecione um commit...", "")
            
            for commit in commits:
                if commit.strip():
                    parts = commit.split(' ', 1)
                    if len(parts) == 2:
                        hash_short = parts[0]
                        message = parts[1]
                        display_text = f"{hash_short[:8]} - {message}"
                        self.commit_combo.addItem(display_text, hash_short)
            
            # Conectar evento de mudança
            self.commit_combo.currentIndexChanged.connect(self.on_commit_selected)
            
        except Exception as e:
            self.update_restore_log(f"Erro ao carregar commits: {e}", "error")

    def on_commit_selected(self):
        current_data = self.commit_combo.currentData()
        if current_data:
            try:
                # Buscar informações detalhadas do commit
                result = subprocess.run(f"git show --stat {current_data}", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
                lines = result.stdout.splitlines()
                
                if lines:
                    # Primeiras linhas contêm informações do commit
                    commit_info = "\n".join(lines[:10])
                    self.commit_info_label.setText(f"📝 Commit: {current_data[:8]}\n{commit_info}")
                    
                    # Buscar arquivos modificados
                    files_result = subprocess.run(f"git show --name-only {current_data}", shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
                    files_lines = files_result.stdout.splitlines()
                    if len(files_lines) > 6:  # Pular cabeçalho
                        files = files_lines[6:]
                        if files:
                            self.commit_info_label.setText(self.commit_info_label.text() + f"\n\n📁 Arquivos modificados:\n" + "\n".join(files[:10]))
                            if len(files) > 10:
                                self.commit_info_label.setText(self.commit_info_label.text() + f"\n... e mais {len(files) - 10} arquivos")
            except Exception as e:
                self.commit_info_label.setText(f"Erro ao carregar detalhes: {e}")

    def start_restore(self):
        current_data = self.commit_combo.currentData()
        if not current_data:
            QMessageBox.warning(self, "Aviso", "Por favor, selecione um commit para restaurar!")
            return
        
        # Confirmação final
        reply = QMessageBox.question(
            self, 
            "Confirmação de Restore", 
            f"⚠️ ATENÇÃO: Esta operação irá:\n\n"
            f"1. Descartar TODAS as mudanças não commitadas\n"
            f"2. Fazer hard reset para o commit: {current_data[:8]}\n"
            f"3. Limpar arquivos não rastreados\n\n"
            f"Esta ação NÃO pode ser desfeita!\n\n"
            f"Tem certeza que deseja continuar?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No
        )
        
        if reply == QMessageBox.Yes:
            self.restore_thread.commit_hash = current_data
            self.restore_log_area.clear()
            self.restore_progress_bar.setValue(0)
            self.restore_thread.start()
            self.restore_button.setEnabled(False)

    def start_deploy(self):
        self.deploy_thread.commit_message = self.commit_input.text().strip()
        self.log_area.clear()
        self.progress_bar.setValue(0)
        self.deploy_thread.start()
        self.run_button.setEnabled(False)

    def run_git_command(self, command, description):
        self.update_deploy_log(f"💻 Executando: {description}", "info")
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
            for line in result.stdout.splitlines():
                self.update_deploy_log(line, "info")
        except Exception as e:
            self.update_deploy_log(f"Erro ao executar {description}: {e}", "error")

    def update_deploy_log(self, message, msg_type):
        color = "#ffffff"
        if msg_type == "success":
            color = "#00ff00"
        elif msg_type == "error":
            color = "#ff6b6b"
        elif msg_type == "info":
            color = "#58a6ff"

        self.log_area.setTextColor(QColor(color))
        self.log_area.append(message)
        self.log_area.moveCursor(QTextCursor.End)

        if "finalizado" in message.lower() or "erro inesperado" in message.lower():
            self.run_button.setEnabled(True)

    def update_deploy_progress(self, value):
        self.progress_bar.setValue(value)

    def update_restore_log(self, message, msg_type):
        color = "#ffffff"
        if msg_type == "success":
            color = "#00ff00"
        elif msg_type == "error":
            color = "#ff6b6b"
        elif msg_type == "info":
            color = "#58a6ff"

        self.restore_log_area.setTextColor(QColor(color))
        self.restore_log_area.append(message)
        self.restore_log_area.moveCursor(QTextCursor.End)

        if "finalizado" in message.lower() or "erro inesperado" in message.lower():
            self.restore_button.setEnabled(True)

    def update_restore_progress(self, value):
        self.restore_progress_bar.setValue(value)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DeployGUI()
    window.show()
    sys.exit(app.exec())    