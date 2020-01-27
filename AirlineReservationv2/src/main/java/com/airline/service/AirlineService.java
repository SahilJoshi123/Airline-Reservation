package com.airline.service;

import java.util.List;

import com.airline.model.Credentials;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.User;

public interface AirlineService {
	public int registerUser(User user);
	public Credentials getUser(LoginCredentials credential);
	public List<Flights> getFlightDetails(FlightSearchDetails details);
	public List<String> getBookedSeats(long flightId);
	public PaymentDetails getPaymentConfirmation(PaymentDetails details);
}
