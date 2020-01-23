package com.airline.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.airline.model.Passengers;
import com.airline.model.User;
import com.airline.service.AirlineService;

@Controller
@RequestMapping("/")
@CrossOrigin
public class AirlineRestController {
	
	@Autowired
	private AirlineService service;
	
	// http://localhost:9090/
	@RequestMapping(method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addStudent(@RequestBody User user){
		ResponseEntity<String> response;
		int result = service.registerUser(user);
		if(result == 1){
			response=new ResponseEntity<String>("User is added.",HttpStatus.CREATED);
		}
		else{
			response=new ResponseEntity<String>("User Not Added.",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    return response;
	}
	
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleException(Exception ex){
		ResponseEntity<String> error = new ResponseEntity<String>("Error: "+ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		return error;
	}
}
