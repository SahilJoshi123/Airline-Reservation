package com.airline.dao;

import java.util.List;

import com.airline.model.Credentials;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.User;

public interface AirlineDao {
	public int insertUser(User user);
	public Credentials fetchCredentials(LoginCredentials credential);
	public List<Flights> fetchFlights(FlightSearchDetails details);
	public List<String> fetchSeats(long flightId);
	public PaymentDetails fetchPaymentConfirmation(PaymentDetails details);
}
