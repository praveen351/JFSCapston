package com.jfs.capston.mailserver;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.client.RestTemplate;

public class MailIDValidator {
	private final static String apikey = "f52c7c4e4dd0b164af7b35d4ed2cd9f6";

	public static void main(String[] args) {
		System.out.println(isAddressValid("praveenkumar1234raja@gmail.com"));
	}

	public static boolean isAddressValid(String address) {

		Map<String, Object> obj = checkEmail(address);
		return (Boolean) obj.get("smtp_check");
	}

	private static Map<String, Object> checkEmail(String email) {
		RestTemplate restTemplate = new RestTemplate();
		String url = "https://apilayer.net/api/check?access_key=" + apikey + "&email=" + email + "&smtp=1&format=1";
		Map<String, Object> obj = restTemplate.getForObject(url, HashMap.class);
		return obj;
	}
}
