import sys
import subprocess
import time
import qtawesome as qta
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QTextEdit, QLabel, QLineEdit, QProgressBar, QHBoxLayout, QGridLayout,
    QComboBox, QMessageBox, QTabWidget
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

    def run(self):
        try:
            self.log_signal.emit("🌿 Verificando mudanças no Git...", "info")
            changes = self.check_git_changes()
            if changes:
                if not self.commit_message.strip():
                    self.commit_message = f"Deploy automático - {time.strftime('%d/%m/%Y %H:%M:%S')}"
                    self.log_signal.emit(f"Usando mensagem padrão: {self.commit_message}", "info")
                self.do_commit_push()
                self.progress_signal.emit(30)
                self.run_build()
                self.progress_signal.emit(100)
                self.log_signal.emit("🎉 Deploy finalizado com sucesso!", "success")
            else:
                self.log_signal.emit("Nenhuma mudança detectada. Build não será executado.", "info")
        except Exception as e:
            self.log_signal.emit(f"Erro inesperado: {e}", "error")
            self.progress_signal.emit(0)

    def check_git_changes(self):
        status = subprocess.getoutput("git status --branch --short").strip()
        if not status:
            return False
        self.parse_git_status(status)
        return True

    def do_commit_push(self):
        self.log_signal.emit(f"✏️ Commit: {self.commit_message}", "info")
        subprocess.run("git add .", shell=True)
        if subprocess.run(f'git commit -m "{self.commit_message}"', shell=True).returncode == 0:
            self.log_signal.emit("✅ Commit realizado com sucesso!", "success")
            if subprocess.run("git push origin main", shell=True).returncode == 0:
                self.log_signal.emit("🚀 Push realizado com sucesso!", "success")
            else:
                self.log_signal.emit("❌ Falha no push", "error")
        else:
            self.log_signal.emit("❌ Falha no commit", "error")

    def run_build(self):
        self.log_signal.emit("🔨 Iniciando build do projeto...", "info")
        if subprocess.run("npm --version", shell=True).returncode != 0:
            self.log_signal.emit("❌ NPM não encontrado. Verifique Node.js.", "error")
            raise Exception("NPM não encontrado")
        result = subprocess.run("npm run build", shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            self.log_signal.emit("✅ Build realizado com sucesso!", "success")
        else:
            self.log_signal.emit("❌ Falha no build", "error")
            self.log_signal.emit(result.stdout + "\n" + result.stderr, "error")
            raise Exception("Falha no build")

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
        self.setWindowTitle("🚀 Deploy Automático - Portfolio Matheus Renzo")
        self.setGeometry(400, 100, 1200, 800)
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
        self.header = QLabel("GitHub Deploy Automático - Portfolio Matheus Renzo")
        self.header.setStyleSheet("font-size: 24px; font-weight: bold; color: #8b5cf6;")
        header_layout.addWidget(self.header)
        header_layout.addStretch()
        layout.addLayout(header_layout)

        # Commit input
        self.commit_label = QLabel("Mensagem do commit:")
        self.commit_label.setStyleSheet("color: #8b5cf6; font-weight: bold; font-size: 14px;")
        layout.addWidget(self.commit_label)
        self.commit_input = QLineEdit()
        self.commit_input.setPlaceholderText("Ex: Atualização do portfolio, correção de bugs...")
        self.commit_input.setStyleSheet("""
            background-color: #2d333b; color: #ffffff; padding: 8px;
            border-radius: 5px; font-size: 14px;
        """)
        layout.addWidget(self.commit_input)

        # Área de logs
        self.log_area = QTextEdit()
        self.log_area.setReadOnly(True)
        self.log_area.setStyleSheet("""
            background-color: #1e1e2e; border-radius: 5px; padding: 10px;
            font-size: 13px; color: #ffffff;
        """)
        layout.addWidget(self.log_area)

        # Botões Git úteis
        self.buttons_layout = QGridLayout()
        buttons_info = [
            ("Git Status", "Mostra alterações não commitadas", "git status --branch --short"),
            ("Git Remote", "Mostra remotes configurados", "git remote -v"),
            ("Git Log", "Mostra histórico resumido dos commits", "git log --oneline -5"),
            ("Git Diff", "Mostra arquivos modificados", "git diff --name-only"),
        ]
        for i, (label, tooltip, cmd) in enumerate(buttons_info):
            btn = QPushButton(label)
            btn.setToolTip(tooltip)
            btn.setStyleSheet("""
                QPushButton {
                    background-color: #8b5cf6; font-weight: bold; height: 40px; border-radius: 6px;
                }
                QPushButton:hover { background-color: #a371f7; }
                QPushButton:pressed { background-color: #6c3ce8; }
            """)
            btn.clicked.connect(lambda checked, c=cmd, t=tooltip: self.run_git_command(c, t))
            self.buttons_layout.addWidget(btn, i // 2, i % 2)
        layout.addLayout(self.buttons_layout)

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
        self.run_button = QPushButton("Iniciar Deploy")
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
            result = subprocess.getoutput("git log --oneline -20")
            commits = result.splitlines()
            
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
                result = subprocess.getoutput(f"git show --stat {current_data}")
                lines = result.splitlines()
                
                if lines:
                    # Primeiras linhas contêm informações do commit
                    commit_info = "\n".join(lines[:10])
                    self.commit_info_label.setText(f"📝 Commit: {current_data[:8]}\n{commit_info}")
                    
                    # Buscar arquivos modificados
                    files_result = subprocess.getoutput(f"git show --name-only {current_data}")
                    files_lines = files_result.splitlines()
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
            result = subprocess.getoutput(command)
            for line in result.splitlines():
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