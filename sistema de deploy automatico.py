import sys
import subprocess
import time
import qtawesome as qta
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QTextEdit, QLabel, QLineEdit, QProgressBar, QHBoxLayout, QGridLayout
)
from PySide6.QtCore import Qt, QThread, Signal
from PySide6.QtGui import QTextCursor, QColor

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
        self.setGeometry(400, 100, 1000, 700)
        self.setStyleSheet("""
            QWidget {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1,
                                            stop:0 #1f1f2e, stop:1 #2d2d44);
                color: #ffffff;
                font-family: Consolas;
            }
        """)

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
                font-weight: bold;
                height: 45px;
                border-radius: 8px;
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

        self.setLayout(layout)

        self.deploy_thread = DeployThread()
        self.deploy_thread.log_signal.connect(self.update_log)
        self.deploy_thread.progress_signal.connect(self.update_progress)

    def run_git_command(self, command, description):
        self.update_log(f"💻 Executando: {description}", "info")
        try:
            result = subprocess.getoutput(command)
            for line in result.splitlines():
                self.update_log(line, "info")
        except Exception as e:
            self.update_log(f"Erro ao executar {description}: {e}", "error")

    def start_deploy(self):
        self.deploy_thread.commit_message = self.commit_input.text().strip()
        self.log_area.clear()
        self.progress_bar.setValue(0)
        self.deploy_thread.start()
        self.run_button.setEnabled(False)

    def update_log(self, message, msg_type):
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

    def update_progress(self, value):
        self.progress_bar.setValue(value)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DeployGUI()
    window.show()
    sys.exit(app.exec())
