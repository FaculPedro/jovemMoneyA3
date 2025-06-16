package br.com.unicuritiba.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.unicuritiba.config.JwtUtil;
import br.com.unicuritiba.models.User;
import br.com.unicuritiba.services.UserService;

@RestController
public class UserController {

	@Autowired
	UserService service;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers(){
		return ResponseEntity.ok(service.getAllUser());	
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUser(@PathVariable long id){
		return ResponseEntity.ok(service.getUserById(id));	
	}
	
	@PostMapping("/users")
	public ResponseEntity<?> saveUser(@RequestBody User user){
	    User savedUser = service.saveUser(user);
	    String token = JwtUtil.generateToken(String.valueOf(savedUser.getId()));
	    Map<String, Object> response = new HashMap<>();
	    response.put("user", savedUser);
	    response.put("token", token);
	    return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/users/{id}")
	public void removeUser(@PathVariable long id) {
		 service.removeUser(id);
	}
	
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable long id,
			@RequestBody User user) {
		return ResponseEntity.ok(service.updateUser(id, user));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
	    String cpf = loginData.get("cpf");
	    String password = loginData.get("password");

	    if (cpf == null || password == null) {
	        return ResponseEntity.badRequest().body("CPF e senha são obrigatórios");
	    }

	    User user = service.login(cpf, password);
	    if (user != null) {
	        String token = JwtUtil.generateToken(String.valueOf(user.getId()));
	        Map<String, Object> response = new HashMap<>();
	        response.put("user", user);
	        response.put("token", token);
	        return ResponseEntity.ok(response);
	    } else {
	        return ResponseEntity.status(401).body("CPF ou senha inválidos");
	    }
	}
}