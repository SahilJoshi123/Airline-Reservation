package com.airline.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.airline.model.Credentials;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.SeatInfo;
import com.airline.model.Tickets;
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
	public long registerPassenger(@RequestBody User user){
		long result = service.registerUser(user);
	    return result;
	}
	
	// http://localhost:9090/login
	@RequestMapping(path="login", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody long getCredentials(@RequestBody LoginCredentials credential){
		long result = service.getUser(credential);
	    return result;
	}
	
	// http://localhost:9090/search
	@RequestMapping(path="search", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Flights> getFlights(@RequestBody FlightSearchDetails details){
		List<Flights> result = service.getFlightDetails(details);
		return result;
	}
	
	// http://localhost:9090/seats/{flightId}
	@RequestMapping(path="seats/{flightId}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<String> getBookedSeats(@PathVariable("flightId") long flightId){
		List<String> result = service.getBookedSeats(flightId);
		return result;
	}
	
	// http://localhost:9090/payment
	@RequestMapping(path="payment", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody PaymentDetails getPaymentConfirmation(@RequestBody PaymentDetails details){
		
		PaymentDetails response;
		int result = service.getPaymentConfirmation(details);
		if(result == 1){
			response=new PaymentDetails();
		}
		else{
			response=null;
		}
	    return response;
	}
	
	// http://localhost:9090/book
	@RequestMapping(path="book", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody int bookTicket(@RequestBody Tickets details){
		int result = service.bookTicket(details);
	    return result;
	}
	
	// http://localhost:9090/seats
	@RequestMapping(path="seats", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody void bookSeats(@RequestBody SeatInfo seatDetails){
		service.bookSeats(seatDetails);
	}

	@ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex){
		ResponseEntity<String> error = new ResponseEntity<String>("Error: "+ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		return error;
	}
}
