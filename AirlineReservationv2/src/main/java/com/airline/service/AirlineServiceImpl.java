package com.airline.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.airline.dao.AirlineDao;
import com.airline.model.Credentials;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.User;

@Service("service")
@Scope(scopeName="singleton")
public class AirlineServiceImpl implements AirlineService {
	
	@Autowired
	private AirlineDao dao;

	public int registerUser(User user) {
		return dao.insertUser(user);
	}

	public Credentials getUser(LoginCredentials credential) {
		return dao.fetchCredentials(credential);
	}

	public List<Flights> getFlightDetails(FlightSearchDetails details) {
		return dao.fetchFlights(details);
	}

	public List<String> getBookedSeats(long flightId) {
		return dao.fetchSeats(flightId);
	}

	public PaymentDetails getPaymentConfirmation(PaymentDetails details) {
		return dao.fetchPaymentConfirmation(details);
	}
}