package com.jfs.capston.mailserver;

import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailServer {
	public static String USER_NAME = "praveenkumar1234raja"; 
	public static String PASSWORD = "RajaPraja0987@";
	public static String SUBJECT_NAME = "Regarding Survey"; 
	public static String BODY = "Dear Candidate\r\n" + 
			"\r\n" + 
			"You need to survey the link http://localhost:4200/loginCandidate,\r\n" + 
			"by respective Name and mail id.\r\n" + 
			"\r\n" + 
			"Regards\r\n" + 
			"Admin(Praveen Kumar Samal)";
	
	public static int sendFromGMail(String from, String pass, List<String> to, String subject, String body) {
		Properties props = System.getProperties();
		String host = "smtp.gmail.com";
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.user", from);
		props.put("mail.smtp.password", pass);
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.auth", "true");

		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);

		try {
			message.setFrom(new InternetAddress(from));
			InternetAddress[] toAddress = new InternetAddress[to.size()];
			
			for (int i = 0; i < to.size(); i++) {
				toAddress[i] = new InternetAddress(to.get(i));
			}

			for (int i = 0; i < toAddress.length; i++) {
				message.addRecipient(Message.RecipientType.TO, toAddress[i]);
			}

			message.setSubject(subject);
			message.setText(body);
			Transport transport = session.getTransport("smtp");
			transport.connect(host, from, pass);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (AddressException ae) {
			return 0;
		} catch (MessagingException me) {
			return -1;
		}
		return 1;
	}
}
