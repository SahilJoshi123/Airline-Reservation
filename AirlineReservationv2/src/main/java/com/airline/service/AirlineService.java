package com.airline.service;

import java.util.List;

import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.PaymentDetails;
import com.airline.model.SeatInfo;
import com.airline.model.Tickets;
import com.airline.model.User;

public interface AirlineService {
	public long registerUser(User user);
	public long getUser(LoginCredentials credential);
	public List<Flights> getFlightDetails(FlightSearchDetails details);
	public List<String> getBookedSeats(long flightId);
	public int getPaymentConfirmation(PaymentDetails details);
	public int bookTicket(Tickets details);
	public void bookSeats(SeatInfo seatDetails);
}
