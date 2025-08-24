import sys
import subprocess
import time
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QTextEdit, QLabel, QLineEdit, QMessageBox, QProgressBar
)
from PySide6.QtCore import Qt, QThread, Signal
from PySide6.QtGui import QTextCursor, QColor, QFont

class DeployThread(QThread):
    log_signal = Signal(str, str)  # mensagem, tipo (info, success, error)
    progress_signal = Signal(int)
    commit_message = ""

    def run(self):
        try:
            steps = [
                ("Verificando Git...", self.check_git),
                ("Verificando mudanças...", self.check_changes),
                ("Build do projeto...", self.build_project),
                ("Deploy no Vercel...", self.deploy_vercel)
            ]
            total_steps = len(steps)
            for i, (desc, func) in enumerate(steps, 1):
                self.log_signal.emit(desc, "info")
                func()
                self.progress_signal.emit(int(i/total_steps*100))
            self.log_signal.emit("🎉 Deploy automático finalizado! 🎉", "success")
        except Exception as e:
            self.log_signal.emit(f"Erro inesperado: {e}", "error")

    def check_git(self):
        if subprocess.run("git status", shell=True).returncode != 0:
            self.log_signal.emit("Git não configurado ou não é um repositório", "error")
            raise Exception("Git não configurado")
        self.log_signal.emit("Git configurado com sucesso!", "success")

    def check_changes(self):
        changes = subprocess.getoutput("git diff --name-only")
        if changes.strip():
            self.log_signal.emit("📝 Mudanças detectadas:", "info")
            self.log_signal.emit(changes, "info")
            if not self.commit_message.strip():
                self.commit_message = f"Deploy automático - {time.strftime('%d/%m/%Y %H:%M:%S')}"
                self.log_signal.emit(f"Usando mensagem padrão: {self.commit_message}", "info")
            subprocess.run("git add .", shell=True)
            if subprocess.run(f'git commit -m "{self.commit_message}"', shell=True).returncode == 0:
                self.log_signal.emit("Commit realizado com sucesso!", "success")
                self.log_signal.emit("Aguardando confirmação para push...", "info")
            else:
                self.log_signal.emit("Falha no commit", "error")
                raise Exception("Falha no commit")
        else:
            self.log_signal.emit("Nenhuma mudança detectada", "info")

    def build_project(self):
        if subprocess.run("npm --version", shell=True).returncode != 0:
            self.log_signal.emit("NPM não encontrado. Verifique o Node.js.", "error")
            raise Exception("NPM não encontrado")
        if subprocess.run("npm run build", shell=True).returncode == 0:
            self.log_signal.emit("Build realizado com sucesso!", "success")
        else:
            self.log_signal.emit("Falha no build", "error")
            raise Exception("Falha no build")

    def deploy_vercel(self):
        if subprocess.run("vercel --version", shell=True).returncode == 0:
            if subprocess.run("vercel --prod", shell=True).returncode == 0:
                self.log_signal.emit("Deploy no Vercel concluído com sucesso!", "success")
            else:
                self.log_signal.emit("Deploy falhou", "error")
        else:
            self.log_signal.emit("Vercel CLI não encontrado. Instale com: npm i -g vercel", "error")


class DeployGUI(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("🚀 Deploy Automático - Portfolio Matheus Renzo")
        self.setGeometry(600, 200, 800, 600)
        self.setStyleSheet("background-color: #24292f; color: #ffffff; font-family: Consolas;")

        layout = QVBoxLayout()

        # Cabeçalho com logo GitHub (emoji)
        self.header = QLabel("🐱 GitHub Deploy Automático - Portfolio Matheus Renzo")
        self.header.setAlignment(Qt.AlignCenter)
        self.header.setStyleSheet("font-size: 20px; font-weight: bold; color: #8b5cf6;")  # roxo claro
        layout.addWidget(self.header)

        # Campo para mensagem do commit
        self.commit_label = QLabel("Mensagem do commit:")
        self.commit_label.setStyleSheet("color: #8b5cf6; font-weight: bold;")
        layout.addWidget(self.commit_label)

        self.commit_input = QLineEdit()
        self.commit_input.setPlaceholderText("Ex: Atualização do portfolio, correção de bugs...")
        self.commit_input.setStyleSheet("background-color: #2d333b; color: #ffffff;")
        layout.addWidget(self.commit_input)

        # Área de logs
        self.log_area = QTextEdit()
        self.log_area.setReadOnly(True)
        self.log_area.setStyleSheet("background-color: #2d333b; color: #ffffff;")
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
            }
            QProgressBar::chunk {
                background-color: #8b5cf6;
                border-radius: 5px;
            }
        """)
        layout.addWidget(self.progress_bar)

        # Botão iniciar deploy
        self.run_button = QPushButton("Iniciar Deploy")
        self.run_button.setStyleSheet("""
            background-color: #8b5cf6;
            font-weight: bold;
            height: 40px;
            border-radius: 5px;
        """)
        self.run_button.clicked.connect(self.start_deploy)
        layout.addWidget(self.run_button)

        self.setLayout(layout)

        self.deploy_thread = DeployThread()
        self.deploy_thread.log_signal.connect(self.update_log)
        self.deploy_thread.progress_signal.connect(self.update_progress)

    def start_deploy(self):
        commit_msg = self.commit_input.text().strip()
        self.deploy_thread.commit_message = commit_msg
        self.log_area.clear()
        self.progress_bar.setValue(0)

        # Confirmar push se houver commit
        if commit_msg.strip():
            reply = QMessageBox.question(
                self, "Confirmação Push",
                f"Você deseja que o push do commit '{commit_msg}' seja feito automaticamente?",
                QMessageBox.Yes | QMessageBox.No
            )
            self.push_confirm = reply == QMessageBox.Yes
        else:
            self.push_confirm = False

        self.deploy_thread.start()
        self.run_button.setEnabled(False)

    def update_log(self, message, msg_type):
        color = "#ffffff"
        if msg_type == "success":
            color = "#00ff00"  # verde
        elif msg_type == "error":
            color = "#ff6b6b"  # vermelho
        elif msg_type == "info":
            color = "#58a6ff"  # azul GitHub

        self.log_area.setTextColor(QColor(color))
        self.log_area.append(message)
        self.log_area.moveCursor(QTextCursor.End)

        if "finalizado" in message.lower():
            self.run_button.setEnabled(True)

    def update_progress(self, value):
        self.progress_bar.setValue(value)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DeployGUI()
    window.show()
    sys.exit(app.exec())
