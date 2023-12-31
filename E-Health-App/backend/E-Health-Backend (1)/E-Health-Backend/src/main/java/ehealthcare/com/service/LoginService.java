package ehealthcare.com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ehealthcare.com.entity.Login;
import ehealthcare.com.repository.LoginRepository;

@Service
public class LoginService {

		@Autowired
		LoginRepository loginRepository;
		
		public String signIn(Login login) {
			Optional<Login> result = loginRepository.findById(login.getEmailid());
			
			if(result.isPresent()) {
				Login ll =result.get();
				if (ll.getPassword().equals(login.getPassword())){			
					
					
					if(ll.getTypeofuser().equals("admin")) {
						return "Admin login successful";
					}else {
						return "Customer login successful";
					}
				}else {
					return "Password is invalid";
				}
			}else {
				return "Email is invalid";
			}
			
			
		}
		
		public String signUp(Login login, String userProvidedEmail) {
			if(login.getTypeofuser().equalsIgnoreCase("admin")) {
				return "you can't create admin account";
			}else {
				 login.setEmailid(userProvidedEmail);
				Optional<Login> result = loginRepository.findById(login.getEmailid());
				if(result.isPresent()) {
					return "Account already exists";
			}else {
				
				loginRepository.save(login);
				return "Account created successfully!";
			}
				
			}
		}
		
		 public Optional<Login> findByEmailid(String emailid) {
		        return loginRepository.findById(emailid);
		    }
		}