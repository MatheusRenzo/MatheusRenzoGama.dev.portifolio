import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validação básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Configuração do transporter (usando Gmail como exemplo)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Seu email Gmail
        pass: process.env.EMAIL_PASS  // Sua senha de app do Gmail
      }
    });

    // Configuração do email com tema hacker
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'matheus.gama.renzo@gmail.com', // Email de destino
      subject: `[PORTFOLIO] ${subject}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #000; color: #00ff00; padding: 20px; border: 2px solid #00ff00; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0; color: #00ff00; text-transform: uppercase; letter-spacing: 2px;">Nova Mensagem do Portfólio</h2>
            <div style="height: 2px; background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00); margin: 10px 0;"></div>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #00ff00;">
            <h3 style="margin: 0 0 15px 0; color: #00ff00; text-transform: uppercase;">Informações do Remetente</h3>
            <p style="margin: 8px 0; color: #d0d0d0;"><strong style="color: #ffff00;">Nome:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #d0d0d0;"><strong style="color: #ffff00;">Email:</strong> ${email}</p>
            <p style="margin: 8px 0; color: #d0d0d0;"><strong style="color: #ffff00;">Assunto:</strong> ${subject}</p>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 4px; border-left: 4px solid #0080ff;">
            <h3 style="margin: 0 0 15px 0; color: #0080ff; text-transform: uppercase;">Mensagem</h3>
            <div style="color: #d0d0d0; line-height: 1.6; white-space: pre-wrap; background: #0a0a0a; padding: 15px; border-radius: 4px; border: 1px solid #333;">${message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <span style="color: #ff0000;">[</span> 
              Esta mensagem foi enviada através do formulário de contato do seu portfólio 
              <span style="color: #ff0000;">]</span>
            </p>
            <p style="margin: 5px 0 0 0; font-size: 10px; color: #444;">
              Timestamp: ${new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      `
    };

    // Envio do email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true,
      message: 'Email enviado com sucesso! Entrarei em contato em breve.' 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao enviar email. Tente novamente ou entre em contato diretamente.' 
    });
  }
} 
